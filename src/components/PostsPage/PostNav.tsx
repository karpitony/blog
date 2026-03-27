import NavPostList from './NavPostList';
import type { PostNavContext } from '@/content/post.service';

interface PostNavProps {
  context: PostNavContext;
}

export default function PostNav({ context }: PostNavProps) {
  const { posts, currentIndex } = context;

  if (posts.length === 0) return null;

  return (
    <div className="mb-4">
      <NavPostList
        posts={posts}
        currentIndex={currentIndex}
        label="📝 전체 글"
      />
    </div>
  );
}
