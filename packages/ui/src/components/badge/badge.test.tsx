import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Badge } from './badge'

describe('Badge', () => {
  test('renders with data-slot and forwards children', () => {
    render(<Badge data-testid="badge">Active</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-slot', 'badge')
    expect(badge).toHaveTextContent('Active')
    expect(badge.tagName).toBe('SPAN')
  })

  test('defaults to secondary variant and md size', () => {
    render(<Badge data-testid="badge">Active</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground')
    expect(badge).toHaveClass('h-5', 'px-2', 'text-xs')
  })

  describe('variants', () => {
    test.each([
      ['primary', 'bg-primary'],
      ['secondary', 'bg-secondary'],
      ['soft', 'bg-primary-soft'],
      ['outline', 'border-input'],
      ['destructive', 'bg-destructive'],
      ['highlight', 'bg-highlight'],
    ] as const)('variant=%s applies %s', (variant, expectedClass) => {
      render(
        <Badge variant={variant} data-testid="badge">
          Badge
        </Badge>,
      )
      expect(screen.getByTestId('badge')).toHaveClass(expectedClass)
    })
  })

  describe('sizes', () => {
    test('size=sm is compact', () => {
      render(
        <Badge size="sm" data-testid="badge">
          Badge
        </Badge>,
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('h-4', 'px-1.5')
    })

    test('size=md is default', () => {
      render(
        <Badge size="md" data-testid="badge">
          Badge
        </Badge>,
      )
      expect(screen.getByTestId('badge')).toHaveClass('h-5', 'px-2', 'text-xs')
    })
  })

  test('merges custom className', () => {
    render(
      <Badge className="custom-class" data-testid="badge">
        Badge
      </Badge>,
    )
    expect(screen.getByTestId('badge')).toHaveClass('custom-class')
  })

  test('render prop renders as anchor', () => {
    render(
      <Badge render={<a href="/tags/react" aria-label="React" />} data-testid="badge">
        React
      </Badge>,
    )
    const link = screen.getByRole('link', { name: 'React' })
    expect(link).toHaveAttribute('href', '/tags/react')
    expect(link).toHaveAttribute('data-slot', 'badge')
  })

  test('forwards native attributes', () => {
    render(
      <Badge id="my-badge" title="Status" data-testid="badge">
        Active
      </Badge>,
    )
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('id', 'my-badge')
    expect(badge).toHaveAttribute('title', 'Status')
  })
})
