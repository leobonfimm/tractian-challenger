import { useCallback, useEffect, useState } from 'react'
import { Asset } from '../api/get-locations'

import { useCompany } from '../context/company-provider'
import { MenuButton } from './menu-button'
import { MenuIconType } from './menu-icon-type'
import { MenuItemSelected } from './menu-item-selected'

interface AssetProps {
  asset: Asset
  isAlreadyOpen: boolean
}

export function TreeAsset({ asset, isAlreadyOpen }: AssetProps) {
  const [showMenu, setShowMenu] = useState(false)
  const { onHandleAssetSelected, assetSelected } = useCompany()

  const { name, sensorType, status, subAssets } = asset
  const isAsset = sensorType === null

  console.log(asset)

  useEffect(() => {
    if (isAlreadyOpen) {
      setShowMenu(true)
    }
  }, [isAlreadyOpen])

  function handleShowMenu() {
    setShowMenu((prevShowMenu) => !prevShowMenu)
  }

  function handleSetAssetIdParam() {
    onHandleAssetSelected(asset)
  }

  const renderTree = useCallback(
    (subAssets: Asset[]) => (
      <div className="ml-4">
        {subAssets.map((asset) => (
          <TreeAsset
            key={asset.id}
            asset={asset}
            isAlreadyOpen={isAlreadyOpen}
          />
        ))}
      </div>
    ),
    [isAlreadyOpen],
  )

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
          isSelected={asset.id === assetSelected.id}
          type={isAsset ? 'asset' : 'component'}
          size={24}
          sensorType={sensorType}
          status={status}
          handleSetAssetIdParam={handleSetAssetIdParam}
        />
      )}

      {showMenu && subAssets.length > 0 && renderTree(subAssets)}
    </div>
  )
}
