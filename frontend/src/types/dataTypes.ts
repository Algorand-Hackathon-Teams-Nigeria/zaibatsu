export interface PoolData {
  id: Uint8Array,
  fullName: string,
  name: string,
  privateKey: string,
  address: string,
  manager_address: string,
  mpr: string,
  tenor: string,
  assetId: string,
  total: string,
  paidIn: string,
  paidOut: string
}

export interface Account {
  address: string,
  amount: number,
  assets: {
    amount: number,
    "asset-id": number,
    "if-frozen": boolean
  }[],
  "min-balance": number
}
