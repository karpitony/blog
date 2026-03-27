'use client';

import { useState } from 'react';
import Link from 'next/link';
import cn from '@yeahx4/cn';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export interface NavPostItem {
  slug: string;
  title: string;
}

interface NavPostListProps {
  /** 전체 포스트 목록 */
  posts: NavPostItem[];
  /** 현재 글의 인덱스 */
  currentIndex: number;
  /** 한 페이지에 보여줄 글 수 */
  pageSize?: number;
  /** 상단 헤더 레이블 */
  label?: string;
}

export default function NavPostList({
  posts,
  currentIndex,
  pageSize = 5,
  label,
}: NavPostListProps) {
  // 현재 글을 가운데에 두는 슬라이딩 윈도우 (4번째 글이면 2,3,4,5,6)
  const half = Math.floor(pageSize / 2);
  const clampStart = (idx: number) =>
    Math.max(0, Math.min(idx, posts.length - pageSize));
  const initialStart = clampStart(currentIndex - half);
  const [start, setStart] = useState(initialStart);

  const visiblePosts = posts.slice(start, start + pageSize);

  const canPrev = start > 0;
  const canNext = start + pageSize < posts.length;

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        'border border-gray-200 dark:border-gray-700/40',
        'bg-gray-50 dark:bg-gray-800/30',
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700/40">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 m-0!">
          {label || '📝 전체 글'}
        </p>
        {/* 페이지네이션 */}
        {posts.length > pageSize && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setStart(s => clampStart(s - pageSize))}
              disabled={!canPrev}
              className={cn(
                'p-1 rounded transition-colors',
                canPrev
                  ? 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                  : 'text-gray-300 dark:text-gray-600 cursor-default',
              )}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-400 dark:text-gray-500 min-w-[3rem] text-center">
              {start + 1}–{Math.min(start + pageSize, posts.length)} / {posts.length}
            </span>
            <button
              onClick={() => setStart(s => clampStart(s + pageSize))}
              disabled={!canNext}
              className={cn(
                'p-1 rounded transition-colors',
                canNext
                  ? 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                  : 'text-gray-300 dark:text-gray-600 cursor-default',
              )}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 포스트 리스트 */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700/30">
        {visiblePosts.map((post) => {
          const globalIndex = posts.findIndex(p => p.slug === post.slug);
          const isCurrent = globalIndex === currentIndex;
          return (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={cn(
                'flex items-center gap-3 px-5 py-3 no-underline transition-colors duration-200',
                isCurrent
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-3 border-blue-500'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/30 border-l-3 border-transparent',
              )}
            >
              <span
                className={cn(
                  'text-xs font-mono min-w-[1.5rem] text-center',
                  isCurrent
                    ? 'text-blue-500 dark:text-blue-400 font-bold'
                    : 'text-gray-400 dark:text-gray-500',
                )}
              >
                {globalIndex + 1}
              </span>
              <span
                className={cn(
                  'text-sm truncate',
                  isCurrent
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300',
                )}
              >
                {post.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
