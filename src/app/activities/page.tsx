import SearchInput from "@atoms/a-search-input";
import Page from "@atoms/a-page";
import FinancialStatisticsGrid from "@molecules/m-financial-statistics-grid";
import NotificationTable from "@/components/molecules/m-activity/m-activity-notification-table";

const ActivitiesPage = () => {
  return (
    <Page>
      <FinancialStatisticsGrid />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-2xl font-bold">Activities</h1>

        <SearchInput placeholder="Search Activities..." />
      </div>
      <NotificationTable />
    </Page>
  );
};

export default ActivitiesPage;
