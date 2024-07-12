import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { MenuItemSelected, MenuItemSelectedProps } from './menu-item-selected'

describe('MenuItemSelected', () => {
  const renderComponent = (props: Partial<MenuItemSelectedProps> = {}) => {
    const defaultProps: MenuItemSelectedProps = {
      handleSetAssetIdParam: vi.fn(),
      isSelected: false,
      title: faker.word.sample(),
      type: 'asset',
    }

    return render(<MenuItemSelected {...defaultProps} {...props} />)
  }

  it('should render the properly', () => {
    const title = faker.word.sample()
    const wrapper = renderComponent({ title })

    expect(wrapper.getByRole('button')).toHaveAttribute('data-current', 'false')
    expect(wrapper.getByText(title)).toBeInTheDocument()
  })

  it('should render the sensor type energy icon', () => {
    const wrapper = renderComponent({ sensorType: 'energy' })

    expect(wrapper.getByTestId('zap-icon')).toBeInTheDocument()
  })

  it('should render the sensor type vibration icon', () => {
    const wrapper = renderComponent({ sensorType: 'vibration' })

    expect(wrapper.getByTestId('vibration-icon')).toBeInTheDocument()
  })

  it('should render the sensor type with alert status for both icons', () => {
    const wrapper = renderComponent({ status: 'alert', sensorType: 'energy' })
    const { rerender } = wrapper

    expect(wrapper.getByTestId('zap-icon')).toBeInTheDocument()
    expect(wrapper.getByTestId('zap-icon')).toHaveAttribute(
      'data-alert',
      'true',
    )

    rerender(
      <MenuItemSelected
        handleSetAssetIdParam={vi.fn()}
        isSelected
        title="Asset Test"
        type="asset"
        sensorType="vibration"
        status="alert"
      />,
    )

    expect(wrapper.getByTestId('vibration-icon')).toBeInTheDocument()
    expect(wrapper.getByTestId('vibration-icon')).toHaveAttribute(
      'data-alert',
      'true',
    )
  })
})
