import React from 'react'
import { GrClose } from 'react-icons/gr'
import { createAppClient, getAlgodClient } from '../../utils/network/contract'
import { useWallet } from '@txnlab/use-wallet'
import { enqueueSnackbar } from 'notistack'
import algosdk from 'algosdk'

export default function CreatePool() {
  const nameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const mprRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const tenorRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  const { signer, activeAddress } = useWallet()

  async function handleCreatePool() {
    if (activeAddress) {
      const algodClient = getAlgodClient()

      const appClient = createAppClient(signer, activeAddress)

      const deployParams = {
        onSchemaBreak: 'append',
        onUpdate: 'append',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any

      await appClient.deploy(deployParams).catch((err) => {
        enqueueSnackbar(`Deploy Error: ${err}`, { variant: 'error' })
        return
      })

      const app = await appClient.appClient.getAppReference()

      const suggestedParams = await algodClient.getTransactionParams().do()
      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: app.appAddress,
        amount: 200000,
        suggestedParams,
      })

      const boxName = await crypto.subtle
        .digest('SHA-256', new TextEncoder().encode(nameRef.current.value))
        .then((res) => new Uint8Array(res))

      await appClient
        .createPool(
          {
            payment: transaction,
            pool_name: nameRef.current.value,
            pool_mpr: parseInt(mprRef.current.value),
            pool_tenor: parseInt(mprRef.current.value),
          },
          { ...suggestedParams, boxes: [{ appIndex: Number(app.appId), name: boxName }] },
        )
        .catch((err) => {
          enqueueSnackbar(`Pool Creation Error: ${err}`, { variant: 'error' })
          return
        })

      enqueueSnackbar('Success: Pool created', { variant: 'success' })
    } else {
      enqueueSnackbar('Cannot create pool wallet not registered', { variant: 'error' })
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
            <label className="text-sm font-medium">Assets</label>
            <input type="text" placeholder="Enter assets" className="input w-full input-bordered" />
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
