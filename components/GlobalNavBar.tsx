"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from '@yeahx4/cn';
import { useState } from 'react';
import { SpinningReactSm } from '@/components/SpinningLogo';
import { RiMenu3Fill, RiCloseLargeLine } from "react-icons/ri";

const LinkData = [
  { href: '/posts', label: '글 목록' },
  { href: '/diary', label: '일기' },
  { href: '/projects', label: '프로젝트' },
  { href: '/about', label: '소개' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="text-gray-200 flex flex-col items-center justify-center w-full px-2 md:px-4">
      <div className=" max-w-full md:max-w-3xl flex  justify-between py-6 md:py-8 pr-1 w-full border-b-2 border-white">

        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <span className='hidden md:inline-block'>
            <SpinningReactSm />
          </span>
          <p className={cn(
              "relative inline-block font-light text-2xl md:text-3xl font-shrik tracking-wider",
              
              "hover:text-transparent bg-clip-text hover:text-white",
              "before:duration-300",            // 애니메이션 속도
              "before:ease-in-out",             // 애니메이션 이징
              "before:content-['']",            // 내용 없는 before 요소 생성
              "before:absolute",                // 절대 위치
              "before:-bottom-[5px]",           // 텍스트 바로 아래
              "before:left-0",                  // 왼쪽 기준
              "before:w-full",                  // 가상 요소 너비
              "before:h-[2px]",                 // 밑줄 두께
              "before:bg-white",              // 밑줄 색
              "before:transform", 
              "before:scale-x-0",               // 초기 상태에서 가로 크기 0
              "before:origin-left",             // 스케일 시 왼쪽을 기준점으로
              "before:transition-all",          // 트랜지션 적용
              "hover:before:scale-x-100",       // 호버 시 가로 스케일을 100%로
            )}
            >
              yuniverse
            </p>
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="flex items-center">
        {LinkData.map(({ href, label }) => (
          <Link
            href={href}
            className={cn(
              "hidden relative md:inline-block text-gray-300 px-1 font-bold text-lg md:text-xl ml-3",
              pathname === href ? "bg-gradient-to-r from-blue-300 to-teal-400 text-transparent bg-clip-text" : "",
              "hover:text-transparent hover:bg-gradient-to-r hover:from-blue-300 hover:to-teal-400",
              "bg-clip-text",
              "before:duration-300",            // 애니메이션 속도
              "before:ease-in-out",             // 애니메이션 이징
              "before:content-['']",            // 내용 없는 before 요소 생성
              "before:absolute",                // 절대 위치
              "before:-bottom-[2px]",           // 텍스트 바로 아래
              "before:left-0",                  // 왼쪽 기준
              "before:w-full",                  // 가상 요소 너비
              "before:h-[2px]",                 // 밑줄 두께
              "before:bg-teal-400",           // 밑줄 색
              "before:transform", 
              "before:scale-x-0",               // 초기 상태에서 가로 크기 0
              "before:origin-left",             // 스케일 시 왼쪽을 기준점으로
              "before:transition-all",          // 트랜지션 적용
              "hover:before:scale-x-100",       // 호버 시 가로 스케일을 100%로
            )}
            key={href}
          >
            {label}
          </Link>
        ))}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <div className="md:hidden flex items-center justify-end">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white relative w-8 h-8"
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "transition-opacity duration-300",
                isOpen ? "opacity-0" : "opacity-100"
              )}
            >
              <RiMenu3Fill size={26} />
            </span>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}
            >
            <RiCloseLargeLine size={26} />
            </span>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴: 헤더 아래에 펼쳐짐 */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-start px-2 pb-4 space-y-2">
          {LinkData.map(({ href, label }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "block w-full py-1 px-2 rounded text-lg font-semibold",
                "text-gray-200 hover:text-teal-500 transition text-center"
              )}
              onClick={() => setIsOpen(false)} // 메뉴 클릭시 닫기
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}