import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from "@/assets/auth.png";
import Image from "next/image";
const forgotpassword = () => {
  return (
    <div className="border flex w-100 p-10 h-screen justify-between">
      <div className="left flex flex-col w-5/12 gap-8 pl-10 pt-20">
        <h1 className="text-3xl mb-6">Forgot Password</h1>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="email" className="text-md">
            Email address
          </Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <Button variant="outline" className="bg-[#108E61] text-white">
          Submit
        </Button>

        <div className="justify-center text-center flex flex-col gap-7">
          <p className="justify-center tex-gray">
            Remember credentials?{" "}
            <a href="/auth/signin" className="login-link text-[#108E61]">
              Sign in
            </a>{" "}
          </p>
        </div>
      </div>
      <div className="right flex w-2/4">
        <Image src={image} alt="" />
      </div>
    </div>
  );
};

export default forgotpassword;
