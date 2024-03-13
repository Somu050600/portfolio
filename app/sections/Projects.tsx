"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "./utils";

export interface ProjectsModel {
  id: Number;
  project_title: string;
  brief_desc: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string;
  skills: string[];
  img_url: string;
  description: string[];
}

const Projects = () => {
  const [data, setData] = useState<ProjectsModel[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/projects", {
        method: "GET",
        next: { revalidate: 1 },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          setData(res);
        });
    };
    fetchData();
  }, []);

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
          {data?.map((item) => {
            return (
              <div
                key={item.brief_desc}
                className="group overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  unoptimized
                  alt="Experience 1"
                  className="img_skeleton object-cover transition-transform group-hover:scale-105 aspect-[3/2] bg-gray-250"
                  height="400"
                  src={"https://d3m0gx63bo3yvr.cloudfront.net/" + item.img_url}
                  width="600"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold leading-none">
                    {item.project_title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.brief_desc}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
