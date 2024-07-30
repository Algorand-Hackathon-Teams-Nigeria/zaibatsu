import { gql } from "urql";

export const ACTIVITIES = gql`
  query Activities {
    activities {
      message
      id
      detailId
      dateAdded
    }
  }
`;
