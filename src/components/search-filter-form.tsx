import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface SearchFilterFormSchema {
  title: string
  sensorType?: string
  status?: string
}

export interface SearchFilterFormProps {
  onSearchFilter: (query: string) => void
}

export function SearchFilterForm({ onSearchFilter }: SearchFilterFormProps) {
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

      <button type="button" className="cursor-pointer text-[#2188FF]">
        <Search size={14} />
      </button>
    </div>
  )
}
