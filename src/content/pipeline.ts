import fs from 'fs/promises';
import { ZodSchema } from 'zod';
import { parseMarkdown } from './parser';

/**
 * 단일 마크다운 파일을 읽고 → 파싱 → 검증 → 변환하는 파이프라인
 *
 * @param filePath - 마크다운 파일 절대 경로
 * @param schema - frontmatter Zod 스키마
 * @param transform - 검증된 frontmatter와 body를 최종 데이터로 변환하는 함수
 * @returns 변환된 최종 데이터
 */
export async function processMarkdownFile<TFrontmatter, TResult>(
  filePath: string,
  schema: ZodSchema<TFrontmatter>,
  transform: (frontmatter: TFrontmatter, body: string, filePath: string) => TResult,
): Promise<TResult> {
  const content = await fs.readFile(filePath, 'utf-8');
  const { frontmatter, body } = parseMarkdown(content, schema, filePath);
  return transform(frontmatter, body, filePath);
}

/**
 * 여러 마크다운 파일을 배치로 처리하는 파이프라인
 */
export async function processMarkdownFiles<TFrontmatter, TResult>(
  filePaths: string[],
  schema: ZodSchema<TFrontmatter>,
  transform: (frontmatter: TFrontmatter, body: string, filePath: string) => TResult,
): Promise<TResult[]> {
  return Promise.all(filePaths.map(fp => processMarkdownFile(fp, schema, transform)));
}
