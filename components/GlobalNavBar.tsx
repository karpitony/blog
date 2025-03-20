import Link from 'next/link';
import cn from '@yeahx4/cn';
import { SpinningReactSm } from '@/components/SpinningLogo';

const LinkData = [
  { href: '/posts', label: '글 목록' },
  { href: '/diary', label: '일기' },
  { href: '/about', label: '소개' },
];

export default function NavBar() {
  return (
    <nav className="text-white max-w-3xl mx-3 md:mx-auto border-b-2">
      <div className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center">
          <SpinningReactSm />
          <p className="font-light text-2xl md:text-3xl font-shrik tracking-wider">yuniverse</p>
        </Link>
        <div className="flex items-center">
        {LinkData.map(({ href, label }) => (
          <Link
            href={href}
            className={cn(
              "text-gray-300 px-2 md:px-3 py-2 font-bold text-base md:text-lg rounded-md",
              "ml-0 md:ml-4",
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