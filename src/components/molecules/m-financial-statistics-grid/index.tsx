import { FinancialStatistic } from "@/components/atoms/a-financial-statistics-card/types";
import FinancialStatisticCard, {
  FinancialStatisticCardSkeleton,
} from "@atoms/a-financial-statistics-card";
import MOCK_STATISTICS from "@constants/mock/statistics";
import React from "react";

interface Props {
  stats?: FinancialStatistic[];
  fetching?: boolean;
}
const FinancialStatisticsGrid: React.FC<Props> = ({ stats, fetching }) => {
  return (
    <div className="grid gap-4 grid-cols-2 md:gap-8 xl:grid-cols-4">
      {fetching
        ? Array.from({ length: 4 }).map((_, id) => (
          <FinancialStatisticCardSkeleton key={id} />
        ))
        : (stats ?? MOCK_STATISTICS).map((stat) => (
          <FinancialStatisticCard key={stat.label} data={stat} />
        ))}
    </div>
  );
};

export default FinancialStatisticsGrid;
