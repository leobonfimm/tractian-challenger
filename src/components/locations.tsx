import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Location, getLocations } from '../api/get-locations'
import { TreeAsset } from './tree-asset'
import { TreeNode } from './tree-node'

interface ActiveNavigationProps {
  companyId: string
}

export function Locations({ companyId }: ActiveNavigationProps) {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    getLocations(companyId).then((response) => setLocations(response))
  }, [companyId])

  console.log(locations)

  return (
    <aside className="w-full max-w-[480px] rounded-md border border-[#D8DFE6]">
      <form className="border-b border-[#D8DFE6] flex items-center w-full p-3">
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          className="flex-1"
        />
        <Search size={14} />
      </form>

      <nav className="overflow-y-auto h-[calc(100vh-225px)] px-1 py-2">
        {locations.map((location) => (
          <div key={location.id} className="flex flex-col">
            <TreeNode
              name={location.name}
              subLocations={location.subLocations}
              assets={location.assets}
            />
            {location.assets.map((asset) => (
              <TreeAsset
                key={asset.id}
                currentAsset={asset}
                assets={asset.subAssets}
              />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
