import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import React from "react";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
export type InfoitemProps = {
  label: string;
  value: string | number;
  icon?: string;
  percentage: string | number;
  time: string;
};

const Infoitem: React.FC<InfoitemProps> = ({
  label,
  value,
  icon,
  percentage,
  time,
}) => {
  return (
    <div
      className={`flex flex-col w-[262px] h-[161px] p-4  bg-secondaryPool-foreground rounded-[14px]`}
    >
      <div
        key="label"
        className={`flex relative flex-row h-full justify-between`}
      >
        <div className="text-white font-bold space-y-4 ">
          <div className="text-base leading-[22px] text-[#B1BFB1]">
            {" "}
            {label}
          </div>

          <div className="text-[28px] leading-[38px]">{value}</div>
        </div>
        {icon && (
          <div>
            <button className="flex p-4 mb--3 rounded-3xl bg-[#456346]  text-primary text-base leading-[26px] h-[fit-content] transition-transform transform-gpu hover:scale-105 active:scale-95 ">
              <img
                className=" w-7 h-7 "
                src={`/assets/images/${icon}`}
                alt={label}
              />
            </button>
          </div>
        )}
      </div>

      <div className={`flex flex-row text-white items-center`}>
        <div
          className={`w-6 h-6 text-green-600 text-2xl mr-2  ${
            !value && "text-[#F93C65]"
          }`}
        >
          {value ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />}
        </div>
        <span className={`text-green-600 ${!value && "text-[#F93C65]"}`}>
          {" "}
          {percentage}%{" "}
        </span>
        &nbsp; Up from {time}
      </div>
    </div>
  );
};
export default Infoitem;
