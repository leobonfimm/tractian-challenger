import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Asset, Location } from '../api/get-locations'
import { TreeAsset } from './tree-asset'

import locationIcon from '../assets/location.png'

interface SubLocationProps {
  name: string
  subLocations: Location[]
  assets: Asset[]
}

export function TreeLocation({ name, subLocations, assets }: SubLocationProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showMenuAssets, setShowMenuAssets] = useState(false)

  return (
    <div className="mt-1">
      {subLocations.length !== 0 ? (
        <button
          className="flex items-center gap-1 disabled:ml-4"
          onClick={() => setShowMenu(!showMenu)}
        >
          {subLocations.length !== 0 && (
            <>
              {showMenu ? (
                <ChevronDown size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </>
          )}
          <img src={locationIcon} alt="" className="w-6 h-6" />
          <span>{name}</span>
        </button>
      ) : (
        <button
          className="flex items-center gap-1 disabled:ml-4"
          onClick={() => setShowMenuAssets(!showMenuAssets)}
        >
          {assets.length !== 0 && (
            <>
              {showMenuAssets ? (
                <ChevronDown size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </>
          )}
          <img src={locationIcon} alt="" className="w-6 h-6" />
          <span>{name}</span>
        </button>
      )}

      {showMenu && subLocations.length > 0 && (
        <div className="ml-4">
          {subLocations.map((subLocation) => (
            <div key={subLocation.id} className="flex flex-col">
              <TreeLocation
                name={subLocation.name}
                subLocations={subLocation.subLocations}
                assets={subLocation.assets}
              />
            </div>
          ))}
        </div>
      )}

      {showMenuAssets && assets.length > 0 && (
        <div className="ml-4">
          {assets.map((asset) => (
            <div key={asset.id} className="flex flex-col">
              <TreeAsset currentAsset={asset} assets={asset.subAssets} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
