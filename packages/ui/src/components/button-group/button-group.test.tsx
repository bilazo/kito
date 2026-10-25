import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import { Input } from '../input/input'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from './button-group'

describe('ButtonGroup', () => {
  test('renders with role=group and data-slot', () => {
    render(<ButtonGroup data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-slot', 'button-group')
    expect(group).toHaveAttribute('role', 'group')
  })

  test('defaults to horizontal orientation', () => {
    render(<ButtonGroup data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveClass('flex', 'w-fit', 'items-stretch')
    expect(group.className).toContain('[&>[data-slot]:first-child]:rounded-s-lg')
  })

  test('vertical orientation rounds top and bottom instead of sides', () => {
    render(<ButtonGroup orientation="vertical" data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group.className).toContain('[&>[data-slot]:first-child]:rounded-t-lg')
    expect(group.className).toContain('[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg')
    // Vertical uses `border-t-0` on non-first children, not `border-s-0`.
    expect(group.className).toContain('[&>[data-slot]~[data-slot]]:border-t-0')
    expect(group.className).not.toContain('border-s-0')
  })

  test('horizontal uses logical start/end borders for RTL', () => {
    render(<ButtonGroup data-testid="group" />)
    const group = screen.getByTestId('group')
    // Logical start/end selectors are the RTL-safe choice; physical
    // `border-l-0` would misbehave in RTL.
    expect(group.className).toContain('border-s-0')
    expect(group.className).toContain('rounded-s-lg')
    expect(group.className).toContain('rounded-e-lg')
    expect(group.className).not.toContain('border-l-0')
    expect(group.className).not.toContain('rounded-r-lg')
  })

  test('lifts focused children to z-10', () => {
    render(<ButtonGroup data-testid="group" />)
    expect(screen.getByTestId('group').className).toContain(
      '*:focus-visible:relative *:focus-visible:z-10',
    )
  })

  test('nested ButtonGroup gets a gap', () => {
    render(<ButtonGroup data-testid="group" />)
    expect(screen.getByTestId('group').className).toContain('has-[>[data-slot=button-group]]:gap-2')
  })

  test('input as a direct child flexes to fill', () => {
    render(<ButtonGroup data-testid="group" />)
    expect(screen.getByTestId('group').className).toContain('[&>input]:flex-1')
  })

  test('renders buttons inside the group', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument()
  })

  test('forwards aria-label for accessibility', () => {
    render(<ButtonGroup aria-label="Alignment" />)
    expect(screen.getByRole('group', { name: 'Alignment' })).toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<ButtonGroup className="custom-class" data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveClass('custom-class')
  })
})

describe('ButtonGroupText', () => {
  test('renders as a div with data-slot by default', () => {
    render(<ButtonGroupText data-testid="text">Prefix</ButtonGroupText>)
    const text = screen.getByTestId('text')
    expect(text.tagName).toBe('DIV')
    expect(text).toHaveAttribute('data-slot', 'button-group-text')
  })

  test('renders as a label via the render prop', () => {
    render(
      <ButtonGroupText render={<label htmlFor="q" />} data-testid="text">
        Search
      </ButtonGroupText>,
    )
    const text = screen.getByTestId('text')
    expect(text.tagName).toBe('LABEL')
    expect(text).toHaveAttribute('for', 'q')
    expect(text).toHaveAttribute('data-slot', 'button-group-text')
  })

  test('merges custom className', () => {
    render(
      <ButtonGroupText className="custom-class" data-testid="text">
        Prefix
      </ButtonGroupText>,
    )
    expect(screen.getByTestId('text')).toHaveClass('custom-class')
  })

  test('applies the base label styling', () => {
    render(<ButtonGroupText data-testid="text">Prefix</ButtonGroupText>)
    const text = screen.getByTestId('text')
    expect(text).toHaveClass('flex', 'items-center', 'rounded-lg', 'bg-muted')
  })
})

describe('ButtonGroupSeparator', () => {
  test('defaults to vertical orientation for horizontal button groups', () => {
    render(<ButtonGroupSeparator data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-slot', 'button-group-separator')
    expect(sep).toHaveClass('relative', 'self-stretch', 'bg-input')
    expect(sep).toHaveClass('my-px', 'h-auto')
  })

  test('horizontal orientation for vertical button groups', () => {
    render(<ButtonGroupSeparator orientation="horizontal" data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveClass('mx-px', 'w-auto')
    expect(sep).not.toHaveClass('my-px')
  })

  test('merges custom className', () => {
    render(<ButtonGroupSeparator className="custom-class" data-testid="sep" />)
    expect(screen.getByTestId('sep')).toHaveClass('custom-class')
  })

  test('renders a decorative separator (no role) by default', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <ButtonGroupSeparator data-testid="sep" />
        <Button>Two</Button>
      </ButtonGroup>,
    )
    const sep = screen.getByTestId('sep')
    // Kito's Separator defaults to `decorative={true}` — no `role="separator"`.
    // Inside `role="group"`, a decorative separator is the right call.
    expect(sep).not.toHaveAttribute('role', 'separator')
    expect(sep).toHaveAttribute('aria-orientation', 'vertical')
  })
})

describe('buttonGroupVariants', () => {
  test('returns the class string for the default orientation', () => {
    const classes = buttonGroupVariants()
    expect(classes).toContain('flex')
    expect(classes).toContain('rounded-s-lg')
  })

  test('returns the class string for vertical', () => {
    const classes = buttonGroupVariants({ orientation: 'vertical' })
    expect(classes).toContain('rounded-t-lg')
    expect(classes).not.toContain('rounded-s-lg')
  })
})

describe('composition', () => {
  test('renders a search bar — input + button', () => {
    render(
      <ButtonGroup aria-label="Search">
        <Input placeholder="Search…" aria-label="Query" />
        <Button>Go</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('textbox', { name: 'Query' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument()
  })

  test('renders a split button with a separator', () => {
    render(
      <ButtonGroup aria-label="Split">
        <Button>Save</Button>
        <ButtonGroupSeparator />
        <Button aria-label="More">…</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument()
    expect(document.querySelector('[data-slot="button-group-separator"]')).toBeInTheDocument()
  })
})
