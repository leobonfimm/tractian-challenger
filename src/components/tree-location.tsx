import { useCallback, useEffect, useState } from 'react'
import { Asset, Location } from '../api/get-locations'
import { useCompany } from '../context/company-provider'
import { MenuButton } from './menu-button'
import { MenuIconType } from './menu-icon-type'
import { MenuItemSelected } from './menu-item-selected'
import { TreeAsset } from './tree-asset'

interface SubLocationProps {
  location: Location
  isAlreadyOpen: boolean
}

export function TreeLocation({ location, isAlreadyOpen }: SubLocationProps) {
  const { onHandleAssetSelected, assetSelected } = useCompany()
  const [showMenu, setShowMenu] = useState(false)
  const { id, name } = location

  const subLocations = location.subLocations || []
  const assets = location.assets || []

  useEffect(() => {
    if (isAlreadyOpen) {
      setShowMenu(true)
    }
  }, [isAlreadyOpen])

  function handleShowMenuLocation() {
    setShowMenu((prevShowMenu) => !prevShowMenu)
  }

  function handleSetLocationIdParam() {
    onHandleAssetSelected(location)
  }

  const renderTree = useCallback(
    (nodes: Location[], assets: Asset[], isAlreadyOpen: boolean) => {
      return (
        <>
          <div className="ml-4">
            {nodes.map((subLocation) => (
              <div key={subLocation.id} className="flex flex-col">
                <TreeLocation
                  location={subLocation}
                  isAlreadyOpen={isAlreadyOpen}
                />
              </div>
            ))}
          </div>
          <div className="ml-4">
            {assets.map((asset) => (
              <div key={asset.id} className="flex flex-col">
                <TreeAsset asset={asset} isAlreadyOpen={isAlreadyOpen} />
              </div>
            ))}
          </div>
        </>
      )
    },
    [],
  )

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
          isSelected={id === assetSelected.id}
          type="location"
          size={24}
          handleSetAssetIdParam={handleSetLocationIdParam}
        />
      )}

      {showMenu && renderTree(subLocations, assets, isAlreadyOpen)}
    </div>
  )
}
