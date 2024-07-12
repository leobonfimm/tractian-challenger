import { describe, expect, it } from 'vitest'
import { Asset, Location } from '../api/get-locations'
import { buildTreeLocation } from './build-tree-locations'
import { assets, expectedList, locations } from './test-data'

describe('buildTreeLocation', () => {
  it('should build a tree structure correctly', () => {
    const result = buildTreeLocation(locations, assets)

    expect(result).toEqual(expectedList)
  })

  it('should handle empty inputs', () => {
    const locations: Location[] = []
    const assets: Asset[] = []

    const result = buildTreeLocation(locations, assets)

    expect(result).toEqual([])
  })
})
