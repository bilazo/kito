import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from './dialog'

function renderBasic(props?: { showCloseButton?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  return render(
    <Dialog>
      <DialogTrigger render={<Button />}>Open</DialogTrigger>
      <DialogPopup {...props}>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>,
  )
}

describe('Dialog', () => {
  test('passes dir to the popup element', async () => {
    render(
      <Dialog defaultOpen>
        <DialogPopup dir="rtl">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogPopup>
      </Dialog>,
    )
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('dir', 'rtl')
  })

  test('is closed by default', () => {
    renderBasic()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('opens on trigger click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('data-slot', 'dialog-popup')
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
    const backdrop = document.querySelector('[data-slot="dialog-backdrop"]')!
    await userEvent.click(backdrop)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('closes on DialogClose click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('close button', () => {
    test('is rendered by default', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })

    test('closes the dialog when clicked', async () => {
      renderBasic()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      await userEvent.click(screen.getByRole('button', { name: 'Close' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    test('showCloseButton={false} hides it', async () => {
      renderBasic({ showCloseButton: false })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await screen.findByRole('dialog')
      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    })
  })

  describe('sizes', () => {
    test.each([
      ['sm', 'max-w-sm'],
      ['md', 'max-w-lg'],
      ['lg', 'max-w-2xl'],
    ] as const)('size=%s applies %s', async (size, expectedClass) => {
      renderBasic({ size })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveClass(expectedClass)
      expect(dialog).toHaveAttribute('data-size', size)
    })
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole('dialog')
    expect(trigger.contains(dialog)).toBe(false)
  })
})
