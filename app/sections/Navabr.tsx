"use client";

import Link from "next/link";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useDeviceSize } from "./hooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight, ArrowRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import GithubIcon from "./../assests/github.svg";
import LinkedinIcon from "./../assests/linkedin.svg";
import TwitterIcon from "./../assests/twitter.svg";
import { ModeToggle } from "@/components/theme-selector";

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
        <ModeToggle />
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
          <Sheet>
            <SheetTrigger asChild>
              <AlignRight size={28} />
            </SheetTrigger>
            <SheetContent className="w-[200px] sm:w-[540px] flex flex-col rounded-l-xl ">
              <SheetHeader>
                <SheetTitle className="h-4"></SheetTitle>
                <SheetDescription>
                  {NavItems.map((item, index) => {
                    return (
                      <Dialog.Close
                        asChild
                        key={item.name}
                        data-aos="fade-up"
                        data-aos-delay={150 + index * 50}
                        className="w-full text-center p-2 border-b-[1px] text-base"
                      >
                        <Link
                          href={item.href}
                          target={item.link ? "_blank" : ""}
                          rel={item.link ? "noopener noreferrer" : ""}
                        >
                          {item.name}{" "}
                          {item.link ? (
                            <ArrowRight className="inline p-0" size={16} />
                          ) : (
                            ""
                          )}
                        </Link>
                      </Dialog.Close>
                    );
                  })}
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="flex flex-row mt-auto w-full justify-center items-center space-x-2">
                <Link
                  className="rounded-full p-1 bg-gray-100 dark:bg-white"
                  href="https://github.com/Somu050600"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-left"
                  data-aos-offset="0"
                  data-aos-delay="350"
                >
                  <Image src={GithubIcon} alt="Github" width={20} />
                </Link>
                <Link
                  className="rounded-full p-1 bg-gray-100 dark:bg-white"
                  href="https://www.linkedin.com/in/somueega"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-left"
                  data-aos-offset="0"
                  data-aos-delay="400"
                >
                  <Image src={LinkedinIcon} alt="Li" width={20} />
                </Link>
                <Link
                  className="rounded-full p-1 bg-gray-100 dark:bg-white"
                  href="https://twitter.com/ESomu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="fade-left"
                  data-aos-offset="0"
                  data-aos-delay="450"
                >
                  <Image src={TwitterIcon} alt="Twitter" width={20} />
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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
