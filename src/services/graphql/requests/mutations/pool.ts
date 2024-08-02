import { gql } from "urql";

export const NEW_POOL = gql`
  mutation NewPool($input: NewPoolInput!) {
    newPool(input: $input) {
      manager {
        address
        id
      }
      id
      name
    }
  }
`;

export const NEW_POOL_CONTRIBUTION = gql`
  mutation NewPoolContribution($input: PoolContributionInput!) {
    newPoolContribution(input: $input) {
      id
    }
  }
`;

export const CREATE_UPDATE_POOL_LOAN_TEMPLATE_PROPOSAL = gql`
  mutation CreateUpdatePoolLoanTemplateProposal(
    $input: PoolLoanTemplateProposalInput!
  ) {
    createUpdatePoolLoanTemplateProposal(input: $input) {
      id
    }
  }
`;

export const NEW_POOL_LOAN_TEMPLATE_PROPOSAL_VOTE = gql`
  mutation NewPoolLoanTemplateProposalVote(
    $input: PoolLoanTemplateProposalVoteInput!
  ) {
    newPoolLoanTemplateProposalVote(input: $input) {
      assetId
    }
  }
`;

export const WITHDRAW_FROM_POOL = gql`
  mutation Mutation($input: WithdrawFromPoolInput!) {
    withdrawFromPool(input: $input) {
      id
      userAddress
      assetAmount
      dateAdded
      lastUpdated
      pool {
        id
        name
        dateAdded
        lastUpdated
        manager {
          address
          id
        }
        netValue
      }
    }
  }
`;
