import { FinancialStatistic } from "@atoms/a-financial-statistics-card/types";

const MOCK_STATISTICS: readonly FinancialStatistic[] = [
  {
    value: 40689,
    variant: "user",
    label: "Total Users",
    oldValue: 32549,
  },
  {
    value: 10293,
    variant: "order",
    label: "Loans Approved",
    oldValue: 9200,
  },

  {
    value: 89000,
    variant: "sales",
    label: "Loans Disbursed",
    oldValue: 92000,
    valuePrefix: "$",
  },
  {
    value: 2040,
    variant: "pending",
    label: "Loans Pending",
    oldValue: 1982,
  },
];

export default MOCK_STATISTICS;
