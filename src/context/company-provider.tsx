import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getCompanies } from '../api/get-companies'
import { Asset } from '../api/get-locations'

interface Company {
  id: string
  name: string
}

interface CompanyContextType {
  companies: Company[]
  assetSelected: Asset
  onHandleAssetSelected: (asset: Asset) => void
}

export const CompanyContext = createContext({} as CompanyContextType)

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [assetSelected, setAssetSelected] = useState<Asset>({} as Asset)

  useEffect(() => {
    getCompanies().then((response) => setCompanies(response))
  }, [])

  function onHandleAssetSelected(asset: Asset) {
    setAssetSelected(asset)
  }

  return (
    <CompanyContext.Provider
      value={{ companies, assetSelected, onHandleAssetSelected }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

export function useCompany() {
  const context = useContext(CompanyContext)

  return context
}
