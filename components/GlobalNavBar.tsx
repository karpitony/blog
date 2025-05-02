"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import cn from '@yeahx4/cn';
import { RiMenu3Fill, RiCloseLargeLine, RiSearch2Line, RiRssLine, RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

const LinkData = [
  { href: '/', label: '홈' },
  { href: '/posts', label: '글 목록' },
  { href: '/diary', label: '일기' },
  { href: '/projects', label: '프로젝트' },
  { href: '/about', label: '소개' },
];

export default function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
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
      "fixed top-0 w-full z-50 flex items-center justify-center backdrop-blur-md",
      "transition-colors duration-500 ease-in-out w-full",
      scrolled ? "bg-transparent" : "bg-white/70 dark:bg-[#121212]",
      )}
    >
      <div className={cn(
        "h-16 max-w-5xl w-full flex items-center justify-between px-4 lg:px-0",
      )}>
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold font-shrik text-xl md:text-2xl">
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
          {mounted && (
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/20"
            >
              {isDark ? <RiSunLine size={20} /> : <RiMoonClearLine size={20} />}
            </button>
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
    {mounted && (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-6 bg-white dark:bg-[#121212] transition-colors"
      >
        <div className="flex flex-col items-center gap-4 text-lg font-medium">
          {LinkData.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                pathname === href
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
        <Link href="/search" className="p-3 rounded-full border border-black/10 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/20">
              <RiSearch2Line size={24} />
            </Link>
            <Link href="/rss.xml" target="_blank" className="p-3 rounded-full border border-black/10 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/20">
              <RiRssLine size={24} />
            </Link>
            <button 
              onClick={toggleTheme}
              className={cn(
                "p-3 rounded-full border border-black dark:border-white", 
                "hover:bg-black/30 dark:hover:bg-white/30 text-black dark:text-white"
                )}
              >
              {isDark ? <RiMoonClearLine size={24} /> : <RiSunLine size={24} />}
            </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)}
    </>
  );
}