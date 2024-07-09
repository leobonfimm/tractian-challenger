import { useState } from 'react'
import { Asset } from '../api/get-locations'

import { useSearchParams } from 'react-router-dom'
import { useCompany } from '../context/company-provider'
import { MenuButton } from './menu-button'
import { MenuIconType } from './menu-icon-type'
import { MenuItemSelected } from './menu-item-selected'

interface AssetProps {
  asset: Asset
}

export function TreeAsset({ asset }: AssetProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showMenu, setShowMenu] = useState(false)
  const { onHandleAssetSelected } = useCompany()

  const { name, sensorType, status, subAssets } = asset
  const isAsset = sensorType === null

  const assetSelectedId = searchParams.get('assetSelectedId') ?? ''
  const colorSelected = asset.id === assetSelectedId ? '#FFFFFF' : '#2188FF'

  function handleShowMenu() {
    setShowMenu(!showMenu)
  }

  function handleSetAssetIdParam(id: string) {
    setSearchParams((state) => {
      state.set('assetSelectedId', id)

      return state
    })

    onHandleAssetSelected(asset)
  }

  return (
    <div className="mt-1">
      {subAssets.length > 0 ? (
        <MenuButton
          isMenuOpen={showMenu}
          title={name}
          onOpenCloseMenu={handleShowMenu}
          menuIcon={
            <MenuIconType type={isAsset ? 'asset' : 'component'} size={24} />
          }
        />
      ) : (
        <MenuItemSelected
          title={name}
          isSelected={asset.id === assetSelectedId}
          type={isAsset ? 'asset' : 'component'}
          color={colorSelected}
          size={24}
          sensorType={sensorType}
          status={status}
          handleSetAssetIdParam={() => handleSetAssetIdParam(asset.id)}
        />
      )}

      {showMenu && subAssets.length > 0 && (
        <div className="ml-4">
          {subAssets.map((asset) => (
            <TreeAsset key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  )
}
