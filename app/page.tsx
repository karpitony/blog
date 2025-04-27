import PostsList from "@/components/PostsPage/PostsList";
import { getPostList } from "@/libs/Post/getPostList";
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import SimpleAboutMe from "@/components/common/SimpleAboutMe";
import cn from '@yeahx4/cn';

export default async function Home() {
  const { posts } = await getPostList();
  return (
    <div className="w-full max-w-full md:max-w-3xl">
      <div className="px-2">
        <SimpleAboutMe />
        <Link href="/about" className="flex justify-center items-center mt-4">
          <button className={cn(
            "bg-black dark:bg-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100",
            "text-gray-300 dark:text-black font-semibold py-2 px-4 rounded mt-4",
            "transition duration-100 ease-in-out flex justify-center items-center",
          )}>
            <p>자세히 보기</p>
            <FaArrowRight className='inline ml-2'/>
          </button>
        </Link>
      </div>
      <hr className="border-t-2 py-4 mt-8"/>

      {/* 최신 게시글 리스트 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">최신 글</h2>
        <div className="space-y-4">
          <PostsList posts={posts} postPerPage={3}  showPrevNext={false}/>
        </div>

        <Link href="/posts" className="flex justify-center items-center">
          <button className={cn(
            "bg-black dark:bg-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100",
            "text-gray-300 dark:text-black font-semibold py-2 px-4 rounded mt-4",
            "transition duration-100 ease-in-out flex justify-center items-center",
          )}>
            <p>모든 글 보러가기</p>
            <FaArrowRight className='inline ml-2'/>
          </button>
        </Link>
      </div>
    </div>
  );
}