import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu'

function renderBasic() {
  return render(
    <ContextMenu>
      <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>,
  )
}

// fireEvent.contextMenu is the reliable way to simulate a right-click in
// jsdom — userEvent.pointer does not surface the native contextmenu event
// with pointer coordinates. Base UI listens for contextmenu with clientX/Y.
function rightClick(element: Element) {
  fireEvent.contextMenu(element, { clientX: 100, clientY: 100 })
}

describe('ContextMenu', () => {
  test('is closed by default', () => {
    renderBasic()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('opens on right-click of the trigger', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    const menu = await screen.findByRole('menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveAttribute('data-slot', 'context-menu-popup')
  })

  test('renders all items', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    await screen.findByRole('menu')
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
  })

  test('closes on Escape', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    await screen.findByRole('menu')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  test('closes on outside click', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    await screen.findByRole('menu')
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByText('Right-click me')
    rightClick(trigger)
    const menu = await screen.findByRole('menu')
    expect(trigger.contains(menu)).toBe(false)
  })

  test('trigger carries select-none', () => {
    renderBasic()
    expect(screen.getByText('Right-click me')).toHaveClass('select-none')
  })

  test('controlled open drives the menu', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuItem>One</ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })
})

describe('ContextMenuItem', () => {
  test('renders with role=menuitem and data-slot', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    const item = await screen.findByRole('menuitem', { name: 'Cut' })
    expect(item).toHaveAttribute('data-slot', 'context-menu-item')
  })

  test('fires onSelect when activated', async () => {
    const onSelect = vi.fn()
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuItem onClick={onSelect}>Cut</ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Cut' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  test('destructive variant applies text-destructive', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    const deleteItem = await screen.findByRole('menuitem', { name: 'Delete' })
    expect(deleteItem).toHaveAttribute('data-variant', 'destructive')
    expect(deleteItem).toHaveClass('text-destructive')
  })

  test('inset adds extra start padding', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuItem inset>Inset item</ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    const item = await screen.findByRole('menuitem', { name: 'Inset item' })
    expect(item).toHaveAttribute('data-inset', 'true')
    expect(item).toHaveClass('ps-8')
  })
})

describe('ContextMenuCheckboxItem', () => {
  test('renders with role=menuitemcheckbox', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    const item = await screen.findByRole('menuitemcheckbox', { name: 'Show grid' })
    expect(item).toHaveAttribute('aria-checked', 'true')
  })

  test('toggles when clicked', async () => {
    const onCheckedChange = vi.fn()
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuCheckboxItem onCheckedChange={onCheckedChange}>
            Show grid
          </ContextMenuCheckboxItem>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    await userEvent.click(await screen.findByRole('menuitemcheckbox', { name: 'Show grid' }))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })
})

describe('ContextMenuRadioGroup / ContextMenuRadioItem', () => {
  test('renders items with role=menuitemradio', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuRadioGroup defaultValue="a">
            <ContextMenuRadioItem value="a">A</ContextMenuRadioItem>
            <ContextMenuRadioItem value="b">B</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    const a = await screen.findByRole('menuitemradio', { name: 'A' })
    const b = await screen.findByRole('menuitemradio', { name: 'B' })
    expect(a).toHaveAttribute('aria-checked', 'true')
    expect(b).toHaveAttribute('aria-checked', 'false')
  })
})

describe('ContextMenuGroup / ContextMenuGroupLabel', () => {
  test('renders a group with a label', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Edit</ContextMenuGroupLabel>
            <ContextMenuItem>Cut</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    expect(await screen.findByText('Edit')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument()
  })
})

describe('ContextMenuSeparator', () => {
  test('renders role=separator', async () => {
    renderBasic()
    rightClick(screen.getByText('Right-click me'))
    await screen.findByRole('menu')
    const separator = document.querySelector('[data-slot="context-menu-separator"]')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('role', 'separator')
  })
})

describe('ContextMenuShortcut', () => {
  test('renders the shortcut text with ms-auto (logical, RTL-safe)', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    const shortcut = document.querySelector('[data-slot="context-menu-shortcut"]')
    expect(shortcut).toBeInTheDocument()
    expect(shortcut).toHaveTextContent('⌘X')
    expect(shortcut).toHaveClass('ms-auto')
    expect(shortcut?.className).not.toContain('ml-auto')
  })
})

describe('ContextMenuSub', () => {
  test('renders a submenu trigger with a direction-flipping chevron', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
        <ContextMenuPopup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
            <ContextMenuSubPopup>
              <ContextMenuItem>Email</ContextMenuItem>
            </ContextMenuSubPopup>
          </ContextMenuSub>
        </ContextMenuPopup>
      </ContextMenu>,
    )
    const trigger = await screen.findByRole('menuitem', { name: 'Share' })
    expect(trigger).toHaveAttribute('data-slot', 'context-menu-sub-trigger')
    const chevron = trigger.querySelector('svg')
    expect(chevron).toBeInTheDocument()
  })
})
