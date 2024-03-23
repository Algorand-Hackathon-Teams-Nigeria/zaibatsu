import { Button } from "@ui/button";
import { Dialog } from "@ui/dialog";
import React from "react";
import Infoview from "./m-pool-infobar-view";
const Infobar = () => {
  const InfoViewvars: any = [
    {
      label: "Total User",
      value: "60,000",
      icon: "people.svg",
      percentage: "8",
      time: "yesterday",
    },
    {
      label: "Total Supply",
      value: "0.00",
      icon: "cube.svg",
      percentage: "8",
      time: "yesterday",
    },
    {
      label: "Total Borrow",
      value: "0.00",
      icon: "chart.svg",
      percentage: "8",
      time: "yesterday",
    },
    {
      label: "Total Borrow",
      value: "0.00",
      icon: "history.svg",
      percentage: "8",
      time: "yesterday",
    },
  ];
  return (
    <div className={`flex overflow-scroll w-auto`}>
      <Infoview content={InfoViewvars} />
    </div>
  );
};
export default Infobar;
