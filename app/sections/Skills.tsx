import React from "react";
import { CheckCircleIcon } from "./utils";
import Link from "next/link";

export interface SkillsModel {
  skill: string;
  link: string;
}

const skills: SkillsModel[] = [
  {
    skill: "TypeScript",
    link: "https://www.typescriptlang.org/",
  },
  {
    skill: "JavaScript",
    link: "https://en.wikipedia.org/wiki/JavaScript",
  },
  {
    skill: "React",
    link: "https://react.dev/",
  },
  {
    skill: "React Native",
    link: "https://reactnative.dev/",
  },
  {
    skill: "Next.js",
    link: "https://nextjs.org/",
  },
  {
    skill: "Django",
    link: "https://www.djangoproject.com/",
  },
  {
    skill: "HTML/CSS",
    link: "https://en.wikipedia.org/wiki/HTML",
  },
  {
    skill: "Tailwind CSS",
    link: "https://tailwindcss.com/",
  },
  {
    skill: "jQurey",
    link: "https://jquery.com/",
  },
  {
    skill: "Git",
    link: "https://git-scm.com/",
  },
  {
    skill: "Docker",
    link: "https://www.docker.com/",
  },
  {
    skill: "Material UI",
    link: "https://mui.com/",
  },
  {
    skill: "Ant Design",
    link: "https://ant.design/",
  },
  {
    skill: "Shadcn/ui",
    link: "https://ui.shadcn.com/",
  },
  {
    skill: "React Native Paper",
    link: "https://reactnativepaper.com/",
  },
];

const Skills = () => {
  return (
    <div id="skills" className="w-full py-12 md:py-24 lg:py-24">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            My Skills
          </h2>
          <p data-aos="fade-up" className="text-gray-500 dark:text-gray-400">
            I’m skilled in the following technologies.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 max-w-screen-md mx-auto lg:grid-cols-4">
          {skills.map((sk, index) => (
            <div
              key={sk.skill}
              data-aos="fade-up"
              data-aos-offset="50"
              data-aos-duration={300 + index * 50}
              className="flex items-center space-x-4"
            >
              <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
              <Link
                href={sk.link}
                target="_blank"
                rel="noreffer noopener"
                className="text-sm font-medium peer group-underline-offset-0.5"
              >
                {sk.skill}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
