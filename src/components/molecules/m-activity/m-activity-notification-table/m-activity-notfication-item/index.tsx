import IonDocument from "~icons/ion/document";
import IonNotifications from "~icons/ion/notifications";
import MdiAnnouncementOutline from "~icons/mdi/announcement-outline";
import { Button } from "@/components/ui/button";
import { ActivityType } from "@/services/graphql/generated";

const getIconForType = (type: string = "") => {
  switch (type) {
    case "file":
      return <IonDocument className=" w-3" />;

    case "announcement":
      return <MdiAnnouncementOutline className=" w-3" />;

    default:
      return <IonNotifications className=" w-3" />;
  }
};

const NotificationItem = ({
  item,
}: {
  item: Omit<ActivityType, "__typename">;
}) => {
  const type: string = "notification";
  return (
    <div className="py-2 px-1 w-full flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 mr-1">
        <div className="w-fit h-fit relative">
          <div className="w-10 h-10 rounded-full bg-blue-300" />

          <div
            className={`${
              type == "file" ? "bg-[#FFDB4D]" : "bg-[#5856D6]"
            } w-4 h-4 text-[#B0B3B4] flex justify-center items-center absolute top-[2px] -right-1 rounded-full`}
          >
            {getIconForType(type)}
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-base leading-5">{item.message}</div>
          <div className="text-xs leading-4 text-[#B0B3B4] ">
            {item.message}· {item.dateAdded}{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <div
          className={` bg-[#FC9D9D] w-3 h-3 rounded-full ${item?.read == false && " invisible"}`}
        />
        <Button variant={"outline"}>View Details</Button>
      </div>
    </div>
  );
};

export default NotificationItem;
