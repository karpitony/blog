"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import cn from '@yeahx4/cn';
import { RiMenu3Fill, RiCloseLargeLine, RiSearch2Line, RiRssLine, RiMoonClearLine, RiSunLine } from "react-icons/ri";
import MobileFullScreen from './MobileFullScreen';

const LinkData = [
  { href: '/', label: '홈' },
  { href: '/posts', label: '글 목록' },
//  { href: '/diary', label: '일기' },
  { href: '/projects', label: '프로젝트' },
  { href: '/about', label: '소개' },
];

export default function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <>
    <header className={cn(
      pathname === "/about" ? "" : "fixed top-0 w-full z-50",
      " flex items-center justify-center backdrop-blur-md",
      "transition-colors duration-500 ease-in-out w-full",
      "pr-2 md:pr-0",
      scrolled ? "bg-transparent" : "bg-[#f2f2f2] dark:bg-[#121212]",
      isVisible ? "translate-y-0" : "-translate-y-80",
      "transition-transform duration-300 ease-in-out",
    )}>
      <div className={cn(
        "h-16 max-w-5xl w-full flex items-center justify-between px-4 lg:px-0",
      )}>
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold font-shrik text-xl md:text-2xl tracking-wider">
          yuniverse
        </Link>

        {/* PC 내비게이션 */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LinkData.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-3 py-2 rounded-full transition-colors",
                pathname === href
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* PC용 아이콘 */}
        <div className="hidden md:flex gap-2 ml-4">
          <Link href="/search" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/20">
            <RiSearch2Line size={20} />
          </Link>
          <Link 
            href="/rss.xml"
            target="_blank"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/20"
          >
            <RiRssLine size={20} />
          </Link>
          {mounted ? (
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/20"
            >
              {isDark ? <RiMoonClearLine size={20} /> : <RiSunLine size={20} />}
            </button>
          ) : (
            <div className="p-2 rounded-full dark:border-white/25 animate-pulse">
              <RiMoonClearLine size={20} />
            </div>
          )}
        </div>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex md:hidden size-9 rounded-full p-2 items-center justify-center border", 
          "border-black/10 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
        )}
      >
        {isOpen ? <RiCloseLargeLine className="size-full" /> : <RiMenu3Fill className="size-full" />}
      </button>
  </header>
  {/* 모바일 메뉴 풀스크린 */}
  <MobileFullScreen
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    toggleTheme={toggleTheme}
    isDark={isDark}
    LinkData={LinkData}
    pathname={pathname}
  />
  </>
  );
}