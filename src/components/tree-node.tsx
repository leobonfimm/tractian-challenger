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

export function TreeNode({ name, subLocations }: SubLocationProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="mt-1">
      <button
        className="flex items-center gap-1 disabled:ml-4"
        onClick={() => setShowMenu(!showMenu)}
        disabled={subLocations.length === 0}
      >
        {subLocations.length !== 0 && (
          <>
            {showMenu ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </>
        )}
        <img src={locationIcon} alt="" className="w-6 h-6" />
        <span>{name}</span>
      </button>

      {showMenu && subLocations.length > 0 && (
        <div className="ml-4">
          {subLocations.map((subLocation) => (
            <div key={subLocation.id} className="flex flex-col">
              <TreeNode
                name={subLocation.name}
                subLocations={subLocation.subLocations}
                assets={subLocation.assets}
              />
              {subLocation.assets.map((asset) => (
                <div key={asset.id} className="ml-4">
                  <TreeAsset currentAsset={asset} assets={asset.subAssets} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
