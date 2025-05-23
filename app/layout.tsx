import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import DynamicMarginLayout from "@/layouts/DynamicMarginLayout";
import { GoogleAnalytics } from '@next/third-parties/google';

const BASE_URL = "https://yunseok.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Yuniverse",
  description: "개발자 송윤석의 개인 블로그입니다.",
  icons: {
    icon: "/yuniverse_256.webp",
  },
  openGraph: {
    title: "Yuniverse",
    description: "개발자 송윤석의 개인 블로그입니다.",
    url: BASE_URL,
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="r766th2h5faMjIfYnPUTpD-8xpC7920UHRfOOgQKOVY" />
        <meta name="naver-site-verification" content="2ff0864e0257241090dc6fe9bd4e76e6791b6424" />
      </head>
      {/* <body className="bg-linear-to-br from-blue-950 to-gray-900"> */}
      <body className="bg-[#f2f2f2] dark:bg-[#121212]">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="bg-[#e7e7e7] dark:bg-[#0a0a0a] font-pretendard">
            <Header />
            <DynamicMarginLayout>
              <div className="w-full flex flex-col items-center">
                {children}
              </div>
            </DynamicMarginLayout>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-2X8994GCL2" />
      </body>
    </html>
  );
}
