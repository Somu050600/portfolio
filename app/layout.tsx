import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navabr from "./sections/Navabr";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Somu | Full Stack Web Developer",
  description:
    "Experienced Front-End Developer with expertise in JavaScript, TypeScript, React, and React Native. Skilled in building scalable e-commerce apps and interactive web applications. Proficient in leveraging AWS services and integrating payment gateways for product sales.",
  icons: {
    icon: "https://avatars.githubusercontent.com/u/119160374?v=4",
    shortcut: "https://avatars.githubusercontent.com/u/119160374?v=4",
    apple: "https://avatars.githubusercontent.com/u/119160374?v=4",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "https://avatars.githubusercontent.com/u/119160374?v=4",
    },
  },
  openGraph: {
    type: "website",
    url: "https://somu.vercel.app/",
    title: "Somu | Full Stack Web Developer",
    description:
      "Experienced Front-End Developer with expertise in JavaScript, TypeScript, React, and React Native. Skilled in building scalable e-commerce apps and interactive web applications. Proficient in leveraging AWS services and integrating payment gateways for product sales.",
    siteName: "Somu's portfolio",
    images: [
      {
        url: "https://d3m0gx63bo3yvr.cloudfront.net/og_Somu%20_%20portfolio.png",
        width: 900,
        height: 600,
      },
      {
        url: "https://d3m0gx63bo3yvr.cloudfront.net/og_Somu%20_%20portfolio.png",
        width: 1200,
        height: 800,
      },
    ],
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navabr />
        <main>{children}</main>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
