import Link from 'next/link';
import { SpinningReactSm } from './SpinningReactLogo';

export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <SpinningReactSm />
              <span className="font-bold text-lg md:text-xl">개발 블로그</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              홈
            </Link>
            <Link
              href="/posts"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-0 md:ml-4"
            >
              블로그
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}