import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import React from "react";
const Poolheader = () => {
  return (
    <div className={`flex flex-row  justify-between  mb-[16px] `}>
      <div className={`text-2xl  py-[10px]`}>Pool</div>
      <div
        className={`w-[427px] h-[46px] bg-secondaryPool-foreground py-[15px] pl-[15px] text-sm leading-4 text-white rounded-[10px]`}
      >
        &nbsp;&nbsp;&nbsp;&nbsp; Search anything here
      </div>
    </div>
  );
};
export default Poolheader;
