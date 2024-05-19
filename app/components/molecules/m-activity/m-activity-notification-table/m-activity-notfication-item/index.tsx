import { IoNotifications, IoDocument } from "react-icons/io5";
import { MdAnnouncement } from "react-icons/md";
export interface NotificationItemInterface {
  title: string;
  description?: string;
  date?: string;
  type?: "notification" | "announcement" | "file";
}

const getIconForType = (type: string = "") => {
  switch (type) {
    case "file":
      return <IoDocument size={10} />;

    case "announcement":
      return <MdAnnouncement size={10} />;

    default:
      return <IoNotifications size={10} />;
  }
};

const NotificationItem = ({ title, description, date, type = "notification" }: NotificationItemInterface) => {
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
          <div className="text-base leading-5">{title}</div>
          <div className="text-xs leading-4 text-[#B0B3B4] ">
            {description}· {date}{" "}
          </div>
        </div>
      </div>
      <div className=" bg-[#FC9D9D] w-3 h-3 rounded-full" />
    </div>
  );
};

export default NotificationItem;
