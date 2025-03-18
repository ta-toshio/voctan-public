import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google'

import { cn } from "@/libs/utils";
import Toast from "@/components/blocks/toast/toast";
import { SiteHeader } from "@/components/blocks/header/header";
import "./globals.css";
import { APP_ENV, APP_ENVS, SITE_NAME } from "@/const";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: SITE_NAME,
  description: `PDFやYouTube字幕、Webページから英単語帳を自動作成。例文やフラッシュカードで効率的に語彙力を伸ばす新しい学習体験`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ja">
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
    <SiteHeader/>
    {children}
    <Toast/>
    </body>
    {APP_ENV === APP_ENVS.prod && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID}/>}
    </html>
  );
}
