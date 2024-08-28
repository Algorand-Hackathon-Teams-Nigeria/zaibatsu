"use client";

import Page from "@/components/atoms/a-page";
import LoanDetailsOverview from "@/components/organisms/o-loan-details-overview";
import { useContractClients } from "@/components/providers/contract";
import { useToast } from "@/components/ui/use-toast";
import { convertCompleteLoanArgsToTuple } from "@/lib/utils/contract";
import { generateUrlFromIpfsHash } from "@/lib/utils/ipfs";
import { encodeIdToBase64, generateObjectHash } from "@/lib/utils/math";
import { calcAmountPlusFee } from "@utils/finance";
import { CompleteLoanArgs, LoanDetails } from "@/services/contract/loanClient";
import {
  ContractLoanDetails,
  LoanEnumType,
  useLoanQuery,
  usePinLoanNftImagesMutation,
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
  const [lenderNftImage, setLenderNftImage] = React.useState<File>();
  const [borrowerNftImage, setBorrowerNftImage] = React.useState<File>();
  const [contractLoanding, setContractLoading] = React.useState(false);
  const { algodClient, loanClient } = useContractClients();
  const [{ fetching: updating }, updateMutate] =
    useUpdateLoanWithContractDetailsMutation();
  const [{ fetching: pinning }, pinMutate] = usePinLoanNftImagesMutation();
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

    const val = await loanClient.appClient.getBoxValueFromABIType(
      data.loan.loanKey ?? "",
      algosdk.ABIType.from(
        "(string,string,uint8,uint64,uint64,uint64,uint64,uint64,uint64,uint8,uint64,(uint64,address)[],bool,bool,uint8,address,uint64,uint64)",
      ),
    );
    console.log({ val: LoanDetails(val as any) });

    if (!borrowerNftImage || !lenderNftImage) {
      toast({
        title: "Upload Error",
        description: "NFT images not generated yet",
        variant: "destructive",
      });
      return;
    }

    const { data: pinData, error } = await pinMutate({
      input: {
        loanId: data.loan.id,
        lenderImage: lenderNftImage,
        borrowerImage: borrowerNftImage,
      },
    });

    if (error) {
      toast({
        title: "Upload Error",
        description: error.message,
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
      amount: Math.ceil(
        calcAmountPlusFee(Number(data.loan.principalAssetAmount)),
      ),
      assetIndex: Number(data.loan.principalAsset.assetId),
      suggestedParams: sp,
    });
    const encodedId =
      data.loan.encodedId ?? encodeIdToBase64(Number(data.loan.id));

    const completionArgs: CompleteLoanArgs = {
      loanHash: generateObjectHash(data.loan).slice(0, 32),
      loanUnitName: encodedId,
      lenderNftImageUrl: pinData?.pinLoanNftImages.lenderIpfsAsset.ipfsHash
        ? generateUrlFromIpfsHash(
            pinData.pinLoanNftImages.lenderIpfsAsset.ipfsHash,
          )
        : "",
      borrowerNftImageUrl: pinData?.pinLoanNftImages.borrowerIpfsAsset.ipfsHash
        ? generateUrlFromIpfsHash(
            pinData?.pinLoanNftImages.borrowerIpfsAsset.ipfsHash,
          )
        : "",
    };
    try {
      setContractLoading(true);
      await loanClient.optContractIntoAsset({
        asset: BigInt(data.loan.principalAsset.assetId),
      });
      const res = await loanClient.completeP2pLoanPurchase(
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
        variant="lend"
        onBorrowerNftImageChange={setBorrowerNftImage}
        onLenderNftImageChange={setLenderNftImage}
        disabled={
          (data?.loan.loanType === LoanEnumType.P2P
            ? data.loan.paymentRecipients[0].recipient.address !== activeAddress
            : false) || data?.loan.principalPaid
        }
        onConfirm={handleCollectLoan}
        processing={fetching || contractLoanding || updating || pinning}
      />
    </Page>
  );
};

export default LoanConfirmationPage;
