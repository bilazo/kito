import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

// Base UI’s OTP slots are real `<input>` elements with a `data-slot` we set
// ourselves. Querying by `data-slot` is more robust than by role — it works
// regardless of whether Base UI renders `type="text"` or `type="tel"`.
function getSlots(): HTMLInputElement[] {
  return Array.from(document.querySelectorAll<HTMLInputElement>('[data-slot="input-otp-slot"]'))
}

describe('InputOTP', () => {
  test('renders length slots when no children are given', () => {
    render(<InputOTP length={6} />)
    expect(getSlots()).toHaveLength(6)
  })

  test('forwards the root data-slot', () => {
    render(<InputOTP length={6} />)
    expect(document.querySelector('[data-slot="input-otp"]')).toBeInTheDocument()
  })

  test('shows defaultValue across the slots', () => {
    render(<InputOTP length={6} defaultValue="123456" />)
    const slots = getSlots()
    expect(slots[0]?.value).toBe('1')
    expect(slots[3]?.value).toBe('4')
    expect(slots[5]?.value).toBe('6')
  })

  test('clamps a pasted value to length', async () => {
    const onValueChange = vi.fn()
    render(<InputOTP length={3} onValueChange={onValueChange} />)
    const slots = getSlots()
    // Paste is the canonical path for OTPs (copy from SMS, paste from email).
    // `type` on a length-N field advances focus slot by slot — the behavior
    // depends on how the runtime handles focus-advance on a full slot, so it
    // is not the right channel to test the `length` clamp.
    await userEvent.click(slots[0]!)
    await userEvent.paste('123456')
    expect(onValueChange).toHaveBeenLastCalledWith('123', expect.anything())
  })

  test('onValueChange fires with the accumulated value', async () => {
    const onValueChange = vi.fn()
    render(<InputOTP length={3} onValueChange={onValueChange} />)
    const slots = getSlots()
    await userEvent.type(slots[0]!, '123')
    expect(onValueChange).toHaveBeenLastCalledWith('123', expect.anything())
  })

  test('onValueComplete fires when all slots are filled', async () => {
    const onComplete = vi.fn()
    render(<InputOTP length={3} onValueComplete={onComplete} />)
    const slots = getSlots()
    await userEvent.type(slots[0]!, '123')
    expect(onComplete).toHaveBeenCalled()
    expect(onComplete).toHaveBeenLastCalledWith('123', expect.anything())
  })

  test('validationType="numeric" rejects letters', async () => {
    const onValueChange = vi.fn()
    render(<InputOTP length={4} validationType="numeric" onValueChange={onValueChange} />)
    const slots = getSlots()
    await userEvent.type(slots[0]!, 'a1b2')
    // The last `onValueChange` carries a numeric-only value — letters were
    // filtered out by `validationType="numeric"`.
    expect(onValueChange).toHaveBeenLastCalledWith(
      expect.stringMatching(/^\d+$/u),
      expect.anything(),
    )
  })

  test('validationType="alphanumeric" accepts letters', async () => {
    const onValueChange = vi.fn()
    render(<InputOTP length={4} validationType="alphanumeric" onValueChange={onValueChange} />)
    const slots = getSlots()
    await userEvent.type(slots[0]!, 'A7B2')
    expect(onValueChange).toHaveBeenLastCalledWith('A7B2', expect.anything())
  })

  test('disabled prevents typing and applies data-disabled on the root', async () => {
    render(<InputOTP length={3} disabled />)
    const slots = getSlots()
    await userEvent.type(slots[0]!, '123')
    expect(slots[0]?.value).toBe('')
    expect(document.querySelector('[data-slot="input-otp"]')).toHaveAttribute('data-disabled')
  })

  test('auto-labels slots 2..N with position hints', () => {
    render(<InputOTP length={6} />)
    const slots = getSlots()
    // Slot 0 has no aria-label (inherits the field's label via root id).
    expect(slots[0]).not.toHaveAttribute('aria-label')
    // Subsequent slots announce their position.
    expect(slots[1]).toHaveAttribute('aria-label', 'Character 2 of 6')
    expect(slots[5]).toHaveAttribute('aria-label', 'Character 6 of 6')
  })

  test('merges custom className on the root', () => {
    render(<InputOTP length={3} className="custom-class" />)
    expect(document.querySelector('[data-slot="input-otp"]')).toHaveClass('custom-class')
  })

  test('controlled value drives the slots', () => {
    render(<InputOTP length={3} value="789" />)
    const slots = getSlots()
    expect(slots[0]?.value).toBe('7')
    expect(slots[1]?.value).toBe('8')
    expect(slots[2]?.value).toBe('9')
  })
})

