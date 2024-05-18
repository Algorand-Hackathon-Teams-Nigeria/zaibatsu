//import { gql } from "src/__generated__";
import { gql } from "@apollo/client/index.js";

export const GET_POOLS = gql(/* GraphQL */ `
  query getPools {
    pools {
      key
      name
      interestRate
      collateralPercentage
      lastUpdated
      id
    }
  }
`);
