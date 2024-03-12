import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navabr from "./sections/Navabr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Somu | Full Stack Web Developer",
  description:
    "Experienced Front-End Developer with expertise in JavaScript, TypeScript, React, and React Native. Skilled in building scalable e-commerce apps and interactive web applications. Proficient in leveraging AWS services and integrating payment gateways for product sales.",
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
      </body>
    </html>
  );
}
