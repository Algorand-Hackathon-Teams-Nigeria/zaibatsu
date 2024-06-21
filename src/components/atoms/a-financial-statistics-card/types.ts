export type FinancialStatistic = {
  label: string;
  value: number;
  valuePrefix?: string;
  variant: "user" | "order" | "sales" | "pending";
  yesterdaysValue: number;
};
