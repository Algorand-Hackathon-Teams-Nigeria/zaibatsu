import { gql } from "urql";

export const ALGORAND_STANDARD_ASSETS = gql`
  query AlgorandStandardAssets(
    $opts: AlgorandStandardAssetFilterNoneTypeListOptions
  ) {
    algorandStandardAssets(opts: $opts) {
      imageUrl
      id
      assetId
      unitName
    }
  }
`;
