'use client';
import { useScrollRestoration } from '@/hooks/useClientScrollPosition';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollRestorer() {
  const { restoreScroll } = useScrollRestoration();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/projects' || pathname === '/') {
      restoreScroll(); // 모달 닫히면 저장된 위치 복원
    }
  }, [pathname, restoreScroll]);

  return null;
}
