import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, test } from 'vitest'

import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  test('renders as a div with data-slot', () => {
    render(<Skeleton data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.tagName).toBe('DIV')
    expect(el).toHaveAttribute('data-slot', 'skeleton')
  })

  test('defaults to the pulse variant', () => {
    render(<Skeleton data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveAttribute('data-variant', 'pulse')
    expect(el).toHaveClass('animate-pulse', 'bg-muted', 'rounded-md')
  })

  test('pulse respects reduced motion', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('motion-reduce:animate-none')
  })

  describe('shimmer variant', () => {
    test('is tagged with data-variant="shimmer"', () => {
      render(<Skeleton variant="shimmer" data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'shimmer')
    })

    test('uses the shimmer animation on the before pseudo-element', () => {
      render(<Skeleton variant="shimmer" data-testid="skeleton" />)
      const el = screen.getByTestId('skeleton')
      expect(el).toHaveClass(
        'before:animate-shimmer',
        'before:bg-[linear-gradient(90deg,transparent_20%,var(--skeleton-shimmer)_50%,transparent_80%)]',
      )
    })

    test('does not use animate-pulse', () => {
      render(<Skeleton variant="shimmer" data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).not.toHaveClass('animate-pulse')
    })

    test('shimmer respects reduced motion', () => {
      render(<Skeleton variant="shimmer" data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).toHaveClass('motion-reduce:before:animate-none')
    })

    test('is position-relative and overflow-hidden to clip the shimmer', () => {
      render(<Skeleton variant="shimmer" data-testid="skeleton" />)
      const el = screen.getByTestId('skeleton')
      expect(el).toHaveClass('relative', 'overflow-hidden')
    })
  })

  test('is aria-hidden by default', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden')
  })

  test('aria-hidden can be overridden', () => {
    render(<Skeleton aria-hidden={false} data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'false')
  })

  test('merges custom className for sizing', () => {
    render(<Skeleton className="h-4 w-32" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveClass('h-4', 'w-32', 'animate-pulse', 'bg-muted')
  })

  test('custom rounded-full for avatar shape', () => {
    render(<Skeleton className="size-(--control-md) rounded-full" data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('size-(--control-md)', 'rounded-full')
  })

  test('forwards native attributes', () => {
    render(<Skeleton id="loader" data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('id', 'loader')
  })

  test('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Skeleton ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-slot', 'skeleton')
  })

  test('explicit variant="pulse" matches the default behavior', () => {
    render(<Skeleton variant="pulse" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveAttribute('data-variant', 'pulse')
    expect(el).toHaveClass('animate-pulse', 'bg-muted', 'rounded-md')
    expect(el).not.toHaveClass('before:animate-shimmer')
  })
})
