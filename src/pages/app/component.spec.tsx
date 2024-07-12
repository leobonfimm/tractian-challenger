import { faker } from '@faker-js/faker'
import { act, render } from '@testing-library/react'
import { Mock, vi } from 'vitest'
import { getCompanies } from '../../api/get-companies'
import { CompanyProvider, useCompany } from '../../context/company-provider'
import { ComponentDetails } from './component'

vi.mock('../../context/company-provider', async (importOriginal) => {
  const context =
    await importOriginal<typeof import('../../context/company-provider')>()
  return {
    ...context,
    useCompany: vi.fn(),
  }
})

vi.mock('../../components/component-about', () => ({
  ComponentAbout: () => <div>ComponentAbout Content</div>,
}))

vi.mock('../../api/get-companies', () => ({
  getCompanies: vi.fn(),
}))

const mockUseCompany = useCompany as Mock
const mockGetCompanies = getCompanies as Mock

const companiesMock = [
  {
    id: faker.string.uuid(),
    name: faker.company.name(),
  },
  {
    id: faker.string.uuid(),
    name: faker.company.name(),
  },
]

describe('Component Details Page', async () => {
  const renderComponent = () =>
    render(
      <CompanyProvider>
        <ComponentDetails />
      </CompanyProvider>,
    )

  beforeEach(() => {
    vi.resetAllMocks()
    mockGetCompanies.mockResolvedValue(companiesMock)
  })

  it('should render zap icon when sensor type is energy', async () => {
    const assetName = faker.word.sample()
    mockUseCompany.mockReturnValue({
      assetSelected: {
        name: assetName,
        sensorType: 'energy',
        status: 'alert',
      },
    })

    const wrapper = await act(async () => renderComponent())

    expect(wrapper.getByText(assetName)).toBeInTheDocument()
    expect(wrapper.getByTestId('zap-icon')).toBeInTheDocument()
  })

  it('should render circle icon when sensor type is vibration', async () => {
    const assetName = faker.word.sample()
    mockUseCompany.mockReturnValue({
      assetSelected: {
        name: assetName,
        sensorType: 'vibration',
        status: 'alert',
      },
    })

    const wrapper = await act(async () => renderComponent())

    expect(wrapper.getByText(assetName)).toBeInTheDocument()
    expect(wrapper.getByTestId('vibration-icon')).toBeInTheDocument()
  })

  it('should render green color when the status is operating', async () => {
    const assetName = faker.word.sample()
    mockUseCompany.mockReturnValue({
      assetSelected: {
        name: assetName,
        sensorType: 'vibration',
        status: 'operating',
      },
    })

    const wrapper = await act(async () => renderComponent())

    expect(wrapper.getByTestId('vibration-icon')).toHaveAttribute(
      'data-alert',
      'false',
    )
  })

  it('should render red color when the status is alert', async () => {
    const assetName = faker.word.sample()
    mockUseCompany.mockReturnValue({
      assetSelected: {
        name: assetName,
        sensorType: 'vibration',
        status: 'alert',
      },
    })

    const wrapper = await act(async () => renderComponent())

    expect(wrapper.getByTestId('vibration-icon')).toHaveAttribute(
      'data-alert',
      'true',
    )
  })
})
