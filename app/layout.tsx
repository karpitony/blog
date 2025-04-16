import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "@/styles/globals.css";
import GlobalNavBar from "@/components/GlobalNavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yuniverse",
  description: "개발자 송윤석의 개인 블로그입니다.",
  icons: {
    icon: "/react-logo.svg",
  },
  openGraph: {
    title: "Yuniverse",
    description: "개발자 송윤석의 개인 블로그입니다.",
    url: "https://yuniverse.vercel.app",
    siteName: "Yuniverse",
    images: [
      {
        url: "/og-image.webp",
        width: 1562,
        height: 840,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="r766th2h5faMjIfYnPUTpD-8xpC7920UHRfOOgQKOVY" />
        <meta name="naver-site-verification" content="2ff0864e0257241090dc6fe9bd4e76e6791b6424" />
      </head>
      <body className="bg-gradient-to-br from-blue-950 to-gray-900">
        <GlobalNavBar />
        <div className="min-h-[80vh] text-gray-100 flex flex-col items-center p-3 md:p-6">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
