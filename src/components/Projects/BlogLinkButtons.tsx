import Link from 'next/link';
import cn from '@yeahx4/cn';

interface BlogLinkButtonsProps {
  blogLinks: string[];
}

export default function BlogLinkButtons({ blogLinks }: BlogLinkButtonsProps) {
  if (blogLinks.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {blogLinks.map((link, index) => (
        <Link
          key={index}
          href={link}
          className={cn(
            'group relative block w-full overflow-hidden rounded-xl p-[1px]',
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
          {/* 내부 배경 */}
          <div
            className={cn(
              'relative flex items-center justify-between rounded-[11px] px-5 py-4',
              'bg-white dark:bg-gray-900',
              'group-hover:bg-gray-50 dark:group-hover:bg-gray-800',
              'transition-colors duration-200',
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">📝</span>
              <span
                className={cn(
                  'font-semibold',
                  'text-gray-800 dark:text-gray-100',
                  'group-hover:text-blue-600 dark:group-hover:text-blue-300',
                  'transition-colors duration-200',
                )}
              >
                {blogLinks.length > 1
                  ? `관련 블로그 글 보러가기 (${index + 1})`
                  : '관련 블로그 글 보러가기'}
              </span>
            </div>
            <svg
              className={cn(
                'w-5 h-5 text-gray-400 dark:text-gray-500',
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
