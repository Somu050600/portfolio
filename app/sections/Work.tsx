"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "./utils";

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
                <div className="w-full py-3 px-6 mt-auto self-baseline flex items-end">
                  <Link
                    className="inline-flex items-center underline hover:text-gray-900 transition-colors"
                    href="#"
                  >
                    View Experience
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

export default Work;
