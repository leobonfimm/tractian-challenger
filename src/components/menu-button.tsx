import { ChevronDown, ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'

interface MenuButtonProps {
  isMenuOpen: boolean
  menuIcon: ReactNode
  title: string
  onOpenCloseMenu: () => void
}

export function MenuButton({
  isMenuOpen,
  title,
  menuIcon,
  onOpenCloseMenu,
}: MenuButtonProps) {
  return (
    <button
      className="flex items-center gap-1 disabled:ml-8"
      onClick={onOpenCloseMenu}
    >
      {isMenuOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      {menuIcon}
      <span>{title}</span>
    </button>
  )
}
