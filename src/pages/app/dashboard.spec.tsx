import { act, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Mock, vi } from 'vitest'
import { getCompanies } from '../../api/get-companies'
import { CompanyProvider, useCompany } from '../../context/company-provider'
import { Dashboard } from './dashboard'

vi.mock('../../context/company-provider', async (importOriginal) => {
  const context =
    await importOriginal<typeof import('../../context/company-provider')>()
  return {
    ...context,
    useCompany: vi.fn(),
  }
})

vi.mock('../../api/get-companies', () => ({
  getCompanies: vi.fn(),
}))

const mockUseCompany = useCompany as Mock
const mockGetCompanies = getCompanies as Mock

vi.mock('../../components/locations', () => ({
  Locations: ({ companyId }: { companyId: string }) => (
    <div>Locations Component - Company ID: {companyId}</div>
  ),
}))

vi.mock('./component', () => ({
  ComponentDetails: () => <div>ComponentDetails Component</div>,
}))

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mockGetCompanies.mockResolvedValue([])
  })

  it('Should be render the right header', async () => {
    const history = createMemoryHistory()
    history.push('')

    mockUseCompany.mockReturnValue({
      companies: [{ id: '1', name: 'Apex' }],
      assetSelected: { sensorType: 'energy', status: 'alert' },
    })

    const wrapper = await act(async () =>
      render(
        <CompanyProvider>
          <Dashboard />
        </CompanyProvider>,
        {
          wrapper: ({ children }) => (
            <Router location={history.location} navigator={history}>
              {children}
            </Router>
          ),
        },
      ),
    )

    expect(wrapper.getByText('Apex Unit')).toBeInTheDocument()
  })

  it('should render correctly when different company is selected', async () => {
    const history = createMemoryHistory()
    history.push('/?companySelected=tobias')
    mockUseCompany.mockReturnValue({
      companies: [{ id: '2', name: 'Tobias' }],
      assetSelected: { sensorType: 'vibration', status: 'operating' },
    })

    const wrapper = await act(async () =>
      render(
        <CompanyProvider>
          <Dashboard />
        </CompanyProvider>,
        {
          wrapper: ({ children }) => (
            <Router location={history.location} navigator={history}>
              {children}
            </Router>
          ),
        },
      ),
    )

    expect(wrapper.getByText('Tobias Unit')).toBeInTheDocument()
  })
})
