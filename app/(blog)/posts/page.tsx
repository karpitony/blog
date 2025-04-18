import { getPostList } from '@/libs/Post/getPostList';
import PostsList from '@/components/PostsPage/PostsList';

export const metadata = {
  title: 'Posts | 글 목록',
  description: 'List of all blog posts in the blog. 블로그에 있는 모든 글 목록.',
  keywords: 'blog, posts, list',
};

export default async function PostsPage() {
  const { posts } = await getPostList();

  return (
    <div className="w-full max-w-full md:max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="space-y-4">
        <PostsList posts={posts} postPerPage={5} showPrevNext />
      </div>
    </div>
  );
}
