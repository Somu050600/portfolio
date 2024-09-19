"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import { useTheme } from "next-themes";

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
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/work", { method: "GET" })
        .then((res) => res.json())
        .then((res) => setData(res));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.getElementsByClassName("card");

      for (const card of Array.from(cards)) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        (card as HTMLElement).style.setProperty(
          "--bg",
          theme === "light" ? "rgb(255, 255, 255, 0.95)" : "rgb(0, 0, 0, 0.95)"
        );
        (card as HTMLElement).style.setProperty("--bg-hover", "#0050e6");
      }
    };

    const cardsContainer = cardsRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      // Cleanup event listener when component is unmounted
      if (cardsContainer) {
        cardsContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [theme]);

  return (
    <div id="work" className="w-full py-12 md:py-12 lg:py-12">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Work Experience
          </h2>
          <p data-aos="fade-up" className="text-gray-500 dark:text-gray-400">
            Details about my work experience.
          </p>
        </div>
        <div
          ref={cardsRef}
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {data?.map((item, index) => {
            return (
              <div
                key={item.company_title}
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-duration={300 + index * 100}
                className=" w-full flex flex-col p-4 group overflow-hidden rounded-xl shadow-lg border card"
              >
                <Image
                  alt={`Experience ${index + 1}`}
                  className="img_skeleton object-cover object-top aspect-[3/2] bg-gray-250 rounded-lg"
                  height="400"
                  src={"https://d3m0gx63bo3yvr.cloudfront.net/" + item.img_url}
                  width="600"
                />
                <div className="py-6 pb-3">
                  <h3 className="text-xl font-bold leading-none mb-1">
                    {item.job_title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.company_name}
                  </p>
                </div>
                <div className="w-full pt-3 mt-auto self-baseline flex justify-between items-end">
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
                        <span className="">{item.company_name}</span>
                        <time className="mx-4 pb-6 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {item.start_date} - {item.end_date}
                        </time>
                        <div className="p-3">
                          {item.skills.map((skill) => (
                            <Badge key={skill} className="mr-2 mt-2">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <DrawerDescription className="border p-2 max-h-[40vh] md:max-h-[80vh] rounded-xl overflow-y-scroll scrollbar-hide">
                          <ol className="relative border-s border-gray-200 dark:border-gray-700   ">
                            {item.description.map((point, index) => {
                              return (
                                <li className="mb-5 ms-4" key={index}>
                                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                  <p className="text-base font-normal text-gray-500 dark:text-gray-400 text-left">
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
