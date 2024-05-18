import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import React from "react";
import Infoitem from "../m-pool-infobar-infoitem";
import { InfoitemProps } from "../m-pool-infobar-infoitem";
type InfoviewProps = {
  content: InfoitemProps[];
};

const Infoview: React.FC<InfoviewProps> = ({ content }) => {
  return (
    <div
      className="flex w-full flex-row    md:flex-wrap xl:flex-nowrap md:gap-5 gap-3 md:pb-[52px] pb-[27px] overflow-x-scroll  justify-center Xsm:pl-[480px] pl-[400px] sm:pl-10 md:pl-[20px] lg:pl-0"
      style={{ scrollbarWidth: "none" }}
    >
      {content.map((item, index) => (
        <div key={item.label + index} className="flex-shrink-0  ">
          <Infoitem label={item.label} value={item.value} icon={item.icon} percentage={item.percentage} time={item.time} />
        </div>
      ))}
    </div>
  );
};
export default Infoview;
