"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
import { useTheme } from "@/lib/theme";
import { LinkForwardIcon } from "hugeicons-react";

export interface ProjectsModel {
  id: Number;
  project_title: string;
  brief_desc: string;
  start_date: string;
  skills: string[];
  img_url: string;
  project_url: string;
  project_website?: string;
  description: string[];
}

const Projects = () => {
  const [data, setData] = useState<ProjectsModel[]>();
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const { isDark, currentTheme } = useTheme();

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
          isDark ? "rgb(0, 0, 0, 0.95)" : "rgb(255, 255, 255, 0.95)"
        );
        (card as HTMLElement).style.setProperty(
          "--bg-hover",
          currentTheme.colors.primary.base
        );
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
  }, [isDark, currentTheme.colors.primary.base]);

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
            className="text-muted-foreground"
          >
            Sleek and modern.
          </p>
        </div>
        <div
          ref={cardsRef}
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {data?.map((item, index) => {
            return (
              <div
                key={item.brief_desc}
                data-aos="fade-up"
                data-aos-offset="50"
                data-aos-delay={index * 100}
                data-aos-duration={300 + index * 100}
                className="flex flex-col p-4 group overflow-hidden rounded-xl shadow-lg border card"
              >
                <Image
                  unoptimized
                  alt={`Project ${index + 1}`}
                  className="img_skeleton object-cover object-top  aspect-[3/2] bg-gray-250 rounded-lg"
                  height="400"
                  src={"https://d3m0gx63bo3yvr.cloudfront.net/" + item.img_url}
                  width="600"
                />
                <div className="py-6 pb-3">
                  <h3 className="text-xl font-bold leading-none mb-1">
                    {item.project_title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.brief_desc}
                  </p>
                </div>
                <div className="w-full pt-3 mt-auto self-baseline flex flex-row justify-between items-center gap-2">
                  <Drawer>
                    <DrawerTrigger>
                      <Button variant={"link"} className="p-0">
                        View details
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex items-center">
                      <DrawerHeader className="w-full md:w-[60vw]">
                        <DrawerTitle className=" text-xl">
                          {item.project_title}
                        </DrawerTitle>
                        <time className="mx-4 pb-6 text-sm font-normal leading-none text-muted-foreground">
                          {item.start_date}
                        </time>
                        <div className="p-3 ">
                          {item.skills.map((skill) => (
                            <Badge key={skill} className="mr-2 mt-2">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <DrawerDescription className="border p-2 max-h-[40vh] md:max-h-[80vh] rounded-xl overflow-y-scroll scrollbar-hide">
                          <ol className="relative border-s border-border">
                            {item.description.map((point, index) => {
                              return (
                                <li className="mb-5 ms-4" key={index}>
                                  <div className="absolute w-3 h-3 bg-surface rounded-full mt-1.5 -start-1.5 border border-background"></div>
                                  <p className="text-base font-normal text-muted-foreground text-left">
                                    {point}
                                  </p>
                                </li>
                              );
                            })}
                          </ol>
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter className="w-full md:w-[60vw]">
                        <div className="flex flex-row items-center justify-center w-full gap-x-10">
                          <Link
                            href={item.project_url}
                            target="_blanck"
                            className="self-center py-2"
                          >
                            Project -{">"}
                          </Link>
                          {item?.project_website && (
                            <Link
                              href={item.project_website}
                              target="_blanck"
                              className="self-center py-2"
                            >
                              Website -{">"}
                            </Link>
                          )}
                        </div>
                        <DrawerClose>
                          <Button variant="default" className="w-64">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  {item?.project_website && (
                    <Link
                      href={item.project_website}
                      target="_blanck"
                      className="self-center py-2"
                    >
                      <LinkForwardIcon />
                    </Link>
                  )}
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
