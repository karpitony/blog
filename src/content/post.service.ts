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
import { processMarkdownFile, processMarkdownFiles } from './pipeline';
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
      seriesMeta = await processMarkdownFile(
        seriesMdPath,
        SeriesFrontmatterSchema,
        frontmatter => ({
          name: frontmatter.seriesName,
          seriesSlug,
          description: frontmatter.description,
        }),
      );
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
  const filePaths = postEntries.map(e => e.filePath);

  const rawPosts = await processMarkdownFiles(
    filePaths,
    PostFrontmatterSchema,
    (frontmatter, _body, filePath) => {
      const fileName = path.basename(path.dirname(filePath));
      const seriesSlug = path.basename(path.dirname(path.dirname(filePath)));
      // cover 경로 변환
      frontmatter.cover = transformCoverPath(frontmatter.cover, seriesSlug, fileName);

      // 폴더명에서 앞의 날짜 패턴(예: 251212-)을 제거하여 slug 생성
      const slug = fileName.replace(/^\d{6}-/, '');

      return {
        meta: frontmatter as PostMeta,
        slug,
        originalFileName: fileName,
      };
    },
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
    return await processMarkdownFile(
      fullPath,
      PostFrontmatterSchema,
      (frontmatter, body, _filePath) => {
        frontmatter.cover = transformCoverPath(frontmatter.cover, targetPost.meta.series, slug);

        return {
          meta: frontmatter as PostMeta,
          body: body.split('\n'),
          originalFileName: targetPost.originalFileName,
        };
      },
    );
  } catch (err) {
    console.error(`파일을 읽는 중 오류 발생: ${fullPath}`, err);
    throw new Error('포스트 파일을 읽을 수 없습니다.');
  }
};

// --- Series Context ---

export interface SeriesPostItem {
  slug: string;
  title: string;
  seriesIndex: number;
}

export interface SeriesContext {
  seriesName: string;
  seriesSlug: string;
  posts: SeriesPostItem[];
  currentIndex: number;
  /** 현재 글 중심 5개 윈도우 (네이버 블로그 스타일) */
  window: SeriesPostItem[];
}

export const getSeriesContext = async (
  seriesSlug: string,
  currentSlug: string,
): Promise<SeriesContext | null> => {
  if (!seriesSlug) return null;

  const { posts, series } = await getPostList();

  const seriesPosts = posts
    .filter(p => p.meta.series === seriesSlug)
    .sort((a, b) => a.meta.seriesIndex - b.meta.seriesIndex)
    .map(p => {
      if (p.meta.draft) return null;
      return {
        slug: p.slug,
        title: p.meta.title,
        seriesIndex: p.meta.seriesIndex,
      };
    })
    .filter(p => p !== null);

  if (seriesPosts.length === 0) return null;

  const currentIndex = seriesPosts.findIndex(p => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const seriesInfo = series.find(s => s.seriesSlug === seriesSlug);

  // 5개 윈도우: 현재 글을 가운데에 배치
  const totalPosts = seriesPosts.length;
  let windowStart: number;

  if (totalPosts <= 5) {
    windowStart = 0;
  } else if (currentIndex <= 2) {
    windowStart = 0;
  } else if (currentIndex >= totalPosts - 3) {
    windowStart = totalPosts - 5;
  } else {
    windowStart = currentIndex - 2;
  }

  const window = seriesPosts.slice(windowStart, windowStart + 5);

  return {
    seriesName: seriesInfo?.name || seriesSlug,
    seriesSlug,
    posts: seriesPosts,
    currentIndex,
    window,
  };
};

// --- Post Nav Context (전체 글 기준) ---

export interface PostNavContext {
  posts: SeriesPostItem[];
  currentIndex: number;
}

export const getPostNavContext = async (currentSlug: string): Promise<PostNavContext> => {
  const { posts } = await getPostList();
  // posts는 날짜 내림차순 정렬 (최신이 먼저)
  const allPosts: SeriesPostItem[] = posts
    .map((p, i) => {
      if (p.meta.draft) return null;
      return {
        slug: p.slug,
        title: p.meta.title,
        seriesIndex: i,
      };
    })
    .filter(p => p !== null);

  const currentIndex = allPosts.findIndex(p => p.slug === currentSlug);

  return { posts: allPosts, currentIndex: Math.max(currentIndex, 0) };
};
