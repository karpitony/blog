'use client' ;
import { useEffect, useState } from "react";
import parseToc from "@/libs/Post/parseToc";
import cn from "@yeahx4/cn";
import Link from "next/link";

export default function TableOfContent({ content }: { content: string }) {
  const toc = parseToc({ content });
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = toc.map(item => document.getElementById(item.value.replace(/ /g, "-")));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
      );

      sectionElements.forEach((element) => {
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <div className="text-left w-[200px]">
      <div className="text-lg font-bold text-white mb-4">
        Table of Contents
      </div>
      <ul className="space-y-2">
        {toc.map((item, index) => {
          const id = item.value.replace(/ /g, "-");
          return (
            <li key={index} className={cn("ml-0", `ml-${(5 - item.level) * 2}`)}>
              <Link href={`#${id}`}>
                <p
                  className={`text-sm ${
                    activeId === id ? "text-blue-600 font-bold underline" : "text-gray-300"
                  } hover:text-blue-500 transition-colors duration-200 cursor-pointer`}
                >
                  {item.value}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
