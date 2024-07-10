import { Location } from '../api/get-locations'

export function filterTree(
  locations: Location[],
  query: string,
  sensorType?: string,
  status?: string,
): Location[] {
  if (!query && !sensorType && !status) return locations

  console.log(sensorType)

  query = query ? query.toLowerCase() : ''

  function search(location: Location): boolean {
    const locationName: string = location.name
      ? location.name.toLowerCase()
      : ''
    let match = locationName.includes(query)

    if (location.subLocations) {
      location.subLocations = location.subLocations.filter((child) =>
        search(child),
      )
      match = match || location.subLocations.length > 0
    }

    if (location.assets) {
      location.assets = location.assets.filter((asset) => {
        const assetName = asset.name ? asset.name.toLowerCase() : ''
        const matchesQuery = assetName.includes(query)
        const matchesSensorType = sensorType
          ? asset.sensorType === sensorType
          : true
        const matchesStatus = status ? asset.status === status : true
        return matchesQuery && matchesSensorType && matchesStatus
      })
      match = match || location.assets.length > 0
    }

    return match
  }

  return locations.filter((location) => search(location))
}
