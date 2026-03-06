import { z } from 'zod';

export const DiaryFrontmatterSchema = z.object({
  title: z.string().min(1, 'title은 필수입니다'),
  description: z.preprocess(
    val => {
      if (Array.isArray(val)) return val.join(', ');
      return val;
    },
    z.string().nullable(),
  ),
  cover: z.string().nullable(),
  date: z.preprocess(
    val => {
      if (val instanceof Date) return val.toISOString().split('T')[0];
      return val;
    },
    z.string().min(1, 'date는 필수입니다'),
  ),
});

export type DiaryFrontmatter = z.infer<typeof DiaryFrontmatterSchema>;

export type DiaryMeta = DiaryFrontmatter;

export interface DiaryData {
  meta: DiaryMeta;
  slug: string;
}
