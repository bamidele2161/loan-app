import React from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
const UserDashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" flex w-100 h-screen justify-between">
      <Sidebar />
      <div className="right flex flex-col w-10/12 ">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default UserDashboard;
