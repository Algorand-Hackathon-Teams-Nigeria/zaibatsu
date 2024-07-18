import React from "react";
import Image from "next/image";
import Overview from "@/components/atoms/a-overview";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LoanQuery } from "@/services/graphql/generated";
import { LoanEnumType } from "@/services/graphql/generated";
import { ellipseAddress } from "@/lib/utils/text";
import { generateUrlFromIpfsHash } from "@/lib/utils/ipfs";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";

interface Props {
  data?: LoanQuery;
  fetching?: boolean;
  variant: "lend" | "borrow" | "repay";
  processing?: boolean;
  onConfirm?: CallableFunction;
  disabled?: boolean;
}

const LoanDetailsOverview: React.FC<Props> = ({
  data,
  fetching,
  processing,
  variant,
  onConfirm,
  disabled,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Overview.Root className="relative">
          <Button
            disabled={disabled}
            onClick={() => onConfirm && onConfirm()}
            className="absolute -top-12 right-0 w-full max-w-[150px]"
            loading={processing}
          >
            {variant === "lend" ? "Confirm" : variant === "repay" ? "Repay" : "Collect"}
          </Button>
          <Overview.Item fetching={fetching} title="Type">
            {data?.loan.loanType}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Tenure">
            {data?.loan.tenure}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Principal Amount">
            {Number(data?.loan.principalAssetAmount) /
              getMultiplierForDecimalPlaces(
                data?.loan.principalAsset.decimals ?? 1,
              )}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Interest Amount">
            {Number(data?.loan.interestAssetAmount) /
              getMultiplierForDecimalPlaces(
                data?.loan.principalAsset.decimals ?? 1,
              )}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Collateral Amount">
            {Number(data?.loan.collateralAssetAmount) /
              getMultiplierForDecimalPlaces(
                data?.loan.collateralAsset.decimals ?? 1,
              )}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Early Payment Penalty">
            {Number(data?.loan.earlyPaymentPenaltyAmount) /
              getMultiplierForDecimalPlaces(
                data?.loan.principalAsset.decimals ?? 1,
              )}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Principal Asset">
            <div className="flex items-center gap-2">
              <Image
                src={data?.loan.principalAsset.imageUrl ?? ""}
                alt={data?.loan.principalAsset.unitName ?? ""}
                width={26}
                height={26}
              />
              {data?.loan.principalAsset.unitName}
            </div>
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Collateral Asset">
            <div className="flex items-center gap-2">
              <Image
                src={data?.loan.collateralAsset.imageUrl ?? ""}
                alt={data?.loan.collateralAsset.unitName ?? ""}
                width={26}
                height={26}
              />
              {data?.loan.collateralAsset.unitName}
            </div>
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Payment Rounds">
            {data?.loan.paymentRounds}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Completed Payment Rounds">
            {data?.loan.completedPaymentRounds}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Payment Completion Date">
            {new Date(
              Number(data?.loan.paymentCompletionTimestamp ?? "0") * 1000,
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Collaterl Payment Status">
            {data?.loan.collateralPaid ? "Paid" : "Unpaid"}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Principal Payment Status">
            {data?.loan.principalPaid ? "Paid" : "Unpaid"}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Borrower">
            {ellipseAddress(data?.loan.borrower.address, 10)}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Payment Reciepients">
            <ul className="grid gap-y-2">
              {(data?.loan.paymentRecipients ?? []).map((recipient) => (
                <li key={recipient.recipient.id} className="grid grid-cols-2">
                  <span>{ellipseAddress(recipient.recipient.address)}</span>
                  <span>{recipient.paymentPercentage} %</span>
                </li>
              ))}
            </ul>
          </Overview.Item>
        </Overview.Root>
        <div className="py-4">
          {fetching ? (
            <div className="flex flex-col gap-4 w-full">
              <Skeleton className="w-[90vw] h-screen max-w-[600px] max-h-[360px]" />
              <Skeleton className="w-[90vw] h-screen max-w-[600px] max-h-[360px]" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <Image
                src={generateUrlFromIpfsHash(
                  data?.loan.borrowerIpfsAsset?.ipfsHash ?? "",
                )}
                alt="Borrower Loan NFT Image"
                width={600}
                height={360}
                unoptimized
              />
              {data?.loan.loanType === LoanEnumType.P2P && (
                <Image
                  src={generateUrlFromIpfsHash(
                    data?.loan.lenderIpfsAsset?.ipfsHash ?? "",
                  )}
                  alt="Lender Loan NFT Image"
                  width={600}
                  height={360}
                  unoptimized
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsOverview;
