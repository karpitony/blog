import type { Metadata } from "next";
import "./globals.css";
import SimpleNavBar from "@/components/SimpleNavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "개발 블로그는 사서 드세요.",
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
      <body className="bg-gradient-to-br from-blue-950 to-gray-900">
        <SimpleNavBar />
        <div className="min-h-[80vh] text-gray-100 flex flex-col items-center p-3 md:p-6">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
