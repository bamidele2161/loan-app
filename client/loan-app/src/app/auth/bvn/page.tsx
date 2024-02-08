"use client";
import React from "react";
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
import { bvnSchema, bvnType } from "./constant";
import toast from "react-hot-toast";
import { useVerifyBvnMutation } from "@/api/profileService";
const BVN = () => {
  let emailValue: string;
  let firstnameValue: string;
  let lastnameValue: string;

  const router = useRouter();
  const [verifyBvn] = useVerifyBvnMutation();
  const form = useForm<z.infer<typeof bvnSchema>>({
    resolver: zodResolver(bvnSchema),
    defaultValues: {
      bvn: "",
    },
  });

  if (typeof window !== "undefined") {
    const userInfoJSON = localStorage.getItem("userInfo") as string;
    const userInfo = userInfoJSON !== undefined && JSON.parse(userInfoJSON);
    emailValue = userInfo.email;
    firstnameValue = userInfo.firstname;
    lastnameValue = userInfo.lastname;
  }

  const onSubmit = async (values: bvnType) => {
    console.log("checkkkk", values);
    const requiredData = {
      ...values,
      email: emailValue,
      firstname: firstnameValue,
      lastname: lastnameValue,
    };

    try {
      const response = await verifyBvn(requiredData).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
        router.push("/auth/create-pin");
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
              name="bvn"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="bvn" className="text-md">
                    Bank Verification Number (NIN)
                  </Label>
                  <Input
                    type="text"
                    id="bvn"
                    placeholder="12345678901"
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

export default BVN;
