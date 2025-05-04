
import Link from "next/link";
import { RiMoonClearLine, RiSunLine, RiSearch2Line, RiRssLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import cn from "@yeahx4/cn";

interface MobileFullScreenProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleTheme: () => void;
  isDark: boolean;
  LinkData: { href: string; label: string }[];
  pathname: string;
}



export default function MobileFullScreen({
  isOpen,
  setIsOpen,
  toggleTheme,
  isDark,
  LinkData,
  pathname,
}: MobileFullScreenProps) {
  return (
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
            <Link 
              href="/search"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-full border border-black/10 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/20"
            >
              <RiSearch2Line size={24} />
            </Link>
            <Link 
              href="/rss.xml"
              target="_blank"
              className="p-3 rounded-full border border-black/10 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/20"
            >
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
);
}