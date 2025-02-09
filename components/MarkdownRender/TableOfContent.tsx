'use client';

import parseToc, { HeadingItem } from "@/libs/Post/parseToc";
import { useHeadingsObserver } from "@/hooks/useHeadingsObserver";
import cn from "@yeahx4/cn";

export default function TableOfContent({ content }: { content: string }) {
  const activeIdList = useHeadingsObserver("h2, h3, h4, h5");
  const toc:HeadingItem[] = parseToc(content);

  return (
    <div className="text-left w-[240px] border-l pl-4">
      <div className="text-lg mb-2 font-bold">Table of Contents</div>
      <ul className="text-sm space-y-1">
        {toc.map((item, index) => {
          //const id = item.text.trim().toLowerCase().replace(/\s+/g, "-");
          const isActive = activeIdList.includes(item.link);
          let indentClass = "";
          if (item.indent === 1) {
            indentClass = "ml-4";
          } else if (item.indent === 2) {
            indentClass = "ml-3";
          } else if (item.indent === 3) {
            indentClass = "ml-2";
          } else if (item.indent === 4) {
            indentClass = "ml-1";
          }

          return (
            <li key={index} className={cn("py-1 transition", indentClass)}>
              {/* 임시로 Link 대신 a 태그로 서버에 요청 안넣게 변경 */}
              <a href={item.link}>
                <p
                  className={`text-sm ${
                    isActive
                      ? "text-blue-600 font-bold underline"
                      : "text-gray-300"
                  } hover:text-blue-500 transition-colors duration-200 cursor-pointer`}
                >
                  {item.text}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
