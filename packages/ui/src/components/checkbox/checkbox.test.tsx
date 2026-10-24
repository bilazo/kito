import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Label } from '../label/label'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  test('renders with role=checkbox and data-slot', () => {
    render(<Checkbox aria-label="Accept" />)
    const box = screen.getByRole('checkbox')
    expect(box).toHaveAttribute('data-slot', 'checkbox')
    expect(box).toHaveAttribute('data-size', 'md')
    expect(box).toHaveAttribute('data-unchecked')
  })

  describe('sizes', () => {
    test('default md is 20px', () => {
      render(<Checkbox aria-label="Accept" />)
      expect(screen.getByRole('checkbox')).toHaveClass('size-5')
    })

    test('sm is 16px', () => {
      render(<Checkbox size="sm" aria-label="Accept" />)
      const box = screen.getByRole('checkbox')
      expect(box).toHaveClass('size-4')
      expect(box).toHaveAttribute('data-size', 'sm')
    })
  })

  test('clicking toggles the checked state', async () => {
    render(<Checkbox aria-label="Accept" />)
    const box = screen.getByRole('checkbox')
    expect(box).toHaveAttribute('data-unchecked')
    await userEvent.click(box)
    expect(box).toHaveAttribute('data-checked')
  })

  test('defaultChecked renders in the checked state', () => {
    render(<Checkbox defaultChecked aria-label="Accept" />)
    const box = screen.getByRole('checkbox')
    expect(box).toHaveAttribute('data-checked')
    expect(box).not.toHaveAttribute('data-unchecked')
  })

  test('onCheckedChange fires with the new value', async () => {
    const onChange = vi.fn()
    render(<Checkbox onCheckedChange={onChange} aria-label="Accept" />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true, expect.anything())
  })

  describe('indeterminate', () => {
    test('renders the minus icon and data-indeterminate', () => {
      render(<Checkbox indeterminate aria-label="Select all" />)
      const box = screen.getByRole('checkbox')
      expect(box).toHaveAttribute('data-indeterminate')
      // Base UI sets aria-checked="mixed" for indeterminate checkboxes.
      expect(box).toHaveAttribute('aria-checked', 'mixed')
    })
  })

  test('disabled prevents interaction', async () => {
    const onChange = vi.fn()
    render(<Checkbox disabled onCheckedChange={onChange} aria-label="Accept" />)
    const box = screen.getByRole('checkbox')
    await userEvent.click(box)
    expect(onChange).not.toHaveBeenCalled()
  })

  test('aria-invalid is forwarded and styled', () => {
    render(<Checkbox aria-invalid aria-label="Accept" />)
    const box = screen.getByRole('checkbox')
    expect(box).toHaveAttribute('aria-invalid', 'true')
    expect(box.className).toContain('data-invalid:border-destructive')
  })

  test('custom children replace the default icon', () => {
    render(
      <Checkbox defaultChecked aria-label="Accept">
        <svg data-testid="custom-icon" />
      </Checkbox>,
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  test('indicator is unmounted while unchecked', () => {
    render(
      <Checkbox aria-label="Accept">
        <svg data-testid="custom-icon" />
      </Checkbox>,
    )
    // Base UI unmounts the indicator until the checkbox is checked, so the
    // custom icon is not in the DOM. This is expected behaviour, not a bug.
    expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<Checkbox className="custom-class" aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class')
  })

  test('works with Label via htmlFor/id', async () => {
    render(
      <div className="gap-2 flex items-center">
        <Checkbox id="tos" />
        <Label htmlFor="tos">Accept terms</Label>
      </div>,
    )
    const box = screen.getByRole('checkbox', { name: 'Accept terms' })
    await userEvent.click(screen.getByText('Accept terms'))
    expect(box).toHaveAttribute('data-checked')
  })
})
