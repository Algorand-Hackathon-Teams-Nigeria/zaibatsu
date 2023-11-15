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
    const bal = userAccount?.assets
      .find((ast) => ast['asset-id'].toString() === asset?.asset_id)?.amount ?? 0
    return bal.toFixed(2)
  }

  async function handleFundPool() {
    if (appClient && activeAddress && appRef && activeAccount && asset) {
      const algodClient = getAlgodClient()

      const suggestedParams = await algodClient.getTransactionParams().do()
      const feeTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: pool.address,
        amount: 300000,
        suggestedParams,
      })

      await appClient.payTransactionFee({ txn: feeTxn })

      const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: pool.address,
        to: pool.address,
        amount: 0,
        assetIndex: Number(asset.asset_id),
        suggestedParams
      })
      const signedTxn = optInTxn.signTxn(new Buffer(pool.privateKey, "base64"))
      await algodClient.sendRawTransaction(signedTxn).do()
      await algosdk.waitForConfirmation(algodClient, optInTxn.txID().toString(), 3)

      const assetTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: pool.address,
        amount: Number(amountRef.current.value),
        assetIndex: Number(asset.asset_id),
        suggestedParams,
      })

      const recordId = `${assetTxn.txID().slice(0, 6)}-${Math.random()}`

      appClient.lendToPool(
        { lend_id: recordId, txn: assetTxn, pool_id: new TextDecoder().decode(pool.id) },
        {
          boxes: [
            { appIndex: Number(appRef.appId), name: new Uint8Array(new TextEncoder().encode(pool.fullName)) },
            { appIndex: Number(appRef.appId), name: new Uint8Array(new TextEncoder().encode(recordId)) }]
        }
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
          <AssetsDropdown editable={false} defaultAsset={asset} net='testnet' onSelect={(asset: AssetData) => setAsset(asset)} />
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
