import Link from 'next/link';
import { SpinningReactSm } from './SpinningReactLogo';
import cn from '@yeahx4/cn';

const LinkData = [
  { href: '/posts', label: '글 목록' },
  { href: '/tags', label: '태그' },
  { href: '/about', label: '소개' },
];

export default function NavBar() {
  return (
    <nav className="text-white max-w-3xl mx-auto border-b-2">
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <SpinningReactSm />
            <p className="font-bold text-lg md:text-xl">개발 블로그</p>
          </Link>
        </div>
        <div className="flex items-center">
        {LinkData.map(({ href, label }) => (
          <Link
            href={href}
            className={cn(
              "text-gray-300 px-3 py-2 font-bold text-base rounded-md ml-0 md:ml-4",
              "hover:text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-blue-300 hover:to-teal-400"
            )}
            key={href}
          >
            {label}
          </Link>
        ))}
        </div>
      </div>
    </nav>
  )
}