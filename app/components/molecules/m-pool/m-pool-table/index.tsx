import React from "react";

const data = [
  {
    poolName: "Crystal CoveCrystal Cove",
    assets: "asset12",
    totalSupplied: "1.27B",
    totalBorrowed: "34.99m",
    poolAPR: "10%",
    tenor: "3 months",
  },
  {
    poolName: "Crystal Cove",
    assets: "asset12",
    totalSupplied: "1.27B",
    totalBorrowed: "34.99m",
    poolAPR: "10%",
    tenor: "3 months",
  },

  // Add more data as needed
];

const TableView = ({ poolData }: any) => {
  return (
    <table className="w-full overflow-scroll">
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
        {poolData.map((item: any, index: any) => (
          <tr key={index}>
            <td className="pr-4 py-[11.15px] ">{item.poolName}</td>
            <td className="pr-4 py-[11.15px] ">{item.assets}</td>
            <td className="pr-4 py-[11.15px] ">{item.totalSupplied}</td>
            <td className="pr-4 py-[11.15px] ">{item.totalBorrowed}</td>
            <td className="pr-4 py-[11.15px] ">{item.poolAPR}</td>
            <td className="pr-4 py-[11.15px] ">{item.tenor}</td>
            <td className=" py-[11.15px] flex justify-end maax-w-[168.44px]">
              <button className=" mr-5 py-[11px] px-[6.61px]  bg-secondaryPool-foreground rounded-sm text-white">Supply</button>
              <button className="py-[11px] px-[6.61px]  border-2 border-secondaryPool-foreground rounded-sm text-white ">Borrow</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Pooltable = () => {
  return (
    <div className="bg-transparent flex overflow-scroll ">
      <TableView poolData={data} />
    </div>
  );
};

export default Pooltable;
