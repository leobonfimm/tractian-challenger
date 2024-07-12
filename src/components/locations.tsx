import { useEffect, useState } from 'react'

import { CircleAlert } from 'lucide-react'
import { Location, getLocations } from '../api/get-locations'
import { filterTree } from '../utils/filter-tree-menu'
import { SearchFilterForm } from './search-filter-form'
import { TreeLocation } from './tree-location'

interface ActiveNavigationProps {
  companyId: string
}

export function Locations({ companyId }: ActiveNavigationProps) {
  const [locations, setLocations] = useState<Location[]>([])
  const [searchTitle, setSearchTitle] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    getLocations(companyId).then((response) => setLocations(response))
  }, [companyId])

  function handleSearchFilter(query: string) {
    setSearchTitle(query)
    setIsSearching(!!query)
  }

  const filteredLocation = filterTree(locations, searchTitle)

  return (
    <aside className="w-full flex-1 max-w-[480px] rounded-md border border-[#D8DFE6]">
      <SearchFilterForm onSearchFilter={handleSearchFilter} />

      <nav className="overflow-y-auto h-[calc(100vh-225px)] px-1 py-2">
        {filteredLocation.length > 0 ? (
          <>
            {filteredLocation.map((location) => (
              <div key={location.id} className="flex flex-col">
                <TreeLocation location={location} isAlreadyOpen={isSearching} />
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-start mt-5 text-gray-400">
            <CircleAlert size={24} />
            <span>Sem resultados para o filtro aplicado</span>
          </div>
        )}
      </nav>
    </aside>
  )
}
