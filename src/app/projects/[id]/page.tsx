import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import cn from '@yeahx4/cn';
import MarkdownRender from '@/components/MarkdownRender';
import BlogLinkButtons, { type ResolvedBlogLink } from '@/components/Projects/BlogLinkButtons';
import { getProjectList, getProjectData } from '@/content/project.service';
import { getPostList } from '@/content/post.service';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const { projects } = await getProjectList();
  return projects.map(project => ({ id: project.slug }));
}

export default async function ProjectsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { meta, body } = await getProjectData(id);

  const hasBody = body.some(line => line.trim().length > 0);
  const hasBlogLinks = meta.blogLinks && meta.blogLinks.length > 0;

  // blogLinks 슬러그를 기반으로 포스트 메타데이터 resolve
  let resolvedBlogLinks: ResolvedBlogLink[] = [];
  if (hasBlogLinks) {
    const { posts } = await getPostList();
    // Map을 사용해 O(n+m) 조회
    const postMap = new Map(posts.map(p => [p.slug, p]));
    resolvedBlogLinks = meta.blogLinks
      .map(slug => {
        const cleanSlug = slug.replace(/^\/posts\//, '');
        const slugSegment = cleanSlug.split('/').pop() || cleanSlug;
        const post = postMap.get(slugSegment);
        if (!post) return null;
        return {
          slug: post.slug,
          title: post.meta.title,
          cover: post.meta.cover,
          description: post.meta.description,
          date: post.meta.date,
          series: post.meta.series,
        };
      })
      .filter((link): link is ResolvedBlogLink => link !== null);
  }

  return (
    <>
      <div className="w-full mx-auto max-w-full md:max-w-3xl relative">
        <Link href="/projects">
          <p
            className={cn(
              'inline-flex items-center text-blue-400 hover:text-blue-300',
              'transition-colors duration-200 mb-3 md:mb-6',
            )}
          >
            <FiArrowLeft className="mr-1 w-6 h-6" />
            Back to Projects
          </p>
        </Link>
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

          {/* 블로그 링크 카드 — 본문 위에 강조 배치 */}
          {resolvedBlogLinks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">관련 블로그 글</h3>
              <BlogLinkButtons blogLinks={resolvedBlogLinks} />
            </div>
          )}

          {/* 마크다운 본문 (과도기 혼합 모드: blogLinks와 함께 표시 가능) */}
          {hasBody && (
            <>
              <div className={cn('mt-12 md:mt-18')}></div>
              <MarkdownRender
                markdownText={body.join('\n')}
                projectSlug={meta.slug}
                renderType="PROJECT"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
