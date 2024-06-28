import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

interface Company {
  id: string
  name: string
}

interface CompanyContextType {
  companies: Company[]
}

export const CompanyContext = createContext({} as CompanyContextType)

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    api.get<Company[]>('/companies').then((response) => {
      const companiesSorted = response.data.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()

        if (nameA < nameB) return -1
        if (nameA > nameB) return 1

        return 0
      })

      setCompanies(companiesSorted)
    })
  }, [])

  return (
    <CompanyContext.Provider value={{ companies }}>
      {children}
    </CompanyContext.Provider>
  )
}

export function useCompany() {
  const context = useContext(CompanyContext)

  return context
}
