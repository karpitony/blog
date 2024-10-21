import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import cn from '@yeahx4/cn';

export const metadata: Metadata = {
  title: "Blog",
  description: "개발 블로그는 사서 드세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gradient-to-br from-blue-950 to-gray-900">
        <NavBar />
        <div className="min-h-[95vh] text-gray-100 flex flex-col items-center p-3 md:p-6">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
