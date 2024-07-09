import { CircleAlert, Zap } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Locations } from '../../components/locations'
import { Button } from '../../components/ui/button'
import { useCompany } from '../../context/company-provider'
import { ComponentDetails } from './component'

type ClientType = 'apex' | 'tobias' | 'jaguar'

const CLIENT_TITLE = {
  apex: 'Apex Unit',
  tobias: 'Tobias Unit',
  jaguar: 'Jaguar Unit',
} as const

export function Dashboard() {
  const [searchParams] = useSearchParams()
  const { companies, assetSelected } = useCompany()
  const companySelected =
    (searchParams.get('companySelected') as ClientType) ?? 'apex'

  const companyId = companies.find(
    (company) => company.name.toLowerCase() === companySelected,
  )?.id

  return (
    <div className="min-h-[100vh-88px] w-full bg-white p-4 rounded-sm border border-[#D8DFE6]">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="font-semibold leading-7 text-xl">Ativos</h1>
          <span className="font-normal leading-5 text-sm text-[#77818C]">
            /
          </span>
          <span className="font-normal leading-5 text-sm text-[#77818C]">
            {CLIENT_TITLE[companySelected]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={
              assetSelected.sensorType === 'energy' ? 'activate' : 'outline'
            }
            className="flex items-center gap-2"
            disabled
          >
            <Zap size={16} />
            Sensor de Energia
          </Button>

          <Button
            variant={assetSelected.status === 'alert' ? 'activate' : 'outline'}
            className="flex items-center gap-2"
            disabled
          >
            <CircleAlert size={16} />
            Crítico
          </Button>
        </div>
      </header>

      <main className="flex items-stretch flex-1 gap-2 mt-3">
        <Locations companyId={companyId || ''} />

        <ComponentDetails />
      </main>
    </div>
  )
}
