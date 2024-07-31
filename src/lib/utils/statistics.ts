import { FinancialStatistic } from "@/components/atoms/a-financial-statistics-card/types";
import {
  ZaibatsuAnalyticsType,
  PoolAnalyticsType,
  UserAnalyticsType,
} from "@/services/graphql/generated";

export function generateZaibatsuStatistics(
  analytics: ZaibatsuAnalyticsType[]
): FinancialStatistic[] {
  if (analytics.length === 0) {
    return [];
  }

  const last = analytics[analytics.length - 1];
  const secondToLast =
    analytics.length > 1 ? analytics[analytics.length - 2] : null;
  console.log("last is: ", last, " second to last is: ", secondToLast);
  return [
    {
      value: last.totalUsers,
      variant: "user",
      label: "Total Users",
      oldValue: secondToLast != null ? secondToLast.totalUsers : 0,
    },
    {
      value: last.totalApprovedLoans,
      variant: "order",
      label: "Loans Approved",
      oldValue: secondToLast != null ? secondToLast.totalApprovedLoans : 0,
    },
    {
      value: last.totalApprovedLoansValue,
      variant: "sales",
      label: "Loans Disbursed",
      oldValue: secondToLast != null ? secondToLast.totalApprovedLoansValue : 0,
      valuePrefix: "$",
    },
    {
      value: last.totalLoansPendingApproval,
      variant: "pending",
      label: "Loans Pending",
      oldValue:
        secondToLast != null ? secondToLast.totalLoansPendingApproval : 0,
    },
  ];
}

export function generatePoolStatistics(
  analytics: PoolAnalyticsType[]
): FinancialStatistic[] {
  if (analytics.length === 0) {
    return [];
  }

  const last = analytics[analytics.length - 1];
  const secondToLast =
    analytics.length > 1 ? analytics[analytics.length - 2] : null;

  return [
    {
      value: last.totalContributors,
      variant: "user",
      label: "Total Contributors",
      oldValue: secondToLast != null ? secondToLast.totalContributors : 0,
    },
    {
      value: last.totalContributions,
      variant: "user",
      label: "Total Contribution",
      oldValue: secondToLast != null ? secondToLast.totalContributors : 0,
    },
    {
      value: last.totalApprovedLoans,
      variant: "order",
      label: "Loans Approved",
      oldValue: secondToLast != null ? secondToLast.totalApprovedLoans : 0,
    },
    {
      value: last.totalApprovedLoansValue,
      variant: "sales",
      label: "Loans Disbursed",
      oldValue: secondToLast != null ? secondToLast.totalApprovedLoansValue : 0,
      valuePrefix: "$",
    },
    /**   {
      value: last.totalLoansPendingApproval,
      variant: "pending",
      label: "Loans Pending",
      oldValue:
        secondToLast != null ? secondToLast.totalLoansPendingApproval : 0,
   }, */
  ];
}

export function generateUserStatistics(
  analytics: UserAnalyticsType[]
): FinancialStatistic[] {
  if (analytics.length === 0) {
    return [];
  }

  const last = analytics[analytics.length - 1];
  const secondToLast =
    analytics.length > 1 ? analytics[analytics.length - 2] : null;

  return [
    {
      value: last.totalCreatedLoans,
      variant: "user",
      label: "Created Loans",
      oldValue: secondToLast != null ? secondToLast.totalCreatedLoans : 0,
    },
    {
      value: last.totalApprovedLoans,
      variant: "user",
      label: "Approved Loans",
      oldValue: secondToLast != null ? secondToLast.totalApprovedLoans : 0,
    },
    {
      value: last.totalUnapprovedLoans,
      variant: "order",
      label: "Unapproved Loans",
      oldValue: secondToLast != null ? secondToLast.totalUnapprovedLoans : 0,
    },
    {
      value: last.totalCollectedLoans,
      variant: "order",
      label: "Collected Loans",
      oldValue: secondToLast != null ? secondToLast.totalCollectedLoans : 0,
    },
    {
      value: last.totalApprovedLoansValue,
      variant: "sales",
      label: "Loans Value",
      oldValue: secondToLast != null ? secondToLast.totalApprovedLoansValue : 0,
      valuePrefix: "$",
    },
    {
      value: last.totalCollectedLoansValue,
      variant: "sales",
      label: "Collected Loans Value",
      oldValue:
        secondToLast != null ? secondToLast.totalCollectedLoansValue : 0,
      valuePrefix: "$",
    },
    {
      value: last.totalLoansAwaititngApproval,
      variant: "pending",
      label: "Loans Approval Pending",
      oldValue:
        secondToLast != null ? secondToLast.totalLoansAwaititngApproval : 0,
    },
  ];
}
