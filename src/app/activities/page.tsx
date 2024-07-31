"use client";
import SearchInput from "@atoms/a-search-input";
import Page from "@atoms/a-page";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import NotificationTable from "@/components/molecules/m-activity/m-activity-notification-table";
import {
  useUserAnalyticsQuery,
  useZaibatsuAnalyticsQuery,
} from "@/services/graphql/generated";
import { memo, useCallback, useMemo } from "react";
import { useAtomValue } from "jotai";
import listOptionsAtoms from "@/state/atoms/listOptions";
import {
  generateUserStatistics,
  generateZaibatsuStatistics,
} from "@/lib/utils/statistics";

const ActivitiesPage = () => {
  const [{ fetching, data }] = useZaibatsuAnalyticsQuery({
    variables: { opts: { limit: 2, ordering: { dateAdded: true } } },
  });
  console.log("user acivities analytics data: ", data?.zaibatsuAnalytics);

  const stats = useMemo(() => {
    return generateZaibatsuStatistics(data?.zaibatsuAnalytics ?? []);
  }, [data]);
  return (
    <Page>
      <FinancialStatisticsGrid stats={stats} fetching={fetching} />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-2xl font-bold">Activities</h1>

        <SearchInput placeholder="Search Activities..." />
      </div>
      <NotificationTable />
    </Page>
  );
};

export default ActivitiesPage;
