"use client";

import { usePathname } from "next/navigation";
import Navabr from "./sections/Navabr";

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPlayground = pathname?.startsWith("/playground");

  if (isPlayground) {
    return <>{children}</>;
  }

  return (
    <>
      <Navabr />
      <main>{children}</main>
    </>
  );
}
