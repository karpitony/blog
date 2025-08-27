'use client';

import parseToc, { HeadingItem } from '@/libs/Post/parseToc';
import { useHeadingsObserver } from '@/hooks/useHeadingsObserver';
import cn from '@yeahx4/cn';

export default function TableOfContent({ content }: { content: string }) {
  const activeIdList = useHeadingsObserver('h2, h3, h4, h5');
  const toc: HeadingItem[] = parseToc(content);

  return (
    <aside className="absolute -top-[200px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block ">
      <div
        className={cn(
          'sticky bottom-0 top-[200px] z-10 ml-[2rem] mt-[200px] text-left w-[240px]',
          'border-l pl-4 border-gray-700 dark:border-gray-300',
        )}
      >
        <div className="text-lg mb-2 font-bold text-black dark:text-white">Table of Contents</div>
        <ul className="text-sm space-y-1">
          {toc.map((item, index) => {
            //const id = item.text.trim().toLowerCase().replace(/\s+/g, "-");
            const isActive = activeIdList.includes(item.link);
            let indentClass = '';
            if (item.indent === 1) {
              indentClass = 'ml-4';
            } else if (item.indent === 2) {
              indentClass = 'ml-3';
            } else if (item.indent === 3) {
              indentClass = 'ml-2';
            } else if (item.indent === 4) {
              indentClass = 'ml-1';
            }

            return (
              <li key={index} className={cn('py-1 transition', indentClass)}>
                {/* 임시로 Link 대신 a 태그로 서버에 요청 안넣게 변경 */}
                <a href={item.link}>
                  <p
                    className={cn(
                      isActive
                        ? 'text-blue-600 dark:text-blue-500 font-bold underline'
                        : 'text-black dark:text-gray-300',
                      'text-sm hover:text-blue-500 hover:underline transition-colors duration-200 cursor-pointer',
                    )}
                  >
                    {item.text}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
