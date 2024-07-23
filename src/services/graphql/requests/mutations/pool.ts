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
  mutation CreateUpdatePoolLoanTemplateProposal($input: PoolLoanTemplateProposalInput!) {
    createUpdatePoolLoanTemplateProposal(input: $input) {
      id
    }
  }
`;

export const NEW_POOL_LOAN_TEMPLATE_PROPOSAL_VOTE = gql`
  mutation NewPoolLoanTemplateProposalVote($input: PoolLoanTemplateProposalVoteInput!) {
    newPoolLoanTemplateProposalVote(input: $input) {
      assetId
    }
  }
`;
