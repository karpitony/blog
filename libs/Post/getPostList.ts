import path from 'path';
import fs, { readFile } from 'fs/promises';
import { parsePost, PostMeta } from '@/libs/Post/postMetaDataParser';
import { readJsonPublic } from '@/libs/jsonPublicCache';

export interface PostData {
  meta: PostMeta;
  slug: string;
}

export interface SeriesSummary {
  name: string;
  slug: string;
}

const postsDirectory = path.join(process.cwd(), 'contents/posts');

async function getAllContentMarkdownFiles(): Promise<{ 
  filePath: string; 
  fileName: string;
  seriesDir: string; 
  seriesSlug: string 
}[]> {
  const seriesDirs = await fs.readdir(postsDirectory, { withFileTypes: true });

  const postFiles: { 
    filePath: string;
    fileName: string;
    seriesDir: string; 
    seriesSlug: string 
  }[] = [];

  for (const seriesEntry of seriesDirs) {
    if (!seriesEntry.isDirectory()) continue;

    const seriesSlug = seriesEntry.name;
    const seriesDir = path.join(postsDirectory, seriesSlug);
    const posts = await fs.readdir(seriesDir, { withFileTypes: true });

    for (const postEntry of posts) {
      if (!postEntry.isDirectory()) continue;

      const contentPath = path.join(seriesDir, postEntry.name, 'content.md');
      try {
        await fs.access(contentPath);
        postFiles.push({ filePath: contentPath, seriesDir, seriesSlug, fileName: postEntry.name });
      } catch {
        continue;
      }
    }
  }

  return postFiles;
}

export async function generatePostList(): Promise<{ posts: PostData[]; series: SeriesSummary[] }> {
  const postEntries = await getAllContentMarkdownFiles();

  const rawPosts = await Promise.all(
    postEntries.map(async ({ filePath, fileName, seriesSlug }) => {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const parsed = parsePost(fileContents, fileName, seriesSlug);
      if (!parsed) return null;

      const relativePath = path.relative(postsDirectory, filePath);
      const slug = relativePath.replace(/\/content\.md$/, '').replace(/\\/g, '/');

      return {
        meta: parsed.meta,
        slug,
      };
    })
  );

  const posts: PostData[] = rawPosts
  .filter((post): post is PostData => post !== null)
  .filter(post => {
    if (process.env.NODE_ENV === 'production') {
      return !post.meta.draft;
    } else {
      if (post.meta.draft && !post.meta.title.startsWith('(초고)')) {
        post.meta.title = `(초고) ${post.meta.title}`;
      }
      return true;
    }
  });
  posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

  const seen = new Set<string>();
  const series: SeriesSummary[] = posts
    .map((post) => {
      const { series } = post.meta;
      const seriesSlug = post.slug.split('/')[0]; // 시리즈 폴더명
      return { name: series, slug: seriesSlug };
    })
    .filter(({ slug }) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });

  return { posts, series };
}

export const getPostList = async (): Promise<{ posts: PostData[]; series: SeriesSummary[] }> => {
  const cached = await readJsonPublic<{ posts: PostData[]; series: SeriesSummary[] }>('postList.json');
  if (cached) return cached;

  return generatePostList();
};

export const getPostData = async (fileName: string, ): Promise<{ meta: PostMeta; body: string[] }> => {
  const fullPath = path.join(postsDirectory, fileName, 'content.md');
  const fileContents = await readFile(fullPath, 'utf8');
  const { meta, body } = parsePost(fileContents, fileName.split('/').pop() || '', fileName.split('/')[0]);
  
  return { meta, body };
};
