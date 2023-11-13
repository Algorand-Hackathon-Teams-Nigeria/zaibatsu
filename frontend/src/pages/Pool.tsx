import { PoolInfo, PoolTable } from '../components'
import { BiSearch } from 'react-icons/bi'
import { getAlgodClient } from '../utils/network/contract'
import React from 'react'
import { useAtom } from 'jotai'
import { appRefAtom } from '../state/atoms'
import { PoolData } from '../types'
// import { poolCodec } from '../contracts/abiTypes'

export default function Pool() {
  const [loading, setLoading] = React.useState(true)
  const [pools, setPools] = React.useState<PoolData[]>([])
  const [appRef] = useAtom(appRefAtom)
  const algodClient = getAlgodClient()

  React.useEffect(() => {
    const getPools = async () => {
      try {
        const boxes = await algodClient.getApplicationBoxes(Number(appRef?.appId)).do()
        const textDecoder = new TextDecoder()
        const boxPromises = boxes.boxes.map(async (box) => {
          const boxData = await algodClient.getApplicationBoxByName(Number(appRef?.appId), box.name).do()
          // const value = poolCodec.decode(boxData.value)
          // console.log({ value })
          return { name: textDecoder.decode(boxData.name).split('-')[0], id: box.name }
        })
        await Promise.all(boxPromises).then((res) => {
          setPools(res)
          setLoading(false)
        })
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
