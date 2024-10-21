import MarkdownRender from "@/components/MarkdownRender/MarkdownRender"
import { readFile } from "fs/promises";
import path from 'path';

const postsDirectory = path.join(process.cwd(), '_posts');
const getPostData = async (fileName: string) => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = await readFile(fullPath, 'utf8');
  return fileContents;
}

interface PostPageProps {
  params: {
    slugs: string[];
  };
}

export default async function PostPage({ params: { slugs }}: PostPageProps) {
  const markdownText = await getPostData(slugs.join('/') + '.md');
  return (
    <div>
      <MarkdownRender markdownText={markdownText} />
    </div>
  );
}