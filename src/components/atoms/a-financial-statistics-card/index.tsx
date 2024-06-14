"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SolarUsersGroupRoundedBoldDuotone from "~icons/solar/users-group-rounded-bold-duotone.jsx";
import OuiTokenPackage from "~icons/oui/token-package.jsx";
import OcticonGraph24 from "~icons/octicon/graph-24.jsx";
import PhClockCounterClockwiseDuotone from "~icons/ph/clock-counter-clockwise-duotone.jsx";
import IconamoonTrendDownFill from "~icons/iconamoon/trend-down-fill.jsx";
import IconamoonTrendUpFill from "~icons/iconamoon/trend-up-fill.jsx";
import { FinancialStatistic } from "./types";

interface Props {
  data: FinancialStatistic;
}

function calcPercentage(newNume: number, oldNum: number) {
  return ((newNume - oldNum) / oldNum) * 100;
}

const FinancialStatisticCard: React.FC<Props> = ({ data }) => {
  const [performance, setPerformance] = React.useState(0);

  React.useEffect(() => {
    setPerformance(calcPercentage(data.value, data.yesterdaysValue));
  }, [data.value, data.yesterdaysValue]);

  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
        <div className="p-2 aspect-square text-2xl rounded-xl bg-primary/10">
          {data.variant === "user" ? (
            <SolarUsersGroupRoundedBoldDuotone />
          ) : data.variant === "order" ? (
            <OuiTokenPackage />
          ) : data.variant === "sales" ? (
            <OcticonGraph24 />
          ) : (
            <PhClockCounterClockwiseDuotone />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data.valuePrefix}
          {data.value.toLocaleString()}
        </div>
        <p className="text-xs flex mt-4 items-center gap-1 text-muted-foreground">
          <span
            data-down={performance < 0}
            className="text-green-600 data-[down=true]:text-red-600 flex items-center gap-1"
          >
            <span>
              {performance < 0 ? (
                <IconamoonTrendDownFill />
              ) : (
                <IconamoonTrendUpFill />
              )}
            </span>
            <span>{performance.toFixed(2).replace("-", "")}%</span>
          </span>
          <span>from yesterday</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default FinancialStatisticCard;
