import { render } from '@testing-library/react'
import { MenuIconType, MenuIconTypeProps } from './menu-icon-type'

describe('MenuIconType', () => {
  const renderComponent = (props: MenuIconTypeProps) =>
    render(<MenuIconType {...props} />)

  it('should be render the asset icon', () => {
    const wrapper = renderComponent({ type: 'asset' })

    expect(wrapper.getByTestId('asset-icon')).toBeInTheDocument()
  })

  it('should be render the component icon', () => {
    const wrapper = renderComponent({ type: 'component' })

    expect(wrapper.getByTestId('component-icon')).toBeInTheDocument()
  })

  it('should be render the location icon', () => {
    const wrapper = renderComponent({ type: 'location' })

    expect(wrapper.getByTestId('location-icon')).toBeInTheDocument()
  })
})
