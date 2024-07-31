import { gql } from "urql";

export const PoolAnalytics = gql`
  query PoolAnalytics(
    $opts: PoolAnalyticsFilterPoolAnalyticsOrderingListOptions
  ) {
    poolAnalytics(opts: $opts) {
      id
      totalContributors
      totalContributions
      totalApprovedLoans
      totalApprovedLoansValue
      totalLoansPendingApproval
      dateAdded
      lastUpdated
    }
  }
`;

export const ZaibatsuAnalytics = gql`
  query ZaibatsuAnalytics(
    $opts: ZaibatsuAnalyticsFilterZaibatsuAnalyticsOrderingListOptions
  ) {
    zaibatsuAnalytics(opts: $opts) {
      id
      totalUsers
      totalApprovedLoans
      totalApprovedLoansValue
      totalLoansPendingApproval
      dateAdded
      lastUpdated
    }
  }
`;

export const UserAnayltics = gql`
  query UserAnalytics(
    $opts: UserAnalyticsFilterUserAnalyticsOrderingListOptions
  ) {
    userAnalytics(opts: $opts) {
      id
      totalCreatedLoans
      totalApprovedLoans
      totalCollectedLoans
      totalApprovedLoansValue
      totalCollectedLoansValue
      totalUnapprovedLoans
      totalLoansAwaititngApproval
      dateAdded
      lastUpdated
    }
  }
`;
