// app/diary/page.tsx
import { getDiaryList } from '@/libs/Diary/getDiaryList';
import { readFile } from 'fs/promises';
import path from 'path';
import { parseDiary } from '@/libs/Diary/metaDataParser';
import DiaryText from '@/components/Diary/DiaryText';

export default async function LatestDiaryPage() {
  const diaryList = await getDiaryList();
  const latest = diaryList[0];

  const filePath = path.join(process.cwd(), '_diary', `${latest.slug}.md`);
  const fileContents = await readFile(filePath, 'utf-8');
  const { body } = parseDiary(fileContents);

  return (
    <div>
       <DiaryText meta={latest.meta} body={body} />
    </div>
  );
}