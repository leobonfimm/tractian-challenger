import { filterTree } from './filter-tree-menu'
import { expectedList } from './test-data'

describe('filter-tree', () => {
  it('should filter by query', () => {
    const result = filterTree(expectedList, 'Location 1')
    expect(result).toEqual([
      {
        id: '60f56f8a81f788001eca57bf',
        name: 'Location 1',
        parentId: null,
        assets: [],
        subLocations: [],
      },
    ])
  })

  it('return empty array when have no matches', () => {
    const result = filterTree(expectedList, 'NonExistent')
    expect(result).toEqual([])
  })
})
