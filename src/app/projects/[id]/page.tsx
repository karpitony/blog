import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import cn from '@yeahx4/cn';
import MarkdownRender from '@/components/MarkdownRender/MarkdownRender';
import BlogLinkButtons from '@/components/Projects/BlogLinkButtons';

import { getProjectList, getProjectData } from '@/content/project.service';

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

          {/* 블로그 링크 버튼 — 본문 위에 강조 배치 */}
          {hasBlogLinks && (
            <div className="mt-8">
              <BlogLinkButtons blogLinks={meta.blogLinks} />
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
