"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import UserDashboard from "../page";
import TableComponent from "@/components/table";
import Status from "@/components/status";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetloanMutation } from "@/api/profileService";
import toast from "react-hot-toast";

const Loan = () => {
  const router = useRouter();
  const [loanData] = useGetloanMutation();
  const [userLoan, setUserData] = useState<any>([]);
  const header = ["S/N", "Transaction ID", "Amount", "Date", "Time", "Status"];
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
      const response = await loanData(requiredData).unwrap();
      console.log(response);
      if (response?.statusCode === 200) {
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

  const body: any[] = [
    {
      receipt: 1,
      source: "46745667456",
      amount: 30000,
      currency: "NGN",
      date: "12-05-2023",
      time: "8pm",
      status: "Rejected",
    },
    {
      receipt: 2,
      source: "46745667456",
      amount: 30000,
      currency: "NGN",
      date: "12-05-2023",
      time: "8pm",
      status: "Approved",
    },
  ];

  const draft = body?.map((item: any, index: number) => [
    index + 1,
    item._id,
    item.amount,
    item.date,
    item.time,
    <div
      className="rounded-md flex align-center justify-center p-1"
      style={{
        background:
          item?.status === "Approved"
            ? "rgba(1, 178, 114, 0.2)"
            : item?.status === "Pending"
            ? "rgba(215, 231, 164, 0.3)"
            : "rgba(231, 175, 164, 0.3)",
        color:
          item?.status === "Approved"
            ? "green"
            : item?.status === "Pending"
            ? "yellow"
            : "red",
      }}
    >
      {item?.status}
    </div>,
  ]);

  const newData = userLoan?.map((item: any, index: number) => [
    index + 1,
    item._id,
    item.amount,
    item.createdAt.slice(0, 10),
    item.createdAt.slice(14, 22),
    <div
      className="rounded-md flex align-center justify-center p-1"
      style={{
        background:
          item?.status === "Approved"
            ? "rgba(1, 178, 114, 0.2)"
            : item?.status === "Pending"
            ? "rgba(215, 231, 164, 0.3)"
            : "rgba(231, 175, 164, 0.3)",
        color:
          item?.status === "Approved"
            ? "green"
            : item?.status === "Pending"
            ? "orange"
            : "red",
      }}
    >
      {item?.status}
    </div>,
  ]);

  const handleProceed = () => {
    router.push("/user/dashboard/loan-request");
  };
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
              <Dialog>
                <DialogTrigger>Ask for Loan </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      Loan Information
                    </DialogTitle>
                    <DialogDescription>
                      <ul className=" flex flex-col gap-6 mt-4">
                        <li className="item">
                          {" "}
                          You cannot be granted, if you don't meet the normal
                          requirements.
                        </li>
                        <li className="item">
                          {" "}
                          you need to upload a bank statement.
                        </li>
                        <li className="item">
                          {" "}
                          A background check will be done, within 12hrs. a loan
                          can be rejected or approved
                        </li>
                        <li className="item">
                          {" "}
                          You have to earn more than #100,000 before you have
                          access to 1 million and above loans.
                        </li>
                      </ul>

                      <div className="flex justify-center align-center">
                        <Button
                          variant="outline"
                          className="bg-[#108E61] text-white"
                          type="submit"
                          onClick={handleProceed}
                        >
                          Proceed
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Button>
          </div>
        </div>
      </div>
      <Status />
      <TableComponent
        title="Transaction History"
        header={header}
        body={newData ? newData : draft}
      />
    </UserDashboard>
  );
};

export default Loan;
