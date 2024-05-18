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

const Infoitem: React.FC<InfoitemProps> = ({ label, value, icon, percentage, time }) => {
  return (
    <div className={`flex flex-col w-[188px] h-[110px] md:w-[262px] md:h-[161px] p-2 md:p-4  bg-secondaryPool-foreground rounded-[14px]`}>
      <div key="label" className={`flex relative flex-row h-full justify-between`}>
        <div className="text-white font-bold space-y-2 md:space-y-4 ">
          <div className="text-xs md:text-base md:leading-[22px] text-[#B1BFB1]"> {label}</div>

          <div className="text-xl md:text-[28px] md:leading-[38px]">{value}</div>
        </div>
        {icon && (
          <div>
            <button className="flex p-2 md:p-4 mt-2 md:mb--3 rounded-2xl md:rounded-3xl bg-[#456346]  text-primary text-base leading-[26px] h-[fit-content] transition-transform transform-gpu hover:scale-105 active:scale-95 ">
              <img className="w-6 h-6  md:w-7 md:h-7 " src={`/assets/images/${icon}`} alt={label} />
            </button>
          </div>
        )}
      </div>

      <div className={`flex flex-row text-xs md:text-base text-white items-center`}>
        <div
          className={`flex items-center justify-center w-6 h-6 text-green-600 text-base md:text-2xl mr-1 md:mr-2  ${
            !value && "text-[#F93C65]"
          }`}
        >
          {value ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />}
        </div>
        <span className={`text-green-600 ${!value && "text-[#F93C65]"}`}> {percentage}% </span>
        &nbsp; Up from {time}
      </div>
    </div>
  );
};
export default Infoitem;
