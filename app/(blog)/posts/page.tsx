import { getPostList } from '@/libs/Post/GetPostList';
import PostsList from '@/components/PostsPage/PostsList';

export const metadata = {
  title: 'Posts',
  description: 'List of all blog posts',
};

export default async function PostsPage() {
  const posts = await getPostList();

  return (
    <div className="w-full max-w-full md:max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="space-y-4">
        <PostsList posts={posts} postPerPage={5} showPrevNext />
      </div>
    </div>
  );
}
