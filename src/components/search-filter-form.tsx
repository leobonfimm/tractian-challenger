import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const searchFilterFormSchema = z.object({
  query: z.string().optional(),
})

type SearchFilterFormSchema = z.infer<typeof searchFilterFormSchema>

export function SearchFilterForm() {
  const [, setSearchParams] = useSearchParams()
  const { register, watch, handleSubmit } = useForm<SearchFilterFormSchema>({
    resolver: zodResolver(searchFilterFormSchema),
  })

  const watchTitleField = watch('query')

  useEffect(() => {
    setSearchParams((state) => {
      if (watchTitleField) {
        state.set('searchTitle', watchTitleField)
      } else {
        state.delete('searchTitle')
      }

      return state
    })
  }, [setSearchParams, watchTitleField])

  function handleSearchParams(data: SearchFilterFormSchema) {
    setSearchParams((state) => {
      if (data.query) {
        state.set('searchTitle', data.query)
      } else {
        state.delete('searchTitle')
      }

      return state
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchParams)}
      className="border-b border-[#D8DFE6] flex items-center w-full p-3"
    >
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="flex-1"
        {...register('query')}
      />

      <button type="submit" className="cursor-pointer text-[#2188FF]">
        <Search size={14} />
      </button>
    </form>
  )
}
