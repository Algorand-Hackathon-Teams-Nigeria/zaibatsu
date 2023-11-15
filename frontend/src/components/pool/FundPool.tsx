import { useAtom } from 'jotai'
import { PoolData } from '../../types'
import { appClientAtom, appRefAtom, userAccountAtom } from '../../state/atoms'
import { getAlgodClient } from '../../utils/network/contract'
import algosdk from 'algosdk'
import { useWallet } from '@txnlab/use-wallet'
import React from 'react'
import { AssetsDropdown } from '../asset'
import { AssetData, getAssetList } from '../../utils/assets'
import { enqueueSnackbar } from 'notistack'

interface FundPoolProps {
  pool: PoolData
}

export default function FundPool({ pool }: FundPoolProps) {
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const [userAccount] = useAtom(userAccountAtom)
  const [asset, setAsset] = React.useState<AssetData | undefined>(undefined)
  const { activeAddress, activeAccount } = useWallet()
  const amountRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  async function getAssets() {
    const assetRes = await getAssetList({ page: 1, net: "testnet" })
    const defAsset = assetRes.filter(asset => asset.asset_id == userAccount?.assets[1]['asset-id'].toString())[0]
    setAsset(defAsset)
  }

  React.useEffect(() => {
    getAssets()
  }, [])

  function getAssetBallance() {
    const bal =  userAccount?.assets
      .find((ast) => ast['asset-id'].toString() === asset?.asset_id)?.amount ?? 0
    return bal.toFixed(2)
  }

  async function handleFundPool() {
    if (appClient && activeAddress && appRef && activeAccount && asset) {
      const algodClient = getAlgodClient()

      const suggestedParams = await algodClient.getTransactionParams().do()
      const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
        from: pool.address,
        appIndex: Number(appRef.appId),
        suggestedParams
      }).signTxn(new TextEncoder().encode(pool.privateKey))

      const assetTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appRef.appAddress,
        amount: Number(amountRef.current.value),
        assetIndex: Number(asset.asset_id),
        suggestedParams,
      })

      appClient.lendToPool(
        { opt_in_txn: optInTxn, txn: assetTxn, pool_id: new TextDecoder().decode(pool.id) },
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
          <AssetsDropdown defaultAsset={asset} net='testnet' onSelect={(asset: AssetData) => setAsset(asset)} />
        </div>
        <div className="flex flex-col w-full gap-3 mt-5">
          <label className="flex items-center justify-between" htmlFor="pool-asset">
            <span>Amount</span>
            <span>Bal: {getAssetBallance()}<strong className='pl-3'>{asset?.unit}</strong></span>
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
