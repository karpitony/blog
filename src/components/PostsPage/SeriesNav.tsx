'use client';

import { useState } from 'react';
import Link from 'next/link';
import cn from '@yeahx4/cn';
import type { SeriesContext } from '@/content/post.service';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import NavPostList from './NavPostList';

interface SeriesNavProps {
  context: SeriesContext;
  variant: 'header' | 'footer';
}

export default function SeriesNav({ context, variant }: SeriesNavProps) {
  const { seriesName, posts, currentIndex } = context;

  if (variant === 'header') {
    return <SeriesHeader seriesName={seriesName} posts={posts} currentIndex={currentIndex} />;
  }

  // footer
  return (
    <div className="mt-16 mb-4">
      <NavPostList posts={posts} currentIndex={currentIndex} label={`📚 ${seriesName} 시리즈`} />
    </div>
  );
}

/** 제목 아래: 접혀있는 시리즈 목록 (5개씩 보이고 펼치기 가능) */
function SeriesHeader({
  seriesName,
  posts,
  currentIndex,
}: {
  seriesName: string;
  posts: { slug: string; title: string }[];
  currentIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const COLLAPSED_COUNT = 5;
  const needsExpand = posts.length > COLLAPSED_COUNT;
  const visiblePosts = expanded ? posts : posts.slice(0, COLLAPSED_COUNT);

  return (
    <div
      className={cn(
        'mt-6 rounded-2xl overflow-hidden',
        'border border-gray-200 dark:border-gray-700/40',
        'bg-gray-50 dark:bg-gray-800/30',
      )}
    >
      {/* 헤더 */}
      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/40">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 m-0!">
          📚 <span className="text-gray-700 dark:text-gray-200 font-semibold">{seriesName}</span>{' '}
          시리즈 · {currentIndex + 1}/{posts.length}
        </p>
      </div>

      {/* 리스트 */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700/30">
        {visiblePosts.map((post, i) => {
          const isCurrent = i === currentIndex;
          return (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className={cn(
                'flex items-center gap-3 px-5 py-2.5 no-underline transition-colors duration-200',
                isCurrent
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-3 border-blue-500'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/30 border-l-3 border-transparent',
              )}
            >
              <span
                className={cn(
                  'text-xs md:text-sm font-mono min-w-[1.5rem] text-center',
                  isCurrent
                    ? 'text-blue-500 dark:text-blue-400 font-bold'
                    : 'text-gray-400 dark:text-gray-500',
                )}
              >
                {i + 1}
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

      {/* 펼치기/접기 버튼 */}
      {needsExpand && (
        <button
          onClick={() => setExpanded(v => !v)}
          className={cn(
            'w-full flex items-center justify-center gap-1.5 px-5 py-2.5',
            'text-xs md:text-sm text-gray-400 dark:text-gray-500',
            'hover:bg-gray-100 dark:hover:bg-gray-700/30',
            'border-t border-gray-200 dark:border-gray-700/40',
            'transition-colors cursor-pointer',
          )}
        >
          {expanded ? (
            <>
              접기 <FiChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              {posts.length - COLLAPSED_COUNT}개 더 보기 <FiChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
