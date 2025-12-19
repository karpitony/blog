'use client';

import { useRef, useCallback } from 'react';

export function useScrollRestoration() {
  const scrollY = useRef(0);

  const saveScroll = useCallback(() => {
    scrollY.current = window.scrollY;
  }, []);

  const restoreScroll = useCallback(() => {
    window.scrollTo({ top: scrollY.current });
  }, []);

  return { saveScroll, restoreScroll };
}
