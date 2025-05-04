'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const isProduction = process.env.NODE_ENV === 'production';

export default function Gtag() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isProduction) return;
    if (!GA_ID || typeof window.gtag !== 'function') return;

    window.gtag('config', GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  if (!isProduction || !GA_ID) {
    if (!isProduction) console.info('Gtag disabled in non-production environment');
    if (!GA_ID) console.warn('GA_ID is not defined');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}