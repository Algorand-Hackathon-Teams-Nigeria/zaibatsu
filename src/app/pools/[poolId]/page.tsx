"use client";

import Page from "@atoms/a-page";
import LoanTemplateFilter from "@molecules/m-loan-templates-filter";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import LoanTemplatesTable from "@molecules/m-loan-templates-table";
import LoanTemplateActions from "@/components/organisms/o-loan-template-actions";
import { usePoolQuery } from "@/services/graphql/generated";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@txnlab/use-wallet";
import { useSetAtom } from "jotai";
import listOptionsAtoms from "@/state/atoms/listOptions";
import PoolLoanTemplateProposals from "@molecules/m-pool-loan-template-proposals";
import UserPoolAssetHoldings from "@molecules/m-user-pool-asset-holdings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      poolId: params.poolId,
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
      {activeAddress && (
        <UserPoolAssetHoldings address={activeAddress} poolId={params.poolId} />
      )}
      <FinancialStatisticsGrid
        fetching={fetching}
        stats={[
          {
            label: "Contributors",
            value: data?.pool.totalContributors ?? 0,
            variant: "user",
            oldValue: 1,
          },
          {
            label: "Contributions",
            value: data?.pool.totalContributions ?? 0,
            variant: "order",
            oldValue: 1,
          },
          {
            label: "Approved Loans",
            value: data?.pool.totalLoanTemplates ?? 0,
            variant: "pending",
            oldValue: 1,
          },
          {
            label: "Loans",
            value: data?.pool.totalLoansValue ?? 0,
            variant: "sales",
            oldValue: 1,
          },
        ]}
      />

      <LoanTemplateFilter variant="Pool" />
      {activeAddress === data?.pool.manager.address && (
        <div className="flex items-center justify-between">
          <LoanTemplateActions loanType="Dao" poolId={params.poolId} />
        </div>
      )}
      <Tabs defaultValue="supplied">
        <TabsList>
          <TabsTrigger value="supplied">Supplied</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="supplied">
          <LoanTemplatesTable variant="Pool" poolId={params.poolId} />
        </TabsContent>
        <TabsContent value="offers">
          <LoanTemplatesTable variant="Pool" poolId={params.poolId} />
        </TabsContent>
      </Tabs>

      <PoolLoanTemplateProposals poolId={params.poolId} />
    </Page>
  );
};

export default PoolDetailsPage;
