import { Boxes } from 'lucide-react'

import { useCompany } from '../context/company-provider'
import { NavLink } from './nav-link'

import logoTractian from '../assets/logo_tractian.svg'

export function Header() {
  const { companies } = useCompany()

  return (
    <header className="flex items-center justify-between p-4 w-full bg-[#17192D]">
      <img src={logoTractian} alt="" />

      <nav className="flex items-center gap-[10px]">
        {companies.map((company) => (
          <NavLink key={company.id} company={company.name.toLowerCase()}>
            <Boxes size={14} />
            {company.name} Unit
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
