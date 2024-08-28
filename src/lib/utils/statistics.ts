import { FinancialStatistic } from "@/components/atoms/a-financial-statistics-card/types";
import {
  ZaibatsuAnalyticsQuery,
  UserAnalyticsQuery,
  PoolAnalyticsQuery,
} from "@/services/graphql/generated";

/**
 * Type representing the base types for analytics data from different queries.
 * Combines types from ZaibatsuAnalyticsQuery, PoolAnalyticsQuery, and UserAnalyticsQuery.
 */
type AnalyticsType =
  | ZaibatsuAnalyticsQuery["zaibatsuAnalytics"][number]
  | PoolAnalyticsQuery["poolAnalytics"][number]
  | UserAnalyticsQuery["userAnalytics"][number];

/**
 * Utility type to extract the keys of AnalyticsType.
 */
type AnalyticsFieldKey<T extends AnalyticsType> = keyof T;

/**
 * Configuration type for mapping an analytics field to a specific statistic representation.
 * @template T - The specific analytics type.
 * @property {AnalyticsFieldKey<T>} field - The field name in the analytics object.
 * @property {"user" | "order" | "sales" | "pending"} variant - The type of statistic (user, order, sales, pending).
 * @property {string} label - The label for the statistic.
 * @property {string} [valuePrefix] - An optional prefix for the value, e.g., "$".
 */
type AnalyticsFieldConfig<T extends AnalyticsType> = {
  field: AnalyticsFieldKey<T>;
  variant: "user" | "order" | "sales" | "pending";
  label: string;
  valuePrefix?: string;
};

/**
 * Generates an array of financial statistics from the provided analytics data.
 * @template T - The specific analytics type.
 * @param {T[]} analytics - The analytics data array.
 * @param {AnalyticsFieldConfig<T>[]} fieldConfigs - The configuration for the fields to include in the statistics.
 * @returns {FinancialStatistic[]} An array of financial statistics based on the provided analytics data.
 */
function generateStatistics<T extends AnalyticsType>(
  analytics: T[],
  fieldConfigs: AnalyticsFieldConfig<T>[]
): FinancialStatistic[] {
  if (analytics.length === 0) {
    return [];
  }

  const last = analytics[analytics.length - 1];
  const secondToLast =
    analytics.length > 1 ? analytics[analytics.length - 2] : null;

  return fieldConfigs.map(({ field, variant, label, valuePrefix }) => ({
    value: Number(last[field]) || 0, // Ensure the value is a number
    variant,
    label,
    oldValue: secondToLast ? Number(secondToLast[field]) || 0 : 0, // Ensure the old value is a number
    valuePrefix,
  }));
}

/**
 * Generates financial statistics for Zaibatsu analytics data.
 * @param {ZaibatsuAnalyticsQuery["zaibatsuAnalytics"][number][]} analytics - The Zaibatsu analytics data array.
 * @returns {FinancialStatistic[]} An array of financial statistics.
 */
export function generateZaibatsuStatistics(
  analytics: ZaibatsuAnalyticsQuery["zaibatsuAnalytics"][number][]
): FinancialStatistic[] {
  return generateStatistics(analytics, [
    { field: "totalUsers", variant: "user", label: "Total Users" },
    { field: "totalApprovedLoans", variant: "order", label: "Loans Approved" },
    {
      field: "totalApprovedLoansValue",
      variant: "sales",
      label: "Loans Disbursed",
      valuePrefix: "$",
    },
    {
      field: "totalLoansPendingApproval",
      variant: "pending",
      label: "Loans Pending",
    },
  ]);
}

/**
 * Generates financial statistics for Pool analytics data.
 * @param {PoolAnalyticsQuery["poolAnalytics"][number][]} analytics - The Pool analytics data array.
 * @returns {FinancialStatistic[]} An array of financial statistics.
 */
export function generatePoolStatistics(
  analytics: PoolAnalyticsQuery["poolAnalytics"]
): FinancialStatistic[] {
  return generateStatistics(analytics, [
    {
      field: "totalContributors",
      variant: "user",
      label: "Total Contributors",
    },
    {
      field: "totalContributions",
      variant: "user",
      label: "Total Contribution",
    },
    { field: "totalApprovedLoans", variant: "order", label: "Loans Approved" },
    {
      field: "totalApprovedLoansValue",
      variant: "sales",
      label: "Loans Disbursed",
      valuePrefix: "$",
    },
  ]);
}

/**
 * Generates financial statistics for User analytics data.
 * @param {UserAnalyticsQuery["userAnalytics"][number][]} analytics - The User analytics data array.
 * @returns {FinancialStatistic[]} An array of financial statistics.
 */
export function generateUserStatistics(
  analytics: UserAnalyticsQuery["userAnalytics"][number][]
): FinancialStatistic[] {
  return generateStatistics(analytics, [
    { field: "totalCreatedLoans", variant: "user", label: "Created Loans" },
    { field: "totalApprovedLoans", variant: "user", label: "Approved Loans" },
    {
      field: "totalUnapprovedLoans",
      variant: "order",
      label: "Unapproved Loans",
    },
    {
      field: "totalCollectedLoans",
      variant: "order",
      label: "Collected Loans",
    },
    {
      field: "totalApprovedLoansValue",
      variant: "sales",
      label: "Loans Value",
      valuePrefix: "$",
    },
    {
      field: "totalCollectedLoansValue",
      variant: "sales",
      label: "Collected Loans Value",
      valuePrefix: "$",
    },
    {
      field: "totalLoansAwaititngApproval",
      variant: "pending",
      label: "Loans Approval Pending",
    }, // Corrected field name
  ]);
}
