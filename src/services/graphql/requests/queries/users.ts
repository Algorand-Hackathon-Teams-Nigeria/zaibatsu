import { gql } from "urql";

export const ACTIVITIES = gql`
  query Activities($opts: ActivityFilterActivityOrderingListOptions) {
    activities(opts: $opts) {
      id
      message
      read
      detailId
      dateAdded
      lastUpdated
    }
  }
`;

export const USER_POOL_ASSET_HOLDING = gql`
  query UserPoolAssetHoldings($address: String!, $poolId: ID!) {
    userPoolAssetHoldings(address: $address, poolId: $poolId) {
      id
      balance
      lastUpdated
      assetPrice
      asset {
        id
        imageUrl
        decimals
        unitName
        assetId
      }
    }
  }
`;
