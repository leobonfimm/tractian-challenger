import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { Location, getLocations } from '../api/get-locations'
import { SearchFilterForm } from './search-filter-form'
import { TreeLocation } from './tree-location'

interface ActiveNavigationProps {
  companyId: string
}

export function Locations({ companyId }: ActiveNavigationProps) {
  const [searchParams] = useSearchParams()
  const [locations, setLocations] = useState<Location[]>([])
  const searchTitle = searchParams.get('searchTitle') ?? ''

  useEffect(() => {
    getLocations(companyId).then((response) => setLocations(response))
  }, [companyId])

  function filterTree(locations: Location[], query: string): Location[] {
    query = query.toLowerCase()

    function search(location: Location): boolean {
      let match = location.name.toLowerCase().includes(query)

      if (location.subLocations) {
        location.subLocations = location.subLocations.filter((child) =>
          search(child),
        )
        match = match || location.subLocations.length > 0
      }

      if (location.assets) {
        location.assets = location.assets.filter((asset) =>
          asset.name.toLowerCase().includes(query),
        )
        match = match || location.assets.length > 0
      }

      return match
    }

    return locations.filter((location) => search(location))
  }

  const filteredLocation = filterTree(locations, searchTitle)

  return (
    <aside className="w-full max-w-[480px] rounded-md border border-[#D8DFE6]">
      <SearchFilterForm />

      <nav className="overflow-y-auto h-[calc(100vh-225px)] px-1 py-2">
        {filteredLocation.map((location) => (
          <div key={location.id} className="flex flex-col">
            <TreeLocation location={location} />
          </div>
        ))}
      </nav>
    </aside>
  )
}
