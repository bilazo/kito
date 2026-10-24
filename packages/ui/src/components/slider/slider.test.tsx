import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Slider } from './slider'

// The visual root is `[data-slot="slider"]`. `role="slider"` is on the hidden
// `<input type="range">` inside each thumb, so it does not carry the visual
// classes — those live on the sibling `<div data-slot="slider-thumb">`.
function getRoot() {
  return document.querySelector('[data-slot="slider"]') as HTMLElement
}
function getTrack() {
  return document.querySelector('[data-slot="slider-track"]') as HTMLElement
}
function getThumb(index = 0) {
  return document.querySelectorAll('[data-slot="slider-thumb"]')[index] as HTMLElement
}
function getThumbInput(index = 0) {
  return screen.getAllByRole('slider')[index] as HTMLInputElement
}

describe('Slider', () => {
  test('renders with data-slot and default size', () => {
    render(<Slider aria-label="Volume" data-testid="slider" />)
    const slider = screen.getByTestId('slider')
    expect(slider).toHaveAttribute('data-slot', 'slider')
    expect(slider).toHaveAttribute('data-size', 'md')
  })

  test('renders a single thumb by default', () => {
    render(<Slider defaultValue={50} aria-label="Volume" />)
    expect(screen.getAllByRole('slider')).toHaveLength(1)
    expect(document.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(1)
  })

  test('renders two thumbs for an array defaultValue', () => {
    render(<Slider defaultValue={[25, 75]} aria-label="Range" />)
    expect(screen.getAllByRole('slider')).toHaveLength(2)
  })

  test('renders three thumbs for a three-value defaultValue', () => {
    render(<Slider defaultValue={[10, 50, 90]} aria-label="Triple" />)
    expect(screen.getAllByRole('slider')).toHaveLength(3)
  })

  test('renders a single thumb when value is a number', () => {
    render(<Slider value={30} aria-label="Volume" />)
    expect(screen.getAllByRole('slider')).toHaveLength(1)
  })

  describe('sizes', () => {
    test.each([
      ['sm', '[--slider-track-h:0.25rem]', 'size-3'],
      ['md', '[--slider-track-h:0.375rem]', 'size-4'],
      ['lg', '[--slider-track-h:0.5rem]', 'size-5'],
    ] as const)('size=%s sets the track height token', (size, trackClass, thumbClass) => {
      render(<Slider size={size} aria-label="Volume" />)
      expect(getRoot()).toHaveAttribute('data-size', size)
      expect(getTrack()).toHaveClass(trackClass)
      expect(getThumb()).toHaveClass(thumbClass)
    })
  })

  test('exposes min and max via the range input', () => {
    render(<Slider min={10} max={50} defaultValue={30} aria-label="Volume" />)
    const input = getThumbInput()
    // Base UI renders a native range input, which uses the native `min` and
    // `max` attributes rather than `aria-valuemin`/`aria-valuemax`.
    expect(input).toHaveAttribute('min', '10')
    expect(input).toHaveAttribute('max', '50')
    expect(input).toHaveAttribute('aria-valuenow', '30')
  })

  test('disabled marks the root as disabled', () => {
    render(<Slider disabled aria-label="Volume" />)
    // Base UI sets `data-disabled` on the root; the CSS uses that to dim
    // and block interaction.
    expect(getRoot()).toHaveAttribute('data-disabled')
  })

  test('forwards onValueChange on keyboard interaction', async () => {
    const onValueChange = vi.fn()
    render(<Slider defaultValue={50} onValueChange={onValueChange} aria-label="Volume" />)
    const input = getThumbInput()
    input.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(onValueChange).toHaveBeenCalled()
  })

  test('merges custom className', () => {
    render(<Slider className="custom-class" aria-label="Volume" />)
    expect(getRoot()).toHaveClass('custom-class')
  })

  test('renders a track and an indicator inside the control', () => {
    render(<Slider defaultValue={50} aria-label="Volume" />)
    expect(getTrack()).toBeInTheDocument()
    expect(document.querySelector('[data-slot="slider-indicator"]')).toBeInTheDocument()
    expect(getThumb()).toBeInTheDocument()
  })
})
