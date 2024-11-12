import Link from 'next/link';
import { SpinningReactSm } from './SpinningLogo';

export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <SpinningReactSm />
              <p className="font-bold text-lg md:text-xl">개발 블로그</p>
            </Link>
          </div>
          <div className="flex items-center text-base">
            <Link
              href="/posts"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium ml-0 md:ml-4"
            >
              포스트
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium ml-0 md:ml-4"
            >
              와타시
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}