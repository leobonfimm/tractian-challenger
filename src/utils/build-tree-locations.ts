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

  // Função para ordenar nós com filhos primeiro
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

  // Ordenar a árvore de localizações e ativos
  sortNodes(roots)

  return roots
}
