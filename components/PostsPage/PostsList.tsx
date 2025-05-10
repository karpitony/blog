'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PostData } from '@/types/post';
import PostInfoHeader from '@/components/PostsPage/PostInfoHeader';
import cn from '@yeahx4/cn';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PostsListProps {
  posts: PostData[];
  postPerPage: number;
  showPrevNext: boolean;
}

export default function PostsList({ posts, postPerPage, showPrevNext }: PostsListProps) {
  const [viewPostList, setViewPostList] = useState(posts);
  const [viewPage, setViewPage] = useState(1);
  const postsPerPage = postPerPage || 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const start = (viewPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    setViewPostList(posts.slice(start, end));
  }, [viewPage, postsPerPage, posts]);

  return (
    <div className="flex flex-col">
      {/* 게시글 리스트 */}
      <div className="grow">
        {viewPostList.map(({ meta, slug }) => (
          <Link 
            href={`/posts/${slug}`} 
            key={slug} 
            className={cn(
              "block group relative bg-gray-900 bg-opacity-50 rounded-lg",
              "transition duration-300 hover:bg-opacity-70 hover:shadow-lg hover:shadow-white/20",
              "border border-gray-700 hover:border-white/50",
              "mb-4" // 게시글 사이 간격 추가
            )}
          >
            <PostInfoHeader key={slug} meta={meta} />
          </Link>
        ))}
      </div>

      {/* 페이지 네비게이션 */}
      {showPrevNext && (
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={() => setViewPage(prev => Math.max(prev - 1, 1))}
            disabled={viewPage === 1}
            className="text-white hover:underline disabled:text-gray-500"
          >
            <FaArrowLeft className='inline mr-2'/>
            Prev
          </button>
          <span className="text-gray-300">
            {viewPage} / {totalPages}
          </span>
          <button
            onClick={() => setViewPage(prev => Math.min(prev + 1, totalPages))}
            disabled={viewPage === totalPages}
            className="text-white hover:underline disabled:text-gray-500"
          >
            Next
            <FaArrowRight className='inline ml-2'/>
          </button>
        </div>
      )}
    </div>
  );
}
