import React from "react";

const Status = () => {
  return (
    <div className="flex w-full border-b px-10">
      <div className="statusContainer border-r-2  w-1/4 pr-6  align-center flex flex-col my-4">
        <div className="top flex justify-between">
          <p className="font-thin tx-sm">DAILY SAVINGS</p>
          <p className="rounded text-xs bg-orange-100 text-orange-300 p-2">
            December
          </p>
        </div>
        <div className="down">
          <h1 className="text-1xl mt-6 mb-4">#10000</h1>
        </div>
      </div>
      <div className="statusContainer w-1/4 border-r-2 px-6  align-center flex flex-col my-4">
        <div className="top flex justify-between">
          <p className="font-thin tx-sm">DAILY SAVINGS</p>
          <p className="rounded text-xs bg-orange-100 text-orange-300 p-2">
            December
          </p>
        </div>
        <div className="down">
          <h1 className="text-1xl mt-6 mb-4">#10000</h1>
        </div>
      </div>
      <div className="statusContainer w-1/4 border-r-2 px-6  align-center flex flex-col my-4">
        <div className="top flex justify-between">
          <p className="font-thin tx-sm">DAILY SAVINGS</p>
          <p className="rounded text-xs bg-orange-100 text-orange-300 p-2">
            December
          </p>
        </div>
        <div className="down">
          <h1 className="text-1xl mt-6 mb-4">#10000</h1>
        </div>
      </div>
      <div className="statusContainer w-1/4 pl-6  align-center flex flex-col my-4">
        <div className="top flex justify-between">
          <p className="font-thin tx-sm">DAILY SAVINGS</p>
          <p className="rounded text-xs bg-orange-100 text-orange-300 p-2">
            December
          </p>
        </div>
        <div className="down">
          <h1 className="text-1xl mt-6 mb-4">#10000</h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
