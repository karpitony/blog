import { getPostList } from "@/libs/Post/getPostList";
import { getProjectList } from "@/libs/Project/getProjectList";
import Link from 'next/link';
import SimpleAboutMe from "@/components/common/SimpleAboutMe";
import ProjectCard from "@/components/Projects/ProjectCard";
import PostInfoHeader from "@/components/PostsPage/PostInfoHeader";
import ArrowButton from "@/components/common/ArrowButton";
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
  projects.splice(2);

  return (
    <div className="w-full max-w-full md:max-w-3xl min-h-[90vh]">
      <div className="px-2">
        <SimpleAboutMe />
        <ArrowButton text="자세히 보기" href="/about" />
      </div>
      <hr className="border-t-2 py-4 mt-8"/>

      {/* 최신 게시글 리스트 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">최신 글</h2>
        {/* 게시글 리스트 */}
        <div className="flex flex-col grow">
          {posts.map(({ meta, slug }) => (
            <Link 
              href={`/posts/${slug}`} 
              key={slug} 
              className={cn(
                "block group relative bg-gray-900 bg-opacity-50 rounded-lg",
                "transition duration-300 hover:bg-opacity-70 hover:shadow-lg hover:shadow-white/20",
                "border border-gray-700 hover:border-white/50",
                "mb-4"
              )}
            >
              <PostInfoHeader key={slug} meta={meta} />
            </Link>
          ))}
        </div>

        <ArrowButton text="게시글 더보기" href="/posts" />
      </div>
      <hr className="border-t-2 py-4 mt-8"/>

      {/* 프로젝트 리스트 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">프로젝트</h2>
        <div className="mt-8 mb-4 flex flex-col gap-8 md:grid md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              meta={project.meta}
            />
          ))}
        </div>

        <ArrowButton text="프로젝트 더보기" href="/projects" />
      </div>
    </div>
  );
}