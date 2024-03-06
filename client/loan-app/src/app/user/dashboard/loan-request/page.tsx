"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import UserDashboard from "../page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSchema, updateType } from "./constant";
import toast from "react-hot-toast";
import { useRequestLoanMutation } from "@/api/profileService";

const request = () => {
  let emailValue: string;
  const [requestLoan] = useRequestLoanMutation();
  const [fileLink, setFileLink] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      amount: "",
      firstguarantor: "",
      guarantoremail: "",
      secguarantor: "",
      secguarantoremail: "",
      duration: "",
      bankname: "",
      accountname: "",
      accountno: "",
    },
  });

  const convertToLink = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "t7wur6tn");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dgqbdxvnr/image/upload`,
      {
        method: "post",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
    return await res;
  };

  const handleFile = async (e: any) => {
    try {
      const file = e.target.files[0];
      const link = await convertToLink(file);
      setFileLink(link?.url);
      toast.success("File Uploaded successfully");
    } catch (error: any) {
      console.log(error);
    }
  };

  if (typeof window !== "undefined") {
    const userInfoJSON = localStorage.getItem("userInfo") as string;
    const userInfo = userInfoJSON !== undefined && JSON.parse(userInfoJSON);
    emailValue = userInfo.email;
  }

  const onSubmit = async (values: updateType) => {
    try {
      const requiredData = {
        amount: values.amount,
        firstguarantor: values.firstguarantor,
        guarantoremail: values.guarantoremail,
        secguarantor: values.secguarantor,
        secguarantoremail: values.secguarantoremail,
        duration: values.duration,
        bankname: values.bankname,
        accountname: values.accountname,
        accountno: values.accountno,
        userEmail: emailValue,
        bankStatement: fileLink,
      };
      const response = await requestLoan(requiredData).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
        router.push("/user/dashboard/loan");
        toast.success(response?.message);
      }

      console.log("submit");
    } catch (error: any) {
      toast.error(error?.data?.error);
      console.log("error", error);
    }
  };

  return (
    <UserDashboard>
      <div className=" flex flex-col w-full gap-8 pl-10 pt-18 pr-10">
        <Form {...form}>
          <h1 className="text-xl pt-10 pb-8 ">Loan Request</h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-6"
          >
            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="amount" className="text-sm">
                      Amount
                    </Label>
                    <Input
                      type="text"
                      id="amount"
                      placeholder="50000"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="firstguarantor"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="firstguarantor" className="text-sm">
                      First Guarantor
                    </Label>
                    <Input
                      type="text"
                      id="firstguarantor"
                      placeholder="Bamidele Daniel"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="guarantoremail"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="guarantoremail" className="text-sm">
                      First Guarantor Email
                    </Label>
                    <Input
                      type="email"
                      id="guarantoremail"
                      placeholder="Email"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="secguarantor"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="secguarantor" className="text-sm">
                      Second Guarantor
                    </Label>
                    <Input
                      type="text"
                      id="secguarantor"
                      placeholder="John Doe"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="secguarantoremail"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="password" className="text-sm">
                      Second Guarantor Email
                    </Label>
                    <Input
                      type="email"
                      id="secguarantoremail"
                      placeholder="Emmanuel"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a duration to to repay the loan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 month</SelectItem>
                        <SelectItem value="2">2 months</SelectItem>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="4">4 months</SelectItem>
                        <SelectItem value="5">5 month</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="7">7 months</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="bankname"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="bankname" className="text-sm">
                      Bank Name
                    </Label>
                    <Input
                      type="text"
                      id="bankname"
                      placeholder="GTBank"
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="accountno"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="accountno" className="text-sm">
                      Account number
                    </Label>
                    <Input
                      type="text"
                      id="accountno"
                      placeholder="1234567890"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="accountname"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="duration" className="text-sm">
                      Account name
                    </Label>
                    <Input
                      type="text"
                      id="accountname"
                      placeholder="Bamidele"
                      {...field}
                    />
                  </div>
                )}
              />
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="bankstatement" className="text-sm">
                  Bank Statement
                </Label>
                <Input id="picture" type="file" onChange={handleFile} />
              </div>
            </div>
            <div className=" w-full grid grid-cols-2 gap-20 ">
              <Button
                variant="outline"
                className="bg-[#108E61] text-white mt-4"
                type="submit"
              >
                Request
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </UserDashboard>
  );
};

export default request;
