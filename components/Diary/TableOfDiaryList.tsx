/**
 * 이제 안씀
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import cn from "@yeahx4/cn";
import { getDiaryList } from '@/libs/Diary/getDiaryList';

// 연도-월 기준으로 그룹화
function groupByYearMonth(list: Awaited<ReturnType<typeof getDiaryList>>) {
  const result: Record<string, Record<string, typeof list>> = {};

  for (const entry of list) {
    const [year, month] = entry.meta.date.split('-');
    if (!result[year]) result[year] = {};
    if (!result[year][month]) result[year][month] = [];
    result[year][month].push(entry);
  }

  return result;
}

export default function TableOfDiaryList({
  diaryList 
}: { 
  diaryList: Awaited<ReturnType<typeof getDiaryList>> 
}) {
  const grouped = useMemo(() => groupByYearMonth(diaryList), [diaryList]);

  const [collapsedYears, setCollapsedYears] = useState<Record<string, boolean>>({});
  const [collapsedMonths, setCollapsedMonths] = useState<Record<string, Record<string, boolean>>>({});

  const toggleYear = (year: string) => {
    setCollapsedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleMonth = (year: string, month: string) => {
    setCollapsedMonths(prev => ({
      ...prev,
      [year]: {
        ...prev[year],
        [month]: !prev[year]?.[month],
      },
    }));
  };

  return (
    <aside className={cn(
      'absolute top-[20px] right-full -mb-[100px] hidden',
      'h-[calc(100%+150px)] xl:block'
    )}>
      <div className="sticky top-[20px] z-10 ml-8 mt-[20px] w-[240px] text-left border-l pl-4">
        <div className="text-lg mb-2 font-bold">일기 목록</div>
        <ul className="text-sm space-y-1">

          {/* 연도별로 월을 그룹 */}
          {Object.entries(grouped).map(([year, months]) => (
            <li key={year}>
              <button
                onClick={() => toggleYear(year)}
                className="font-bold text-base hover:text-blue-600"
              >
                {collapsedYears[year] ? '▶' : '▼'} {year}
              </button>
              {!collapsedYears[year] && (
                <ul className="ml-4 mt-1 space-y-1">
                  {/* 월별로 일기를 그룹 */}
                  {Object.entries(months).map(([month, entries]) => (
                    <li key={month}>
                      <button
                        onClick={() => toggleMonth(year, month)}
                        className="font-semibold text-sm hover:text-blue-500"
                      >
                        {collapsedMonths[year]?.[month] ? '▶' : '▼'} {month}
                      </button>
                      {!collapsedMonths[year]?.[month] && (
                        <ul className="ml-4 mt-1 space-y-2">
                          {/* 각 일기 제목 */}
                          {entries.map((entry, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/diary/${entry.meta.date}`}
                                className="text-white hover:underline"
                              >
                                {entry.meta.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
