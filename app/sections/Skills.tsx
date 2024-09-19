import React, { ReactElement, useMemo } from "react";
import { CheckCircleIcon } from "./utils";
import Link from "next/link";
import {
  Typescript01Icon,
  JavaScriptIcon,
  ReactIcon,
  Notion01Icon,
  Html5Icon,
  FastWindIcon,
  GitMergeIcon,
  FerryBoatIcon,
  GridViewIcon,
  DashboardSquare02Icon,
  Rhombus01Icon,
  IslandIcon,
} from "hugeicons-react";
import { useTheme } from "next-themes";

export interface SkillsModel {
  skill: string;
  link: string;
  logo?: ReactElement;
}

const Skills = () => {
  const { theme } = useTheme();

  const skills: SkillsModel[] = useMemo(
    () => [
      {
        skill: "TypeScript",
        link: "https://www.typescriptlang.org/",
        logo: <Typescript01Icon />,
      },
      {
        skill: "JavaScript",
        link: "https://en.wikipedia.org/wiki/JavaScript",
        logo: <JavaScriptIcon />,
      },
      {
        skill: "React",
        link: "https://react.dev/",
        logo: <ReactIcon />,
      },
      {
        skill: "React Native",
        link: "https://reactnative.dev/",
        logo: <ReactIcon />,
      },
      {
        skill: "Next.js",
        link: "https://nextjs.org/",
        logo: <Notion01Icon />,
      },
      {
        skill: "Django",
        link: "https://www.djangoproject.com/",
        logo: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            color={theme === "light" ? "#000000" : "#fff"}
            fill={"none"}
          >
            <path
              d="M11 5.49976V5.50976"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13 18.4898V18.4998"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M17.498 8.5H15.4989V6.5C15.4989 5.09554 15.4989 4.39331 15.1618 3.88886C15.0159 3.67048 14.8284 3.48298 14.61 3.33706C14.1056 3 13.4033 3 11.9989 3C10.5944 3 9.89218 3 9.38773 3.33706C9.16935 3.48298 8.98185 3.67048 8.83593 3.88886C8.49887 4.39331 8.49887 5.09554 8.49887 6.5V8.5H6.49805C5.09358 8.5 4.39135 8.5 3.88691 8.83706C3.66853 8.98298 3.48103 9.17048 3.33511 9.38886C2.99805 9.89331 2.99805 10.5955 2.99805 12C2.99805 13.4045 2.99805 14.1067 3.33511 14.6111C3.48102 14.8295 3.66853 15.017 3.88691 15.1629C4.39135 15.5 5.09358 15.5 6.49805 15.5H8.49887V17.5C8.49887 18.9045 8.49887 19.6067 8.83593 20.1111C8.98185 20.3295 9.16935 20.517 9.38773 20.6629C9.89218 21 10.5944 21 11.9989 21C13.4033 21 14.1056 21 14.61 20.6629C14.8284 20.517 15.0159 20.3295 15.1618 20.1111C15.4989 19.6067 15.4989 18.9045 15.4989 17.5V15.5H17.498C18.9025 15.5 19.6047 15.5 20.1092 15.1629C20.3276 15.017 20.5151 14.8295 20.661 14.6111C20.998 14.1067 20.998 13.4045 20.998 12C20.998 10.5955 20.998 9.89331 20.661 9.38886C20.5151 9.17048 20.3276 8.98298 20.1092 8.83706C19.6047 8.5 18.9025 8.5 17.498 8.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5 8.5V12H8.5V15.5M12 15.5H15.5M8.5 8.5H12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        skill: "HTML/CSS",
        link: "https://en.wikipedia.org/wiki/HTML",
        logo: <Html5Icon />,
      },
      {
        skill: "Tailwind CSS",
        link: "https://tailwindcss.com/",
        logo: <FastWindIcon />,
      },
      {
        skill: "jQurey",
        link: "https://jquery.com/",
        logo: <JavaScriptIcon />,
      },
      {
        skill: "Git",
        link: "https://git-scm.com/",
        logo: <GitMergeIcon />,
      },
      {
        skill: "Docker",
        link: "https://www.docker.com/",
        logo: <FerryBoatIcon />,
      },
      {
        skill: "Material UI",
        link: "https://mui.com/",
        logo: <GridViewIcon />,
      },
      {
        skill: "Ant Design",
        link: "https://ant.design/",
        logo: <Rhombus01Icon />,
      },
      {
        skill: "Shadcn/ui",
        link: "https://ui.shadcn.com/",
        logo: <DashboardSquare02Icon />,
      },
      {
        skill: "React Native Paper",
        link: "https://reactnativepaper.com/",
        logo: <ReactIcon />,
      },
      {
        skill: "React Query",
        link: "https://tanstack.com/query/latest/",
        logo: <IslandIcon />,
      },
    ],
    [theme]
  );

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
              data-aos-delay={index * 50}
              className="flex items-center space-x-4"
            >
              {sk?.logo ? (
                sk?.logo
              ) : (
                <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
              )}
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
