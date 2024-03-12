import React from "react";
import { CheckCircleIcon } from "./utils";

const Skills = () => {
  return (
    <div id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Skills
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            I’m skilled in the following technologies.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 max-w-screen-md mx-auto lg:grid-cols-3">
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
            <span className="text-sm font-medium peer group-underline-offset-0.5">
              Web Development
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
            <span className="text-sm font-medium peer group-underline-offset-0.5">
              HTML/CSS
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
            <span className="text-sm font-medium peer group-underline-offset-0.5">
              JavaScript
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
            <span className="text-sm font-medium peer group-underline-offset-0.5">
              React
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
            <span className="text-sm font-medium peer group-underline-offset-0.5">
              Next.js
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-4 h-4 text-gray-500 peer group-hover:text-gray-500 dark:text-gray-400 group-hover:dark:text-gray-400" />
            <span className="text-sm font-medium peer group-underline-offset-0.5">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
