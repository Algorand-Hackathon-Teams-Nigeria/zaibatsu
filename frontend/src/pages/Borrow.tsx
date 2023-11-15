import React from "react";
import { SelectPool } from "../components";
import { AssetsDropdown } from "../components/asset";
import { PoolData } from "../types";
import { getExchangeRates } from "../utils/exchangeRates";
import { AssetData } from "../utils/assets";

export default function Borrow() {
  const [colateral, setColateral] = React.useState(0)
  const [pool, setPool] = React.useState<PoolData | undefined>()
  const [colAsset, setColAsset] = React.useState<AssetData | undefined>()

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (pool) {
      const amtPlusCollateral = (parseInt(e.target.value) * Number(pool.mpr) / 100) + parseInt(e.target.value)
      setColateral(isNaN(amtPlusCollateral) ? 0 : amtPlusCollateral)
    }
    if (colAsset) {
      const rate = await getExchangeRates(colAsset.unit, "USD")
      console.log({rate})
    }
  }
  return (
    <main>
      <h3>Borrow</h3>
      <SelectPool onSelect={selectPool => setPool(selectPool)} />
      {!pool && <p className="p-3 font-medium text-black/60">Please select a pool</p>}
      <div className={`bg-base-200 p-6 rounded-lg mt-4 lg:max-w-sm ${!pool ? "pointer-events-none opacity-60" : ""}`}>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm">Collateral Asset</label>
          <AssetsDropdown net="testnet" onSelect={(ast) => setColAsset(ast)}/>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label className="flex font-medium text-sm items-center justify-between px-1 pr-2">
            <span>Amount to borrow</span>
            <span className="text-black/80">$</span>
          </label>
          <input onChange={handleChange}
            className="input bg-transparent input-bordered input-md"
            placeholder="0.00" type="number" />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label className="flex font-medium text-sm items-center justify-between px-1 pr-2">
            <span>Collateral + Amount</span>
            <span className="text-black/80">$</span>
          </label>
          <p className="border p-3 rounded-md text-black/50 border-black/10">{colateral}</p>
        </div>
      </div>
    </main>
  )
}
