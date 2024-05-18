import { gql } from "@/__generated__";
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

export const AVERAGE_POOL_METRICS = gql(`
  query getPoolMetrics{averagePoolMetrics {
    collateralPercentage
    interestRate
  }}

`);
