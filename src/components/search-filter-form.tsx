import { Search, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface SearchFilterFormSchema {
  title: string
  sensorType?: string
  status?: string
}

interface SearchFilterFormProps {
  onSearchFilter: (query: string) => void
  onSensorTypeFilter: (type: string) => void
  onStatusFilter: (status: string) => void
}

export function SearchFilterForm({
  onSearchFilter,
  onSensorTypeFilter,
  onStatusFilter,
}: SearchFilterFormProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  useEffect(() => {
    onSearchFilter(debouncedQuery)
  }, [debouncedQuery, onSearchFilter])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)
  }

  return (
    <div className="border-b border-[#D8DFE6] flex items-center w-full p-3">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="flex-1"
        onChange={handleSearch}
      />

      <div className="flex gap-2 ml-2">
        <button type="button" className="cursor-pointer text-[#2188FF]">
          <Search size={14} />
        </button>

        <button
          type="button"
          className="cursor-pointer text-[#2188FF]"
          onClick={() => onSensorTypeFilter('energy')}
        >
          <Zap size={14} />
        </button>

        <button
          type="button"
          className="cursor-pointer"
          onClick={() => onStatusFilter('alert')}
        >
          <div className="flex bg-red-500 w-3 h-3 rounded-full" />
        </button>
      </div>
    </div>
  )
}
