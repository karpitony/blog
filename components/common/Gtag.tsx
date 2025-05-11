'use client';
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const isProduction = process.env.NODE_ENV === 'production';

export default function Gtag() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isProduction || !GA_ID) return;

    const sendPageView = () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: pathname,
        });
      } else {
        console.warn('[Gtag] gtag is not defined yet');
      }
    };

    const timeout = setTimeout(sendPageView, 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (!isProduction || !GA_ID) return;

    const handleScroll = () => {
      if (typeof window.gtag !== 'function') return;

      const scrollDepth = Math.round(
        (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
      );
      
      if (scrollDepth >= 50) {
        window.gtag('event', 'scroll_depth', {
          event_label: pathname,
          value: scrollDepth,
        });
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!isProduction || !GA_ID) return null;

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
