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
import { registerSchema, registerType } from "./constant";
import { useRegisterMutation } from "@/api/auth/authService";
import toast from "react-hot-toast";

const signup = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: registerType) => {
    console.log("checkkkk", values);
    try {
      const response = await register(values).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
        router.push("/auth/about");
        toast.success(response?.message);
        localStorage.setItem("userInfo", JSON.stringify(response?.data));
      }

      console.log("submit");
    } catch (error: any) {
      toast.error(error?.data?.error);
      console.log("error", error);
    }
  };

  return (
    <div className=" flex w-100 p-10 h-screen justify-between">
      <div className="left flex flex-col w-5/12 gap-8 pl-10 pt-18">
        <Form {...form}>
          <h1 className="text-3xl mb-6">Create an account</h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="firstName" className="text-md">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="First name"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="lastName" className="text-md">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Last name"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="email" className="text-md">
                    Email address
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...field}
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="password" className="text-md">
                    password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="password"
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
              Create an account
            </Button>

            <div className="justify-center text-center flex flex-col gap-7">
              <p className="justify-center text-[#1E1E1E] text-sm">
                By creating an account, you agree to our{" "}
                <a href="" className="login-link text-[#108E61]">
                  Terms of Service and Privacy Policy
                </a>
              </p>

              <p className="justify-center tex-gray">
                Already have an account ?{" "}
                <a href="/auth/signin" className=" text-[#108E61]">
                  Login
                </a>{" "}
              </p>
            </div>
          </form>
        </Form>
      </div>
      <div className="right flex w-6/12 pr-8">
        <Image src={image} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default signup;
