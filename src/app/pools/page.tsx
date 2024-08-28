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

  console.log(data);

  const stats = useMemo(() => {
    return generatePoolStatistics(data?.poolAnalytics ?? []);
  }, [data]);
  return (
    <Page>
      <FinancialStatisticsGrid stats={stats} fetching={fetching} />
      <div className="flex items-center flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl font-bold">All Pools</h2>
          <p className=" text-sm">
            Liquidity provider can earn rewards trading feels in the pool. Learn
            more
          </p>
        </div>
        <PoolActions />
      </div>

      <PoolsTable />
    </Page>
  );
};

export default PoolPage;
