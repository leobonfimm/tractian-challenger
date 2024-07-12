import { fireEvent, render } from '@testing-library/react'
import { MenuButton, MenuButtonProps } from './menu-button'

vi.mock('lucide-react', () => ({
  ChevronDown: ({ size }: { size: number }) => (
    <svg height={size} width={size} data-testid="chevron-down" />
  ),
  ChevronRight: ({ size }: { size: number }) => (
    <svg height={size} width={size} data-testid="chevron-right" />
  ),
}))

describe('MenuButton', () => {
  const renderComponent = (props: Partial<MenuButtonProps> = {}) => {
    const defaultProps: MenuButtonProps = {
      isMenuOpen: false,
      title: 'Test Menu',
      menuIcon: <svg data-testid="menu-icon" />,
      onOpenCloseMenu: vi.fn(),
    }
    return render(<MenuButton {...defaultProps} {...props} />)
  }

  it('should renders the component with correct props', () => {
    const wrapper = renderComponent()

    expect(wrapper.getByText('Test Menu')).toBeInTheDocument()
    expect(wrapper.getByTestId('menu-icon')).toBeInTheDocument()
    expect(wrapper.getByTestId('chevron-right')).toBeInTheDocument()
  })

  it('should displays the correct icon based on isMenuOpen prop', () => {
    const wrapper = renderComponent({ isMenuOpen: false })
    const { rerender } = wrapper

    expect(wrapper.getByTestId('chevron-right')).toBeInTheDocument()

    rerender(
      <MenuButton
        isMenuOpen={true}
        title="Test Menu"
        menuIcon={<svg data-testid="menu-icon" />}
        onOpenCloseMenu={vi.fn()}
      />,
    )
    expect(wrapper.getByTestId('chevron-down')).toBeInTheDocument()
  })

  it('should calls onOpenCloseMenu when the button is clicked', () => {
    const onOpenCloseMenuMock = vi.fn()
    const wrapper = renderComponent({ onOpenCloseMenu: onOpenCloseMenuMock })

    fireEvent.click(wrapper.getByRole('button'))
    expect(onOpenCloseMenuMock).toHaveBeenCalledOnce()
  })
})
