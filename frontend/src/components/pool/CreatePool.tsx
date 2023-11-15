import React from 'react'
import { GrClose } from 'react-icons/gr'
import { getAlgodClient } from '../../utils/network/contract'
import { useWallet } from '@txnlab/use-wallet'
import { enqueueSnackbar } from 'notistack'
import algosdk from 'algosdk'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom } from '../../state/atoms'
import { AssetsDropdown } from '../asset'
import { AssetData } from '../../utils/assets'

export default function CreatePool() {
  const [asset, setAsset] = React.useState<AssetData | undefined>()
  const nameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const mprRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const tenorRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const { activeAddress } = useWallet()

  async function handleCreatePool() {
    if (activeAddress && appClient && appRef && asset) {
      const algodClient = getAlgodClient()

      const suggestedParams = await algodClient.getTransactionParams().do()
      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appRef.appAddress,
        amount: 300000,
        suggestedParams,
      })

      const pool_id = `${nameRef.current.value}-${new Date().toUTCString()}-pool`

      const boxName = new Uint8Array(new TextEncoder().encode(pool_id))

      await appClient
        .createPool(
          {
            txn: transaction,
            pool_id,
            pool_name: nameRef.current.value,
            pool_mpr: mprRef.current.value,
            pool_tenor: tenorRef.current.value,
            pool_asset_id: asset.asset_id
          },
          { ...suggestedParams, boxes: [{ appIndex: Number(appRef.appId), name: boxName }] },
        ).then(() => {
          enqueueSnackbar('Success: Pool created', { variant: 'success' })
        })
        .catch((err) => {
          enqueueSnackbar(`Pool Creation Error: ${err}`, { variant: 'error' })
          return
        })

    } else {
      enqueueSnackbar('Cannot create pool: Wallet not connected', { variant: 'error' })
      return
    }
  }
  return (
    <React.Fragment>
      <form method="dialog" className="bg-white modal-box p-6 rounded-lg w-full max-w-lg relative">
        <h2 className="font-semibold text-2xl my-2 mb-7">Create Pool</h2>
        <fieldset>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Pool name</label>
            <input ref={nameRef} type="text" placeholder="Enter name" className="input w-full input-bordered" />
          </div>
          <div className="flex mt-7 flex-col gap-2">
            <label className="text-sm font-medium">Asset</label>
            <AssetsDropdown net='testnet' onSelect={(selected: AssetData) => setAsset(selected)}/>
          </div>
          <div className="flex mt-7 flex-col gap-2">
            <label className="text-sm font-medium">Inrest (MPR)</label>
            <input ref={mprRef} type="number" placeholder="Enter intrest in months" className="input w-full input-bordered" />
          </div>
          <div className="flex mt-7 flex-col gap-2">
            <label className="text-sm font-medium">Tenor</label>
            <input ref={tenorRef} type="number" placeholder="Enter tenor in months" className="input w-full input-bordered" />
          </div>
        </fieldset>
        <button onClick={handleCreatePool} className="btn btn-primary w-full mt-9">
          Continue
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>
          <GrClose />
        </button>
      </form>
    </React.Fragment>
  )
}
