import PostsList from "@/components/PostsPage/PostsList";
import { getPostList } from "@/libs/Post/GetPostList";
import Link from 'next/link';

export default async function Home() {
  const posts = await getPostList();
  return (
    <div className="w-full max-w-full md:max-w-3xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">안녕하세요!</h1>
        <h1 className="text-4xl font-bold mb-6">
          대학생 개발자 <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400">송윤석</span>입니다.
        </h1>
        <p>웹 프론트엔드와 응용 프로그램 개발에 흥미가 있는 대학생입니다.</p>
        <p>프론트엔드, 공부한 것, 회고 등을 주로 업로드 할 계획입니다!</p>
      </div>
      <div className="border-t-2">
        <h2 className="text-3xl font-bold mb-6 mt-8">최신 글</h2>
        <div className="space-y-4">
          <PostsList posts={posts} postPerPage={3}  showPrevNext={false}/>
        </div>
        <Link href="/posts">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            모든 글 보기
          </button>
        </Link>
      </div>
    </div>
  );
}