"use client";

import Page from "@/components/atoms/a-page";
import LoanDetailsOverview from "@/components/organisms/o-loan-details-overview";
import { useContractClients } from "@/components/providers/contract";
import { useToast } from "@/components/ui/use-toast";
import { convertCompleteLoanArgsToTuple } from "@/lib/utils/contract";
import { generateUrlFromIpfsHash } from "@/lib/utils/ipfs";
import {
  calcAmountPlusFee,
  encodeIdToBase64,
  generateObjectHash,
} from "@/lib/utils/math";
import { CompleteLoanArgs } from "@/services/contract/zaibatsuClient";
import {
  ContractLoanDetails,
  LoanEnumType,
  useLoanQuery,
  useUpdateLoanWithContractDetailsMutation,
} from "@/services/graphql/generated";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  params: {
    loanId: string;
  };
}

const LoanConfirmationPage: React.FC<Props> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { activeAddress } = useWallet();
  const [contractLoanding, setContractLoading] = React.useState(false);
  const { appClient, algodClient } = useContractClients();
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
    const appRef = await appClient.appClient.getAppReference();
    const sp = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      to: appRef.appAddress,
      from: data?.loan.borrower.address,
      amount: calcAmountPlusFee(Number(data.loan.principalAssetAmount)),
      assetIndex: Number(data.loan.principalAsset.assetId),
      suggestedParams: sp,
    });
    const encodedId = data.loan.encodedId ?? encodeIdToBase64(data.loan.id);

    const completionArgs: CompleteLoanArgs = {
      loanHash: generateObjectHash(data.loan).slice(0, 32),
      loanUnitName: encodedId,
      lenderNftImageUrl: data.loan.lenderIpfsAsset
        ? generateUrlFromIpfsHash(data.loan.lenderIpfsAsset?.ipfsHash)
        : "",
      borrowerNftImageUrl: data.loan.borrowerIpfsAsset
        ? generateUrlFromIpfsHash(data.loan.borrowerIpfsAsset.ipfsHash)
        : "",
    };
    try {
      setContractLoading(true);
      await appClient.optContractIntoAsset({
        asset: BigInt(data.loan.principalAsset.assetId),
      });
      const res = await appClient.completeP2pLoanPurchase(
        {
          txn,
          loanKey: textEncoder.encode(data.loan.loanKey ?? ""),
          completionArgs: convertCompleteLoanArgsToTuple(completionArgs),
          principalAsset: BigInt(data.loan.principalAsset.assetId),
          borrower: data.loan.borrower.address,
        },
        { boxes: [{ appId: appRef.appId, name: data.loan.loanKey ?? "" }] },
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
          lenderNftAsserId: res.return.lenderNftAsserId.toString(),
          principalAssetId: res.return.principalAssetId.toString(),
          collateralAssetId: res.return.collateralAssetId.toString(),
          paymentRecipients: res.return.paymentRecipients.map((r) => [
            r[0].toString(),
            r[1],
          ]),
          borrowerNftAsserId: res.return.borrowerNftAsserId.toString(),
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
          loanId: data.loan.id,
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
            description: "Loan puchase completed",
          });
          router.push("/loans");
        }
      }
    } catch (error) {
      console.log(error);
      setContractLoading(false);
      toast({
        title: "Transaction Error",
        description: "Failed to complete loan purchase",
        variant: "destructive",
      });
    }
  };

  return (
    <Page>
      <LoanDetailsOverview
        data={data}
        fetching={fetching}
        variant="lender"
        disabled={
          data?.loan.loanType === LoanEnumType.P2P
            ? data.loan.paymentRecipients[0].recipient.address !== activeAddress
            : false
        }
        onConfirm={handleCollectLoan}
        processing={fetching || contractLoanding || updating}
      />
    </Page>
  );
};

export default LoanConfirmationPage;
