import { z } from 'zod';

// --- Post Frontmatter ---
export const PostFrontmatterSchema = z.object({
  title: z.string().min(1, 'title은 필수입니다'),
  description: z.preprocess(
    val => {
      if (Array.isArray(val)) return val.join(', ');
      return val;
    },
    z.string().default(''),
  ),
  cover: z.string().default(''),
  date: z.preprocess(
    val => {
      if (val instanceof Date) return val.toISOString().split('T')[0];
      return val;
    },
    z.string().min(1, 'date는 필수입니다'),
  ),
  tags: z
    .preprocess(
      val => (typeof val === 'string' ? val.split(',').map(s => s.trim()) : val),
      z.array(z.string()).default([]),
    ),
  series: z.string().default(''),
  seriesIndex: z.number().int().default(-1),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

// --- PostMeta: Frontmatter 그대로 사용 ---
export type PostMeta = PostFrontmatter;

// --- PostData: 빌드 결과물 ---
export interface PostData {
  meta: PostMeta;
  slug: string;
  originalFileName: string;
}

// --- Series ---
export const SeriesFrontmatterSchema = z.object({
  seriesName: z.string().min(1, 'seriesName은 필수입니다'),
  description: z.string().default(''),
});

export type SeriesFrontmatter = z.infer<typeof SeriesFrontmatterSchema>;

export interface SeriesMeta {
  name: string;
  seriesSlug: string;
  description?: string;
}

export interface SeriesSummary {
  name: string;
  seriesSlug: string;
  description?: string;
  slugs: string[];
}
