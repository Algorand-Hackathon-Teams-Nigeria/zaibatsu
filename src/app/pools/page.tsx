import Page from "@/components/atoms/a-page";
import PoolsTable from "@/components/molecules/m-pools-table";
import PoolActions from "@/components/organisms/o-pool-actions";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";

const PoolPage = () => {
  return (
    <Page>
      <FinancialStatisticsGrid />
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl lg:text-2xl font-semibold">Pools</h2>
        <PoolActions />
      </div>
      <PoolsTable />
    </Page>
  );
};

export default PoolPage;
