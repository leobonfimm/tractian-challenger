import { AssetIcon } from '../assets/asset'
import { ComponentIcon } from '../assets/component'
import { LocationIcon } from '../assets/location'

interface MenuButtonProps {
  type: 'location' | 'asset' | 'component'
  color?: string
  size?: number
}

export function MenuIconType({
  type,
  color = '#2188FF',
  size = 22,
}: MenuButtonProps) {
  return (
    <>
      {type === 'asset' && <AssetIcon size={size} color={color} />}
      {type === 'component' && <ComponentIcon size={size} color={color} />}
      {type === 'location' && <LocationIcon size={size} color={color} />}
    </>
  )
}
