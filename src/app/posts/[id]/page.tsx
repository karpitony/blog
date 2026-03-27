import Link from 'next/link';
import {
  getPostList,
  getPostData,
  getSeriesContext,
  getPostNavContext,
} from '@/content/post.service';
import { FiArrowLeft } from 'react-icons/fi';
import MarkdownRender from '@/components/MarkdownRender';
import TableOfContent from '@/components/MarkdownRender/TableOfContent';
import Comments from '@/components/PostsPage/Comments';
import SeriesNav from '@/components/PostsPage/SeriesNav';
import PostNav from '@/components/PostsPage/PostNav';
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
  const { meta, body, originalFileName } = await getPostData(id);
  const seriesContext = meta.series ? await getSeriesContext(meta.series, id) : null;
  const postNavContext = await getPostNavContext(id);

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
              'tracking-tight  leading-12 md:leading-16',
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
          {/* 시리즈 헤더 (제목 아래, 접혀있는 전체 목록) */}
          {seriesContext && <SeriesNav context={seriesContext} variant="header" />}
        </div>
        <div className={cn('mt-12 md:mt-18')}>
          <MarkdownRender
            markdownText={body.join('\n')}
            postTitle={originalFileName}
            series={meta.series}
            renderType="POST"
          />
          {/* 시리즈 네비게이션 (글 아래, 페이지네이션) */}
          {seriesContext && <SeriesNav context={seriesContext} variant="footer" />}
          {/* 전체 글 네비게이션 */}
          <PostNav context={postNavContext} />
          <Comments />
        </div>
        <TableOfContent content={body.join('\n')} />
      </div>
    </>
  );
}
