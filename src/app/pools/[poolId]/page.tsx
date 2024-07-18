"use client";

import Page from "@atoms/a-page";
import LoanTemplateFilter from "@molecules/m-loan-templates-filter";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import LoanTemplatesTable from "@molecules/m-loan-templates-table";
import LoanTemplateActions from "@/components/organisms/o-loan-template-actions";
import { LoanEnumType, usePoolQuery } from "@/services/graphql/generated";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@txnlab/use-wallet";
import { useSetAtom } from "jotai";
import listOptionsAtoms from "@/state/atoms/listOptions";

interface Props {
  params: {
    poolId: string;
  };
}

const PoolDetailsPage: React.FC<Props> = ({ params }) => {
  const { activeAddress } = useWallet();
  const setPoolTemplatesOpts = useSetAtom(listOptionsAtoms.poolLoanTemplate);
  const [{ data, fetching }] = usePoolQuery({
    variables: {
      poolId: Number(params.poolId),
    },
  });

  React.useEffect(() => {
    setPoolTemplatesOpts((c) => ({
      ...c,
      filter: { ...c?.filter, poolId: Number(params.poolId) },
    }));
  }, [params.poolId, setPoolTemplatesOpts]);

  return (
    <Page>
      <FinancialStatisticsGrid
        fetching={fetching}
        stats={[
          {
            label: "Total Contributors",
            value: data?.pool.totalContributors ?? 0,
            variant: "user",
            oldValue: 1,
          },
          {
            label: "Total Contributions",
            value: data?.pool.totalContributions ?? 0,
            variant: "order",
            oldValue: 1,
          },
          {
            label: "Total Offers",
            value: data?.pool.totalLoanTemplates ?? 0,
            variant: "pending",
            oldValue: 1,
          },
          {
            label: "Total Loans",
            value: data?.pool.totalLoansValue ?? 0,
            variant: "sales",
            oldValue: 1,
          },
        ]}
      />
      <LoanTemplateFilter variant="Pool" />
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold">
          {fetching ? (
            <Skeleton className="h-8 w-screen max-w-[200px]" />
          ) : (
            data?.pool.name
          )}
        </h2>
        {activeAddress === data?.pool.manager.address && (
          <LoanTemplateActions loanType={LoanEnumType.Dao} />
        )}
      </div>
      <LoanTemplatesTable variant="Pool" />
    </Page>
  );
};

export default PoolDetailsPage;
