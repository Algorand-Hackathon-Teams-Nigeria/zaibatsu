//import { gql } from "src/__generated__";
import { gql } from "@apollo/client/index.js";
export const CREATE_POOL = gql(/* GraphQL */ `
  mutation createNewPool($input: PoolInputType!) {
    newPool(input: $input) {
      id
      name
    }
  }
`);
