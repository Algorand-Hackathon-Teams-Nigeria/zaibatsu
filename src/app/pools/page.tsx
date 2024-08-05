"use client";
import Page from "@/components/atoms/a-page";
import PoolsTable from "@/components/molecules/m-pools-table";
import PoolActions from "@/components/organisms/o-pool-actions";
import { generatePoolStatistics } from "@/lib/utils/statistics";
import { usePoolAnalyticsQuery } from "@/services/graphql/generated";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import { useMemo } from "react";

const PoolPage = () => {
  const [{ fetching, data }] = usePoolAnalyticsQuery({
    variables: { opts: { limit: 2, ordering: { dateAdded: true } } },
  });

  console.log(data)

  const stats = useMemo(() => {
    return generatePoolStatistics(data?.poolAnalytics ?? []);
  }, [data]);
  return (
    <Page>
      <FinancialStatisticsGrid stats={stats} fetching={fetching} />
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl lg:text-2xl font-semibold">Pools</h2>
        <PoolActions />
      </div>
      <PoolsTable />
    </Page>
  );
};

export default PoolPage;
