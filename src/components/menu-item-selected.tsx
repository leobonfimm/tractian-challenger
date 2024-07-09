import { Zap } from 'lucide-react'
import { MenuIconType } from './menu-icon-type'

interface MenuItemSelected {
  title: string
  isSelected: boolean
  type: 'location' | 'asset' | 'component'
  color?: string
  size?: number
  sensorType?: 'energy' | 'vibration' | null
  status?: 'alert' | 'operating' | null
  handleSetAssetIdParam: () => void
}

export function MenuItemSelected({
  title,
  isSelected,
  type,
  color,
  size,
  sensorType,
  status,
  handleSetAssetIdParam,
}: MenuItemSelected) {
  return (
    <button
      data-current={isSelected}
      className="flex items-center gap-1 ml-8 data-[current=true]:bg-[#2188FF] data-[current=true]:text-white data-[current=true]:px-2 data-[current=true]:rounded-lg"
      onClick={handleSetAssetIdParam}
    >
      <MenuIconType type={type} size={size} color={color} />
      <span>{title}</span>
      {sensorType === 'energy' && (
        <Zap
          data-alert={status === 'alert'}
          className="text-green-400 data-[alert=true]:text-red-500 w-4 h-4"
        />
      )}
      {sensorType === 'vibration' && (
        <div
          data-alert={status === 'alert'}
          className="flex bg-green-400 data-[alert=true]:bg-red-500 w-2 h-2 rounded-full"
        />
      )}
    </button>
  )
}
