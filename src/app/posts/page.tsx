import { Suspense } from 'react';
import { getPostList } from '@/libs/Post/getPostList';
import PostListLayout from '@/layouts/PostListLayout';

export const metadata = {
  title: 'Posts | 글 목록',
  description: 'List of all blog posts in the blog. 블로그에 있는 모든 글 목록.',
  keywords: 'blog, posts, list',
};

export default async function PostsPage() {
  const { posts, series } = await getPostList();

  series.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  });

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-5xl">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <PostListLayout posts={posts} series={series} />
      </Suspense>
    </div>
  );
}
