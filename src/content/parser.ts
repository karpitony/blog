import matter from 'gray-matter';
import { ZodSchema, ZodError } from 'zod';

/**
 * YAML 파서가 오해할 수 있는 frontmatter 값들을 전처리
 * ex) `description: [텍스트] 나머지` → YAML이 [...]를 배열로 파싱하는 문제 방지
 */
function preprocessFrontmatter(content: string): string {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return content;

  const frontmatter = match[1];
  const processed = frontmatter.replace(
    /^(\s*\w+:\s*)(\[.+\].+)$/gm,
    (_, key, value) => `${key}"${value.replace(/"/g, '\\"')}"`,
  );

  return content.replace(match[1], processed);
}

/**
 * Zod 에러를 사람이 읽기 쉬운 형태로 포맷팅
 */
function formatZodError(error: ZodError, filePath: string): string {
  const issues = error.issues
    .map(issue => {
      const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
      return `  - [${path}] ${issue.message}`;
    })
    .join('\n');

  return `\n❌ Frontmatter 검증 실패: ${filePath}\n${issues}\n`;
}

/**
 * 마크다운 파일을 파싱하고 Zod 스키마로 frontmatter를 검증합니다.
 *
 * @param content - 마크다운 파일 원본 문자열
 * @param schema - frontmatter 검증용 Zod 스키마
 * @param filePath - 에러 메시지에 표시할 파일 경로
 * @returns 검증된 frontmatter와 body 문자열
 * @throws Zod 검증 실패 시 명확한 에러 메시지와 함께 throw
 */
export function parseMarkdown<T>(
  content: string,
  schema: ZodSchema<T>,
  filePath: string,
): { frontmatter: T; body: string } {
  const preprocessed = preprocessFrontmatter(content);
  const { data, content: body } = matter(preprocessed);

  const result = schema.safeParse(data);
  if (!result.success) {
    const formatted = formatZodError(result.error, filePath);
    console.error(formatted);
    throw new Error(formatted);
  }

  return { frontmatter: result.data, body };
}
