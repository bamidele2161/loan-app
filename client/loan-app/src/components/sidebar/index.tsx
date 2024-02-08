"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/signin");
  };
  return (
    <div className="left flex flex-col w-2/12 gap-8 px-8 pt-6 pb-5 justify-between bg-[#108E61] text-white">
      <div className="top">
        <h1 className="text-2xl mb-10">BamsBank</h1>
        <ul className="navlink flex gap-2 flex-col">
          <li className="item hover:bg-[#499579] p-2 rounded">
            <Link href="/user/dashboard/savings" className="savings">
              Savings
            </Link>
          </li>
          <li className="item hover:bg-[#499579] p-2 rounded">
            <Link href="/user/dashboard/loan" className="loan">
              Loan
            </Link>{" "}
          </li>
          <li className="item hover:bg-[#499579] p-2 rounded">
            <Link href="/user/dashboard/profile" className="profile">
              My Profile
            </Link>
          </li>
          <li className="item hover:bg-[#499579] p-2 rounded">
            {" "}
            <Link href="/user/dashboard/settings" className="settings">
              Settings
            </Link>{" "}
          </li>
        </ul>
      </div>
      <div className="down">
        <p
          className="item hover:bg-[#499579] p-2 rounded cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
