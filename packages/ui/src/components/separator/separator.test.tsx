import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Separator } from './separator'

describe('Separator', () => {
  test('renders with data-slot and is decorative by default', () => {
    render(<Separator data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-slot', 'separator')
    expect(sep).toHaveAttribute('role', 'none')
  })

  test('defaults to horizontal solid', () => {
    render(<Separator data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-variant', 'solid')
    expect(sep).toHaveAttribute('aria-orientation', 'horizontal')
    expect(sep).toHaveClass('h-px', 'w-full', 'bg-border')
  })

  test('vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('aria-orientation', 'vertical')
    expect(sep).toHaveClass('w-px', 'self-stretch')
  })

  test('decorative=false exposes separator role to a11y', () => {
    render(<Separator decorative={false} data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).not.toHaveAttribute('role', 'none')
    expect(sep).toHaveAttribute('role', 'separator')
  })

  test('dashed variant renders with border, not background', () => {
    render(<Separator variant="dashed" data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-variant', 'dashed')
    expect(sep).toHaveClass('border-t', 'border-dashed', 'border-border')
    expect(sep).not.toHaveClass('bg-border')
  })

  test('dotted vertical variant', () => {
    render(<Separator variant="dotted" orientation="vertical" data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveClass('border-l', 'border-dotted')
  })

  test('merges custom className', () => {
    render(<Separator className="custom-class" data-testid="sep" />)
    expect(screen.getByTestId('sep')).toHaveClass('custom-class')
  })

  test('forwards native props', () => {
    render(<Separator id="my-id" data-custom="x" data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('id', 'my-id')
    expect(sep).toHaveAttribute('data-custom', 'x')
  })
})
