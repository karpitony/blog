import React from 'react';
import Link from 'next/link';
import { getDiaryList } from '@/libs/Diary/getDiaryList';

export default async function DiaryLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  const diaryList = await getDiaryList();

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', borderRight: '1px solid #ddd' }}>
        <h2>일기 목록</h2>
        <ul>
          {diaryList.map((entry, idx) => (
            <li key={idx}>
              <Link href={`/diary/${entry.meta.date}`}>{entry.meta.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
