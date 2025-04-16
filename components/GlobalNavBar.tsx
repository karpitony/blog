import Link from 'next/link';
import cn from '@yeahx4/cn';
import { SpinningReactSm } from '@/components/SpinningLogo';

const LinkData = [
  { href: '/posts', label: '글 목록' },
  { href: '/diary', label: '일기' },
  { href: '/about', label: '소개' },
];

export default function NavBar() {
  return (
    <nav className="text-white max-w-3xl mx-3 md:mx-auto border-b-2">
      <div className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center">
          <SpinningReactSm />
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
              "before:bg-white",           // 밑줄 색
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
        <div className="flex items-center">
        {LinkData.map(({ href, label }) => (
          <Link
            href={href}
            className={cn(
              "relative inline-block text-gray-300 px-1 font-bold text-lg md:text-xl ml-0 md:ml-4",
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
      </div>
    </nav>
  )
}