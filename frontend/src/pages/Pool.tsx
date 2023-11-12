import { PoolInfo } from '../components'
import { BiSearch } from 'react-icons/bi'
import { createAppClient, getAlgodClient } from '../utils/network/contract'
import { useWallet } from '@txnlab/use-wallet'
import React from 'react'

export default function Pool() {
  const { signer, activeAddress } = useWallet()
  const appClient = createAppClient(signer, activeAddress ?? '')
  const algodClient = getAlgodClient()

  React.useEffect(() => {
    async function getAppBoxes() {
      const appId = await appClient.appClient.getAppReference().then((ref) => ref.appId)
      const boxes = await algodClient.getApplicationBoxes(Number(appId)).do()
      console.log({ boxes, appId })
    }

    getAppBoxes().catch(console.error)
  })
  return (
    <main className="">
      <PoolInfo />
      <div className="flex mt-9 justify-between">
        <h4 className="font-medium text-lg">Pool</h4>
        <div className="flex items-center gap-3 bg-black/5 p-1 px-2 rounded transition-all focus-within:shadow-lg">
          <BiSearch />
          <input className="bg-transparent outline-none" placeholder="Search anything here" />
        </div>
      </div>
    </main>
  )
}
