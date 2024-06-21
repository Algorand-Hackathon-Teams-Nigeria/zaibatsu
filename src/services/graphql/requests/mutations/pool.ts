import { gql } from "urql";

export const NEW_POOL = gql`
  mutation NewPool($input: NewPoolInput!) {
    newPool(input: $input) {
      manager {
        address
        id
      }
      id
      name
    }
  }
`;
