import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Label } from '../label/label'
import { Radio, RadioGroup } from './radio'

describe('RadioGroup', () => {
  test('renders with role=radiogroup and data-slot', () => {
    render(<RadioGroup aria-label="Level" data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-slot', 'radio-group')
    expect(group).toHaveAttribute('role', 'radiogroup')
  })

  test('defaults to vertical orientation and md size', () => {
    render(<RadioGroup aria-label="Level" data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group).toHaveAttribute('data-size', 'md')
    expect(group).toHaveClass('flex-col', 'gap-2')
  })

  test('horizontal orientation switches to a row', () => {
    render(<RadioGroup orientation="horizontal" aria-label="Level" data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
    expect(group).toHaveClass('flex-row', 'flex-wrap')
  })

  test('merges custom className', () => {
    render(<RadioGroup aria-label="Level" className="custom-class" data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveClass('custom-class')
  })
})

describe('Radio', () => {
  test('renders with role=radio and data-slot', () => {
    render(
      <RadioGroup aria-label="Level">
        <Radio value="a" aria-label="Option A" />
      </RadioGroup>,
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('data-slot', 'radio')
    expect(radio).toHaveAttribute('data-size', 'md')
    expect(radio).toHaveAttribute('data-unchecked')
  })

  test('clicking selects the radio', async () => {
    render(
      <RadioGroup aria-label="Level">
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    const [a, b] = screen.getAllByRole('radio')
    await userEvent.click(a!)
    expect(a).toHaveAttribute('data-checked')
    expect(b).toHaveAttribute('data-unchecked')
  })

  test('selecting one unselects the other', async () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Level">
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    const [a, b] = screen.getAllByRole('radio')
    expect(a).toHaveAttribute('data-checked')
    await userEvent.click(b!)
    expect(a).toHaveAttribute('data-unchecked')
    expect(b).toHaveAttribute('data-checked')
  })

  test('defaultValue selects the matching radio', () => {
    render(
      <RadioGroup defaultValue="b" aria-label="Level">
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    const [a, b] = screen.getAllByRole('radio')
    expect(a).toHaveAttribute('data-unchecked')
    expect(b).toHaveAttribute('data-checked')
  })

  test('onValueChange fires with the selected value', async () => {
    const onChange = vi.fn()
    render(
      <RadioGroup onValueChange={onChange} aria-label="Level">
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    await userEvent.click(screen.getAllByRole('radio')[1]!)
    expect(onChange).toHaveBeenCalledWith('b', expect.anything())
  })

  test('inherits size from the group', () => {
    render(
      <RadioGroup size="sm" aria-label="Level">
        <Radio value="a" aria-label="Option A" />
      </RadioGroup>,
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('data-size', 'sm')
    expect(radio).toHaveClass('size-4')
  })

  test('individual size overrides the group', () => {
    render(
      <RadioGroup size="sm" aria-label="Level">
        <Radio value="a" size="md" aria-label="Option A" />
      </RadioGroup>,
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('data-size', 'md')
    expect(radio).toHaveClass('size-5')
  })

  test('indicator uses logical positioning and no translate', () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Level">
        <Radio value="a" aria-label="Option A" />
      </RadioGroup>,
    )
    const indicator = document.querySelector('[data-slot="radio-indicator"]')!
    // No translate-based centering: Base UI's flex centering handles it, so
    // the indicator is direction-agnostic by construction.
    expect(indicator.className).not.toContain('translate')
  })

  test('disabled prevents interaction', async () => {
    const onChange = vi.fn()
    render(
      <RadioGroup onValueChange={onChange} aria-label="Level">
        <Radio value="a" disabled aria-label="Option A" />
      </RadioGroup>,
    )
    await userEvent.click(screen.getByRole('radio'))
    expect(onChange).not.toHaveBeenCalled()
  })

  test('aria-invalid is forwarded and styled', () => {
    render(
      <RadioGroup aria-label="Level">
        <Radio value="a" aria-invalid aria-label="Option A" />
      </RadioGroup>,
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveAttribute('aria-invalid', 'true')
    expect(radio.className).toContain('data-invalid:border-destructive')
  })

  test('merges custom className', () => {
    render(
      <RadioGroup aria-label="Level">
        <Radio value="a" className="custom-class" aria-label="Option A" />
      </RadioGroup>,
    )
    expect(screen.getByRole('radio')).toHaveClass('custom-class')
  })
})

describe('composition', () => {
  test('radio with Label via htmlFor/id', async () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Level">
        <div className="gap-2 flex items-center">
          <Radio value="a" id="r-a" />
          <Label htmlFor="r-a">Option A</Label>
        </div>
      </RadioGroup>,
    )
    const radio = screen.getByRole('radio', { name: 'Option A' })
    expect(radio).toHaveAttribute('data-checked')
  })

  test('arrow-key navigation moves selection', async () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Level">
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
        <Radio value="c" aria-label="Option C" />
      </RadioGroup>,
    )
    const [a, b, c] = screen.getAllByRole('radio')
    await userEvent.click(a!)
    expect(a).toHaveAttribute('data-checked')

    // ArrowDown moves to the next option and selects it (standard radio
    // group behaviour in Base UI).
    await userEvent.keyboard('{ArrowDown}')
    expect(b).toHaveAttribute('data-checked')

    await userEvent.keyboard('{ArrowDown}')
    expect(c).toHaveAttribute('data-checked')
  })

  test('three options render together', () => {
    render(
      <RadioGroup defaultValue="medium" aria-label="Level">
        <Radio value="beginner" id="r1" />
        <Radio value="medium" id="r2" />
        <Radio value="advanced" id="r3" />
      </RadioGroup>,
    )
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })
})
