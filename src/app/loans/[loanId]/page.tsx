"use client";

import Page from "@/components/atoms/a-page";
import LoanDetailsOverview from "@/components/organisms/o-loan-details-overview";
import { useContractClients } from "@/components/providers/contract";
import { useToast } from "@/components/ui/use-toast";
import { convertLoanDetailsToTupple } from "@/lib/utils/contract";
import { calcAmountPlusFee } from "@utils/finance";
import { LoanDetails } from "@/services/contract/loanClient";
import {
  ContractLoanDetails,
  useLoanQuery,
  useUpdateLoanWithContractDetailsMutation,
} from "@/services/graphql/generated";
import algosdk from "algosdk";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  params: {
    loanId: string;
  };
}

const LoanDetailsPage: React.FC<Props> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [contractLoanding, setContractLoading] = React.useState(false);
  const { algodClient, loanClient } = useContractClients();
  const [{ fetching: updating }, updateMutate] =
    useUpdateLoanWithContractDetailsMutation();
  const [{ fetching, data }] = useLoanQuery({
    variables: {
      loanId: Number(params.loanId),
    },
  });

  const handleCollectLoan = async () => {
    if (!data?.loan) {
      toast({
        title: "Loan not found",
        description: "No loan was found for which to collect",
        variant: "destructive",
      });
      return;
    }
    const textEncoder = new TextEncoder();
    const appRef = await loanClient.appClient.getAppReference();
    const sp = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      to: appRef.appAddress,
      from: data?.loan.borrower.address,
      amount: Math.ceil(calcAmountPlusFee(Number(data.loan.collateralAssetAmount))),
      assetIndex: Number(data.loan.collateralAsset.assetId),
      suggestedParams: sp,
    });

    const loanKey = uuidv4();

    const loanDetails: LoanDetails = {
      loanKey,
      collateralAssetAmount: BigInt(data.loan.collateralAssetAmount),
      borrower: data.loan.borrower.address,
      loanType: data.loan.loanType,
      paymentRecipients: data.loan.paymentRecipients.map((r) => [
        BigInt(Math.ceil(r.paymentPercentage * 100)),
        r.recipient.address,
      ]),
      principalPaid: false,
      collateralPaid: false,
      paymentCompletionTimestamp: BigInt(data.loan.paymentCompletionTimestamp),
      paymentRounds: data.loan.paymentRounds,
      earlyPaymentPenaltyAmount: BigInt(data.loan.earlyPaymentPenaltyAmount),
      interestAssetAmount: BigInt(data.loan.interestAssetAmount),
      tenure: data.loan.tenure,
      collateralAssetId: BigInt(data.loan.collateralAsset.assetId),
      lenderNftAsserId: BigInt(0),
      principalAssetId: BigInt(data.loan.principalAsset.assetId),
      borrowerNftAsserId: BigInt(0),
      principalAssetAmount: BigInt(data.loan.principalAssetAmount),
      completedPaymentRounds: 0,
    };
    try {
      setContractLoading(true);
      await loanClient.optContractIntoAsset({
        asset: BigInt(data.loan.collateralAsset.assetId),
      });
      const res = await loanClient.initiateLoanPurchase(
        {
          txn,
          loanKey: textEncoder.encode(loanKey),
          loanDetails: convertLoanDetailsToTupple(loanDetails),
          folksFeedOracle: BigInt(
            process.env.NEXT_PUBLIC_FOLKS_FEED_ORACLE_APP_ID ?? "",
          ),
        },
        { boxes: [{ appId: appRef.appId, name: loanKey }] },
      );

      setContractLoading(false);

      if (res.return) {
        const details: ContractLoanDetails = {
          loanKey: res.return.loanKey,
          tenure: Number(res.return.tenure.toString()),
          borrower: res.return.borrower,
          loanType: res.return.loanType,
          paymentRounds: Number(res.return.paymentRounds.toString()),
          principalPaid: res.return.principalPaid,
          collateralPaid: res.return.collateralPaid,
          lenderNftAssetId: res.return.lenderNftAsserId.toString(),
          principalAssetId: res.return.principalAssetId.toString(),
          collateralAssetId: res.return.collateralAssetId.toString(),
          paymentRecipients: res.return.paymentRecipients.map((r) => [
            r[0].toString(),
            r[1],
          ]),
          borrowerNftAssetId: res.return.borrowerNftAsserId.toString(),
          interestAssetAmount: res.return.interestAssetAmount.toString(),
          principalAssetAmount: res.return.principalAssetAmount.toString(),
          collateralAssetAmount: res.return.collateralAssetAmount.toString(),
          completedPaymentRounds: Number(
            res.return.completedPaymentRounds.toString(),
          ),
          earlyPaymentPenaltyAmount:
            res.return.earlyPaymentPenaltyAmount.toString(),
          paymentCompletionTimestamp:
            res.return.paymentCompletionTimestamp.toString(),
        };

        const { error } = await updateMutate({
          args: details,
          loanId: Number(data.loan.id),
        });

        if (error?.graphQLErrors) {
          error.graphQLErrors.map((err) =>
            toast({
              title: "Error",
              description: err.message,
              variant: "destructive",
            }),
          );
        } else {
          toast({
            title: "Success",
            description: "Loan puchase initiated",
          });
          router.push("/loans");
        }
      }
    } catch (error) {
      setContractLoading(false);
      toast({
        title: "Transaction Error",
        description: "Failed to initiate loan purchase",
        variant: "destructive",
      });
    }
  };

  return (
    <Page>
      <LoanDetailsOverview
        data={data}
        fetching={fetching}
        variant="borrow"
        onConfirm={handleCollectLoan}
        processing={fetching || contractLoanding || updating}
      />
    </Page>
  );
};

export default LoanDetailsPage;
