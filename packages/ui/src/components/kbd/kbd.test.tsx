import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, test } from 'vitest'

import { Kbd, KbdGroup } from './kbd'

describe('Kbd', () => {
  test('renders as a kbd element with data-slot', () => {
    render(<Kbd>Ctrl</Kbd>)
    const el = screen.getByText('Ctrl')
    expect(el.tagName).toBe('KBD')
    expect(el).toHaveAttribute('data-slot', 'kbd')
  })

  test('has the base key-cap styling', () => {
    render(<Kbd>Ctrl</Kbd>)
    const el = screen.getByText('Ctrl')
    expect(el).toHaveClass(
      'inline-flex',
      'rounded-sm',
      'bg-muted',
      'text-muted-foreground',
      'font-sans',
      'text-xs',
      'select-none',
    )
  })

  test('is non-interactive (pointer-events-none)', () => {
    render(<Kbd>Ctrl</Kbd>)
    expect(screen.getByText('Ctrl')).toHaveClass('pointer-events-none')
  })

  test('inverts colours inside a tooltip context', () => {
    render(<Kbd>Ctrl</Kbd>)
    const el = screen.getByText('Ctrl')
    // The tooltip scope classes are on the class list; the actual inversion
    // happens in the browser once the Kbd sits inside a tooltip popup.
    expect(el.className).toContain('in-data-[slot=tooltip-content]:bg-background/20')
    expect(el.className).toContain('in-data-[slot=tooltip-content]:text-background')
  })

  test('renders a short sequence like ⌘K', () => {
    render(<Kbd>⌘K</Kbd>)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<Kbd className="custom-class">Ctrl</Kbd>)
    expect(screen.getByText('Ctrl')).toHaveClass('custom-class')
  })

  test('forwards native attributes', () => {
    render(<Kbd id="kbd-id">Ctrl</Kbd>)
    expect(screen.getByText('Ctrl')).toHaveAttribute('id', 'kbd-id')
  })

  test('forwards ref to the underlying kbd element', () => {
    const ref = createRef<HTMLElement>()
    render(<Kbd ref={ref}>Ctrl</Kbd>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current?.tagName).toBe('KBD')
  })
})

describe('KbdGroup', () => {
  test('renders as a div with data-slot', () => {
    render(
      <KbdGroup data-testid="group">
        <Kbd>Ctrl</Kbd>
      </KbdGroup>,
    )
    const el = screen.getByTestId('group')
    expect(el.tagName).toBe('DIV')
    expect(el).toHaveAttribute('data-slot', 'kbd-group')
  })

  test('lays out children as a flex row', () => {
    render(
      <KbdGroup data-testid="group">
        <Kbd>Ctrl</Kbd>
      </KbdGroup>,
    )
    expect(screen.getByTestId('group')).toHaveClass('inline-flex', 'items-center', 'gap-1')
  })

  test('renders multiple Kbd children', () => {
    render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>,
    )
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<KbdGroup className="custom-class" data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveClass('custom-class')
  })

  test('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<KbdGroup ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-slot', 'kbd-group')
  })
})
