import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Asset } from '../api/get-locations'

import assetIcon from '../assets/asset.png'
import componentIcon from '../assets/component.png'

interface AssetProps {
  currentAsset: Asset
  assets: Asset[]
}

export function TreeAsset({ assets, currentAsset }: AssetProps) {
  const [showMenu, setShowMenu] = useState(false)
  const { name, sensorType } = currentAsset

  return (
    <div className="mt-1">
      <button
        className="flex items-center gap-1 disabled:ml-8"
        onClick={() => setShowMenu(!showMenu)}
        disabled={assets.length === 0}
      >
        {assets.length !== 0 && (
          <>
            {showMenu ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </>
        )}
        {sensorType ? (
          <img src={componentIcon} alt="" className="w-6 h-6" />
        ) : (
          <img src={assetIcon} alt="" className="w-6 h-6" />
        )}
        <span>{name}</span>
      </button>

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
