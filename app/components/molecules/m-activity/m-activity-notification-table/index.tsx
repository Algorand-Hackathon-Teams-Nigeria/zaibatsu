import NotificationItem from "./m-activity-notfication-item";
import { BsFilter } from "react-icons/bs";
import { NotificationItemInterface } from "./m-activity-notfication-item";
const NotifDummy: NotificationItemInterface[] = [
  {
    title: "Loan Request",
    description: " Bender Rodriguez · DesignDrops",
    date: "Mar 4 2024",
  },
  {
    title: "XRV Pool Supply",
    description: "Basecamp",
    date: "Mar 3 2024",
    type: "file",
  },
  {
    title: "Dapp Governance",
    description: " Governance voting deadline",
    date: "Mar 2 2024",
    type: "announcement",
  },
];

const NotificationTable = () => {
  return (
    <div className={`py-1  md:py-5 px-2 md:px-7 bg-secondaryPool-foreground rounded-[6px] gap-1 flex flex-col justify-center items-center`}>
      <NotificationHeader />
      {NotifDummy.map((item: NotificationItemInterface, index: number) => (
        <NotificationItem
          key={item.title + item.date + index}
          title={item.title}
          description={item.description}
          date={item.date}
          type={item.type}
        />
      ))}
    </div>
  );
};

export default NotificationTable;

const NotificationHeader = () => {
  return (
    <div className={` flex w-full flex-row justify-end items-center text-white text-sm gap-4 `}>
      <button className=" gap-2 py-1 px-2 flex flex-row">
        <BsFilter size={20} /> <div>Filter</div>
      </button>
      <button className="text-[#B0B3B4] ">Mark all read</button>
    </div>
  );
};
