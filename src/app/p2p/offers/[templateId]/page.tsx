"use client";

import Page from "@/components/atoms/a-page";
import CollectLoanForm from "@/components/molecules/m-loan-collect-form";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ellipseAddress } from "@/lib/utils/address";
import {
  LoanEnumType,
  useLoanTemplateQuery,
} from "@/services/graphql/generated";
import React from "react";

interface Props {
  params: {
    templateId: string;
  };
}

const LoanTemplateDetailsPage: React.FC<Props> = ({ params }) => {
  const [{ fetching, data }] = useLoanTemplateQuery({
    variables: {
      templateId: Number(params.templateId),
    },
  });

  return (
    <Page>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="p-4 grid gap-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">NetWork</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">{data?.loanTemplate.asset.network}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Asset</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <div className="flex items-center gap-2 font-medium">
                <span>{data?.loanTemplate.asset.unitName}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Loan Type</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">{data?.loanTemplate.loanType}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Max Loan Amount</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">{data?.loanTemplate.maxLoanAmount}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Min Loan Tenure</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">{data?.loanTemplate.minLoanTenure}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Max Loan Tenure</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">{data?.loanTemplate.maxLoanTenure}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Interest Rate</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">{data?.loanTemplate.interestRate}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Repayment Periods</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">
                {data?.loanTemplate.repaymentPeriods}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">Collateral Percentage</p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">
                {data?.loanTemplate.collateralPercentage}%
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
            <p className="text-muted-foreground">
              Early Repayment Penalty Percentage
            </p>
            {fetching ? (
              <Skeleton className="max-w-[300px]" />
            ) : (
              <p className="font-medium">
                {data?.loanTemplate.earlyRepaymentPenaltyPercentage}%
              </p>
            )}
          </div>
          {data?.loanTemplate.loanType === LoanEnumType.P2P ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
              <p className="text-muted-foreground">Creator</p>
              {fetching ? (
                <Skeleton className="max-w-[300px]" />
              ) : (
                <p className="font-medium">
                  {ellipseAddress(data?.loanTemplate.creator?.address, 10)}%
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
              <p className="text-muted-foreground">Pool</p>
              {fetching ? (
                <Skeleton className="max-w-[300px]" />
              ) : (
                <p className="font-medium">{data?.loanTemplate.pool?.name}</p>
              )}
            </div>
          )}
        </Card>
        <div className="max-w-[300px] py-4">
          <h2 className="font-semibold text-xl mb-4">Collect Loan</h2>
          <CollectLoanForm
            minTenure={data?.loanTemplate.minLoanTenure ?? 1}
            maxTenure={data?.loanTemplate.maxLoanTenure ?? 1}
          />
        </div>
      </div>
    </Page>
  );
};

export default LoanTemplateDetailsPage;
