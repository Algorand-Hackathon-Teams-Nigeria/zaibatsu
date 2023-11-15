import { PoolInfo, PoolTable } from '../components'
import { BiSearch } from 'react-icons/bi'
import { getAlgodClient } from '../utils/network/contract'
import React from 'react'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom, poolsAtom } from '../state/atoms'
import { PoolData } from '../types'
import { poolCodec } from '../utils/abiTypes'

export default function Pool() {
  const [loading, setLoading] = React.useState(true)
  const [pools, setPools] = useAtom(poolsAtom)
  const [appClient] = useAtom(appClientAtom)
  const [appRef] = useAtom(appRefAtom)
  const algodClient = getAlgodClient()

  React.useEffect(() => {
    const getPools = async () => {
      try {
        const boxNames = await appClient?.appClient.getBoxNames()
        if (boxNames) {
          const boxPromises = boxNames.map(async (boxName) => {
            return await algodClient.getApplicationBoxByName(Number(appRef?.appId), boxName.nameRaw).do()
          })
          let boxes = await Promise.all(boxPromises)
          boxes = boxes.filter(box => new TextDecoder().decode(box.name).endsWith("pool"))
          const poolValues = boxes.map(box => {
            const poolVal = poolCodec.decode(box.value) as Array<string>
            return {
              id: box.name,
              fullName: new TextDecoder().decode(box.name),
              name: poolVal[2],
              address: poolVal[0],
              privateKey: poolVal[1],
              manager_address: poolVal[3],
              mpr: poolVal[4],
              tenor: poolVal[5],
              assetId: poolVal[6],
              total: poolVal[7],
              paidIn: poolVal[8],
              paidOut: poolVal[9]
            }
          })
          setPools(poolValues)
        }
        setLoading(false)
      } catch (error) {
        console.error('Fetch Error: ', error)
        setLoading(false)
      }
    }
    getPools()
  }, [])

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
      {loading ? (
        <span className="loading loading-infinity loading-lg" />
      ) : (
        <React.Fragment>{pools.length > 0 ? <PoolTable pools={pools} /> : <p>No Open Pools</p>}</React.Fragment>
      )}
    </main>
  )
}
