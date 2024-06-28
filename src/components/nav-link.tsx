import { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'

interface NavLinkProps {
  company: string
  children: ReactNode
}

export function NavLink({ children, company }: NavLinkProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const companySelected = searchParams.get('companySelected') ?? 'apex'

  function handleSelectCompany() {
    setSearchParams((state) => {
      if (company) state.set('companySelected', company)
      else state.delete('companySelected')

      return state
    })
  }

  return (
    <button
      data-current={company === companySelected}
      className="flex items-center gap-2 py-2 px-2 bg-[#023B78] leading-4 rounded-md text-xs font-semibold text-white data-[current=true]:bg-[#2188FF]"
      onClick={handleSelectCompany}
    >
      {children}
    </button>
  )
}
