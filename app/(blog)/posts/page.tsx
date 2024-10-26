import Link from 'next/link';
import { getPostList } from '@/libs/Post/GetPostList';
import PostInfoHeader from '@/components/PostsPage/PostInfoHeader';
import cn from '@yeahx4/cn';

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
        {posts.map(({ meta, slug }) => (
          <Link 
            href={`/posts/${slug}`} 
            key={slug} 
            className={cn(
              "block group relative bg-gray-800 bg-opacity-50 rounded-lg",
              "transition duration-300 hover:bg-opacity-70 hover:shadow-lg hover:shadow-blue-500/10",
              "border border-gray-700 hover:border-blue-500/50"
            )}

          >
            <PostInfoHeader key={slug} meta={meta} />
          </Link>
        ))}
      </div>
    </div>
  );
}
