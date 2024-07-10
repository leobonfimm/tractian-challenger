import { useEffect, useMemo, useState } from 'react'

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
  const [sensorType, setSensorType] = useState<string | undefined>()
  const [status, setStatus] = useState<string | undefined>()

  useEffect(() => {
    getLocations(companyId).then((response) => setLocations(response))
  }, [companyId])

  function handleSearchFilter(query: string) {
    setSearchTitle(query)
    setIsSearching(!!query || !!sensorType || !!status)
  }

  function handleSensorTypeFilter(type: string) {
    setSensorType((prevType) => (!prevType ? type : undefined))
    setIsSearching(!!searchTitle || !!type || !!status)
  }

  function handleStatusFilter(status: string) {
    setStatus((prevStatus) => (!prevStatus ? status : undefined))
    setIsSearching(!!searchTitle || !!sensorType || !!status)
  }

  const filteredLocation = useMemo(
    () => filterTree(locations, searchTitle, sensorType, status),
    [locations, searchTitle, sensorType, status],
  )

  return (
    <aside className="w-full flex-1 max-w-[480px] rounded-md border border-[#D8DFE6]">
      <SearchFilterForm
        onSearchFilter={handleSearchFilter}
        onSensorTypeFilter={handleSensorTypeFilter}
        onStatusFilter={handleStatusFilter}
      />

      <nav className="overflow-y-auto h-[calc(100vh-225px)] px-1 py-2">
        {filteredLocation.map((location) => (
          <div key={location.id} className="flex flex-col">
            <TreeLocation location={location} isAlreadyOpen={isSearching} />
          </div>
        ))}
      </nav>
    </aside>
  )
}
