import { Button } from "@/components/ui/button";
import React from "react";
import TableComponent from "@/components/table";
import UserDashboard from "@/app/user/dashboard/page";
import StaffStatus from "@/components/status/staffStatus";

const Staff = () => {
  const header = ["S/N", "Transaction ID", "Amount", "Date", "Time", "Action"];

  const body: any[] = [
    {
      receipt: 1,
      source: "46745667456",
      amount: 30000,
      date: "12-05-2023",
      time: "8pm",
      accountNumber: "1234567890",
      status: "Rejected",
    },
    {
      receipt: 2,
      source: "46745667456",
      amount: 30000,
      date: "12-05-2023",
      time: "8pm",
      accountNumber: "1234567890",
      status: "Approved",
    },
  ];

  const newData = body?.map((item: any, index: number) => [
    index + 1,
    item.source,
    item.amount,
    item.date,
    item.accountNumber,
    <div className="right">
      <div className="flex gap-2 items-center justify-center flex-row w-full">
        <Button
          variant="outline"
          className="bg-white text-black "
          type="submit"
        >
          Reject
        </Button>
        <Button
          variant="outline"
          className="bg-[#108E61] text-white"
          type="submit"
        >
          Approve
        </Button>
      </div>
    </div>,

    item?.dateCreated?.slice(0, 10),
  ]);

  return (
    <UserDashboard>
      <div className="flex justify-between border-b w-full h-16 items-center px-10 py-4">
        <div className="left">
          <h1 className="text-1xl">Loan Management</h1>
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
      <StaffStatus />
      <TableComponent
        title="Transaction History"
        header={header}
        body={newData}
      />
    </UserDashboard>
  );
};

export default Staff;
