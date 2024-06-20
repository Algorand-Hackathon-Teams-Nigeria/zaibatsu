import { gql } from "urql";

export const LOAN_TEMPLATE = gql`
  mutation NewLoanTemplate($input: LoanTemplateInput!) {
    newLoanTemplate(input: $input) {
      id
    }
  }
`;

export const CALCULATE_LOAN_SPECIFICS = gql`
  mutation CalculateLoanSpecifics($args: LoanRequestInput!) {
    calculateLoanSpecifics(args: $args) {
      id
    }
  }
`;

export const UPDATE_LOAN_WITH_CONTRACT_DETAILS = gql`
  mutation UpdateLoanWithContractDetails(
    $args: ContractLoanDetails!
    $loanId: Int!
  ) {
    updateLoanWithContractDetails(args: $args, loanId: $loanId) {
      id
    }
  }
`;
