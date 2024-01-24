import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from "@/assets/auth.png";
import Image from "next/image";
const BVN = () => {
  return (
    <div className="border flex w-100 p-10 h-screen justify-between">
      <div className="left flex flex-col w-5/12 gap-8 pl-10 pt-20">
        <h1 className="text-3xl mb-6">Verify your BVN</h1>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="fullName" className="text-md">
            Bank verification number (NIN)
          </Label>
          <Input type="text" id="nin" placeholder="12345678901" />
        </div>

        <Button variant="outline" className="bg-[#108E61] text-white">
          Next
        </Button>

        <div className="justify-center text-center flex flex-col gap-7">
          <a href="/auth/nin/confirm-nin" className="">
            Back
          </a>{" "}
        </div>
      </div>
      <div className="right flex w-2/4">
        <Image src={image} alt="" />
      </div>
    </div>
  );
};

export default BVN;
