import { Asset, Location } from '../api/get-locations'

export function buildTreeLocation(
  locations: Location[],
  assets: Asset[],
): Location[] {
  const locationIdMap: Record<string, Location> = {}
  const assetIdMap: Record<string, Asset> = {}
  const roots: Location[] = []

  // Mapear id para cada localização e inicializar children e assets
  locations.forEach((loc) => {
    locationIdMap[loc.id] = loc
    loc.subLocations = [] // Inicializar children como um array vazio
    loc.assets = [] // Inicializar assets como um array vazio
  })

  // Mapear id para cada asset e inicializar children
  assets.forEach((asset) => {
    assetIdMap[asset.id] = asset
    asset.subAssets = [] // Inicializar children como um array vazio
  })

  // Associar cada asset à sua localização e construir hierarquia de assets
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

  // Função recursiva para construir a árvore de localizações
  function buildNode(location: Location) {
    if (location.parentId && locationIdMap[location.parentId]) {
      const parent = locationIdMap[location.parentId]
      parent.subLocations?.push(location)
    } else {
      roots.push(location) // Adicionar como raiz se não tiver parentId válido
    }
  }

  // Construir a árvore de localizações
  locations.forEach(buildNode)

  return roots
}
