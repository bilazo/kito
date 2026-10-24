import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Textarea } from './textarea'

describe('Textarea', () => {
  test('renders as a <textarea> with data-slot and default size', () => {
    render(<Textarea aria-label="Message" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveAttribute('data-slot', 'textarea')
    expect(textarea).toHaveAttribute('data-size', 'md')
  })

  describe('sizes', () => {
    test.each([
      ['sm', 'min-h-16'],
      ['md', 'min-h-20'],
      ['lg', 'min-h-24'],
    ] as const)('size=%s applies %s', (size, expectedClass) => {
      render(<Textarea size={size} aria-label="Message" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass(expectedClass)
      expect(textarea).toHaveAttribute('data-size', size)
    })

    test('the shared input control height is overridden', () => {
      render(<Textarea aria-label="Message" />)
      const textarea = screen.getByRole('textbox')
      // h-auto wins over the h-(--control-md) inherited from inputStyles.
      expect(textarea).toHaveClass('h-auto')
      expect(textarea.className).not.toContain('h-(--control-md)')
    })

    test('lg uses text-base without the touch override', () => {
      render(<Textarea size="lg" aria-label="Message" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('text-base')
      expect(textarea.className).not.toContain('pointer-coarse:text-base')
    })
  })

  describe('autoResize', () => {
    test('default is resize-y with no field-sizing', () => {
      render(<Textarea aria-label="Message" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('resize-y')
      expect(textarea.className).not.toContain('field-sizing-content')
    })

    test('autoResize adds field-sizing-content and disables manual resize', () => {
      render(<Textarea autoResize aria-label="Message" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass('field-sizing-content', 'resize-none', 'max-h-80')
      expect(textarea).toHaveAttribute('data-autoresize', 'true')
    })
  })

  test('rows attribute is forwarded', () => {
    render(<Textarea rows={5} aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })

  test('default rows is 3', () => {
    render(<Textarea aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3')
  })

  describe('direction', () => {
    test('defaults to dir=auto', () => {
      render(<Textarea aria-label="Message" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('dir', 'auto')
    })

    test('explicit dir overrides the default', () => {
      render(<Textarea dir="rtl" aria-label="Message" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('dir', 'rtl')
    })
  })

  test('disabled is forwarded', () => {
    render(<Textarea disabled aria-label="Message" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  test('readOnly is forwarded', () => {
    render(<Textarea readOnly defaultValue="Read only" aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  test('aria-invalid is forwarded and styled', () => {
    render(<Textarea aria-invalid aria-label="Message" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea.className).toContain('aria-invalid:border-destructive')
  })

  test('data-invalid (from a future Field) is styled', () => {
    render(<Textarea data-invalid aria-label="Message" />)
    expect(screen.getByRole('textbox').className).toContain('data-invalid:border-destructive')
  })

  test('accepts typed input', async () => {
    render(<Textarea aria-label="Message" />)
    const textarea = screen.getByRole('textbox')
    await userEvent.type(textarea, 'Hello world')
    expect(textarea).toHaveValue('Hello world')
  })

  test('merges custom className', () => {
    render(<Textarea className="custom-class" aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  test('forwards native attributes', () => {
    render(
      <Textarea id="my-id" placeholder="Write something…" maxLength={500} aria-label="Message" />,
    )
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('id', 'my-id')
    expect(textarea).toHaveAttribute('placeholder', 'Write something…')
    expect(textarea).toHaveAttribute('maxlength', '500')
  })

  test('works with Label via htmlFor/id', () => {
    render(
      <>
        <label htmlFor="message">Message</label>
        <Textarea id="message" />
      </>,
    )
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  test('onValueChange fires with the current value', async () => {
    const onValueChange = vi.fn()
    render(<Textarea onValueChange={onValueChange} aria-label="Message" />)
    await userEvent.type(screen.getByRole('textbox'), 'hi')
    expect(onValueChange).toHaveBeenCalled()
  })
})
