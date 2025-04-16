import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import GlobalNavBar from "@/components/GlobalNavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yuniverse",
  description: "개발자 송윤석의 개인 블로그입니다.",
  icons: {
    icon: "/react-logo.svg",
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
