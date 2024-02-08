"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from "@/assets/auth.png";
import Image from "next/image";
import { loginSchema, loginType } from "./constant";
import { useRouter } from "next/navigation";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";

const signin = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: loginType) => {
    console.log("checkkkk", values);
    router.push("/user/dashboard");
    try {
      console.log("submit");
    } catch (error) {}
  };

  return (
    <div className="border flex w-100 p-10 h-screen justify-between">
      <div className="left flex flex-col w-5/12 gap-8 pl-10 pt-20">
        <Form {...form}>
          <h1 className="text-3xl mb-6">Login</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-8"
          >
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
                  <Input type="password" placeholder="password" {...field} />
                </div>
              )}
            />

            <Button
              type="submit"
              variant="outline"
              className="bg-[#108E61] text-white mt-6"
            >
              Login
            </Button>

            <div className="justify-center text-center flex flex-col gap-7">
              <a
                href="/auth/forgot-password"
                className="login-link text-[#108E61] flex justify-end"
              >
                forgot password?
              </a>

              <p className="justify-center tex-gray">
                Don't have an account ?{" "}
                <a href="/auth/signup" className="login-link text-[#108E61]">
                  Sign up
                </a>{" "}
              </p>
            </div>
          </form>
        </Form>
      </div>
      <div className="right flex w-2/4 pr-8">
        <Image src={image} alt="" className="w-full"  />
      </div>
    </div>
  );
};

export default signin;
