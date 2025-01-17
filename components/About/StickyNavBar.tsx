'use client';
import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface StickyNavBarProps {
  sections: Section[];
}

export default function StickyNavBar({ sections }: StickyNavBarProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [isSticky, setIsSticky] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // 부드러운 복귀를 위한 상태 추가

  useEffect(() => {
    let tocInitialOffset = 0;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (!tocInitialOffset) {
        const tocElement = document.getElementById("toc");
        if (tocElement) {
          tocInitialOffset = tocElement.offsetTop;
        }
      }

      // 현재 섹션 확인
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetBottom - 100) {
            setActiveSection(section.id);
          }
        }
      }

      // 스티키 상태 업데이트
      if (scrollPosition > tocInitialOffset) {
        setIsSticky(true);
        setIsAtTop(false);
      } else {
        setIsSticky(false);
        setIsAtTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <div
      id="toc"
      className={`transition-all duration-300 ${
        isSticky
          ? "fixed pl-5 rounded-b-md shadow-lg backdrop-blur-xl top-0"
          : isAtTop
          ? "relative pl-2 top-0"
          : "relative pl-2"
      } w-full right-0 z-10 py-3`}
    >
      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="max-w-3xl mx-auto overflow-x-auto"
      >
        <ul
          style={{
            WebkitOverflowScrolling: "touch",
            WebkitScrollbar: "none",
          } as React.CSSProperties}
          className="flex space-x-4 text-base md:text-lg whitespace-nowrap"
        >
          {sections.map((section) => (
            <li
              key={section.id}
              className={`cursor-pointer ${
                activeSection === section.id
                  ? "font-bold text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-300"
              }`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
