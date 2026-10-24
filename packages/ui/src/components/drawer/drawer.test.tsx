import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'

function renderBasic(props?: {
  side?: 'bottom' | 'top' | 'left' | 'right'
  snapPoints?: (string | number)[]
  showSwipeHandle?: boolean
}) {
  return render(
    <Drawer
      side={props?.side}
      snapPoints={props?.snapPoints}
      showSwipeHandle={props?.showSwipeHandle}
    >
      <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="p-6">Body content</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Cancel</DrawerClose>
          <Button>Confirm</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>,
  )
}

describe('Drawer', () => {
  test('is closed by default', () => {
    renderBasic()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('opens on trigger click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('data-slot', 'drawer-popup')
  })

  test('renders title and description', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  test('has an accessible name from the title', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByRole('dialog', { name: 'Title' })).toBeInTheDocument()
  })

  test('closes on Escape', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('closes on backdrop click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    const backdrop = document.querySelector('[data-slot="drawer-backdrop"]')!
    await userEvent.click(backdrop)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('closes on DrawerClose click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('sides', () => {
    test.each([
      ['bottom', 'inset-x-0', 'bottom-0', 'border-t'],
      ['top', 'inset-x-0', 'top-0', 'border-b'],
      ['left', 'inset-y-0', 'left-0', 'border-r'],
      ['right', 'inset-y-0', 'right-0', 'border-l'],
    ] as const)(
      'side=%s anchors to the correct edge',
      async (side, insetAxis, insetPos, border) => {
        renderBasic({ side })
        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        const dialog = await screen.findByRole('dialog')
        expect(dialog).toHaveAttribute('data-side', side)
        expect(dialog).toHaveClass(insetAxis, insetPos, border)
      },
    )

    test('defaults to side=bottom', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-side', 'bottom')
    })
  })

  describe('snap points', () => {
    test('renders with snap points without errors', async () => {
      renderBasic({ snapPoints: ['20rem', 1] })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('swipe handle', () => {
    test('is not rendered by default', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      expect(document.querySelector('[data-slot="drawer-handle"]')).not.toBeInTheDocument()
    })

    test('renders when showSwipeHandle is true', async () => {
      renderBasic({ showSwipeHandle: true })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      const handle = document.querySelector('[data-slot="drawer-handle"]')
      expect(handle).toBeInTheDocument()
      expect(handle).toHaveAttribute('aria-hidden')
    })

    test.each([
      ['bottom', 'mt-3', 'h-1.5', 'w-10'],
      ['top', 'mb-3', 'h-1.5', 'w-10'],
      ['left', 'me-3', 'w-1.5', 'h-10'],
      ['right', 'ms-3', 'w-1.5', 'h-10'],
    ] as const)(
      'renders a side-specific handle for side=%s',
      async (side, edgeMargin, height, width) => {
        renderBasic({ side, showSwipeHandle: true })
        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        await screen.findByRole('dialog')

        const handle = document.querySelector('[data-slot="drawer-handle"]')!
        expect(handle).toHaveAttribute('data-side', side)
        expect(handle).toHaveClass(edgeMargin, height, width)
      },
    )
  })

  describe('structure', () => {
    test('renders DrawerHeader, DrawerBody, DrawerFooter with data-slots', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      expect(document.querySelector('[data-slot="drawer-header"]')).toBeInTheDocument()
      expect(document.querySelector('[data-slot="drawer-body"]')).toBeInTheDocument()
      expect(document.querySelector('[data-slot="drawer-footer"]')).toBeInTheDocument()
    })

    test('renders DrawerHandle standalone and hides it from a11y', () => {
      render(<DrawerHandle data-testid="handle" />)
      const handle = screen.getByTestId('handle')
      expect(handle).toBeInTheDocument()
      expect(handle).toHaveAttribute('aria-hidden')
    })

    test('viewport is pointer-events-auto when modal', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      const viewport = document.querySelector('[data-slot="drawer-viewport"]')!
      expect(viewport).toHaveAttribute('data-modal', 'true')
      expect(viewport).toHaveClass('pointer-events-auto')
    })

    test('viewport is pointer-events-none when modal={false}', async () => {
      render(
        <Drawer modal={false}>
          <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
          <DrawerPopup>
            <DrawerHeader>
              <DrawerTitle>Non-modal</DrawerTitle>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>,
      )
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      const viewport = document.querySelector('[data-slot="drawer-viewport"]')!
      expect(viewport).toHaveAttribute('data-modal', 'false')
      expect(viewport).toHaveClass('pointer-events-none')
    })

    test('variant defaults to flush', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-variant', 'flush')
    })

    test('floating variant adds md-scoped insets and shadow', async () => {
      render(
        <Drawer variant="floating" side="right">
          <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
          <DrawerPopup>
            <DrawerHeader>
              <DrawerTitle>Floating</DrawerTitle>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>,
      )
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-variant', 'floating')
      // Floating styles are md-scoped, so we assert on the modifier prefix.
      expect(dialog.className).toContain('md:right-3')
      expect(dialog.className).toContain('md:top-3')
      expect(dialog.className).toContain('md:bottom-3')
      expect(dialog.className).toContain('md:rounded-xl')
      expect(dialog.className).toContain('md:shadow-lg')
    })

    test('floating variant is a no-op for top and bottom sides', async () => {
      render(
        <Drawer variant="floating" side="bottom">
          <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
          <DrawerPopup>
            <DrawerHeader>
              <DrawerTitle>Bottom</DrawerTitle>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>,
      )
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      // Attribute is set, but no floating classes are applied.
      expect(dialog).toHaveAttribute('data-variant', 'floating')
      expect(dialog.className).not.toContain('md:top-3')
      expect(dialog.className).not.toContain('md:bottom-3')
    })
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog')
    expect(trigger.contains(dialog)).toBe(false)
  })

  test('open={true} renders the drawer without a trigger', async () => {
    render(
      <Drawer open>
        <DrawerPopup>
          <DrawerHeader>
            <DrawerTitle>Always open</DrawerTitle>
          </DrawerHeader>
        </DrawerPopup>
      </Drawer>,
    )
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  test('passes dir to the popup element', async () => {
    render(
      <Drawer defaultOpen>
        <DrawerPopup dir="rtl">
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
        </DrawerPopup>
      </Drawer>,
    )
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('dir', 'rtl')
  })
})
