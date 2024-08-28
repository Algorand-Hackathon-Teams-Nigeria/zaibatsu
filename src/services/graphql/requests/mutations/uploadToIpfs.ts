import { gql } from "urql";

export const UPLOAD_TO_IPFS = gql`
  mutation UpdloadImage($image: Upload!) {
    updloadImage(image: $image)
  }
`;

export const PIN_LOAN_NFT_IMAGES = gql`
  mutation PinLoanNftImages($input: PinLoanNftImagesInput!) {
    pinLoanNftImages(input: $input) {
      borrowerIpfsAsset {
        id
        ipfsHash
      }
      lenderIpfsAsset {
        id
        ipfsHash
      }
    }
  }
`;
