"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "./utils";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

export interface WorkExperienceModel {
  id: Number;
  job_title: string;
  company_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string;
  skills: string[];
  img_url: string;
  description: string[];
}

const Work = () => {
  const [data, setData] = useState<WorkExperienceModel[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/work", { method: "GET" })
        .then((res) => res.json())
        .then((res) => setData(res));
    };
    fetchData();
  }, []);

  return (
    <div id="work" className="w-full py-12 md:py-12 lg:py-12">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Work Experience
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Details about my work experience.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {data?.map((item) => {
            return (
              <div
                key={item.company_title}
                className="flex flex-col group overflow-hidden rounded-xl shadow-lg border"
              >
                <Image
                  alt="Experience 1"
                  className="img_skeleton object-cover transition-transform group-hover:scale-105 aspect-[3/2] bg-gray-250"
                  height="400"
                  src={"https://d3m0gx63bo3yvr.cloudfront.net/" + item.img_url}
                  width="600"
                />
                <div className="p-6 ">
                  <h3 className="text-xl font-bold leading-none">
                    {item.job_title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.company_name}
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
                        <DrawerTitle className=" text-xl">
                          {item.job_title} at {item.company_title}
                        </DrawerTitle>
                        <span className="pb-6">{item.company_name}</span>
                        <div className="p-3">
                          {item.skills.map((skill) => (
                            <Badge key={skill} className="mr-3">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <DrawerDescription>
                          <ol className="relative border-s border-gray-200 dark:border-gray-700 max-h-[50vh] md:max-h-[80vh] overflow-y-scroll scrollbar-hide">
                            {item.description.map((point, index) => {
                              return (
                                <li className="mb-5 ms-4" key={index}>
                                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  {index === 0 && (
                                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                      {item.start_date} - {item.end_date}
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

export default Work;
