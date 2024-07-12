import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <BrowserRouter>
        <NavLink company="apex">Apex Company Unit</NavLink>
      </BrowserRouter>,
    )

    expect(wrapper.getByRole('button')).toHaveTextContent('Apex Company Unit')
  })

  it('should set data-current attribute is true', () => {
    const wrapper = render(
      <MemoryRouter>
        <NavLink company="apex">Apex Company</NavLink>
      </MemoryRouter>,
    )

    const navLinkButton = wrapper.getByRole('button')
    expect(navLinkButton).toHaveAttribute('data-current', 'true')
  })

  it('should data-current attribute is not set when company does not match', () => {
    const history = createMemoryHistory()
    history.push('/?companySelected=other')

    const wrapper = render(
      <Router location={history.location} navigator={history}>
        <NavLink company="apex">Apex Company</NavLink>
      </Router>,
    )

    const navLinkButton = wrapper.getByRole('button')
    expect(navLinkButton).toHaveAttribute('data-current', 'false')
  })

  it('should updated the search params when buttons click', async () => {
    const history = createMemoryHistory()
    history.push('/?companySelected=other')

    const wrapper = render(
      <Router location={history.location} navigator={history}>
        <NavLink company="apex">Apex Company</NavLink>
      </Router>,
    )

    const navLinkButton = wrapper.getByRole('button')
    await userEvent.click(navLinkButton)
    expect(history.location.search).toBe('?companySelected=apex')
  })
})
