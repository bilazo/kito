import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '../button/button'
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from './menu'

function renderBasic() {
  return render(
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuPopup>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">Delete</MenuItem>
      </MenuPopup>
    </Menu>,
  )
}

describe('Menu', () => {
  test('is closed by default', () => {
    renderBasic()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('opens on trigger click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const menu = await screen.findByRole('menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveAttribute('data-slot', 'menu-popup')
  })

  test('renders all items', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('menu')
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
  })

  test('closes on Escape', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('menu')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  test('closes on outside click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('menu')
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(trigger)
    const menu = await screen.findByRole('menu')
    expect(trigger.contains(menu)).toBe(false)
  })

  test('controlled open drives the menu', async () => {
    render(
      <Menu open>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuItem>Item</MenuItem>
        </MenuPopup>
      </Menu>,
    )
    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })
})

describe('MenuItem', () => {
  test('renders with role=menuitem and data-slot', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const item = await screen.findByRole('menuitem', { name: 'Rename' })
    expect(item).toHaveAttribute('data-slot', 'menu-item')
  })

  test('fires onClick when activated', async () => {
    const onClick = vi.fn()
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuItem onClick={onClick}>Rename</MenuItem>
        </MenuPopup>
      </Menu>,
    )
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Rename' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('closes the menu after activation', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Rename' }))
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  test('destructive variant applies text-destructive', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const deleteItem = await screen.findByRole('menuitem', { name: 'Delete' })
    expect(deleteItem).toHaveAttribute('data-variant', 'destructive')
    expect(deleteItem).toHaveClass('text-destructive')
  })

  test('inset adds extra start padding', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuItem inset>Aligned item</MenuItem>
        </MenuPopup>
      </Menu>,
    )
    const item = await screen.findByRole('menuitem', { name: 'Aligned item' })
    expect(item).toHaveAttribute('data-inset', 'true')
    expect(item).toHaveClass('ps-8')
  })
})

describe('MenuLinkItem', () => {
  test('renders as an anchor with role=menuitem', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuLinkItem href="/profile">Profile</MenuLinkItem>
        </MenuPopup>
      </Menu>,
    )
    const link = await screen.findByRole('menuitem', { name: 'Profile' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/profile')
  })
})

describe('MenuCheckboxItem', () => {
  test('renders with role=menuitemcheckbox', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuCheckboxItem checked>Show grid</MenuCheckboxItem>
        </MenuPopup>
      </Menu>,
    )
    const item = await screen.findByRole('menuitemcheckbox', {
      name: 'Show grid',
    })
    expect(item).toHaveAttribute('aria-checked', 'true')
  })

  test('toggles when clicked', async () => {
    const onCheckedChange = vi.fn()
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuCheckboxItem onCheckedChange={onCheckedChange}>Show grid</MenuCheckboxItem>
        </MenuPopup>
      </Menu>,
    )
    await userEvent.click(await screen.findByRole('menuitemcheckbox', { name: 'Show grid' }))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  test('keeps the menu open after toggle', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuCheckboxItem>Show grid</MenuCheckboxItem>
        </MenuPopup>
      </Menu>,
    )
    await userEvent.click(await screen.findByRole('menuitemcheckbox', { name: 'Show grid' }))
    // closeOnClick defaults to false for checkbox items.
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})

describe('MenuRadioGroup / MenuRadioItem', () => {
  test('renders items with role=menuitemradio', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuRadioGroup defaultValue="a">
            <MenuRadioItem value="a">A</MenuRadioItem>
            <MenuRadioItem value="b">B</MenuRadioItem>
          </MenuRadioGroup>
        </MenuPopup>
      </Menu>,
    )
    const a = await screen.findByRole('menuitemradio', { name: 'A' })
    const b = await screen.findByRole('menuitemradio', { name: 'B' })
    expect(a).toHaveAttribute('aria-checked', 'true')
    expect(b).toHaveAttribute('aria-checked', 'false')
  })

  test('selecting one deselects the others', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuRadioGroup defaultValue="a">
            <MenuRadioItem value="a">A</MenuRadioItem>
            <MenuRadioItem value="b">B</MenuRadioItem>
          </MenuRadioGroup>
        </MenuPopup>
      </Menu>,
    )
    const b = await screen.findByRole('menuitemradio', { name: 'B' })
    await userEvent.click(b)
    expect(b).toHaveAttribute('aria-checked', 'true')
  })
})

describe('MenuGroup / MenuGroupLabel', () => {
  test('renders a group with a label', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            <MenuGroupLabel>Edit</MenuGroupLabel>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
          </MenuGroup>
        </MenuPopup>
      </Menu>,
    )
    expect(await screen.findByText('Edit')).toBeInTheDocument()
    expect(await screen.findByRole('menuitem', { name: 'Cut' })).toBeInTheDocument()
  })
})

describe('MenuSeparator', () => {
  test('renders role=separator', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('menu')
    const separator = document.querySelector('[data-slot="menu-separator"]')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('role', 'separator')
  })
})

describe('MenuShortcut', () => {
  test('renders the shortcut text right-aligned', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuItem>
            Save
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuPopup>
      </Menu>,
    )
    const shortcut = document.querySelector('[data-slot="menu-shortcut"]')
    expect(shortcut).toBeInTheDocument()
    expect(shortcut).toHaveTextContent('⌘S')
    expect(shortcut).toHaveClass('ms-auto')
  })
})

describe('MenuSub', () => {
  test('renders a submenu trigger with a chevron', async () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger render={<Button>Open</Button>}>Open</MenuTrigger>
        <MenuPopup>
          <MenuSub>
            <MenuSubTrigger>Share</MenuSubTrigger>
            <MenuSubPopup>
              <MenuItem>Email</MenuItem>
            </MenuSubPopup>
          </MenuSub>
        </MenuPopup>
      </Menu>,
    )
    const trigger = await screen.findByRole('menuitem', { name: 'Share' })
    expect(trigger).toHaveAttribute('data-slot', 'menu-sub-trigger')
    expect(trigger.querySelector('svg')).toBeInTheDocument()
  })
})
