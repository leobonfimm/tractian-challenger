import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Location } from '../api/get-locations'
import { MenuButton } from './menu-button'
import { MenuIconType } from './menu-icon-type'
import { MenuItemSelected } from './menu-item-selected'
import { TreeAsset } from './tree-asset'

interface SubLocationProps {
  location: Location
}

export function TreeLocation({ location }: SubLocationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showMenu, setShowMenu] = useState(false)
  const { id, name, subLocations, assets } = location

  const locationSelectedId = searchParams.get('locationSelectedId') ?? ''
  const colorSelected = id === locationSelectedId ? '#FFFFFF' : '#2188FF'

  function handleShowMenuLocation() {
    setShowMenu(!showMenu)
  }

  function handleSetLocationIdParam(id: string) {
    setSearchParams((state) => {
      if (id) state.set('locationSelectedId', id)
      else state.delete('locationSelectedId')

      state.delete('assetSelectedId')

      return state
    })
  }

  return (
    <div className="mt-1">
      {subLocations.length > 0 || assets.length > 0 ? (
        <MenuButton
          isMenuOpen={showMenu}
          title={name}
          onOpenCloseMenu={handleShowMenuLocation}
          menuIcon={<MenuIconType type="location" size={24} />}
        />
      ) : (
        <MenuItemSelected
          title={name}
          isSelected={id === locationSelectedId}
          type="location"
          size={24}
          color={colorSelected}
          handleSetAssetIdParam={() => handleSetLocationIdParam(id)}
        />
      )}

      {showMenu && (
        <div className="ml-4">
          {subLocations.map((subLocation) => (
            <div key={subLocation.id} className="flex flex-col">
              <TreeLocation location={subLocation} />
            </div>
          ))}
        </div>
      )}

      {showMenu && (
        <div className="ml-4">
          {assets.map((asset) => (
            <div key={asset.id} className="flex flex-col">
              <TreeAsset asset={asset} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
