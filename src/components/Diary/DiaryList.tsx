'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { getDiaryList } from '@/libs/Diary/getDiaryList';
import cn from '@yeahx4/cn';

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

export default function DiaryList({
  diaryList,
}: {
  diaryList: Awaited<ReturnType<typeof getDiaryList>>;
}) {
  const grouped = useMemo(() => groupByYearMonth(diaryList), [diaryList]);

  return (
    <ul className="text-base">
      {Object.entries(grouped).map(([year, months]) => (
        <li key={year}>
          {/* 연도 + 월별로 일기를 그룹 */}
          {Object.entries(months).map(([month, entries]) => (
            <div key={month}>
              <h3
                className={cn(
                  'text-3xl font-semibold mt-12 mb-4 cursor-pointer underline underline-offset-2',
                  'text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300',
                  'hover:no-underline underline-offset-2 transition duration-200 ease-in-out',
                )}
              >
                {year}.{month}
              </h3>
              <ul className="mt-1 space-y-2">
                {/* 각 일기 제목 */}
                {entries.map((entry, idx) => (
                  <p key={idx}>
                    <Link
                      href={`/diary/${entry.meta.date}`}
                      className={cn(
                        'text-base cursor-pointer underline underline-offset-2',
                        'text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300',
                        'hover:no-underline underline-offset-2 transition duration-200 ease-in-out',
                      )}
                    >
                      {entry.meta.title} {entry.meta.description && `- ${entry.meta.description}`}
                    </Link>
                  </p>
                ))}
              </ul>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
