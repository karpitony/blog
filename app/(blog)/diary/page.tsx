// app/diary/page.tsx
import { getDiaryList } from '@/libs/Diary/getDiaryList';
import { readFile } from 'fs/promises';
import path from 'path';
import { parseDiary } from '@/libs/Diary/metaDataParser';
import WongojiTitle from '@/components/Diary/WongojiTitle';

export default async function LatestDiaryPage() {
  const diaryList = await getDiaryList();
  const latest = diaryList[0];

  const filePath = path.join(process.cwd(), '_diary', `${latest.slug}.md`);
  const fileContents = await readFile(filePath, 'utf-8');
  const { body } = parseDiary(fileContents);

  return (
    <div>
      <WongojiTitle text="2025년 03월 18일 - 오늘의 일기" size={32} />
      <h1>{latest.meta.title}</h1>
      {body.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}