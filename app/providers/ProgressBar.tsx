'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ProgressProvider } from '@bprogress/next/app';

const ProgressProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  return (
    <ProgressProvider
      height="4px"
      color={isDark ? '#ffffff' : '#000000'}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default ProgressProviderWrapper;