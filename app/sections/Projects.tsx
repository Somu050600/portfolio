import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "./utils";

const Projects = () => {
  return (
    <div id="projects" className="w-full py-12 md:py-12 lg:py-12">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Sleek and modern.</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <div className="group overflow-hidden rounded-xl shadow-lg">
            <Image
              alt="Project 1"
              className="object-cover transition-transform group-hover:scale-105 aspect-[3/2]"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold leading-none">Project One</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description for Project One
              </p>
            </div>
            <div className="p-6 flex items-end">
              <Link
                className="inline-flex items-center underline hover:text-gray-900 transition-colors"
                href="#"
              >
                View Project
                <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
              </Link>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-lg">
            <Image
              alt="Project 2"
              className="object-cover transition-transform group-hover:scale-105 aspect-[3/2]"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold leading-none">Project Two</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description for Project Two
              </p>
            </div>
            <div className="p-6 flex items-end">
              <Link
                className="inline-flex items-center underline hover:text-gray-900 transition-colors"
                href="#"
              >
                View Project
                <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
              </Link>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl shadow-lg">
            <Image
              alt="Project 3"
              className="object-cover transition-transform group-hover:scale-105 aspect-[3/2]"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold leading-none">Project Three</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description for Project Three
              </p>
            </div>
            <div className="p-6 flex items-end">
              <Link
                className="inline-flex items-center underline hover:text-gray-900 transition-colors"
                href="#"
              >
                View Project
                <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
