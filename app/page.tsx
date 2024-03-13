"use client";

import { useEffect } from "react";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Work from "./sections/Work";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 overflow-x-hidden">
      <Hero />
      <Projects />
      <Work />
      <Skills />
      <Contact />
    </main>
  );
}
