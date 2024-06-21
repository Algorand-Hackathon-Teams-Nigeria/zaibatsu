import FinancialStatisticCard from "@atoms/a-financial-statistics-card";
import MOCK_STATISTICS from "@constants/mock/statistics";

const FinancialStatisticsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {MOCK_STATISTICS.map((stat) => (
        <FinancialStatisticCard key={stat.label} data={stat} />
      ))}
    </div>
  );
};

export default FinancialStatisticsGrid;
