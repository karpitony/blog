import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4">
      <div className="w-full max-w-3xl text-gray-200 px-3 border-t-2">
        <div className='py-6 flex justify-between items-center'>
          <p>
            &copy; Yunseok Song {new Date().getFullYear()}
          </p>
          <Link href="https://github.com/karpitony/blog">
            <FaGithub className="w-6 md:w-8 h-6 md:h-8"/>
          </Link>
        </div>
      </div>
    </footer>
  );
}
