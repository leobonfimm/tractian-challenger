import { Asset, Location } from '../api/get-locations'

export const locations: Location[] = [
  {
    id: '60f56f8a81f788001eca57bf',
    name: 'Location 1',
    parentId: null,
    assets: [],
    subLocations: [],
  },
  {
    id: '60fc7c4595ad84001e95bfbd',
    name: 'Location 2',
    parentId: '60f56f8a81f788001eca57bf',
    assets: [],
    subLocations: [],
  },
  {
    id: '60fc7c4507a5ec001e8cfad4',
    name: 'Location 3',
    parentId: null,
    assets: [],
    subLocations: [],
  },
]

export const assets: Asset[] = [
  {
    id: '60fc7c9e95ad84001e95c029',
    locationId: '60fc7c4595ad84001e95bfbd',
    name: 'Asset 1',
    parentId: null,
    sensorId: 'CXW988',
    sensorType: 'vibration',
    status: 'alert',
    gatewayId: 'VEQ023',
    subAssets: [],
  },
  {
    id: '60fc7c9f07a5ec001e8cfb46',
    locationId: '60fc7c4507a5ec001e8cfad4',
    name: 'Asset 2',
    parentId: null,
    sensorId: 'CXW988',
    sensorType: 'vibration',
    status: 'alert',
    gatewayId: 'VEQ023',
    subAssets: [],
  },
  {
    gatewayId: 'VEQ023',
    id: '60fc4e83513295001f4dd7b7',
    locationId: '',
    name: 'Sensor 204 - vibration',
    parentId: '60fc7c9f07a5ec001e8cfb46',
    sensorId: 'CXW988',
    sensorType: 'vibration',
    status: 'alert',
    subAssets: [],
  },
]

export const expectedList: Location[] = [
  {
    id: '60f56f8a81f788001eca57bf',
    name: 'Location 1',
    parentId: null,
    assets: [],
    subLocations: [
      {
        id: '60fc7c4595ad84001e95bfbd',
        name: 'Location 2',
        parentId: '60f56f8a81f788001eca57bf',
        assets: [
          {
            id: '60fc7c9e95ad84001e95c029',
            locationId: '60fc7c4595ad84001e95bfbd',
            name: 'Asset 1',
            parentId: null,
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            gatewayId: 'VEQ023',
            subAssets: [],
          },
        ],
        subLocations: [],
      },
    ],
  },
  {
    id: '60fc7c4507a5ec001e8cfad4',
    name: 'Location 3',
    parentId: null,
    assets: [
      {
        id: '60fc7c9f07a5ec001e8cfb46',
        locationId: '60fc7c4507a5ec001e8cfad4',
        name: 'Asset 2',
        parentId: null,
        sensorId: 'CXW988',
        sensorType: 'vibration',
        status: 'alert',
        gatewayId: 'VEQ023',
        subAssets: [
          {
            gatewayId: 'VEQ023',
            id: '60fc4e83513295001f4dd7b7',
            locationId: '',
            name: 'Sensor 204 - vibration',
            parentId: '60fc7c9f07a5ec001e8cfb46',
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            subAssets: [],
          },
        ],
      },
    ],
    subLocations: [],
  },
]

export const expectedFilteredListBySensorType = [
  {
    id: '60f56f8a81f788001eca57bf',
    name: 'Location 1',
    parentId: null,
    assets: [],
    subLocations: [
      {
        id: '60fc7c4595ad84001e95bfbd',
        name: 'Location 2',
        parentId: '60f56f8a81f788001eca57bf',
        assets: [
          {
            id: '60fc7c9e95ad84001e95c029',
            locationId: '60fc7c4595ad84001e95bfbd',
            name: 'Asset 1',
            parentId: null,
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            gatewayId: 'VEQ023',
            subAssets: [],
          },
        ],
        subLocations: [],
      },
    ],
  },
  {
    id: '60fc7c4507a5ec001e8cfad4',
    name: 'Location 3',
    parentId: null,
    assets: [
      {
        id: '60fc7c9f07a5ec001e8cfb46',
        locationId: '60fc7c4507a5ec001e8cfad4',
        name: 'Asset 2',
        parentId: null,
        sensorId: null,
        sensorType: null,
        status: null,
        gatewayId: null,
        subAssets: [
          {
            gatewayId: 'VEQ023',
            id: '60fc4e83513295001f4dd7b7',
            locationId: null,
            name: 'Sensor 204 - vibration',
            parentId: '60fc7c9f07a5ec001e8cfb46',
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            subAssets: [],
          },
        ],
      },
    ],
    subLocations: [],
  },
]

export const expectedFilteredListByStatus = [
  {
    id: '60f56f8a81f788001eca57bf',
    name: 'Location 1',
    parentId: null,
    assets: [],
    subLocations: [
      {
        id: '60fc7c4595ad84001e95bfbd',
        name: 'Location 2',
        parentId: '60f56f8a81f788001eca57bf',
        assets: [
          {
            id: '60fc7c9e95ad84001e95c029',
            locationId: '60fc7c4595ad84001e95bfbd',
            name: 'Asset 1',
            parentId: null,
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            gatewayId: 'VEQ023',
            subAssets: [],
          },
        ],
        subLocations: [],
      },
    ],
  },
  {
    id: '60fc7c4507a5ec001e8cfad4',
    name: 'Location 3',
    parentId: null,
    assets: [
      {
        id: '60fc7c9f07a5ec001e8cfb46',
        locationId: '60fc7c4507a5ec001e8cfad4',
        name: 'Asset 2',
        parentId: null,
        sensorId: 'CXW988',
        sensorType: 'vibration',
        status: 'alert',
        gatewayId: 'VEQ023',
        subAssets: [
          {
            gatewayId: 'VEQ023',
            id: '60fc4e83513295001f4dd7b7',
            locationId: '',
            name: 'Sensor 204 - vibration',
            parentId: '60fc7c9f07a5ec001e8cfb46',
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            subAssets: [],
          },
        ],
      },
    ],
    subLocations: [],
  },
]

export const expectedFilteredListByNameAndSensorType = [
  {
    id: '60f56f8a81f788001eca57bf',
    name: 'Location 1',
    parentId: null,
    assets: [],
    subLocations: [
      {
        id: '60fc7c4595ad84001e95bfbd',
        name: 'Location 2',
        parentId: '60f56f8a81f788001eca57bf',
        assets: [
          {
            id: '60fc7c9e95ad84001e95c029',
            locationId: '60fc7c4595ad84001e95bfbd',
            name: 'Asset 1',
            parentId: null,
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            gatewayId: 'VEQ023',
            subAssets: [],
          },
        ],
        subLocations: [],
      },
    ],
  },
]

export const expectedFilteredListBySensorTypeAndStatus = [
  {
    id: '60f56f8a81f788001eca57bf',
    name: 'Location 1',
    parentId: null,
    assets: [],
    subLocations: [
      {
        id: '60fc7c4595ad84001e95bfbd',
        name: 'Location 2',
        parentId: '60f56f8a81f788001eca57bf',
        assets: [
          {
            id: '60fc7c9e95ad84001e95c029',
            locationId: '60fc7c4595ad84001e95bfbd',
            name: 'Asset 1',
            parentId: null,
            sensorId: 'CXW988',
            sensorType: 'vibration',
            status: 'alert',
            gatewayId: 'VEQ023',
            subAssets: [],
          },
        ],
        subLocations: [],
      },
    ],
  },
]
