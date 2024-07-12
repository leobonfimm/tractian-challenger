import { fireEvent, render, waitFor } from '@testing-library/react'
import { SearchFilterForm, SearchFilterFormProps } from './search-filter-form'

describe('SearchFilterForm', () => {
  const renderComponent = (props: Partial<SearchFilterFormProps> = {}) => {
    const defaultProps: SearchFilterFormProps = {
      onSearchFilter: vi.fn(),
    }

    return render(<SearchFilterForm {...defaultProps} {...props} />)
  }

  it('renders input and search button', () => {
    const wrapper = renderComponent()

    expect(
      wrapper.getByPlaceholderText('Buscar Ativo ou Local'),
    ).toBeInTheDocument()
    expect(wrapper.getByRole('button')).toBeInTheDocument()
  })

  it('should be update the state with the query', () => {
    const wrapper = renderComponent()

    const input = wrapper.getByPlaceholderText(
      'Buscar Ativo ou Local',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test query' } })

    expect(input.value).toBe('test query')
  })

  it('should be a delay in the input because of debounce', async () => {
    const onSearchFilterMock = vi.fn()
    const wrapper = renderComponent({ onSearchFilter: onSearchFilterMock })

    const input = wrapper.getByPlaceholderText(
      'Buscar Ativo ou Local',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test query' } })

    await waitFor(
      () => {
        expect(onSearchFilterMock).toHaveBeenCalledWith('test query')
      },
      { timeout: 600 },
    )
  })

  it('should clear debounce timeout on unmount component', async () => {
    const onSearchFilterMock = vi.fn()
    const wrapper = renderComponent({ onSearchFilter: onSearchFilterMock })
    const { unmount } = wrapper

    const input = wrapper.getByPlaceholderText(
      'Buscar Ativo ou Local',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test query' } })

    unmount()

    setTimeout(() => {
      expect(onSearchFilterMock).not.toHaveBeenCalledWith('test query')
    }, 100)
  })
})
