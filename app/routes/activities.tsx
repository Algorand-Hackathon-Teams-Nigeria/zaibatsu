import NotificationTable from "@/components/molecules/m-activity/m-activity-notification-table";
import Infobar from "@/components/molecules/m-pool/m-pool-infobar";
const ActivityPage = () => {
  return (
    <div className="flex flex-col p-5">
      <Infobar />

      <NotificationTable />
    </div>
  );
};

export default ActivityPage;