describe('InputOTPGroup', () => {
  test('auto-renders slots when count is provided', () => {
    render(
      <InputOTP length={6}>
        <InputOTPGroup count={3} />
        <InputOTPSeparator />
        <InputOTPGroup count={3} />
      </InputOTP>,
    )
    expect(getSlots()).toHaveLength(6)
    expect(document.querySelectorAll('[data-slot="input-otp-group"]')).toHaveLength(2)
    expect(document.querySelector('[data-slot="input-otp-separator"]')).toBeInTheDocument()
  })

  test('renders explicit InputOTPSlot children', () => {
    render(
      <InputOTP length={3}>
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>,
    )
    expect(getSlots()).toHaveLength(3)
  })

  test('merges custom className', () => {
    render(
      <InputOTP length={3}>
        <InputOTPGroup className="custom-group" count={3} />
      </InputOTP>,
    )
    expect(document.querySelector('[data-slot="input-otp-group"]')).toHaveClass('custom-group')
  })
})

describe('InputOTPSlot', () => {
  test('renders with data-slot', () => {
    render(
      <InputOTP length={1}>
        <InputOTPSlot />
      </InputOTP>,
    )
    expect(getSlots()[0]).toHaveAttribute('data-slot', 'input-otp-slot')
  })

  test('size="sm" applies the smaller slot size', () => {
    render(
      <InputOTP length={1}>
        <InputOTPSlot size="sm" />
      </InputOTP>,
    )
    expect(getSlots()[0]?.className).toContain('size-8')
  })

  test('size="lg" applies the larger slot size', () => {
    render(
      <InputOTP length={1}>
        <InputOTPSlot size="lg" />
      </InputOTP>,
    )
    expect(getSlots()[0]?.className).toContain('size-12')
  })

  test('aria-invalid on individual slots carries the destructive contract', () => {
    render(
      <InputOTP length={3}>
        <InputOTPSlot aria-invalid />
        <InputOTPSlot />
        <InputOTPSlot />
      </InputOTP>,
    )
    const slots = getSlots()
    expect(slots[0]).toHaveAttribute('aria-invalid', 'true')
    expect(slots[0]?.className).toContain('aria-invalid:border-destructive')
    expect(slots[1]).not.toHaveAttribute('aria-invalid')
  })

  test('merges custom className', () => {
    render(
      <InputOTP length={1}>
        <InputOTPSlot className="custom-slot" />
      </InputOTP>,
    )
    expect(getSlots()[0]).toHaveClass('custom-slot')
  })
})

describe('InputOTPSeparator', () => {
  test('renders with data-slot and aria-hidden', () => {
    render(
      <InputOTP length={6}>
        <InputOTPGroup count={3} />
        <InputOTPSeparator data-testid="sep" />
        <InputOTPGroup count={3} />
      </InputOTP>,
    )
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-slot', 'input-otp-separator')
    expect(sep).toHaveAttribute('aria-hidden')
    expect(sep.querySelector('svg')).toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(
      <InputOTP length={6}>
        <InputOTPGroup count={3} />
        <InputOTPSeparator className="mx-2" data-testid="sep" />
        <InputOTPGroup count={3} />
      </InputOTP>,
    )
    expect(screen.getByTestId('sep')).toHaveClass('mx-2')
  })
})

describe('composition', () => {
  test('full manual composition with groups and separator', () => {
    render(
      <InputOTP length={6} defaultValue="123456">
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>,
    )
    const slots = getSlots()
    expect(slots).toHaveLength(6)
    expect(slots[0]?.value).toBe('1')
    expect(slots[5]?.value).toBe('6')
  })
})
