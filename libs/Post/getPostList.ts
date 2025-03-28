import path from 'path';
import fs from 'fs/promises';
import { parsePost, PostMeta } from '@/libs/Post/postMetaDataParser';
import { readJsonPublic } from '@/libs/jsonPublicCache';

export interface PostData {
  meta: PostMeta;
  slug: string;
}

const postsDirectory = path.join(process.cwd(), '_posts');

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllMarkdownFiles(res);
      } else if (entry.isFile() && path.extname(entry.name) === '.md') {
        return res;
      } else {
        return null;
      }
    })
  );
  return files.flat().filter((f): f is string => f !== null);
}

export async function generatePostList(): Promise<PostData[]> {
  const markdownFiles = await getAllMarkdownFiles(postsDirectory);

  const posts = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { meta } = parsePost(fileContents);
      const relativePath = path.relative(postsDirectory, filePath);
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
      return { meta, slug };
    })
  );

  posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
  return posts;
}

export const getPostList = async (): Promise<PostData[]> => {
  const cached = await readJsonPublic<PostData[]>('postList.json');
  if (cached) return cached;

  const posts = await generatePostList();
  return posts;
};
