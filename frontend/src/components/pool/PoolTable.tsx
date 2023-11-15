import React from "react";
import { PoolActions } from ".";
import { PoolData } from "../../types";
import { AssetData, getAssetList } from "../../utils/assets";

interface PoolTableProps {
  pools: PoolData[]
}

export default function PoolTable({ pools }: PoolTableProps) {
  const [assetList, setAssetList] = React.useState<AssetData[]>([])

  React.useEffect(() => {
    async function getAssets() {
      const assets = await getAssetList({net: "testnet", page: 1})
      setAssetList(assets)
    }

    getAssets()
  }, [])

  return (
    <React.Fragment>
      <table className='table mt-3 lg:hidden'>
        <tbody>
          {pools.map((pool, id) => (
            <tr key={id} className="mt-3 grid grid-cols-1">
              <th className='font-semibold tex-lg pl-0'>{pool.name}</th>
              <td className="pl-0 font-medium flex w-full items-center justify-between">
                <span>Asset</span>
                <span className="h-full">
                  <img className="h-full" src={assetList.find(asset => asset.asset_id === pool.assetId)?.image}/>
                </span>
              </td>
              <td className="pl-0 font-medium flex w-full items-center justify-between">
                <span>Total Supplied:</span>
                <span>{pool.paidIn}</span>
              </td>
              <td className="pl-0 font-medium flex w-full items-center justify-between">
                <span>Total Borrowed:</span>
                <span>{pool.paidOut}</span>
              </td>
              <td className="pl-0 font-medium flex w-full items-center justify-between">
                <span>Pool MPR:</span>
                <span>{pool.mpr}</span>
              </td>
              <td className="pl-0 font-medium flex w-full items-center justify-between">
                <span>Tenor:</span>
                <span>{pool.tenor}</span>
              </td>
              <PoolActions pool={pool} />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="hidden lg:block ">
        <table className='table mt-3'>
          <thead>
            <tr>
              <th className="pl-0">Pool name</th>
              <th>Asset</th>
              <th>Total Supplied</th>
              <th>Total Borrowed</th>
              <th>Pool MPR</th>
              <th>Tenor</th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool, id) => (
              <tr key={id}>
                <th className='font-medium pl-0'>{pool.name}</th>
                <td>
                  <span className="h-full">
                    <img className="h-7" src={assetList.find(asset => asset.asset_id === pool.assetId)?.image}/>
                  </span>
                </td>
                <td>{pool.paidIn}</td>
                <td>{pool.paidOut}</td>
                <td>{pool.mpr}</td>
                <td>{pool.tenor}</td>
                <PoolActions pool={pool} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
