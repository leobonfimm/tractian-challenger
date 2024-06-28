import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { buildTreeLocation } from '../utils/build-tree-locations'
import { TreeNode } from './tree-node'

export interface Location {
  id: string
  name: string
  parentId: string | null
  subLocations: Location[]
}

interface ActiveNavigationProps {
  companyId: string
}

export function Locations({ companyId }: ActiveNavigationProps) {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    api
      .get<Location[]>(`companies/${companyId}/locations`)
      .then((response) => setLocations(buildTreeLocation(response.data)))
  }, [companyId])

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
          <TreeNode
            key={location.id}
            name={location.name}
            subLocations={location.subLocations}
          />
        ))}
      </nav>
    </aside>
  )
}
