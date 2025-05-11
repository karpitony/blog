'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const isProd = process.env.NODE_ENV === 'production';

export default function Gtag() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isProd || !GA_ID || typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', {
      page_path: pathname,
    });
  }, [pathname]);

  if (!isProd || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
