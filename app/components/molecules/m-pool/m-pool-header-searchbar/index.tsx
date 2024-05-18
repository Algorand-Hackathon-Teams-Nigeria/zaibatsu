import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import React from "react";
import CreatePool from "@/components/molecules/m-pool/m-pool-create-pool";

const Poolheader = () => {
  return (
    <div className={`flex flex-row  justify-between items-center mb-5 mt-10  space-x-6`}>
      <div className={`text-2xl items-center py-[10px] flex flex-row`}>Pool</div>

      <div className=" flex flex-row items-center">
        <CreatePool />
        {/*
          <div
          className={` max-w-[427px] h-[46px] bg-secondaryPool-foreground py-[15px] pl-[15px] text-sm leading-4 text-white rounded-[10px]`}
        >
          Search anything here
        </div> */}
      </div>
    </div>
  );
};
export default Poolheader;
