import Link from 'next/link';
import Image from 'next/image';
import cn from '@yeahx4/cn';

export interface ResolvedBlogLink {
  slug: string;
  title: string;
  cover: string;
  description: string;
  date: string;
  series: string;
}

interface BlogLinkButtonsProps {
  blogLinks: ResolvedBlogLink[];
}

export default function BlogLinkButtons({ blogLinks }: BlogLinkButtonsProps) {
  if (blogLinks.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {blogLinks.map((post) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className={cn(
            'group relative block w-full overflow-hidden rounded-xl p-0.5',
            'transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]',
          )}
        >
          {/* 그라데이션 테두리 */}
          <div
            className={cn(
              'absolute inset-0 rounded-xl',
              'bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400',
              'dark:from-blue-400 dark:via-sky-300 dark:to-cyan-300',
              'opacity-80 group-hover:opacity-100 transition-opacity duration-200',
            )}
          />
          {/* 내부 카드 */}
          <div
            className={cn(
              'relative flex items-center gap-4 rounded-[11px] px-5 py-4',
              'bg-white dark:bg-gray-900',
              'group-hover:bg-gray-50 dark:group-hover:bg-gray-800',
              'transition-colors duration-200',
            )}
          >
            {/* 썸네일 */}
            {post.cover && (
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            {/* 텍스트 영역 */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'font-semibold text-lg',
                  'text-gray-800 dark:text-gray-100',
                  'group-hover:text-blue-600 dark:group-hover:text-blue-300',
                  'transition-colors duration-200',
                )}
              >
                {post.title}
              </p>
              {post.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {post.description}
                </p>
              )}
            </div>
            {/* 화살표 */}
            <svg
              className={cn(
                'shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500',
                'group-hover:text-blue-500 dark:group-hover:text-blue-300',
                'group-hover:translate-x-1 transition-all duration-200',
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
