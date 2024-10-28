import Link from 'next/link';
import { SpinningReactSm } from './SpinningReactLogo';

export default function NavBar() {
  return (
    <nav className="text-white max-w-3xl mx-auto border-b-2">
      <div className="flex items-center justify-between py-4">
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
    </nav>
  )
}