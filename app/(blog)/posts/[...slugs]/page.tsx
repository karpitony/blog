import path from 'path';
import Link from 'next/link';
import { readFile } from "fs/promises";
import { parsePost, PostMeta } from '@/libs/Post/postMetaDataParser';
import { getPostList } from '@/libs/Post/getPostList';
import { FiArrowLeft } from "react-icons/fi";
import PostInfoHeader from "@/components/PostsPage/PostInfoHeader";
import MarkdownRender from "@/components/MarkdownRender/MarkdownRender";
import TableOfContent from '@/components/MarkdownRender/TableOfContent';
import cn from '@yeahx4/cn';

const postsDirectory = path.join(process.cwd(), '_posts');

export async function generateStaticParams() {
  const posts = await getPostList();
  const slugs = posts.map(post => post.slug);
  return slugs.map(slug => ({
    slugs: slug.split(path.sep),
  }));
}

interface PostPageProps {
  params: Promise<{
    slugs: string[];
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slugs } = await params;
  const { meta: metaData } = await getPostData(slugs.join('/') + '.md');
  
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

export default async function PostPage({ params }: PostPageProps) {
  const { slugs } = await params;
  const { meta, body } = await getPostData(slugs.join('/') + '.md');
  
  return (
    <>
      <div className="w-full mx-auto max-w-full md:max-w-3xl relative">
        <Link href="/posts">
          <p 
            className={cn(
              "inline-flex items-center text-blue-400 hover:text-blue-300",
              "transition-colors duration-200 mb-3 md:mb-6"
            )}
          >
            <FiArrowLeft className="mr-1 w-6 h-6"/>
            Back to Posts
          </p>
        </Link>
        {/* Post Info and Article */}
        <div>
          <PostInfoHeader meta={meta} />
        </div>
        <div className={cn(
          "bg-gray-900 bg-opacity-50 rounded-lg p-4 md:p-8 shadow-lg", 
          "border border-gray-700 md:border-none mt-4"
        )}>
          <MarkdownRender markdownText={body.join("\n")} />
        </div>
        <TableOfContent content={body.join("\n")} />
      </div>
    </>
  );
}