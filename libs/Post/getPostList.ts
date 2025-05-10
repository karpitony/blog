import path from 'path';
import fs, { readFile } from 'fs/promises';
import { parsePost  } from '@/libs/Post/metaDataParser';
import { readJsonPublic } from '@/libs/jsonPublicCache';
import { PostMeta, PostData, SeriesSummary } from "@/types/post";

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

export async function generatePostList(): Promise<{ 
  posts: PostData[];
  series: SeriesSummary[]
}> {
  const postEntries = await getAllContentMarkdownFiles();

  const rawPosts = await Promise.all(
    postEntries.map(async ({ filePath, fileName, seriesSlug }) => {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const parsed = parsePost(fileContents, fileName, seriesSlug);
      if (!parsed) return null;
      const slug = fileName;

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

  // 시리즈별로 포스트를 그룹화
  const seriesMap = new Map<string, string[]>();
  
  posts.forEach(post => {
    const seriesName = post.meta.series;
    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }
    seriesMap.get(seriesName)!.push(post.slug);
  });

  const series = Array.from(seriesMap, ([name, slugs]) => ({ 
    name, 
    slugs 
  }));

  return { posts, series };
}

export const getPostList = async (): Promise<{ posts: PostData[]; series: SeriesSummary[] }> => {
  const cached = await readJsonPublic<{ posts: PostData[]; series: SeriesSummary[] }>('postList.json');
  if (cached) return cached;

  return generatePostList();
};

export const getPostData = async (
  slug: string
): Promise<{ 
  meta: PostMeta; 
  body: string[] 
}> => {
  let cachedData = await readJsonPublic<{ posts: PostData[]; series: SeriesSummary[] }>('postList.json');
  if (!cachedData || !cachedData.series) {
    cachedData = await generatePostList();
  }
  const { series } = cachedData;

  const seriesEntry = series.find(s => s.slugs.includes(slug));
  const filePath = seriesEntry ? seriesEntry.name : undefined;
  if (!filePath || !seriesEntry) {
    console.error(`filePath: ${filePath}, seriesEntry: ${seriesEntry}`);
    throw new Error(`해당 slug를 포함한 시리즈를 찾을 수 없습니다: ${slug}`);
  }

  const fullPath = path.join(postsDirectory, filePath, slug, 'content.md');
  const fileContents = await readFile(fullPath, 'utf8');
  const { meta, body } = parsePost(fileContents, slug, seriesEntry.name);
  
  return { meta, body };
};
