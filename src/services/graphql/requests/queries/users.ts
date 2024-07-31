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
