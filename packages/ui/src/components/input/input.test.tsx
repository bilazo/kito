import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  test('renders with data-slot', () => {
    render(<Input aria-label="Name" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('data-slot', 'input')
    expect(input.tagName).toBe('INPUT')
  })

  describe('sizes', () => {
    test('defaults to md', () => {
      render(<Input aria-label="Name" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('data-size', 'md')
      expect(input).toHaveClass('h-(--control-md)')
    })

    test.each([
      ['sm', 'h-(--control-sm)'],
      ['md', 'h-(--control-md)'],
      ['lg', 'h-(--control-lg)'],
    ] as const)('size=%s applies %s', (size, expectedClass) => {
      render(<Input size={size} aria-label="Name" />)
      expect(screen.getByRole('textbox')).toHaveClass(expectedClass)
    })

    test('lg uses text-base and does not need pointer-coarse override', () => {
      render(<Input size="lg" aria-label="Name" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-base')
      expect(input.className).not.toContain('pointer-coarse:text-base')
    })

    test('sm and md bump to text-base on touch devices', () => {
      render(<Input size="md" aria-label="Name" />)
      expect(screen.getByRole('textbox').className).toContain('pointer-coarse:text-base')
    })
  })

  describe('direction', () => {
    test.each(['email', 'url', 'tel', 'password', 'number'] as const)(
      'type=%s forces dir=ltr',
      (type) => {
        render(<Input type={type} aria-label={type} />)
        const input = document.querySelector('input')!
        expect(input).toHaveAttribute('dir', 'ltr')
      },
    )

    test('text (default) uses dir=auto', () => {
      render(<Input aria-label="Name" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('dir', 'auto')
    })

    test('explicit dir overrides the type-based default', () => {
      render(<Input type="email" dir="auto" aria-label="Email" />)
      const input = document.querySelector('input')!
      expect(input).toHaveAttribute('dir', 'auto')
    })
  })

  test('accepts typed input', async () => {
    render(<Input aria-label="Name" />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })

  test('disabled applies the disabled attribute and classes', () => {
    render(<Input disabled aria-label="Name" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  test('readOnly is forwarded', () => {
    render(<Input readOnly defaultValue="Read only" aria-label="Name" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  test('aria-invalid is forwarded and styled', () => {
    render(<Input aria-invalid aria-label="Email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input.className).toContain('aria-invalid:border-destructive')
  })

  test('data-invalid (from a future Field) is styled', () => {
    render(<Input data-invalid aria-label="Email" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('data-invalid:border-destructive')
  })

  test('search input hides webkit chrome', () => {
    render(<Input type="search" aria-label="Search" />)
    const input = screen.getByRole('searchbox')
    expect(input.className).toContain('[&::-webkit-search-cancel-button]:appearance-none')
  })

  test('merges custom className', () => {
    render(<Input className="custom-class" aria-label="Name" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  test('forwards native attributes', () => {
    render(
      <Input id="my-id" placeholder="you@example.com" autoComplete="email" aria-label="Email" />,
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'my-id')
    expect(input).toHaveAttribute('placeholder', 'you@example.com')
    expect(input).toHaveAttribute('autocomplete', 'email')
  })

  test('works with Label via htmlFor/id', () => {
    render(
      <>
        <label htmlFor="email-field">Email</label>
        <Input id="email-field" type="email" />
      </>,
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
})
