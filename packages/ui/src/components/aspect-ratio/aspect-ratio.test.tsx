import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { AspectRatio } from './aspect-ratio'

describe('AspectRatio', () => {
  test('renders a div with data-slot', () => {
    render(<AspectRatio ratio={16 / 9} data-testid="ratio" />)
    const el = screen.getByTestId('ratio')
    expect(el.tagName).toBe('DIV')
    expect(el).toHaveAttribute('data-slot', 'aspect-ratio')
  })

  test('writes the ratio to a --ratio custom property', () => {
    render(<AspectRatio ratio={16 / 9} data-testid="ratio" />)
    const el = screen.getByTestId('ratio')
    expect(el.style.getPropertyValue('--ratio')).toBe(String(16 / 9))
  })

  test('applies the aspect-(--ratio) utility', () => {
    render(<AspectRatio ratio={1} data-testid="ratio" />)
    expect(screen.getByTestId('ratio')).toHaveClass('aspect-(--ratio)')
  })

  test('is position-relative so children can be absolutely positioned', () => {
    render(<AspectRatio ratio={1} data-testid="ratio" />)
    expect(screen.getByTestId('ratio')).toHaveClass('relative')
  })

  test('renders children', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img alt="preview" src="data:image/gif;base64,R0lGOD" />
      </AspectRatio>,
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<AspectRatio ratio={1} className="custom-class" data-testid="ratio" />)
    expect(screen.getByTestId('ratio')).toHaveClass('custom-class')
  })

  test('accepts a --ratio override via style', () => {
    render(<AspectRatio ratio={1} style={{ ['--ratio' as string]: 4 / 3 }} data-testid="ratio" />)
    const el = screen.getByTestId('ratio')
    // Consumer style wins over the prop.
    expect(el.style.getPropertyValue('--ratio')).toBe(String(4 / 3))
  })

  test('forwards native attributes', () => {
    render(<AspectRatio ratio={1} id="preview" data-testid="ratio" />)
    expect(screen.getByTestId('ratio')).toHaveAttribute('id', 'preview')
  })
})
