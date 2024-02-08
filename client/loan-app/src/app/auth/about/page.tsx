"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from "@/assets/auth.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { aboutSchema, aboutType } from "./constant";
import toast from "react-hot-toast";
import { useAboutMutation } from "@/api/profileService";

const about = () => {
  let emailValue: string;
  const router = useRouter();
  const [addAbout] = useAboutMutation();
  const [email, setEmail] = useState<string>("");
  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      phone: "",
      kinName: "",
      occupation: "",
      kinPhone: "",
    },
  });

  if (typeof window !== "undefined") {
    const userInfoJSON = localStorage.getItem("userInfo");
    const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : {};
    console.log("dddd", userInfo);
    emailValue = userInfo.email;
  }

  const onSubmit = async (values: aboutType) => {
    console.log("checkkkk", values);
    const requiredData = {
      ...values,
      email: emailValue,
    };
    try {
      const response = await addAbout(requiredData).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
        router.push("/auth/address");
        toast.success(response?.message);
     
      }

      console.log("submit");
    } catch (error: any) {
      toast.error(error?.data?.error);
      console.log("error", error);
    }
  };
  return (
    <div className="border flex w-100 p-10 h-screen justify-between">
      <div className="left flex flex-col w-5/12 gap-8 pl-10 pt-18">
        <Form {...form}>
          <h1 className="text-3xl mb-6">let's get to know you more</h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="firstName" className="text-md">
                    Phone
                  </Label>
                  <Input
                    type="text"
                    id="phone"
                    placeholder="+234567890165"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="lastName" className="text-md">
                    Occupation
                  </Label>
                  <Input
                    type="text"
                    id="occupation"
                    placeholder="Software Developer"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="kinName"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="kinName" className="text-md">
                    Next of Kin's Name
                  </Label>
                  <Input
                    type="text"
                    id="kinName"
                    placeholder="John Doe"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="kinPhone"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="kinPhone" className="text-md">
                    Next of Kin's Phone
                  </Label>
                  <Input
                    type="text"
                    id="kinPhone"
                    placeholder="+23456789002"
                    {...field}
                  />
                </div>
              )}
            />

            <Button
              variant="outline"
              className="bg-[#108E61] text-white mt-6"
              type="submit"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
      <div className="right flex w-2/4">
        <Image src={image} alt="" />
      </div>
    </div>
  );
};

export default about;
