import { gql } from "@/__generated__";
export const CREATE_POOL = gql(/* GraphQL */ `
  mutation createNewPool($input: PoolInputType!) {
    newPool(input: $input) {
      id
      name
    }
  }
`);
