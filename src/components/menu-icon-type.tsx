import { AssetIcon } from '../assets/asset'
import { ComponentIcon } from '../assets/component'
import { LocationIcon } from '../assets/location'

export interface MenuIconTypeProps {
  type: 'location' | 'asset' | 'component'
  color?: string
  size?: number
}

export function MenuIconType({
  type,
  color = '#2188FF',
  size = 22,
}: MenuIconTypeProps) {
  return (
    <>
      {type === 'asset' && (
        <AssetIcon data-testid="asset-icon" size={size} color={color} />
      )}
      {type === 'component' && (
        <ComponentIcon data-testid="component-icon" size={size} color={color} />
      )}
      {type === 'location' && (
        <LocationIcon data-testid="location-icon" size={size} color={color} />
      )}
    </>
  )
}
