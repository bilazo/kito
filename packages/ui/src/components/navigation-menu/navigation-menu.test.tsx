import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu'

function renderBasic() {
  return render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/products/a">Product A</NavigationMenuLink>
            <NavigationMenuLink href="/products/b">Product B</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  )
}

describe('NavigationMenu', () => {
  test('renders the root with data-slot', () => {
    renderBasic()
    expect(document.querySelector('[data-slot="navigation-menu"]')).toBeInTheDocument()
  })

  test('renders a trigger button and a standalone link', () => {
    renderBasic()
    expect(screen.getByRole('button', { name: /Products/u })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  test('content is not rendered before opening', () => {
    renderBasic()
    expect(screen.queryByRole('link', { name: 'Product A' })).not.toBeInTheDocument()
  })

  test('opening on click shows the content inside the shared viewport', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: /Products/u }))

    // The content is portaled and rendered asynchronously.
    expect(await screen.findByRole('link', { name: 'Product A' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Product B' })).toBeInTheDocument()
  })

  test('trigger shows data-popup-open when open', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: /Products/u })
    expect(trigger).not.toHaveAttribute('data-popup-open')

    await userEvent.click(trigger)

    await waitFor(() => {
      expect(trigger).toHaveAttribute('data-popup-open')
    })
  })

  test('content has data-slot', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: /Products/u }))
    await screen.findByRole('link', { name: 'Product A' })

    expect(document.querySelector('[data-slot="navigation-menu-content"]')).toBeInTheDocument()
  })

  test('trigger forwards custom className', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-trigger">Trigger</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )
    expect(screen.getByRole('button', { name: /Trigger/u })).toHaveClass('custom-trigger')
  })

  test('link forwards custom className', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/x" className="custom-link">
              Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )
    expect(screen.getByRole('link', { name: 'Link' })).toHaveClass('custom-link')
  })
})
