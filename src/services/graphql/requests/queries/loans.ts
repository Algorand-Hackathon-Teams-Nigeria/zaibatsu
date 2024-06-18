import { gql } from "urql";

export const LOAN_TEMPLATE = gql`
  query LoanTemplate($templateId: Int!) {
    loanTemplate(templateId: $templateId) {
      asset {
        imageUrl
        id
        decimals
        assetId
        name
        network
        unitName
      }
      collateralPercentage
      creator {
        id
        address
      }
      dateAdded
      earlyRepaymentPenaltyPercentage
      id
      interestRate
      lastUpdated
      loanType
      maxLoanAmount
      maxLoanTenure
      minLoanTenure
      repaymentPeriods
      pool {
        name
        netValue
        totalLoanTemplates
        id
      }
    }
  }
`;

export const LOAN_OFFERS = gql`
  query LoanTemplates(
    $opts: LoanTemplateFilterLoanTemplateOrderingListOptions
  ) {
    loanTemplates(opts: $opts) {
      asset {
        imageUrl
        assetId
        id
        name
        unitName
        decimals
      }
      collateralPercentage
      id
      interestRate
      loanType
      maxLoanTenure
      minLoanTenure
      creator {
        address
        id
      }
      earlyRepaymentPenaltyPercentage
      dateAdded
      repaymentPeriods
      pool {
        name
        id
        manager {
          address
          id
        }
      }
      maxLoanAmount
    }
  }
`;

export const LOAN_CREATORS = gql`
  query LoanCreators($address: String, $limit: Int, $offset: Int) {
    loanTemplateCreators(address: $address, limit: $limit, offset: $offset)
  }
`;
