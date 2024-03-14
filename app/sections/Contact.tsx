"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { AvatarDemo } from "./Navabr";
import GithubIcon from "./../assests/github.svg";
import LinkedinIcon from "./../assests/linkedin.svg";
import TwitterIcon from "./../assests/twitter.svg";

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit } = useForm<FormData>();
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState<boolean>(false);

  const sendEmail = (data: FormData) => {
    const apiEndpoint = "/api/email";

    const today = new Date();
    const day = today.getDay();
    const daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const prepand = hour >= 12 ? " PM " : " AM ";
    const time =
      hour +
      ":" +
      minute.toString().padStart(2, "0") +
      ":" +
      second.toString().padStart(2, "0") +
      prepand;

    setisLoading(true);
    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        setisLoading(false);
        toast({
          title: response.message,
          description: daylist[day] + " , " + time,
        });
      })
      .catch((err) => {
        setisLoading(false);
        toast({
          title: err,
          description: daylist[day] + " , " + time,
        });
      });
  };

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div id="contact" className="w-full py-12 md:py-24 lg:py-24">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Contact Me
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="50"
            className="text-gray-500 dark:text-gray-400"
          >
            Send me a message or connect with me on social media.
          </p>
        </div>
        <div className="w-full flex flex-col md:grid grid-cols-7 place-items-center gap-1 mt-12">
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mx-auto md:ml-0 max-w-full self-start items-stretch col-span-3 space-y-6"
          >
            <Card className="w-full border-none">
              <CardContent className="flex flex-col items-center space-y-2">
                <AvatarDemo />
                <div className="text-center space-y-1">
                  <h2 className="text-lg font-semibold">
                    Eega Somasekhara Reddy
                  </h2>
                  <p className="text-sm text-gray-500">
                    Full-Stack Web Developer
                  </p>
                </div>
              </CardContent>
              <CardContent className="flex flex-col items-center space-y-2">
                <dl className="grid grid-cols-2 gap-1 text-sm text-start text-ellipsis">
                  <div className="font-medium">Email</div>
                  <Link
                    href="mailto:somasekhareega@gmail.com"
                    className="w-full overflow-hidden text-sm text-gray-500 text-ellipsis"
                  >
                    soma*****ega@gmail.com
                  </Link>
                  <div className="font-medium">Phone</div>
                  <Link
                    href="tel:+916303955065"
                    className="text-sm text-gray-500"
                  >
                    +916303955065
                  </Link>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-gray-500">
                    Bangalore, Karnataka, IN
                  </div>
                </dl>
              </CardContent>
              <CardContent className="flex justify-center space-x-4">
                <Link
                  className="rounded-full p-1 bg-gray-100 dark:bg-gray-800"
                  href="https://github.com/Somu050600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={GithubIcon} alt="Github" width={30} />
                </Link>
                <Link
                  className="rounded-full p-1 bg-gray-100 dark:bg-gray-800"
                  href="https://www.linkedin.com/in/somueega"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={LinkedinIcon} alt="Li" width={30} />
                </Link>
                <Link
                  className="rounded-full p-1 bg-gray-100 dark:bg-gray-800"
                  href="https://twitter.com/ESomu1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={TwitterIcon} alt="Twitter" width={30} />
                </Link>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link
                  href="mailto:somasekhareega@gmail.com"
                  className="px-16 py-2 rounded text-white bg-gray-900 hover:bg-gray-800"
                >
                  Hire Me
                </Link>
              </CardFooter>
            </Card>
          </div>
          <Separator orientation="vertical" className="my-4" />
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mx-auto max-w-[400px] self-start md:ml-0 col-span-3 space-y-6"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <Label className="text-sm self-center" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  required
                  {...register("name", { required: true })}
                />
                <Label className="text-sm self-center" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-sm mb-3" htmlFor="message">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  required
                  {...register("message", { required: true })}
                />
              </div>
              <Button
                className="mt-4 w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
