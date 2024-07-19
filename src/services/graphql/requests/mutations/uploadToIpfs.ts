import { gql } from "urql";

export const UPLOAD_TO_IPFS = gql`
  mutation UpdloadImage($image: Upload!) {
    updloadImage(image: $image)
  }
`;
