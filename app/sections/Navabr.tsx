import Link from "next/link";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const Navabr = () => {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link className="mr-6" href="/">
        <AvatarDemo />
      </Link>
      <nav className="ml-auto flex items-center space-x-6">
        <Link className="text-lg font-semibold" href="#work">
          Work
        </Link>
        <Link className="text-lg font-semibold" href="#projects">
          Projects
        </Link>
        <Link className="text-lg font-semibold" href="#contact">
          Contact
        </Link>
        <Link
          className="text-lg font-semibold"
          target="_blank"
          rel="noopener noreferrer"
          href="https://drive.google.com/file/d/1Xvqiygf1UUsfTJKhG4rcV6RylSBHIm9s/view?usp=drive_link"
        >
          Resume
        </Link>
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
