import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Work from "./sections/Work";

export default function Home() {
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
