import { FaGithub, FaLinkedin, FaSquareRss } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-2 md:p-4 bg-[#121212] w-full">
      <div className="w-full md:max-w-3xl lg:max-w-5xl text-gray-200 px-0 md:px-3">
        <div className='py-10 flex justify-between items-center'>
          {/* 안내 문구 */}
          <div>
          <p>&copy; Yunseok Song {new Date().getFullYear()}</p>
          <p>All rights reserved.</p>
          </div>
          {/* 링크 모음 */}
          <div className="flex space-x-4 items-center justify-center">
            <Link href="https://github.com/karpitony/blog">
              <FaGithub className="w-6 md:w-8 h-6 md:h-8"/>
            </Link>
            <Link href="https://www.linkedin.com/in/yunseok-song/">
              <FaLinkedin className="w-6 md:w-8 h-6 md:h-8"/>
            </Link>
            <Link href="/rss.xml">
              <FaSquareRss className="w-6 md:w-8 h-6 md:h-8"/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
