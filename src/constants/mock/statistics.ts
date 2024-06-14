import { FinancialStatistic } from "@atoms/a-financial-statistics-card/types";

const MOCK_STATISTICS: readonly FinancialStatistic[] = [
  {
    value: 40689,
    variant: "user",
    label: "Total Users",
    yesterdaysValue: 32549,
  },
  {
    value: 10293,
    variant: "order",
    label: "Total Orders",
    yesterdaysValue: 9200,
  },
  {
    value: 89000,
    variant: "sales",
    label: "Total Sales",
    yesterdaysValue: 92000,
    valuePrefix: "$",
  },
  {
    value: 2040,
    variant: "pending",
    label: "Total Pending",
    yesterdaysValue: 1982,
  },
];

export default MOCK_STATISTICS;
