import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI商家增长链接",
  description: "面向中国小商家的AI主页、AI客服、线索看板和营销内容生成平台。",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
