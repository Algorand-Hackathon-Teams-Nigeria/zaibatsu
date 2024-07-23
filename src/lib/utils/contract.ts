import { CompleteLoanArgs, LoanDetails } from "@/services/contract/loanClient";

export const convertCompleteLoanArgsToTuple = (
  completeLoanArgs: CompleteLoanArgs,
): [string, string, string, string] => {
  return [
    completeLoanArgs.loanUnitName,
    completeLoanArgs.lenderNftImageUrl,
    completeLoanArgs.borrowerNftImageUrl,
    completeLoanArgs.loanHash,
  ];
};

export const convertLoanDetailsToTupple = (
  loanDetails: LoanDetails,
): [
  string,
  string,
  number,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  number,
  bigint,
  [bigint, string][],
  boolean,
  boolean,
  number,
  string,
  bigint,
  bigint,
] => {
  return [
    loanDetails.loanKey,
    loanDetails.loanType,
    loanDetails.tenure,
    loanDetails.principalAssetId,
    loanDetails.collateralAssetId,
    loanDetails.interestAssetAmount,
    loanDetails.principalAssetAmount,
    loanDetails.collateralAssetAmount,
    loanDetails.earlyPaymentPenaltyAmount,
    loanDetails.paymentRounds,
    loanDetails.paymentCompletionTimestamp,
    loanDetails.paymentRecipients,
    loanDetails.collateralPaid,
    loanDetails.principalPaid,
    loanDetails.completedPaymentRounds,
    loanDetails.borrower,
    loanDetails.lenderNftAsserId,
    loanDetails.borrowerNftAsserId,
  ];
};
