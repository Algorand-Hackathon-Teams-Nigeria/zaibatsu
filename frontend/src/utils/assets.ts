export const ASSETS_LIST_SOURCE = 'https://query.algoexplorerapi.io/api/v1/assets'
export interface AssetURL {
  url: string
  type: string
}

export interface AssetData {
  asset_id: string
  name: string
  title: string
  description: string
  creator: string
  unit: string
  url: string
  total_supply?: string
  circulating_supply?: string
  external_links?: AssetURL[]
  last_update: number
  delete_verification: boolean
  created_at: number
  score: string
  categories: string[]
  image?: string
}

export async function getAssetList(args: { page: number, net: "testnet" | "mainnet"}): Promise<Array<AssetData>> {
  return await fetch(`/json/assets-${args.net}-${args.page}.json`).then((res) => res.json())
}

export function buildAssetImageURL(asset: AssetData): string {
  return `https://assets.algoexplorer.io/asset-logo-${asset.asset_id}.image`
}
