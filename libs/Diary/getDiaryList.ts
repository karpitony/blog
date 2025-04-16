import path from 'path';
import fs from 'fs/promises';
import { parseDiary, DiaryMeta } from '@/libs/Diary/metaDataParser';
import { readJsonPublic } from '@/libs/jsonPublicCache';

export interface DiaryData {
  meta: DiaryMeta;
  slug: string;
}

const diaryDirectory = path.join(process.cwd(), '_diary');

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllMarkdownFiles(res);
      } else if (entry.isFile() && path.extname(entry.name) === '.md') {
        return res;
      } else {
        return null;
      }
    })
  );
  return files.flat().filter((f): f is string => f !== null);
}

export async function generateDiaryList(): Promise<DiaryData[]> {
  const markdownFiles = await getAllMarkdownFiles(diaryDirectory);

  const diary = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { meta } = parseDiary(fileContents);

      const relativePath = path.relative(diaryDirectory, filePath);
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

      return { meta, slug };
    })
  );

  diary.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
  return diary;
}

export const getDiaryList = async (): Promise<DiaryData[]> => {
  const cached = await readJsonPublic<DiaryData[]>('diaryList.json');
  if (cached) return cached;

  const diary = await generateDiaryList();

  return diary;
};

export const findDiaryBySlug = async (slug: string): Promise<string> => {
  if (!slug) {
    throw new Error('Slug is required');
  }
  const [ year, month, day ] = slug.split('-');
  const filePath = path.join(diaryDirectory, `${year}/${month}/${year}${month}${day}.md`);
  return filePath;
}