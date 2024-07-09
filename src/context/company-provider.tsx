import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getCompanies } from '../api/get-companies'

interface AssetSelected {
  id: string
  name: string
  sensorType?: 'energy' | 'vibration' | null
  sensorId?: string
  status?: 'alert' | 'operating' | null
  gatewayId?: string
}

interface Company {
  id: string
  name: string
}

interface CompanyContextType {
  companies: Company[]
  assetSelected: AssetSelected
  onHandleAssetSelected: (asset: AssetSelected) => void
}

export const CompanyContext = createContext({} as CompanyContextType)

interface CompanyProviderProps {
  children: ReactNode
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [assetSelected, setAssetSelected] = useState<AssetSelected>(
    {} as AssetSelected,
  )

  useEffect(() => {
    getCompanies().then((response) => setCompanies(response))
  }, [])

  function onHandleAssetSelected(asset: AssetSelected) {
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
