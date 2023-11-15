import { useAtom } from "jotai"
import { poolsAtom } from "../../state/atoms"
import React from "react"
import { PoolData } from "../../types"
import { AssetData, buildAssetImageURL, getAssetList } from '../../utils/assets'

interface SelectPoolProps {
  onSelect?: (pool: PoolData) => void
}

export default function SelectPool({ onSelect }: SelectPoolProps) {
  const [pools,] = useAtom(poolsAtom)
  const [activePool, setActivePool] = React.useState<PoolData | undefined>()
  const [open, setOpen] = React.useState(false)
  const [assetList, setAssetList] = React.useState<AssetData[]>([])

  async function getAssets() {
    const assetRes = await getAssetList({ page: 1, net: "testnet" })
    setAssetList(assetRes)
  }
  React.useEffect(() => {
    getAssets()
  }, [])


  function getPoolAssetImage(pool: PoolData): string | undefined {
    return assetList.find(ast => ast.asset_id == pool.assetId)?.image
  }

  return (
    <React.Fragment>
      <div className="flex items-center justify-between mt-6 p-2 border rounded py-4">
        <div className="w-full">
          {activePool ? (
            <p className="flex items-center w-full gap-3">
              <img className="h-6" src={getPoolAssetImage(activePool)} />
              <span className="font-medium text-lg">{activePool.name}</span>
            </p>
          ) : <p>Select Pool</p>}
        </div>
        <button type="button" onClick={() => setOpen(curr => !curr)}
          className="bg-primary/10 text-sm font-medium text-primary p-2 px-5 rounded">
          Select
        </button>
      </div>
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="py-3 font-medium text-xl">Pools</h3>
          <div className="flex text-sm font-medium text-black/80 pb-2 items-center w-full">
            <h4 className="flex-1 pl-2">Pool Name</h4>
            <div className="flex justify-evenly items-center flex-1">
              <span>MPR</span>
              <span>Tenor</span>
            </div>
          </div>
          {pools.map(pool => (
            <button onClick={() => { onSelect && onSelect(pool); setActivePool(pool); setOpen(curr => !curr) }}
              type="button" className="flex btn outline-none justify-between items-center w-full gap-4">
              <div className="flex items-center flex-1 gap-3">
                <img className="max-h-5" src={getPoolAssetImage(pool)} />
                <span>{pool.name}</span>
              </div>
              <div className="flex items-center justify-evenly flex-1 gap-5 font-normal">
                <span>{pool.mpr}</span>
                <span>{pool.tenor}</span>
              </div>
            </button>
          ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setOpen(curr => !curr)} />
        </form>
      </dialog>
    </React.Fragment>
  )
}
