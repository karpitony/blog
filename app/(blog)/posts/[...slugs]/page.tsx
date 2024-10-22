import MarkdownRender from "@/components/MarkdownRender/MarkdownRender"
import { readFile } from "fs/promises";
import path from 'path';
import { parsePost, PostMeta } from '@/libs/Post/PostMetadataParser';
import PostInfoHeader from "@/components/PostsPage/PostInfoHeader";

const postsDirectory = path.join(process.cwd(), '_posts');
const getPostData = async (fileName: string): Promise<{ meta: PostMeta; body: string[] }> => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = await readFile(fullPath, 'utf8');
  const { meta, body } = parsePost(fileContents);
  
  return { meta, body };
};

interface PostPageProps {
  params: {
    slugs: string[];
  };
}

export default async function PostPage({ params: { slugs }}: PostPageProps) {
  const { meta, body } = await getPostData(slugs.join('/') + '.md');
  
  return (
    <>
      <div className="w-full max-w-full md:max-w-3xl">
        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg border border-gray-700 md:border-none">
          <PostInfoHeader meta={meta} />
          { /* 게시글 내용 */ }
          <div className="markdown-body bg-transparent text-gray-100">
            <MarkdownRender markdownText={body.join("\n")} />
          </div>
        </div>
      </div>
    </>
  );
}