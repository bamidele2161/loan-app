import { Button } from "@/components/ui/button";
import React from "react";
import UserDashboard from "../page";
import TableComponent from "@/components/table";
import Status from "@/components/status";

const Savings = () => {
  const header = ["S/N", "Transaction ID", "Amount", "Date", "Time", "Status"];
  const body: any[] = [
    {
      receipt: 1,
      source: "46745667456",
      amount: 30000,
      currency: "NGN",
      date: "12-05-2023",
      time: "8pm",
      status: "Successful",
    },
    {
      receipt: 2,
      source: "46745667456",
      amount: 30000,
      currency: "NGN",
      date: "12-05-2023",
      time: "8pm",
      status: "Unsuccessful",
    },
  ];

  const newData = body?.map((item: any, index: number) => [
    index + 1,
    item.source,
    item.amount,
    item.date,
    item.time,
    <div
      className="rounded-md flex align-center justify-center p-1"
      style={{
        background:
          item?.status === "Successful"
            ? "rgba(1, 178, 114, 0.2)"
            : "rgba(231, 175, 164, 0.3)",
        color: item?.status === "Successful" ? "green" : "red",
      }}
    >
      {item?.status}
    </div>,

    item?.dateCreated?.slice(0, 10),
  ]);
  return (
    <UserDashboard>
      <div className="flex justify-between border w-full h-16 items-center px-10">
        <div className="left">
          <h1 className="text-1xl">Savings</h1>
        </div>
        <div className="right">
          <div className="flex  gap-6 items-center justify-center flex-row w-full">
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
      <Status />
      <TableComponent
        title="Transaction History"
        header={header}
        body={newData}
      />
    </UserDashboard>
  );
};

export default Savings;
