import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "도안공장 - 사진으로 만드는 나만의 종이인형",
  description: "사진 한 장으로 세상에 하나뿐인 종이인형 도안을 만들어보세요. AI가 캐릭터와 옷을 자동으로 생성합니다.",
  keywords: "종이인형, 도안, 색칠공부, AI, 프린트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
