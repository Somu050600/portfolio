"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/send-email";

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Contact Me
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Send me a message or connect with me on social media.
          </p>
        </div>
        <div className="mx-auto max-w-[400px] space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <Label className="text-sm" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                required
                {...register("name", { required: true })}
              />
              <Label className="text-sm" htmlFor="email">
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
            <div>
              <Label className="text-sm" htmlFor="message">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className=""
                required
                {...register("message", { required: true })}
              />
            </div>
            <Button className="mt-4 w-full" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
