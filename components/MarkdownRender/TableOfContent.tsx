'use client';

import Link from "next/link";
import parseToc, { HeadingItem } from "@/libs/Post/parseToc";
import { useHeadingsObserver } from "@/hooks/useHeadingsObserver";
import cn from "@yeahx4/cn";

export default function TableOfContent({ content }: { content: string }) {
  const activeIdList = useHeadingsObserver("h2, h3, h4, h5");
  const toc:HeadingItem[] = parseToc(content);

  return (
        <div className="text-left w-[200px]">
          <div className="mb-1 font-bold">Table of Contents</div>
          <ul className="text-xs space-y-2">
            {toc.map((item, index) => {
              const id = item.text.replace(/ /g, "-");
              const isActive = activeIdList.includes(`#${id}`) || activeIdList.includes(id);
              const indentClass = `ml-${(5 - item.indent) * 2}`;
              return (
                <li key={index} className={cn("py-1 transition", indentClass)}>
                  <Link href={item.link}>
                    <p
                      className={`text-sm ${
                        isActive
                          ? "text-blue-600 font-bold underline"
                          : "text-gray-300"
                      } hover:text-blue-500 transition-colors duration-200 cursor-pointer`}
                    >
                      {item.text}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
  );
}
