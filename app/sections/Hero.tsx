import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      id="hero"
      className="w-full relative py-20 md:py-24 lg:py-32 xl:py-40 bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="w-full h-full absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0" />
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
            className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            I’m a passionate full-stack web developer with a love for creating
            user-friendly and elegant websites.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center z-10">
          <Link
            data-aos="fade-up"
            data-aos-delay="100"
            className="border border-border inline-flex h-10 items-center justify-center rounded-md bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="#contact"
          >
            Contact Me
          </Link>
          <Link
            data-aos="fade-up"
            data-aos-delay="150"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
