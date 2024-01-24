import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import image from "@/assets/auth.png";
import Image from "next/image";
const about = () => {
  return (
    <div className="border flex w-100 p-10 h-screen justify-between">
      <div className="left flex flex-col w-5/12 gap-8 pl-10 pt-20">
        <h1 className="text-3xl mb-6">Let's get to know you more</h1>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="fullName" className="text-md">
            Full Name
          </Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="phone" className="text-md">
            Phone Number
          </Label>
          <Input type="text" id="phone" placeholder="password" />
        </div>
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="kin" className="text-md">
            Next of Kin
          </Label>
          <Input type="text" id="kin" placeholder="kin" />
        </div>

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="occupation" className="text-md">
            Occupation
          </Label>
          <Input type="text" id="occupation" placeholder="occupation" />
        </div>

        <Button variant="outline" className="bg-[#108E61] text-white">
          Next
        </Button>
      </div>
      <div className="right flex w-2/4">
        <Image src={image} alt="" />
      </div>
    </div>
  );
};

export default about;
