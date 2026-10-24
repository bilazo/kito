import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from './sheet'

function renderBasic(props?: {
  side?: 'start' | 'end' | 'top' | 'bottom'
  showCloseButton?: boolean
}) {
  return render(
    <Sheet>
      <SheetTrigger render={<Button />}>Open</SheetTrigger>
      <SheetPopup {...props}>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
          <Button>Confirm</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>,
  )
}

describe('Sheet', () => {
  test('is closed by default', () => {
    renderBasic()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('opens on trigger click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('data-slot', 'sheet-popup')
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
    const backdrop = document.querySelector('[data-slot="sheet-backdrop"]')!
    await userEvent.click(backdrop)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('closes on SheetClose click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('sides', () => {
    test('defaults to side=end', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-side', 'end')
      expect(dialog).toHaveClass('inset-y-0', 'end-0', 'border-s')
    })

    test('side=start anchors to the inline-start edge', async () => {
      renderBasic({ side: 'start' })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-side', 'start')
      expect(dialog).toHaveClass('inset-y-0', 'start-0', 'border-e')
    })

    test('side=top anchors to the top edge', async () => {
      renderBasic({ side: 'top' })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-side', 'top')
      expect(dialog).toHaveClass('inset-x-0', 'top-0', 'border-b')
    })

    test('side=bottom anchors to the bottom edge', async () => {
      renderBasic({ side: 'bottom' })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveAttribute('data-side', 'bottom')
      expect(dialog).toHaveClass('inset-x-0', 'bottom-0', 'border-t')
    })

    test('start and end use RTL-aware transforms', async () => {
      renderBasic({ side: 'end' })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      // LTR transform + RTL override both present.
      expect(dialog.className).toContain('data-starting-style:translate-x-full')
      expect(dialog.className).toContain('rtl:data-starting-style:-translate-x-full')
    })
  })

  describe('close button', () => {
    test('is rendered by default', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })

    test('showCloseButton={false} hides it', async () => {
      renderBasic({ showCloseButton: false })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    })
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog')
    expect(trigger.contains(dialog)).toBe(false)
  })

  test('open={true} renders the sheet without a trigger', async () => {
    render(
      <Sheet open>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Always open</SheetTitle>
          </SheetHeader>
        </SheetPopup>
      </Sheet>,
    )
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
