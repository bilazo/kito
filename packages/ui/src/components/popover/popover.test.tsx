import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from './popover'

function renderBasic(props?: { side?: 'top' | 'bottom' | 'left' | 'right'; showArrow?: boolean }) {
  return render(
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>
      <PopoverPopup side={props?.side} showArrow={props?.showArrow}>
        <PopoverHeader>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
        </PopoverHeader>
        <p>Body content</p>
      </PopoverPopup>
    </Popover>,
  )
}

describe('Popover', () => {
  test('is closed by default', () => {
    renderBasic()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('opens on trigger click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const popup = await screen.findByRole('dialog')
    expect(popup).toBeInTheDocument()
    expect(popup).toHaveAttribute('data-slot', 'popover-popup')
  })

  test('renders title, description, and body', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
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

  test('closes on outside click', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('closes on PopoverClose click', async () => {
    render(
      <Popover>
        <PopoverTrigger render={<Button>Open</Button>}>Open</PopoverTrigger>
        <PopoverPopup>
          <PopoverHeader>
            <PopoverTitle>Title</PopoverTitle>
          </PopoverHeader>
          <PopoverClose render={<Button>Close</Button>} />
        </PopoverPopup>
      </Popover>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  test('renders an arrow by default', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    expect(document.querySelector('[data-slot="popover-arrow"]')).toBeInTheDocument()
  })

  test('showArrow={false} hides the arrow', async () => {
    renderBasic({ showArrow: false })
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    expect(document.querySelector('[data-slot="popover-arrow"]')).not.toBeInTheDocument()
  })

  test('side prop is forwarded to the positioner', async () => {
    renderBasic({ side: 'right' })
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const popup = await screen.findByRole('dialog')
    // Base UI sets data-side on the popup itself.
    expect(popup).toHaveAttribute('data-side', 'right')
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(trigger)
    const popup = await screen.findByRole('dialog')
    expect(trigger.contains(popup)).toBe(false)
  })

  test('merges custom className', async () => {
    render(
      <Popover>
        <PopoverTrigger render={<Button>Open</Button>}>Open</PopoverTrigger>
        <PopoverPopup className="custom-class">
          <PopoverTitle>Title</PopoverTitle>
        </PopoverPopup>
      </Popover>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    const popup = await screen.findByRole('dialog')
    expect(popup).toHaveClass('custom-class')
  })

  test('controlled open drives the popup', async () => {
    render(
      <Popover open>
        <PopoverTrigger render={<Button>Open</Button>}>Open</PopoverTrigger>
        <PopoverPopup>
          <PopoverTitle>Always open</PopoverTitle>
        </PopoverPopup>
      </Popover>,
    )
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })
})
