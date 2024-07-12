import { Location } from '../api/get-locations'

export function filterTree(locations: Location[], query: string): Location[] {
  if (!query) return locations

  query = query.toLowerCase()

  function search(location: Location): boolean {
    const locationName: string = location.name
      ? location.name.toLowerCase()
      : ''
    let match = locationName.includes(query)

    const originalSubLocations = location.subLocations
      ? [...location.subLocations]
      : []
    const originalAssets = location.assets ? [...location.assets] : []

    if (location.subLocations) {
      location.subLocations = location.subLocations.filter((child) =>
        search(child),
      )
      match = match || location.subLocations.length > 0
    }

    if (location.assets) {
      location.assets = location.assets.filter((asset) => {
        const assetName = asset.name ? asset.name.toLowerCase() : ''
        return assetName.includes(query)
      })
      match = match || location.assets.length > 0
    }

    if (!match) {
      location.subLocations = originalSubLocations
      location.assets = originalAssets
    }

    return match
  }

  const result = locations.filter((location) => search(location))

  return result
}
