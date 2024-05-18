const TableView = ({ poolData }: any) => {
  return (
    <div className="w-full">
      {
        //mobile view
      }

      <div className="w-full md:hidden gap-5 flex flex-col">
        {poolData.map((item: any, index: number) => (
          <div
            key={index}
            className="  bg-secondaryPool-foreground gap-3 text-white text-base  leading-[18px] rounded-lg p-3 flex flex-col"
          >
            <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-2">
              <div className="py-2  leading-4 font-bold text-left ">{item?.poolName}</div>
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Assets</div>
                <div className="py-2"> {item?.assets}</div>
              </div>
            </div>

            <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-2">
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Total supplied</div>
                <div className="py-2"> {item?.totalSupplied}</div>
              </div>
              <div className="py-1   font-normal flex flex-row justify-between ">
                <div className="py-2">Total Borrowed</div>
                <div className="py-2"> {item?.totalBorrowed}</div>
              </div>
            </div>

            <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-2">
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Pool APR</div>
                <div className="py-2"> {item?.poolAPR}</div>
              </div>
              <div className="py-1   font-normal flex flex-row justify-between ">
                <div className="py-2">Tenor</div>
                <div className="py-2"> {item?.tenor}</div>
              </div>
            </div>

            <div className="pt-1 gap-4 flex flex-row h-10 ">
              <button className="w-full h-full text-center   bg-[#e9fcf5]  rounded text-[#8cdabe]">Supply</button>
              <button className="w-full h-full text-center  bg-[#e9fcf5]  rounded text-[#8cdabe]">Borrow</button>
            </div>
          </div>
        ))}
      </div>
      {
        //desktop view
      }

      <table className=" invisible md:visible w-full overflow-scroll lg:overflow-hidden">
        <thead className="">
          <tr>
            <th className="pr-4 py-[10px] max-w-[158.43px] text-left">Pool name</th>
            <th className="pr-4 py-[10px] max-w-[158.43px] text-left">Assets</th>
            <th className="pr-4 py-[10px] max-w-[158.43px] text-left">Total supplied</th>
            <th className="pr-4 py-[10px] max-w-[158.43px] text-left">Total borrowed</th>
            <th className="pr-4 py-[10px] max-w-[158.43px] text-left">Pool APR</th>
            <th className="pr-4 py-[10px] max-w-[158.43px] text-left">Tenor</th>
            <th className="pr-4 py-[10px] min-w-[138.44px] max-w-[168.44px] "></th>
          </tr>
        </thead>
        <tbody>
          {poolData.map((item: any, index: number) => (
            <tr key={index}>
              <td className="pr-4 py-[11.15px] ">{item?.poolName}</td>
              <td className="pr-4 py-[11.15px] ">{item?.assets}</td>
              <td className="pr-4 py-[11.15px] ">{item?.totalSupplied}</td>
              <td className="pr-4 py-[11.15px] ">{item?.totalBorrowed}</td>
              <td className="pr-4 py-[11.15px] ">{item?.poolAPR}</td>
              <td className="pr-4 py-[11.15px] ">{item?.tenor}</td>
              <td className=" py-[11.15px] flex justify-end maax-w-[168.44px]">
                <button className=" mr-5 py-[11px] px-[6.61px]  bg-secondaryPool-foreground rounded-sm text-white">Supply</button>
                <button className="py-[11px] px-[6.61px]  border-2 border-secondaryPool-foreground rounded-sm text-white ">Borrow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableView;
