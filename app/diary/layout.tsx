import React from 'react';
import TableOfDiaryList from '@/components/Diary/TableOfDiaryList';
import { getDiaryList } from '@/libs/Diary/getDiaryList';

export default async function DiaryLayout({ 
  children 
}: {
  children: React.ReactNode 
}) {
  const diaryList = await getDiaryList();
  return (
    <div className='relative flex flex-col w-full max-w-full md:max-w-3xl'>
      <TableOfDiaryList diaryList={diaryList}/>
      <main>
        {children}
      </main>
    </div>
  );
}
