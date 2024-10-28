import path from 'path';
import Link from 'next/link';
import { readFile } from "fs/promises";
import { parsePost, PostMeta } from '@/libs/Post/PostMetadataParser';
import { FaHome } from "react-icons/fa";
import PostInfoHeader from "@/components/PostsPage/PostInfoHeader";
import MarkdownRender from "@/components/MarkdownRender/MarkdownRender";
import TableOfContent from '@/components/MarkdownRender/TableOfContent';

interface PostPageProps {
  params: {
    slugs: string[];
  };
}

const postsDirectory = path.join(process.cwd(), '_posts');

export async function generateMetadata({ params: { slugs }}: PostPageProps) {
  const { meta:metaData } = await getPostData(slugs.join('/') + '.md');
  
  return {
    title: metaData.title || "Not Found",
    description: metaData.description,
    keywords: metaData.tags,
    openGraph: {
      title: metaData.title,
      images: {
        url: `${metaData.cover}`,
        alt: metaData.title,
        width: 700,
        height: 350,
      },
    },
  };
}

const getPostData = async (fileName: string): Promise<{ meta: PostMeta; body: string[] }> => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = await readFile(fullPath, 'utf8');
  const { meta, body } = parsePost(fileContents);
  
  return { meta, body };
};

export default async function PostPage({ params: { slugs }}: PostPageProps) {
  const { meta, body } = await getPostData(slugs.join('/') + '.md');
  
  return (
    <>
      <div className="w-full max-w-full md:max-w-3xl">
        <Link 
          href="/posts" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-3 md:mb-6"
        >
          <FaHome className="mr-2 w-6 h-6"/>
          Back to Posts
        </Link>
        {/* Post Info and Article */}
        <div>
          <PostInfoHeader meta={meta} />
        </div>
        <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg border border-gray-700 md:border-none mt-4">
          <div className="markdown-body bg-transparent text-gray-100">
            <MarkdownRender markdownText={body.join("\n")} />
          </div>
        </div>
      </div>
      
      {/* Table of Contents */}
      <div className="hidden 2xl:block fixed top-1/2 right-8 transform -translate-y-1/2">
        <TableOfContent content={body.join("\n")} />
      </div>
    </>
  );
}