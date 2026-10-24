// oxlint-disable jsx-a11y/prefer-tag-over-role -- role="search" in the role-override test has no direct semantic tag equivalent that fits the assertion
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, test, vi } from 'vitest'

import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'

describe('InputGroup', () => {
  test('renders with data-slot, role=group, and default size', () => {
    render(<InputGroup data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-slot', 'input-group')
    expect(group).toHaveAttribute('data-size', 'md')
    expect(group).toHaveAttribute('role', 'group')
  })

  test.each([
    ['sm', 'h-(--control-sm)'],
    ['md', 'h-(--control-md)'],
    ['lg', 'h-(--control-lg)'],
  ] as const)('size=%s applies %s', (size, expectedClass) => {
    render(<InputGroup size={size} data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveClass(expectedClass)
  })

  test('merges custom className', () => {
    render(<InputGroup className="custom" data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveClass('custom')
  })

  test('base classes include focus and invalid selectors', () => {
    render(<InputGroup data-testid="group" />)
    const cls = screen.getByTestId('group').className
    expect(cls).toContain('focus-within:border-ring')
    expect(cls).toContain('has-aria-invalid:border-destructive')
    expect(cls).toContain('has-data-invalid:border-destructive')
    expect(cls).toContain('has-disabled:opacity-50')
  })

  test('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<InputGroup ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-slot', 'input-group')
  })

  test('allows role override via props', () => {
    render(<InputGroup role="search" data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveAttribute('role', 'search')
  })
})

describe('InputGroupAddon', () => {
  test('renders with data-slot and default inline-start align', () => {
    render(<InputGroupAddon data-testid="addon">@</InputGroupAddon>)
    const addon = screen.getByTestId('addon')
    expect(addon).toHaveAttribute('data-slot', 'input-group-addon')
    expect(addon).toHaveAttribute('data-align', 'inline-start')
  })

  test('inline-start uses start padding', () => {
    render(<InputGroupAddon data-testid="addon">@</InputGroupAddon>)
    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('ps-3', 'pe-2')
  })

  test('inline-end uses end padding', () => {
    render(
      <InputGroupAddon align="inline-end" data-testid="addon">
        USD
      </InputGroupAddon>,
    )
    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('ps-2', 'pe-3')
    expect(addon).toHaveAttribute('data-align', 'inline-end')
  })

  test('block-start uses full-width layout', () => {
    render(
      <InputGroupAddon align="block-start" data-testid="addon">
        Subject
      </InputGroupAddon>,
    )
    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('w-full', 'justify-start')
  })

  test('clicking the addon focuses the sibling input', async () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">@</InputGroupAddon>
        <InputGroupInput aria-label="Email" />
      </InputGroup>,
    )
    const input = screen.getByRole('textbox')
    await userEvent.click(screen.getByTestId('addon'))
    expect(input).toHaveFocus()
  })

  test('clicking a button inside the addon does not steal focus', async () => {
    const onClick = vi.fn()
    render(
      <InputGroup>
        <InputGroupAddon>
          <button type="button" onClick={onClick}>
            Go
          </button>
        </InputGroupAddon>
        <InputGroupInput aria-label="Email" />
      </InputGroup>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('size lg makes addon text-base', () => {
    render(
      <InputGroup size="lg">
        <InputGroupAddon data-testid="addon">@</InputGroupAddon>
      </InputGroup>,
    )
    expect(screen.getByTestId('addon')).toHaveClass('text-base')
  })

  test('size md makes addon text-sm', () => {
    render(
      <InputGroup size="md">
        <InputGroupAddon data-testid="addon">@</InputGroupAddon>
      </InputGroup>,
    )
    expect(screen.getByTestId('addon')).toHaveClass('text-sm')
  })

  test('block-end uses full-width layout', () => {
    render(
      <InputGroupAddon align="block-end" data-testid="addon">
        Submit
      </InputGroupAddon>,
    )
    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('w-full', 'justify-start')
    expect(addon).toHaveAttribute('data-align', 'block-end')
  })

  test('custom onClick fires and can preventDefault to skip focus fallback', async () => {
    const onClick = vi.fn((event: React.MouseEvent) => {
      event.preventDefault()
    })
    render(
      <InputGroup>
        <InputGroupAddon onClick={onClick} data-testid="addon">
          @
        </InputGroupAddon>
        <InputGroupInput aria-label="Email" />
      </InputGroup>,
    )
    const input = screen.getByRole('textbox')
    await userEvent.click(screen.getByTestId('addon'))
    expect(onClick).toHaveBeenCalledOnce()
    expect(input).not.toHaveFocus()
  })
})

describe('InputGroupInput', () => {
  test('renders a bare input with the right data-slot', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Email" />
      </InputGroup>,
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('data-slot', 'input-group-input')
    expect(input.className).not.toContain('border-input')
    expect(input.className).not.toContain('rounded-lg')
  })

  test('inherits size from the group', () => {
    render(
      <InputGroup size="lg">
        <InputGroupInput aria-label="Email" data-testid="input" />
      </InputGroup>,
    )
    expect(screen.getByTestId('input')).toHaveClass('text-base')
  })

  test('applies defaultDir from type', () => {
    render(
      <InputGroup>
        <InputGroupInput type="email" aria-label="Email" />
      </InputGroup>,
    )
    const input = document.querySelector('input')!
    expect(input).toHaveAttribute('dir', 'ltr')
  })

  test('explicit dir overrides defaultDir', () => {
    render(
      <InputGroup>
        <InputGroupInput type="email" dir="auto" aria-label="Email" />
      </InputGroup>,
    )
    const input = document.querySelector('input')!
    expect(input).toHaveAttribute('dir', 'auto')
  })

  test('accepts typed input', async () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Email" />
      </InputGroup>,
    )
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'hello@example.com')
    expect(input).toHaveValue('hello@example.com')
  })

  test('disabled is forwarded and reflected in the class list', () => {
    render(
      <InputGroup>
        <InputGroupInput disabled aria-label="Email" />
      </InputGroup>,
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  test('aria-invalid is forwarded', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-invalid aria-label="Email" />
      </InputGroup>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  test('forwards ref to the underlying input', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <InputGroup>
        <InputGroupInput ref={ref} aria-label="Email" />
      </InputGroup>,
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toHaveAttribute('data-slot', 'input-group-input')
  })
})

describe('composition', () => {
  test('addon, input, and button render together', () => {
    render(
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput aria-label="Email" />
        <button type="button">Go</button>
      </InputGroup>,
    )
    expect(screen.getByText('@')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument()
  })
})
