import { CircleAlert, Zap } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Locations } from '../../components/locations'
import { Button } from '../../components/ui/button'
import { useCompany } from '../../context/company-provider'

type ClientType = 'apex' | 'tobias' | 'jaguar'

const CLIENT_TITLE = {
  apex: 'Apex Unit',
  tobias: 'Tobias Unit',
  jaguar: 'Jaguar Unit',
} as const

export function Dashboard() {
  const [searchParams] = useSearchParams()
  const { companies } = useCompany()
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
          <Button variant="activate" className="flex items-center gap-2">
            <Zap size={16} />
            Sensor de Energia
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <CircleAlert size={16} className="text-blue-500" />
            Crítico
          </Button>
        </div>
      </header>

      <main className="flex items-start flex-1 gap-2">
        <Locations companyId={companyId || ''} />

        <h1 className="col-start-2">Infos do Ativo</h1>
      </main>
    </div>
  )
}
