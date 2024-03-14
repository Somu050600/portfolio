"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ProjectsModel {
  id: Number;
  project_title: string;
  brief_desc: string;
  start_date: string;
  skills: string[];
  img_url: string;
  project_url: string;
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
          <h2
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="200"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Featured Projects
          </h2>
          <p
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="250"
            className="text-gray-500 dark:text-gray-400"
          >
            Sleek and modern.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {data?.map((item, index) => {
            return (
              <div
                key={item.brief_desc}
                data-aos="fade-up"
                data-aos-offset="50"
                data-aos-delay={index === 0 ? "300" : "0"}
                data-aos-duration={300 + index * 100}
                className="flex flex-col group overflow-hidden rounded-xl shadow-lg border"
              >
                <Image
                  unoptimized
                  alt="Experience 1"
                  className="img_skeleton object-cover transition-transform group-hover:scale-105 aspect-[3/2] bg-gray-250"
                  height="400"
                  src={"https://d3m0gx63bo3yvr.cloudfront.net/" + item.img_url}
                  width="600"
                />
                <div className="p-6 pb-3">
                  <h3 className="text-xl font-bold leading-none">
                    {item.project_title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.brief_desc}
                  </p>
                </div>
                <div className="w-full py-3 px-6 mt-auto self-baseline flex justify-between items-end">
                  <Drawer>
                    <DrawerTrigger>
                      <Button variant={"link"} className="p-0">
                        View details
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex items-center">
                      <DrawerHeader className="w-full md:w-[60vw]">
                        <DrawerTitle className="pb-6 text-xl">
                          {item.project_title}
                        </DrawerTitle>
                        <div className="p-3">
                          {item.skills.map((skill) => (
                            <Badge key={skill} className="mr-3">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <DrawerDescription>
                          <ol className="relative border-s border-gray-200 dark:border-gray-700">
                            {item.description.map((point, index) => {
                              return (
                                <li className="mb-5 ms-4" key={index}>
                                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  {index === 0 && (
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                      {item.start_date}
                                    </time>
                                  )}
                                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    {point}
                                  </p>
                                </li>
                              );
                            })}
                          </ol>
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter className="w-full md:w-[60vw]">
                        <Link
                          href={item.project_url}
                          className="self-center py-2"
                        >
                          View Project -{">"}
                        </Link>
                        <DrawerClose>
                          <Button variant="default" className="w-64">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
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
