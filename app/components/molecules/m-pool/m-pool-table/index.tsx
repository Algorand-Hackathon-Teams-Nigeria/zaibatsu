import React from "react";
import TableView from "./m-pool-table-view";

//import TableItems from "./m-pool-tableitem";
import { useQuery } from "@apollo/client/index.js";

import { GET_POOLS } from "@/services/graphql/queries";

// Define a mapping function to transform data into the desired format
const mapPoolData = (pool: any) => {
  return {
    poolName: pool.name,
    assets: "bitcoin", // Assuming this is constant for all pools
    totalSupplied: "1.27B", // Assuming this is constant for all pools
    totalBorrowed: "34.99m", // Assuming this is constant for all pools
    poolAPR: `${pool.interestRate}%`,
    tenor: "3 months",
    collateralPercentage: `${pool.collateralPercentage}%`,
    lastUpdated: pool.lastUpdated,
    manager: pool.manager,
    id: pool.id,
  };
};

const Pooltable = () => {
  const { loading, error, data } = useQuery(GET_POOLS);
  console.log(" pool table error: ", error);
  const TableItems = data?.pools?.map(mapPoolData) || [];

  return (
    <div className="bg-transparent flex overflow-scroll lg:overflow-hidden ">
      {loading ? <div>Table is loading</div> : <TableView poolData={TableItems} />}
    </div>
  );
};

export default Pooltable;
