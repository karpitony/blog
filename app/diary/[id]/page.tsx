import path from 'path';
import { readFile } from 'fs/promises';
import { getDiaryList, findDiaryBySlug } from '@/libs/Diary/getDiaryList';
import { parseDiary } from '@/libs/Diary/metaDataParser';
import DiaryText from '@/components/Diary/DiaryText';

export const dynamic = 'force-static';

interface DiaryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const diaries = await getDiaryList();
  return diaries.map(diary => ({
    id: diary.meta.date,
  }));
}

export async function generateMetadata({ params }: DiaryPageProps) {
  const { id } = await params;
  const diarySlug = id;

  const diaryFilePath = await findDiaryBySlug(diarySlug);
  const fullPath = path.join(diaryFilePath);
  const fileContents = await readFile(fullPath, 'utf-8');
  const { meta } = parseDiary(fileContents);

  return {
    title: meta.title || "Not Found",
    description: meta.description,
    openGraph: {
      title: meta.title,
      images: {
        url: meta.cover,
        alt: meta.title,
        width: 700,
        height: 350,
      },
    },
  };
}

export default async function DiaryPage({ params }: DiaryPageProps) {
  const { id } = await params;
  const diarySlug = id;
  const diaryFilePath = await findDiaryBySlug(diarySlug);
  const fullPath = path.join(diaryFilePath);
  const fileContents = await readFile(fullPath, 'utf-8');
  const { meta, body } = parseDiary(fileContents);

  return (
    <>
      <DiaryText meta={meta} body={body} />
    </>
  );
}
