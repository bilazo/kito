import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

function renderBasic(props?: { side?: 'top' | 'bottom' | 'left' | 'right'; showArrow?: boolean }) {
  return render(
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={<Button size="icon" aria-label="Add item" />}>+</TooltipTrigger>
        <TooltipContent side={props?.side} showArrow={props?.showArrow}>
          Add item
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  )
}

describe('Tooltip', () => {
  test('content is not rendered before hover', () => {
    renderBasic()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  test('renders the tooltip on hover', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Add item' })
    await userEvent.hover(trigger)
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent('Add item')
  })

  test('hides the tooltip on unhover', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Add item' })
    await userEvent.hover(trigger)
    await screen.findByRole('tooltip')
    await userEvent.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  test('opens on keyboard focus', async () => {
    renderBasic()
    // `userEvent.tab()` moves focus through the page in a way that is
    // wrapped in act by React Testing Library. A raw `.focus()` is not.
    await userEvent.tab()
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
  })

  test('closes on Escape', async () => {
    renderBasic()
    await userEvent.tab()
    await screen.findByRole('tooltip')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  test('content has data-slot and data-side', async () => {
    renderBasic({ side: 'bottom' })
    await userEvent.hover(screen.getByRole('button', { name: 'Add item' }))
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveAttribute('data-slot', 'tooltip-content')
    // Base UI sets data-side on the popup.
    expect(tooltip).toHaveAttribute('data-side', 'bottom')
  })

  test('renders an arrow by default', async () => {
    renderBasic()
    await userEvent.hover(screen.getByRole('button', { name: 'Add item' }))
    await screen.findByRole('tooltip')
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeInTheDocument()
  })

  test('showArrow={false} hides the arrow', async () => {
    renderBasic({ showArrow: false })
    await userEvent.hover(screen.getByRole('button', { name: 'Add item' }))
    await screen.findByRole('tooltip')
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).not.toBeInTheDocument()
  })

  test('renders in a portal — not a descendant of the trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Add item' })
    await userEvent.hover(trigger)
    const tooltip = await screen.findByRole('tooltip')
    expect(trigger.contains(tooltip)).toBe(false)
  })

  test('merges custom className', async () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" aria-label="Info" />}>i</TooltipTrigger>
          <TooltipContent className="custom-class">Info</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    await userEvent.hover(screen.getByRole('button', { name: 'Info' }))
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveClass('custom-class')
  })
})
