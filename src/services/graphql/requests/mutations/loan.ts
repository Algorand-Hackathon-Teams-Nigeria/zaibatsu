import { gql } from "urql";

export const LOAN_TEMPLATE = gql`
  mutation NewLoanTemplate($input: LoanTemplateInput!) {
    newLoanTemplate(input: $input) {
      id
    }
  }
`;
