import { gql } from "urql";

export const POOL_LOAN_TEMPLATE_PROPOSALS = gql`
  query PoolTemplateProposals(
    $opts: PoolLoanTemplateProposalFilterPoolLoanTemplateProposalOrderingListOptions!
  ) {
    poolTemplateProposals(opts: $opts) {
      id
      startTime
      endTime
      totalVotes
      open
      dateAdded
      lastUpdated
    }
  }
`;

export const POOLS = gql`
  query Pools(
    $assetOpts: NoneTypeNoneTypeListOptions
    $opts: PoolFilterPoolOrderingListOptions
  ) {
    pools(opts: $opts) {
      assets(opts: $assetOpts) {
        imageUrl
        unitName
        id
      }
      name
      totalLoanTemplates
      netValue
      id
      totalContributors
    }
  }
`;

export const POOL = gql`
  query Pool($poolId: ID!, $assetOpts: NoneTypeNoneTypeListOptions) {
    pool(poolId: $poolId) {
      assets(opts: $assetOpts) {
        imageUrl
        unitName
        id
      }
      totalLoansValue
      totalLoanTemplates
      totalContributors
      totalContributions
      netValue
      name
      id
      dateAdded
      manager {
        id
        address
      }
    }
  }
`;
