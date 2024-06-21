import { gql } from "urql";

export const POOLS = gql`
  query Pools(
    $assetOpts: NoneTypeNoneTypeListOptions
    $opts: PoolFilterPoolOrderingListOptions
  ) {
    pools(opts: $opts) {
      assets(opts: $assetOpts) {
        imageUrl
        unitName
        id
      }
      name
      totalLoanTemplates
      netValue
      id
    }
  }
`;
