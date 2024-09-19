import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      id="hero"
      className="w-full relative py-20 md:py-24 lg:py-32 xl:py-40 dark:bg-[#0A0A0A]  bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="w-full h-full absolute  pointer-events-none inset-0 flex items-center justify-center dark:bg-[#0A0A0A] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0" />
      <div className="container grid items-center gap-4 px-4 text-center md:px-6 ">
        <div className="space-y-4 z-10">
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Hi, I’m Somu
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="50"
            className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
          >
            I’m a passionate full-stack web developer with a love for creating
            user-friendly and elegant websites.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center z-10">
          <Link
            data-aos="fade-up"
            data-aos-delay="100"
            className="border inline-flex h-10 items-center justify-center rounded-md borde border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#contact"
          >
            Contact Me
          </Link>
          <Link
            data-aos="fade-up"
            data-aos-delay="150"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#work"
          >
            My Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
