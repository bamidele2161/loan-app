import { Button } from "@/components/ui/button";
import React from "react";
import UserDashboard from "../page";
import TableComponent from "@/components/table";
import Status from "@/components/status";

const Loan = () => {
  return (
    <UserDashboard>
      <div className="flex justify-between border-b w-full h-16 items-center px-10 py-4">
        <div className="left">
          <h1 className="text-1xl">Loan</h1>
        </div>
        <div className="right">
          <div className="flex gap-6 items-center justify-center flex-row w-full">
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
              Ask for loan
            </Button>
          </div>
        </div>
      </div>
      <Status />
      <TableComponent title="Transaction History" />
    </UserDashboard>
  );
};

export default Loan;
