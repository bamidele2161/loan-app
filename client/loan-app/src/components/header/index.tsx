import React from "react";
import { HiSearch } from "react-icons/hi";
import { HiBell } from "react-icons/hi2";
import { FaRegBell, FaSearch, FaRegSun } from "react-icons/fa";
import Link from "next/link";
const Header = () => {
  return (
    <div className="flex justify-between border-b w-full h-20 items-center px-10">
      <div className="left">
        <h1 className="text-xl">Hello, Bamidele</h1>
      </div>
      <div className="right flex gap-6 items-center">
        <HiSearch size={26} />
        <FaRegBell size={22} />
        <Link href="/user/dashboard/settings" className="settings">
          <FaRegSun size={22} />
        </Link>{" "}
        <div className="name rounded-full border-2 border-green-700 h-12 w-12 justify-center items-center flex">
          <p className="text-2xl">A</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
