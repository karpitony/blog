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
      <div className="min-h-[95vh] bg-gradient-to-br from-gray-900 to-black text-gray-100 flex flex-col items-center p-3 md:p-6">
      <div className="w-full max-w-full md:max-w-3xl"> 
      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg border border-gray-700 md:border-none">
      <div className="markdown-body bg-transparent text-gray-100">
      <MarkdownRender markdownText={markdownText} />
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}