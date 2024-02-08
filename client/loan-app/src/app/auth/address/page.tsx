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
import { addressSchema, addressType } from "./constant";
import toast from "react-hot-toast";
import { useAddressMutation } from "@/api/profileService";

const address = () => {
  let emailValue: string;
  const router = useRouter();
  const [addProfile] = useAddressMutation();
  const [email, setEmail] = useState<string>("");
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      state: "",
      lga: "",
      town: "",
      dob: "",
    },
  });

  if (typeof window !== "undefined") {
    const userInfoJSON = localStorage.getItem("userInfo");
    const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : {};
    emailValue = userInfo.email;
  }

  const onSubmit = async (values: addressType) => {
    console.log("checkkkk", values);
    const requiredData = {
      ...values,
      email: emailValue,
    };
    try {
      const response = await addProfile(requiredData).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
        router.push("/auth/bvn");
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
              name="state"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="firstName" className="text-md">
                    State of Origin
                  </Label>
                  <Input
                    type="text"
                    id="state"
                    placeholder="Lagos"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="lga" className="text-md">
                    Local Government Area
                  </Label>
                  <Input type="text" id="lga" placeholder="Ikeja" {...field} />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="town" className="text-md">
                    Home Town
                  </Label>
                  <Input
                    type="text"
                    id="town"
                    placeholder="Ikorodu"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="dob" className="text-md">
                    Date of Birth
                  </Label>
                  <Input
                    type="text"
                    id="dob"
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

export default address;
