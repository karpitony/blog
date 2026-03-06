import path from 'path';
import fs from 'fs/promises';
import {
  PostFrontmatterSchema,
  SeriesFrontmatterSchema,
  type PostMeta,
  type PostData,
  type SeriesMeta,
  type SeriesSummary,
} from './schemas/post.schema';
import { parseMarkdown } from './parser';
import { readJsonPublic } from '@/libs/jsonPublicCache';

const postsDirectory = path.join(process.cwd(), 'contents/posts');

// --- Internal Types ---

interface PostFile {
  filePath: string;
  fileName: string;
  seriesDir: string;
  seriesSlug: string;
}

interface SeriesInfo {
  seriesSlug: string;
  seriesDir: string;
  seriesMeta: SeriesMeta;
}

// --- File Discovery ---

async function getAllContentMarkdownFiles(): Promise<{
  PostFiles: PostFile[];
  seriesInfos: SeriesInfo[];
}> {
  const seriesDirs = await fs.readdir(postsDirectory, { withFileTypes: true });

  const postFiles: PostFile[] = [];
  const seriesInfos: SeriesInfo[] = [];

  for (const seriesEntry of seriesDirs) {
    if (!seriesEntry.isDirectory()) continue;

    const seriesSlug = seriesEntry.name;
    const seriesDir = path.join(postsDirectory, seriesSlug);
    const posts = await fs.readdir(seriesDir, { withFileTypes: true });

    // 시리즈 메타 정보 읽기
    const seriesMdPath = path.join(seriesDir, 'series.md');
    let seriesMeta: SeriesMeta;
    try {
      const seriesMdContent = await fs.readFile(seriesMdPath, 'utf-8');
      const { frontmatter } = parseMarkdown(seriesMdContent, SeriesFrontmatterSchema, seriesMdPath);
      seriesMeta = {
        name: frontmatter.seriesName,
        seriesSlug,
        description: frontmatter.description,
      };
    } catch {
      console.warn(`No series meta found for ${seriesSlug}`);
      seriesMeta = {
        name: seriesSlug,
        seriesSlug,
        description: '',
      };
    }
    seriesInfos.push({ seriesSlug, seriesDir, seriesMeta });

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

  return { PostFiles: postFiles, seriesInfos };
}

// --- Transformers ---

function transformCoverPath(cover: string, series: string, postTitle: string): string {
  if (cover.startsWith('./')) {
    return `/contents/posts/${series}/${postTitle}/${cover.slice(2)}`;
  }
  return cover;
}

// --- Public API ---

export async function generatePostList(): Promise<{
  posts: PostData[];
  series: SeriesSummary[];
}> {
  const { PostFiles: postEntries, seriesInfos } = await getAllContentMarkdownFiles();

  const rawPosts = await Promise.all(
    postEntries.map(async ({ filePath, fileName, seriesSlug }) => {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { frontmatter } = parseMarkdown(fileContents, PostFrontmatterSchema, filePath);

      // cover 경로 변환
      frontmatter.cover = transformCoverPath(frontmatter.cover, seriesSlug, fileName);

      // 폴더명에서 앞의 날짜 패턴(예: 251212-)을 제거하여 slug 생성
      const slug = fileName.replace(/^\d{6}-/, '');

      return {
        meta: frontmatter as PostMeta,
        slug,
        originalFileName: fileName,
      };
    }),
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

  // 시리즈별로 포스트를 그룹화
  const seriesMap = new Map<string, string[]>();

  posts.forEach(post => {
    const seriesName = post.meta.series;
    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }
    seriesMap.get(seriesName)!.push(post.slug);
  });

  const series: SeriesSummary[] = Array.from(seriesMap, ([name, slugs]) => {
    const info = seriesInfos.find(s => s.seriesMeta.seriesSlug === name);
    return {
      name: info?.seriesMeta.name || '',
      seriesSlug: info?.seriesMeta.seriesSlug || name,
      description: info?.seriesMeta.description || '',
      slugs,
    };
  });

  return { posts, series };
}

export const getPostList = async (): Promise<{ posts: PostData[]; series: SeriesSummary[] }> => {
  const cached = await readJsonPublic<{ posts: PostData[]; series: SeriesSummary[] }>(
    'postList.json',
  );
  if (cached) return cached;

  return generatePostList();
};

export const getPostData = async (
  slug: string,
): Promise<{
  meta: PostMeta;
  body: string[];
  originalFileName: string;
}> => {
  let cachedData = await readJsonPublic<{ posts: PostData[]; series: SeriesSummary[] }>(
    'postList.json',
  );
  if (!cachedData || !cachedData.series) {
    cachedData = await generatePostList();
  }
  const { posts } = cachedData;

  const targetPost = posts.find(p => p.slug === slug);

  if (!targetPost) {
    throw new Error(`해당 slug를 찾을 수 없습니다: ${slug}`);
  }

  const fullPath = path.join(
    postsDirectory,
    targetPost.meta.series,
    targetPost.originalFileName,
    'content.md',
  );

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { frontmatter, body } = parseMarkdown(fileContents, PostFrontmatterSchema, fullPath);

    frontmatter.cover = transformCoverPath(frontmatter.cover, targetPost.meta.series, slug);

    return {
      meta: frontmatter as PostMeta,
      body: body.split('\n'),
      originalFileName: targetPost.originalFileName,
    };
  } catch (err) {
    console.error(`파일을 읽는 중 오류 발생: ${fullPath}`, err);
    throw new Error('포스트 파일을 읽을 수 없습니다.');
  }
};
