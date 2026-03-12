import path from 'path';
import fs from 'fs/promises';
import { DiaryFrontmatterSchema, type DiaryMeta, type DiaryData } from './schemas/diary.schema';
import { parseMarkdown } from './parser';
import { processMarkdownFiles } from './pipeline';
import { readJsonPublic } from '@/libs/jsonPublicCache';

const diaryDirectory = path.join(process.cwd(), 'contents/diary');

// --- File Discovery ---

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllMarkdownFiles(res);
      } else if (entry.isFile() && path.extname(entry.name) === '.md') {
        return res;
      } else {
        return null;
      }
    }),
  );
  return files.flat().filter((f): f is string => f !== null);
}

// --- Public API ---

export async function generateDiaryList(): Promise<DiaryData[]> {
  const markdownFiles = await getAllMarkdownFiles(diaryDirectory);

  const diary = await processMarkdownFiles(
    markdownFiles,
    DiaryFrontmatterSchema,
    (frontmatter, _body, filePath) => {
      const relativePath = path.relative(diaryDirectory, filePath);
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

      return {
        meta: frontmatter as DiaryMeta,
        slug,
      };
    }
  );

  diary.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
  return diary;
}

export const getDiaryList = async (): Promise<DiaryData[]> => {
  const cached = await readJsonPublic<DiaryData[]>('diaryList.json');
  if (cached) return cached;

  return generateDiaryList();
};

export const findDiaryBySlug = async (slug: string): Promise<string> => {
  if (!slug) {
    throw new Error('Slug is required');
  }
  const [year, month, day] = slug.split('-');
  const filePath = path.join(diaryDirectory, `${year}/${month}/${year}${month}${day}.md`);
  return filePath;
};

/**
 * 단일 다이어리 파일을 파싱합니다.
 * diary/[id]/page.tsx에서 직접 파싱이 필요한 경우 사용합니다.
 */
export function parseDiaryContent(content: string, filePath: string = 'unknown') {
  const { frontmatter, body } = parseMarkdown(content, DiaryFrontmatterSchema, filePath);
  return {
    meta: frontmatter as DiaryMeta,
    body: body.split('\n'),
  };
}
