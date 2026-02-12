import path from 'path';
import fs, { readFile } from 'fs/promises';
import { parsePost, parseSeries } from '@/libs/Post/metaDataParser';
import { readJsonPublic } from '@/libs/jsonPublicCache';
import { PostMeta, PostData, SeriesMeta, SeriesSummary } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'contents/posts');

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
    let seriesMeta: SeriesInfo['seriesMeta'] | undefined = undefined;
    try {
      const seriesMdContent = await fs.readFile(seriesMdPath, 'utf-8');
      const { meta } = parseSeries(seriesMdContent, seriesSlug);
      seriesMeta = meta;
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

export async function generatePostList(): Promise<{
  posts: PostData[];
  series: SeriesSummary[];
}> {
  const { PostFiles: postEntries, seriesInfos } = await getAllContentMarkdownFiles();

  const rawPosts = await Promise.all(
    postEntries.map(async ({ filePath, fileName, seriesSlug }) => {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const parsed = parsePost(fileContents, fileName, seriesSlug);
      if (!parsed) return null;

      // 변경: 폴더명(fileName)에서 앞의 날짜 패턴(예: 251212-)을 제거하여 slug 생성
      // 251212-eng-name -> eng-name
      const slug = fileName.replace(/^\d{6}-/, '');

      return {
        meta: parsed.meta,
        slug, // URL로 쓰일 이름 (eng-name)
        originalFileName: fileName, // 실제 폴더명 (251212-eng-name)
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

  // 2. 가공된 slug로 해당 포스트 데이터 찾기
  const targetPost = posts.find(p => p.slug === slug);

  if (!targetPost) {
    throw new Error(`해당 slug를 찾을 수 없습니다: ${slug}`);
  }

  // 3. targetPost에 저장된 originalFileName과 series 정보를 이용해 경로 조립
  // targetPost.meta.series는 seriesSlug와 동일함
  const fullPath = path.join(
    postsDirectory,
    targetPost.meta.series,
    targetPost.originalFileName, // ✅ 날짜가 포함된 실제 폴더명 사용
    'content.md',
  );

  try {
    const fileContents = await readFile(fullPath, 'utf8');
    // parsePost에 넘길 때도 원래는 fileName을 넘겼으나,
    // 여기서는 일관성을 위해 slug를 넘기거나 상황에 맞춰 조절하세요.
    const { meta, body } = parsePost(fileContents, slug, targetPost.meta.series);
    return { meta, body, originalFileName: targetPost.originalFileName };
  } catch (err) {
    console.error(`파일을 읽는 중 오류 발생: ${fullPath}`, err);
    throw new Error('포스트 파일을 읽을 수 없습니다.');
  }
};
