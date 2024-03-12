"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeviceSize } from "./hooks";
import Image from "next/image";

import MenuIcon from "../assests/bars-solid.svg";

const NavItems: { name: string; href: string; link?: boolean }[] = [
  {
    name: "Work",
    href: "#work",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Contact",
    href: "#contact",
  },
  {
    name: "Resume",
    link: true,
    href: "https://drive.google.com/file/d/1Xvqiygf1UUsfTJKhG4rcV6RylSBHIm9s/view?usp=drive_link",
  },
];

const Navabr = () => {
  const { width, height } = useDeviceSize();

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 z-10">
      <Link className="mr-6" href="/">
        <AvatarDemo />
      </Link>
      <nav className="ml-auto flex items-center space-x-6">
        {width >= 768 ? (
          <>
            {NavItems.map((item) => {
              return (
                <div key={item.name}>
                  {item.link ? (
                    <Link
                      className="text-lg font-semibold"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link className="text-lg font-semibold" href={item.href}>
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Image src={MenuIcon} alt="Menu" width={25} />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col mr-7">
              {NavItems.map((item) => {
                return (
                  <div key={item.name} className="w-full text-center py-1">
                    {item.link ? (
                      <Link
                        // className=" w-full text-right"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link
                        className=" w-full text-right border-b-2"
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
        )}
      </nav>
    </header>
  );
};

export default Navabr;

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/119160374?v=4"
        alt="@shadcn"
      />
      <AvatarFallback>S</AvatarFallback>
    </Avatar>
  );
}
