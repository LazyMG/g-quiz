import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import ReactQueryClientProvider from "config/ReactQueryClientProvider";
import RecoilProvider from "config/RecoilProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gundam Quiz",
  openGraph: {
    title: "Gundam Quiz", // og:title
    description: "나만의 퀴즈를 만들어보세요", // og:description
    // images: [
    //   {
    //     url: "/thumbnail.png", // og:image. **주의: 실제 배포 시에는 'https://yourdomain.com/thumbnail.png'와 같은 절대 경로를 사용해야 합니다.**
    //     // width, height 등 추가 속성을 필요에 따라 지정할 수 있습니다.
    //     // width: 800,
    //     // height: 600,
    //     // alt: '한입북스 썸네일',
    //   },
    // ],
  },
  description: "나만의 퀴즈를 만들어보세요", // <meta name="description">
  keywords: ["건담", "퀴즈"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 w-full max-h-dvh mx-auto xl:max-w-4xl lg:max-w-2xl md:max-w-xl max-w-sm`}
      >
        <ReactQueryClientProvider>
          <RecoilProvider>{children}</RecoilProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
