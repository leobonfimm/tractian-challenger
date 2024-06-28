import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getCompanies } from '../api/get-companies'

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
    getCompanies().then((response) => setCompanies(response))
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
