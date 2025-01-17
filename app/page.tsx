import PostsList from "@/components/PostsPage/PostsList";
import { getPostList } from "@/libs/Post/GetPostList";
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import SimpleAboutMe from "@/components/common/SimpleAboutMe";

export default async function Home() {
  const posts = await getPostList();
  return (
    <div className="w-full max-w-full md:max-w-3xl space-y-8">
      <div className="px-2">
        <SimpleAboutMe />

        <Link href="/about" className="flex justify-center items-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            자세히 보기 <FaArrowRight className='inline ml-2'/>
          </button>
        </Link>
      </div>
      <hr className="border-t-2"/>
      <div>
        <h2 className="text-3xl font-bold mb-6 mt-8">최신 글</h2>
        <div className="space-y-4">
          <PostsList posts={posts} postPerPage={3}  showPrevNext={false}/>
        </div>
        <Link href="/posts" className="flex justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            모든 글 보러가기 <FaArrowRight className='inline ml-2'/>
          </button>
        </Link>
      </div>
    </div>
  );
}