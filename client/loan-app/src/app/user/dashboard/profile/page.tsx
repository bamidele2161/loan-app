"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import UserDashboard from "../page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { updateSchema, updateType } from "./constant";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      state: "",
      lga: "",
    },
  });

  const onSubmit = async (values: updateType) => {
    console.log("checkkkk", values);
    try {
      console.log("submit");
    } catch (error) {}
  };

  return (
    <UserDashboard>
      <div className=" flex flex-col w-full gap-8 pl-10 pt-18 pr-10">
        <Form {...form}>
          <h1 className="text-xl pt-10 pb-8 ">My Profile</h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-6"
          >
            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="firstName" className="text-sm">
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
                    <Label htmlFor="lastName" className="text-sm">
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
            </div>

            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email" className="text-sm">
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
                name="dob"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="password" className="text-sm">
                      Date of Birth
                    </Label>
                    <Input
                      type="text"
                      id="password"
                      placeholder="10-10-1995"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>

            <div className=" w-full grid grid-cols-2 gap-20 ">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <div className="grid w-full items-center gap-3">
                    <Label htmlFor="password" className="text-sm">
                      State of Origin
                    </Label>
                    <Input
                      type="password"
                      id="password"
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
                    <Label htmlFor="password" className="text-sm">
                      Local Government Area
                    </Label>
                    <Input
                      type="text"
                      id="password"
                      placeholder="Ikeja"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="password" className="text-sm">
                    Address
                  </Label>
                  <Textarea placeholder="Type your address here." {...field} />
                </div>
              )}
            />
            <div className=" w-full grid grid-cols-2 gap-20 ">
              <Button
                variant="outline"
                className="bg-[#108E61] text-white mt-4"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </UserDashboard>
  );
};

export default Profile;
