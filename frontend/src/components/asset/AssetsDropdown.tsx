import React from 'react'
import { AssetData, buildAssetImageURL, getAssetList } from '../../utils/assets'
import { FaAngleDown } from 'react-icons/fa'

interface AssetsDropdownProps {
  onSelect?: (asset: AssetData) => void
}

export default function AssetsDropdown({ onSelect }: AssetsDropdownProps) {
  const [loading, setLoading] = React.useState(true)
  const [assetList, setAssetList] = React.useState<AssetData[]>([])
  const [activeAsset, setActiveAsset] = React.useState<AssetData | undefined>(undefined)
  const dropdownRef = React.useRef() as React.MutableRefObject<HTMLDetailsElement>

  async function getAssets() {
    const assetRes = await getAssetList({ page: 1, net: "mainnet" })
    setAssetList(curr => [...curr, ...assetRes])
    setLoading(false)
  }
  React.useEffect(() => {
    getAssets()
  }, [])

  function dropdownClickFactory(asset: AssetData) {
    return function() {
      setActiveAsset(asset);
      (dropdownRef.current.parentNode?.firstChild as HTMLDivElement).click()
      onSelect && onSelect(asset)
    }
  }

  return (
    <details ref={dropdownRef} className="dropdown">
      <summary tabIndex={0} className="btn btn-md btn-ghost w-full btn-outline">
        <div className='flex items-center gap-4'>
          {activeAsset ? (
            <React.Fragment>
              <img className='w-7' src={buildAssetImageURL(activeAsset)} alt={`${activeAsset.name} icon`} />
              <span>{activeAsset.name}</span>
              <FaAngleDown />
            </React.Fragment>
          ) : 'Select Asset'}
        </div>
      </summary>
      <ul tabIndex={0} className="dropdown-content max-h-72 overflow-auto grid z-[1] mt-1 menu p-2 shadow bg-base-200 rounded-box w-full">
        {loading ? (
          <span className="loading loading-infinity loading-lg self-center" />
        ) : (
          <React.Fragment>
            {assetList.length > 0 ? (
              assetList.map((asset) => (
                <React.Fragment>
                  <button type='button' onClick={dropdownClickFactory(asset)} className='btn btn-md justify-start gap-3'>
                    <img className='w-7' src={buildAssetImageURL(asset)} alt={`${asset.name} icon`} />
                    <span>{asset.name}</span>
                  </button>
                  <div className='divider py-0 my-0' />
                </React.Fragment>
              ))
            ) : (
              <p>No Assets</p>
            )}
          </React.Fragment>
        )}
      </ul>
    </details>
  )
}
