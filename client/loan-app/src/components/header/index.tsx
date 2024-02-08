"use client";
import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiBell } from "react-icons/hi2";
import { FaRegBell, FaSearch, FaRegSun } from "react-icons/fa";
import Link from "next/link";
import { useGetProfileMutation } from "@/api/profileService";
import toast from "react-hot-toast";

const Header = () => {
  const [getProfile] = useGetProfileMutation();
  const [userData, setUserData] = useState<any>();
  let emailValue: string;
  if (typeof window !== "undefined") {
    const userInfoJSON = localStorage.getItem("userInfo") as string;
    const userInfo = userInfoJSON !== undefined && JSON.parse(userInfoJSON);
    emailValue = userInfo.email;
  }

  const handleGetProfile = async () => {
    const requiredData = {
      email: emailValue,
    };

    try {
      const response = await getProfile(requiredData).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
        toast.success(response?.message);
        setUserData(response?.data);
      }
    } catch (error: any) {
      toast.error(error?.data?.error);
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className="flex justify-between border-b w-full h-20 items-center px-10">
      <div className="left">
        <h1 className="text-xl">Hello, {userData?.firstName}</h1>
      </div>
      <div className="right flex gap-6 items-center">
        <HiSearch size={26} />
        <FaRegBell size={22} />
        <Link href="/user/dashboard/settings" className="settings">
          <FaRegSun size={22} />
        </Link>{" "}
        <div className="name rounded-full border-2 border-green-700 h-12 w-12 justify-center items-center flex">
          <p className="text-2xl">{userData?.firstName.slice(0, 1)}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
