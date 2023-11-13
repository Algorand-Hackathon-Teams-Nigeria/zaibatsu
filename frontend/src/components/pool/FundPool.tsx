import { useAtom } from 'jotai'
import { PoolData } from '../../types'
import { appClientAtom, appRefAtom } from '../../state/atoms'
import { getAlgodClient } from '../../utils/network/contract'
import algosdk from 'algosdk'
import { useWallet } from '@txnlab/use-wallet'
import React from 'react'
import { AssetsDropdown } from '../asset'
import { AssetData } from '../../utils/assets'
import { enqueueSnackbar } from 'notistack'

interface FundPoolProps {
  pool: PoolData
}

export default function FundPool({ pool }: FundPoolProps) {
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const [asset, setAsset] = React.useState<AssetData | undefined>(undefined)
  const { activeAddress, activeAccount } = useWallet()
  const amountRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  async function handleFundPool() {
    if (appClient && activeAddress && appRef && activeAccount && asset) {
      const algodClient = getAlgodClient()

      const suggestedParams = await algodClient.getTransactionParams().do()
      const assetTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appRef.appAddress,
        amount: Number(amountRef.current.value),
        assetIndex: Number(asset.asset_id),
        suggestedParams,
      })

      appClient.lendToPool(
        { txn: assetTxn, pool_id: new TextDecoder().decode(pool.id) },
        { boxes: [{ appIndex: Number(appRef.appId), name: pool.id }] }
      )
        .then(() => {
          enqueueSnackbar(`Success: ${pool.name} funded with ${amountRef.current.value} ${asset.unit}`, { variant: "success" })
        })
        .catch(err => {
          enqueueSnackbar(`Pool Fund Error: ${err}`, { variant: "error" })
          return
        })
    } else {
      enqueueSnackbar("Cannot fund pool: Wallet not connected", { variant: "error" })
    }
  }
  return (
    <form method="dialog">
      <h3 className="text-xl font-medium pb-5">Fund Pool: {pool.name}</h3>

      <fieldset className="mb-6">
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="pool-asset">Asset</label>
          <AssetsDropdown onSelect={(asset: AssetData) => setAsset(asset)} />
        </div>
        <div className="flex flex-col w-full gap-3 mt-5">
          <label className="flex items-center justify-between" htmlFor="pool-asset">
            <span>Amount</span>
            <span>Bal: 0.00</span>
          </label>
          <input ref={amountRef} type="number" id="pool-asset" className="input input-md input-bordered" />
        </div>
      </fieldset>
      <button onClick={handleFundPool} className="btn btn-primary w-full">
        Confirm
      </button>
    </form>
  )
}
