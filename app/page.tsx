import PostsList from "@/components/PostsPage/PostsList";
import { getPostList } from "@/libs/Post/GetPostList";
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import { SpinningReactLg, SpinningSvelteLg, SpinningNextjsLg } from "@/components/SpinningLogo";

export default async function Home() {
  const posts = await getPostList();
  return (
    <div className="w-full max-w-full md:max-w-3xl space-y-8">
      <div className="px-2">
        <div className="flex flex-row justify-between">
          <div className="text-3xl md:text-4xl font-bold">
            <h1 className="mb-2 mt-8">안녕하세요!</h1>
            <h1 className="mb-6">
              대학생 개발자 <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400">송윤석</span>입니다.
            </h1>
          </div>
          <div className="hidden md:flex flex-row justify-center items-center space-x-4">
            <SpinningReactLg />
            <SpinningNextjsLg />
            <SpinningSvelteLg />
          </div>
        </div>

        <p>웹 프론트엔드와 응용 프로그램 개발에 흥미가 있는 대학생입니다.</p>
        <p>프론트엔드, 공부한 것, 회고 등을 주로 업로드 할 계획입니다!</p>
        <Link href="/about" className="flex justify-center items-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            자세히 보기 <FaArrowRight className='inline ml-2'/>
          </button>
        </Link>
      </div>

      <div className="border-t-2">
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