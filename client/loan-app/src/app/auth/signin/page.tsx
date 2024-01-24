"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from "@/assets/auth.png";
import Image from "next/image";
import { loginSchema, loginType } from "./constant";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";

const signin = () => {
  const router = useRouter();
  const form = useForm<loginType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    console.log("checkkkk");
    // try {
    //   console.log("submit");
    //   router.push("/auth/about");
    // } catch (error) {}
  };

  return (
    <div className="border flex w-100 p-10 h-screen justify-between">
      <div
        className="left flex flex-col w-5/12 gap-8 pl-10 pt-20"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
          <h1 className="text-3xl mb-6">Login</h1>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email" className="text-md">
              Email address
            </Label>
            <Input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email" className="text-md">
              password
            </Label>
            <Input type="password" name="password" placeholder="password" />
          </div>

          <Button
            type="submit"
            variant="outline"
            className="bg-[#108E61] text-white"
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
        </Form>
      </div>
      <div className="right flex w-2/4">
        <Image src={image} alt="" />
      </div>
    </div>
  );
};

export default signin;
