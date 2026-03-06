import { z } from 'zod';

export const ProjectFrontmatterSchema = z.object({
  index: z
    .preprocess(val => (typeof val === 'string' ? parseInt(val, 10) : val), z.number().int())
    .default(999),
  title: z.string().min(1, 'title은 필수입니다'),
  thumbnail: z.string().default(''),
  date: z.string().min(1, 'date는 필수입니다'),
  status: z
    .preprocess(
      val => (typeof val === 'string' ? val.toUpperCase() : val),
      z.enum(['ACTIVE', 'MAINTENANCE', 'INACTIVE']),
    )
    .default('INACTIVE'),
  tags: z
    .preprocess(
      val => (typeof val === 'string' ? val.split(',').map(s => s.trim()) : val),
      z.array(z.string()).default([]),
    ),
  description: z.string().default(''),
  githubLink: z.string().nullable(),
  demoLink: z.string().nullable(),
  videoLink: z.string().nullable(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

export interface ProjectData {
  meta: ProjectMeta;
  slug: string;
}

export interface ProjectJson {
  projects: ProjectData[];
  tags: string[];
}
