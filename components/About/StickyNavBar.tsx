'use client';
import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface StickyNavBarProps {
  sections: Section[];
}

export default function StickyNavBar({ sections } : StickyNavBarProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let tocInitialOffset = 0;
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
  
      // 초기 위치 저장
      if (!tocInitialOffset) {
        const tocElement = document.getElementById("toc");
        if (tocElement) {
          tocInitialOffset = tocElement.offsetTop;
        }
      }
  
      // 현재 어느 섹션인지 확인
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
  
      // 스티키 여부 업데이트
      setIsSticky(scrollPosition > tocInitialOffset);
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
      className={`${
        isSticky ? "fixed px-5" : "relative px-2"
      } w-full top-0 right-0 z-10 py-3 rounded-md shadow-lg backdrop-blur-xl`}
    >
      <div className="max-w-3xl mx-auto">
        <ul className="flex space-x-4 text-base md:text-lg">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`cursor-pointer ${
                activeSection === section.id ? "font-bold text-blue-500" : "text-gray-300"
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
};
