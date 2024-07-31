"use client";
import NotificationItem from "./m-activity-notfication-item";
import OcticonFilter16 from "~icons/octicon/filter-16.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import ActivitiesActions from "../../m-activities-actions";
import { useActivitiesQuery } from "@/services/graphql/generated";
import { useAtomValue } from "jotai";
import listOptionsAtoms from "@state/atoms/listOptions";
import { ActivityType } from "../../../../services/graphql/generated";

/**
const NotifDummy: Omit<ActivityType, "__typename">[] = [
  {
    id: "1",
    message: "Loan repayment received",
    read: true,
    detailId: "loan_123",
    dateAdded: "2024-07-30T12:34:56Z",
    lastUpdated: "2024-07-30T13:34:56Z",
    user: {
      id: "1",
      address: "0x12345",
    },
  },
  {
    id: "2",
    message: "New loan offer available",
    read: false,
    detailId: "loan_124",
    dateAdded: "2024-07-29T10:30:00Z",
    lastUpdated: "2024-07-29T11:00:00Z",
    user: {
      id: "2",
      address: "0x67890",
    },
  },
];
 */

const NotificationTable = () => {
  const listOpts = useAtomValue(listOptionsAtoms.activities);

  const [{ fetching, data }] = useActivitiesQuery({
    //  variables: { opts: listOpts, assetOpts: { limit: 4 } },
  });
  const activities = data?.activities ?? [];
  return (
    <div className="py-1 md:py-5 px-2 md:px-7 bg-secondaryPool-foreground rounded-[6px] gap-1 flex flex-col justify-center items-center">
      <NotificationHeader />
      {fetching
        ? Array.from({ length: 3 }).map((_, index) => (
            <NotificationItemSkeleton key={index} />
          ))
        : activities.map((item, index: number) => (
            <NotificationItem
              key={item.message + item.dateAdded + index}
              item={item}
            />
          ))}
      {!fetching && activities.length < 1 && (
        <p className="border p-2 rounded-md px-4 opacity-60 text-center">
          No activities to display...{" "}
        </p>
      )}
    </div>
  );
};

const NotificationHeader = () => {
  return (
    <div className="flex w-full flex-row justify-end items-center text-white text-sm gap-4">
      <ActivitiesActions />
    </div>
  );
};

const NotificationItemSkeleton = () => {
  return (
    <div className="py-2 px-1 w-full flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 mr-1">
        <div className="w-fit h-fit relative">
          <Skeleton className="w-10 h-10 rounded-full" />

          <Skeleton className="w-4 h-4 absolute top-[2px] -right-1 rounded-full" />
        </div>
        <div className="flex flex-col">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-40 h-3 mt-1" />
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-24 h-6" />
      </div>
    </div>
  );
};

export default NotificationTable;
