import { getPostList } from '@/libs/Post/getPostList';
import { getProjectList } from '@/libs/Project/getProjectList';
import SimpleAboutMe from '@/components/common/SimpleAboutMe';
import ArrowButton from '@/components/common/ArrowButton';
import Card from '@/components/common/Card';
import PostInfoHeader from '@/components/PostsPage/PostInfoHeader';
import Link from 'next/link';
import cn from '@yeahx4/cn';

export default async function Home() {
  const { posts } = await getPostList();
  posts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
  posts.splice(3);

  const { projects } = await getProjectList();
  projects.sort((a, b) => {
    return a.meta.index - b.meta.index;
  });
  projects.splice(3);

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-5xl min-h-[90vh] text-black dark:text-gray-100">
      <div className="w-full flex justify-center">
        <div className="px-2 mb-12 py-4 md:py-10 w-full max-w-full md:max-w-3xl" id="about">
          <SimpleAboutMe />
          <ArrowButton text="자세히 보기" href="/about" />
        </div>
      </div>
      <hr className="border-t-2 py-4 mt-8 border-gray-800 dark:border-white" />

      {/* 최신 게시글 리스트 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">최신 글</h2>
        {/* 게시글 리스트 */}
        <div className="hidden mt-8 mb-4 gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ meta, slug }) => (
            <Card
              key={slug}
              type="post"
              slug={slug}
              thumbnail={meta.cover}
              title={meta.title}
              description={meta.description}
              date={meta.date}
              tags={meta.tags}
            />
          ))}
        </div>
        <div className="flex md:hidden flex-col grow">
          {posts.map(({ meta, slug }) => (
            <Link
              href={`/posts/${slug}`}
              key={slug}
              className={cn(
                'block group relative bg-gray-900 bg-opacity-50 rounded-lg',
                'transition duration-300 hover:bg-opacity-70 hover:shadow-lg hover:shadow-white/20',
                'border border-gray-700 hover:border-white/50',
                'mb-4',
              )}
            >
              <PostInfoHeader key={slug} meta={meta} />
            </Link>
          ))}
        </div>

        <ArrowButton text="게시글 더보기" href="/posts" />
      </div>
      <hr className="border-t-2 py-4 mt-8 border-gray-800 dark:border-white" />

      {/* 프로젝트 리스트 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">프로젝트</h2>
        <div className="mt-8 mb-4 flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <Card
              key={project.slug}
              type="project"
              slug={project.slug}
              thumbnail={project.meta.thumbnail}
              title={project.meta.title}
              description={project.meta.description}
              date={project.meta.date}
              tags={project.meta.tags}
            />
          ))}
        </div>

        <ArrowButton text="프로젝트 더보기" href="/projects" />
      </div>
    </div>
  );
}
