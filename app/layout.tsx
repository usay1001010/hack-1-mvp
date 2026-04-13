import type { Metadata } from "next";
import { Noto_Sans_JP, Inter, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Kurumi — そっと、近づく。",
  description: "すれ違いから、ことばが生まれる。大学生のためのゆるやかな出会い。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${inter.variable} ${shippori.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col fog-bg">{children}</body>
    </html>
  );
}
