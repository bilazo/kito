import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Label } from '../label/label'
import { Switch } from './switch'

describe('Switch', () => {
  test('renders with role=switch and data-slot', () => {
    render(<Switch aria-label="Notifications" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('data-slot', 'switch')
    expect(sw).toHaveAttribute('data-size', 'md')
    expect(sw).toHaveAttribute('data-unchecked')
  })

  describe('sizes', () => {
    test('md is the default: h-6 w-11', () => {
      render(<Switch aria-label="Notifications" />)
      const sw = screen.getByRole('switch')
      expect(sw).toHaveClass('h-6', 'w-11')
    })

    test('sm is h-5 w-9', () => {
      render(<Switch size="sm" aria-label="Notifications" />)
      const sw = screen.getByRole('switch')
      expect(sw).toHaveClass('h-5', 'w-9')
      expect(sw).toHaveAttribute('data-size', 'sm')
    })
  })

  test('clicking toggles the checked state', async () => {
    render(<Switch aria-label="Notifications" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('data-unchecked')
    await userEvent.click(sw)
    expect(sw).toHaveAttribute('data-checked')
  })

  test('defaultChecked renders in the checked state', () => {
    render(<Switch defaultChecked aria-label="Notifications" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('data-checked')
    expect(sw).not.toHaveAttribute('data-unchecked')
  })

  test('onCheckedChange fires with the new value', async () => {
    const onChange = vi.fn()
    render(<Switch onCheckedChange={onChange} aria-label="Notifications" />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true, expect.anything())
  })

  test('thumb uses logical inset-inline-start for RTL support', () => {
    render(<Switch aria-label="Notifications" />)
    const thumb = document.querySelector('[data-slot="switch-thumb"]')!
    expect(thumb.className).toContain('inset-s-0.5')
    expect(thumb.className).toContain('data-checked:inset-s-')
    // Should NOT use physical `translate-x` for the checked position.
    expect(thumb.className).not.toContain('data-checked:translate-x')
  })

  test('disabled prevents interaction', async () => {
    const onChange = vi.fn()
    render(<Switch disabled onCheckedChange={onChange} aria-label="Notifications" />)
    const sw = screen.getByRole('switch')
    await userEvent.click(sw)
    expect(onChange).not.toHaveBeenCalled()
  })

  test('aria-invalid is forwarded and styled', () => {
    render(<Switch aria-invalid aria-label="Notifications" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('aria-invalid', 'true')
    expect(sw.className).toContain('data-invalid:outline-destructive')
  })

  test('merges custom className', () => {
    render(<Switch className="custom-class" aria-label="Notifications" />)
    expect(screen.getByRole('switch')).toHaveClass('custom-class')
  })

  test('custom children replace the default thumb', () => {
    render(
      <Switch aria-label="Notifications">
        <svg data-testid="custom-thumb" />
      </Switch>,
    )
    // Base UI does not unmount the thumb in either state (unlike Checkbox's
    // indicator), so the custom child is always present.
    expect(screen.getByTestId('custom-thumb')).toBeInTheDocument()
  })

  test('works with Label via htmlFor/id', async () => {
    render(
      <div className="gap-2 flex items-center">
        <Switch id="notif" />
        <Label htmlFor="notif">Email notifications</Label>
      </div>,
    )
    const sw = screen.getByRole('switch', { name: 'Email notifications' })
    await userEvent.click(screen.getByText('Email notifications'))
    expect(sw).toHaveAttribute('data-checked')
  })
})
