import { Asset, Location } from '../api/get-locations'

function sortNodes(nodes: (Location | Asset)[]) {
  nodes.sort((a, b) => {
    const aHasChildren = 'subLocations' in a && a.subLocations!.length > 0
    const bHasChildren = 'subLocations' in b && b.subLocations!.length > 0
    const aHasAssets = 'assets' in a && a.assets!.length > 0
    const bHasAssets = 'assets' in b && b.assets!.length > 0
    return (
      Number(bHasChildren || bHasAssets) - Number(aHasChildren || aHasAssets)
    )
  })

  nodes.forEach((node) => {
    if ('subLocations' in node && node.subLocations!.length > 0) {
      sortNodes(node.subLocations!)
    }
    if ('assets' in node && node.assets!.length > 0) {
      sortNodes(node.assets!)
    }
    if ('subLocations' in node && node.subLocations!.length > 0) {
      sortNodes(node.subLocations!)
    }
  })
}

export function buildTreeLocation(
  locations: Location[],
  assets: Asset[],
): Location[] {
  const locationIdMap: Record<string, Location> = {}
  const assetIdMap: Record<string, Asset> = {}
  const roots: Location[] = []

  locations.forEach((loc) => {
    locationIdMap[loc.id] = loc
    loc.subLocations = []
    loc.assets = []
  })

  assets.forEach((asset) => {
    assetIdMap[asset.id] = asset
    asset.subAssets = []
  })

  assets.forEach((asset) => {
    if (asset.parentId && assetIdMap[asset.parentId]) {
      const parentAsset = assetIdMap[asset.parentId]
      parentAsset.subAssets?.push(asset)
    } else {
      const location = locationIdMap[asset.locationId]
      if (location) {
        location.assets?.push(asset)
      }
    }
  })

  function buildNode(location: Location) {
    if (location.parentId && locationIdMap[location.parentId]) {
      const parent = locationIdMap[location.parentId]
      parent.subLocations?.push(location)
    } else {
      roots.push(location)
    }
  }

  locations.forEach(buildNode)

  sortNodes(roots)

  return roots
}
