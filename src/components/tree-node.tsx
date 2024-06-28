import { ChevronDown, ChevronRight, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Location } from './locations'

interface SubLocationProps {
  name: string
  subLocations: Location[]
}

export function TreeNode({ name, subLocations }: SubLocationProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="mt-1">
      <button
        className="flex items-center gap-1 disabled:ml-4"
        onClick={() => setShowMenu(!showMenu)}
        disabled={subLocations.length === 0}
      >
        {subLocations.length !== 0 && (
          <>
            {showMenu ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </>
        )}
        <MapPin size={22} className="text-[#2188FF]" />
        <span>{name}</span>
      </button>

      {showMenu && subLocations.length > 0 && (
        <div className="ml-4">
          {subLocations.map((subLocation) => (
            <TreeNode
              key={subLocation.id}
              name={subLocation.name}
              subLocations={subLocation.subLocations}
            />
          ))}
        </div>
      )}
    </div>
  )
}
