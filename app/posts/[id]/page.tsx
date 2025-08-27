import Link from 'next/link';
import { getPostList, getPostData } from '@/libs/Post/getPostList';
import { FiArrowLeft } from 'react-icons/fi';
import MarkdownRender from '@/components/MarkdownRender/MarkdownRender';
import TableOfContent from '@/components/MarkdownRender/TableOfContent';
import Comments from '@/components/PostsPage/Comments';
import cn from '@yeahx4/cn';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { posts } = await getPostList();
  return posts.map(post => ({ id: post.slug }));
}

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  const { meta: metaData } = await getPostData(id);

  return {
    title: metaData.title || 'Not Found',
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

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const { meta, body } = await getPostData(id);
  return (
    <>
      <div className="w-full mx-auto max-w-full md:max-w-3xl relative">
        <Link href="/posts">
          <p
            className={cn(
              'inline-flex items-center text-blue-400 hover:text-blue-300',
              'transition-colors duration-200 mb-3 md:mb-6',
            )}
          >
            <FiArrowLeft className="mr-1 w-6 h-6" />
            Back to Posts
          </p>
        </Link>
        {/* Post Info and Article */}
        <div>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold text-black dark:text-white',
              'tracking-tight',
            )}
          >
            {meta.title}
          </h2>
          <p className={cn('text-gray-500 dark:text-gray-400 mt-6', 'text-base md:text-lg')}>
            {meta.description}
          </p>
          <div className="flex w-full justify-between items-center">
            <p className={cn('text-gray-500 dark:text-gray-400 mt-2', 'text-sm md:text-base')}>
              {meta.date}
            </p>
            <p className={cn('text-gray-500 dark:text-gray-400 mt-2', 'text-sm md:text-base')}>
              {meta.series ? `${meta.series}` : 'No Series'}
            </p>
          </div>
        </div>
        <div className={cn('mt-12 md:mt-18')}>
          <MarkdownRender
            markdownText={body.join('\n')}
            postTitle={id}
            series={meta.series}
            renderType="POST"
          />
          <Comments />
        </div>
        <TableOfContent content={body.join('\n')} />
      </div>
    </>
  );
}
