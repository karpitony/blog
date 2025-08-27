'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import cn from '@yeahx4/cn';

export default function DynamicMarginLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  return (
    <div
      className={cn(
        'min-h-screen text-gray-100 flex flex-col items-center',
        'p-3 md:p-6',
        isAboutPage ? '' : 'mt-16',
      )}
    >
      {children}
    </div>
  );
}
