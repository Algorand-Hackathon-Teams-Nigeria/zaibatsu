"use client";

import React from "react";
import { LoanEnumType, LoanTemplateQuery } from "@/services/graphql/generated";
import CollectLoanForm from "@/components/molecules/m-loan-collect-form";
import { ellipseAddress } from "@/lib/utils/text";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import Overview from "@/components/atoms/a-overview";

interface Props {
  fetching?: boolean;
  data?: LoanTemplateQuery;
}

const LoanTemplateOverview: React.FC<Props> = ({ data, fetching }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Overview.Root>
          <Overview.Item fetching={fetching} title="NetWork">
            {data?.loanTemplate.asset.network}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Asset">
            {data?.loanTemplate.asset.unitName}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Loan Type">
            {data?.loanTemplate.loanType}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Max Loan Amount">
            {data?.loanTemplate.maxLoanAmount /
              getMultiplierForDecimalPlaces(
                data?.loanTemplate.asset.decimals ?? 1,
              )}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Min Loan Tenure">
            {data?.loanTemplate.minLoanTenure}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Max Loan Tenure">
            {data?.loanTemplate.maxLoanTenure}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Interest Rate">
            {data?.loanTemplate.interestRate}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Repayment Periods">
            {data?.loanTemplate.repaymentPeriods}
          </Overview.Item>
          <Overview.Item fetching={fetching} title="Collateral Percentage">
            {data?.loanTemplate.collateralPercentage}
          </Overview.Item>
          <Overview.Item
            fetching={fetching}
            title="Early Repayment Penalty Percentage"
          >
            {data?.loanTemplate.earlyRepaymentPenaltyPercentage}
          </Overview.Item>
          {data?.loanTemplate.loanType === LoanEnumType.P2P ? (
            <Overview.Item fetching={fetching} title="Creator">
              {ellipseAddress(data?.loanTemplate.creator?.address, 10)}
            </Overview.Item>
          ) : (
            <Overview.Item fetching={fetching} title="Pool">
              {data?.loanTemplate.pool?.name}
            </Overview.Item>
          )}
        </Overview.Root>
        <div className="max-w-[300px] py-4">
          <h2 className="font-semibold text-xl mb-4">Collect Loan</h2>
          <CollectLoanForm template={data?.loanTemplate} />
        </div>
      </div>
    </div>
  );
};

export default LoanTemplateOverview;
