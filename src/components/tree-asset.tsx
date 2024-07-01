import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Asset } from '../api/get-locations'

import { useSearchParams } from 'react-router-dom'
import assetIcon from '../assets/asset.png'
import componentIcon from '../assets/component.png'

interface AssetProps {
  currentAsset: Asset
  assets: Asset[]
}

export function TreeAsset({ assets, currentAsset }: AssetProps) {
  const [, setSearchParams] = useSearchParams()
  const [showMenu, setShowMenu] = useState(false)
  const [assetSelected, setAssetSelected] = useState(false)
  const { name, sensorType } = currentAsset

  function handleSetAssetIdParam(id: string) {
    setAssetSelected(true)
    setSearchParams((state) => {
      if (id) state.set('assetSelectedId', id)
      else state.delete('assetSelectedId')

      return state
    })
  }

  return (
    <div className="mt-1">
      {assets.length > 0 ? (
        <button
          className="flex items-center gap-1 disabled:ml-8"
          onClick={() => setShowMenu(!showMenu)}
        >
          {assets.length !== 0 && (
            <>
              {showMenu ? (
                <ChevronDown size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </>
          )}
          {sensorType ? (
            <img src={componentIcon} alt="" className="w-6 h-6" />
          ) : (
            <img src={assetIcon} alt="" className="w-6 h-6" />
          )}
          <span>{name}</span>
        </button>
      ) : (
        <button
          data-current={assetSelected}
          className="flex items-center gap-1 ml-8 data-[current=true]:bg-[#2188FF] data-[current=true]:text-white"
          onClick={() => handleSetAssetIdParam(currentAsset.id)}
        >
          {sensorType ? (
            <img src={componentIcon} alt="" className="w-6 h-6" />
          ) : (
            <img src={assetIcon} alt="" className="w-6 h-6" />
          )}
          <span>{name}</span>
        </button>
      )}

      {showMenu && assets.length > 0 && (
        <div className="ml-4">
          {assets.map((asset) => (
            <TreeAsset
              key={asset.id}
              currentAsset={asset}
              assets={asset.subAssets}
            />
          ))}
        </div>
      )}
    </div>
  )
}
