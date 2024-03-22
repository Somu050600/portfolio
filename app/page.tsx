"use client";

import { useEffect } from "react";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Work from "./sections/Work";

import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 overflow-hidden">
      <Hero />
      <Projects />
      <Work />
      <Skills />
      <Contact />
      <span
        className="mb-2"
        data-aos="fade-up"
        data-aos-offset="0"
        data-aos-delay="200"
      >
        Crafted with <span style={{ color: "#e25555" }}>&#9829;</span> in India
        by{" "}
        <Link href="https://github.com/Somu050600" target="_blank">
          <strong>Somu</strong>
        </Link>{" "}
        using Next.js
      </span>
    </main>
  );
}
