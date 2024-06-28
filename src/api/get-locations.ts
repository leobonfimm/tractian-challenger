import { api } from '../lib/axios'
import { buildTreeLocation } from '../utils/build-tree-locations'

export interface Asset {
  id: string
  name: string
  parentId: string | null
  sensorType: string
  sensorId: string
  status: string
  gatewayId: string
  locationId: string
  subAssets: Asset[]
}

export interface Location {
  id: string
  name: string
  parentId: string | null
  subLocations: Location[]
  assets: Asset[]
}

export async function getLocations(companyId: string): Promise<Location[]> {
  const locations = await api.get<Location[]>(
    `companies/${companyId}/locations`,
  )
  const assets = await api.get<Asset[]>(`companies/${companyId}/assets`)

  return buildTreeLocation(locations.data, assets.data)
}
