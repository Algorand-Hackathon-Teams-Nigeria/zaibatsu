import { gql } from "urql";

export const LOAN_REPAYMENT_INFO = gql`
  query LoanRepaymentInfo($loanId: Union!) {
    loanRepaymentInfo(loanId: $loanId) {
      amount
      completedRounds
      paymentRounds
    }
  }
`;

export const LOANS = gql`
  query Loans($opts: LoanFilterLoanOrderingListOptions) {
    loans(opts: $opts) {
      borrower {
        address
        id
      }
      collateralAsset {
        assetId
        decimals
        id
        imageUrl
        name
        unitName
      }
      collateralAssetAmount
      dateAdded
      earlyPaymentPenaltyAmount
      encodedId
      id
      principalPaid
      interestAssetAmount
      lastUpdated
      loanType
      principalAsset {
        assetId
        decimals
        id
        imageUrl
        name
        unitName
      }
      principalAssetAmount
      tenure
      borrowerNftAsset {
        assetId
        unitName
        id
        network
      }
      lenderNftAsset {
        assetId
        id
        network
        unitName
      }
      paymentRounds
      completedPaymentRounds
    }
  }
`;

export const LOAN = gql`
  query Loan($loanId: Int!) {
    loan(loanId: $loanId) {
      id
      loanType
      tenure
      ipfsHash
      loanKey
      encodedId
      interestAssetAmount
      principalAssetAmount
      collateralAssetAmount
      earlyPaymentPenaltyAmount
      paymentRounds
      completedPaymentRounds
      nextPaymentOpens
      nextPaymentCloses
      paymentCompletionTimestamp
      collateralPaid
      principalPaid
      dateAdded
      lastUpdated
      paymentRecipients {
        recipient {
          address
          id
        }
        paymentPercentage
      }
      principalAsset {
        id
        assetId
        unitName
        decimals
        network
        imageUrl
      }
      collateralAsset {
        id
        assetId
        unitName
        decimals
        network
        imageUrl
      }
      borrower {
        address
        id
      }
      borrowerIpfsAsset {
        id
        ipfsHash
      }
      lenderIpfsAsset {
        id
        ipfsHash
      }
    }
  }
`;

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
