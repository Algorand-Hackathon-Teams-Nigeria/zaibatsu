"use client";

import Page from "@/components/atoms/a-page";
import TransactionConfirmModal from "@/components/molecules/m-transaction-confirm-modal";
import LoanDetailsOverview from "@/components/organisms/o-loan-details-overview";
import { useContractClients } from "@/components/providers/contract";
import { useToast } from "@/components/ui/use-toast";
import { calculateTransactionFee, calcAmountPlusFee } from "@/lib/utils/finance";
import {
  useInitiateLoanPaymentRoundMutation,
  useLoanQuery,
  useLoanRepaymentInfoQuery,
} from "@/services/graphql/generated";
import { v4 as uuidv4 } from "uuid";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { useRouter } from "next/navigation";
import React from "react";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";

interface Props {
  params: {
    loanId: string;
  };
}

const LoanRepaymentPage: React.FC<Props> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { activeAddress } = useWallet();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [contractLoanding, setContractLoading] = React.useState(false);
  const { algodClient, loanClient } = useContractClients();
  const [{ data: repaymentData, fetching: repaymentFetching }] = useLoanRepaymentInfoQuery({
    variables: { loanId: params.loanId },
  });
  const [{ fetching: updating }, mutate] = useInitiateLoanPaymentRoundMutation();
  const [{ fetching, data }] = useLoanQuery({
    variables: {
      loanId: Number(params.loanId),
    },
  });

  const handleLoanRepayment = React.useCallback(async () => {
    if (!data?.loan) {
      toast({
        title: "Loan not found",
        description: "No loan was found for which to collect",
        variant: "destructive",
      });
      return;
    }
    if (!repaymentData?.loanRepaymentInfo) {
      toast({
        title: "Repayment data not found",
        description: "Repayment data not found. Perhaps check your network",
        variant: "destructive",
      });
      return;
    }

    const textEncoder = new TextEncoder();
    const appRef = await loanClient.appClient.getAppReference();
    const sp = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      to: appRef.appAddress,
      from: data.loan.borrower.address,
      amount: calcAmountPlusFee(Number(data.loan.principalAssetAmount)),
      assetIndex: Number(data.loan.principalAsset.assetId),
      suggestedParams: sp,
    });

    const repaymentKey = uuidv4();
    try {
      setContractLoading(true);
      await loanClient.optContractIntoAsset({
        asset: BigInt(data.loan.principalAsset.assetId),
      });
      await loanClient.initiateLoanRepayment(
        {
          txn,
          loanKey: textEncoder.encode(data.loan.loanKey ?? ""),
          repaymentKey,
        },
        {
          boxes: [
            { appId: appRef.appId, name: data.loan.loanKey ?? "" },
            { appId: appRef.appId, name: repaymentKey },
          ],
        },
      );

      setContractLoading(false);

      const { error } = await mutate({
        input: {
          repaymentKey,
          loanKey: data.loan.loanKey ?? "",
        },
      });

      if (error?.graphQLErrors) {
        error.graphQLErrors.map((err) =>
          toast({
            title: "Server Error",
            description: err.message,
            variant: "destructive",
          }),
        );
      } else {
        toast({
          title: "Success",
          description: "Loan repayment round completed",
        });
        router.push("/loans");
      }
    } catch (error) {
      console.log({ error });
      setContractLoading(false);
      toast({
        title: "Transaction Error",
        description: "Failed to complete loan purchase",
        variant: "destructive",
      });
    }
  }, [data, repaymentData, algodClient, loanClient, mutate, router, toast]);

  return (
    <Page>
      <LoanDetailsOverview
        data={data}
        fetching={fetching || repaymentFetching}
        variant="repay"
        disabled={
          data?.loan.borrower.address !== activeAddress ||
          data?.loan.paymentRounds === data?.loan.completedPaymentRounds
        }
        onConfirm={() => setConfirmOpen((c) => !c)}
        processing={fetching || contractLoanding || updating}
      />
      {data?.loan && repaymentData?.loanRepaymentInfo && (
        <TransactionConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirm={handleLoanRepayment}
          transaction={{
            asset: data.loan.principalAsset,
            charges: [
              {
                title: "Repayment amount",
                amount:
                  Number(repaymentData.loanRepaymentInfo.amount) /
                  getMultiplierForDecimalPlaces(data.loan.principalAsset.decimals),
              },
              {
                title: "Transaction Fees",
                amount:
                  calculateTransactionFee(Number(repaymentData.loanRepaymentInfo.amount)) /
                  getMultiplierForDecimalPlaces(data.loan.principalAsset.decimals),
              },
            ],
          }}
        />
      )}
    </Page>
  );
};

export default LoanRepaymentPage;
