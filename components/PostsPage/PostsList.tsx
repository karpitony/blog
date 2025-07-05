'use client';

import { useState, useEffect } from 'react';
import { PostData } from '@/types/post';
import Card from "@/components/common/Card";
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
      <div className="mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {viewPostList.map(({ meta, slug }) => (
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
