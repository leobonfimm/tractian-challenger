import { Location } from '../components/locations'

export function buildTreeLocation(locations: Location[]): Location[] {
  const idMap: Record<string, Location> = {}
  const roots: Location[] = []

  locations.forEach((loc) => {
    idMap[loc.id] = loc
    loc.subLocations = []
  })

  function buildNode(location: Location) {
    if (location.parentId && idMap[location.parentId]) {
      const parent = idMap[location.parentId]
      parent.subLocations?.push(location)
    } else {
      roots.push(location)
    }
  }

  locations.forEach(buildNode)

  return roots
}
