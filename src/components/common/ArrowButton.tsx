import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import cn from '@yeahx4/cn';

interface ArrowButtonProps {
  text: string;
  href: string;
}

export default function ArrowButton({ text, href }: ArrowButtonProps) {
  return (
    <Link href={href} className="flex justify-center items-center">
      <button
        className={cn(
          'bg-black dark:bg-gray-300 hover:bg-gray-900 dark:hover:bg-gray-100',
          'text-gray-300 dark:text-black font-semibold py-2 px-4 rounded-sm mt-4',
          'transition duration-100 ease-in-out flex justify-center items-center',
        )}
      >
        <p>{text}</p>
        <FaArrowRight className="inline ml-2" />
      </button>
    </Link>
  );
}
