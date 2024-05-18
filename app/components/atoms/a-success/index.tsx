import { IoCheckmark } from "react-icons/io5";
export default function Success({ description = "Success" }: { description?: string }) {
  return (
    <div className="flex flex-col justify-center h-96">
      <div className="flex justify-center">
        <IoCheckmark size={52} className=" p-6 h-28 w-28  rounded-full text-[52px] text-[#1AB66E] bg-[#03471a]" />
      </div>

      <div className=" font-aeonikFono text-2xl font-normal text-center  mt-11">{description}</div>
    </div>
  );
}
