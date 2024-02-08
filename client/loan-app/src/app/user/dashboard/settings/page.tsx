import { Button } from "@/components/ui/button";
import React from "react";
import UserDashboard from "../page";

const Settings = () => {
  return (
    <UserDashboard>
      <div className="flex justify-between border w-full h-16 items-center px-10">
        <div className="left">
          <h1 className="text-1xl">Savings</h1>
        </div>
        <div className="right">
          <div className="flex border gap-6 items-center justify-center flex-row w-full">
            <Button
              variant="outline"
              className="bg-white text-black "
              type="submit"
            >
              Withdraw
            </Button>
            <Button
              variant="outline"
              className="bg-[#108E61] text-white"
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default Settings;
