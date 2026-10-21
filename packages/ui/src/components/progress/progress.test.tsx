import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from './progress'

describe('Progress', () => {
  test('renders a progressbar with data-slot', () => {
    render(<Progress value={50} aria-label="Loading" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('data-slot', 'progress')
  })

  test('exposes value via aria-valuenow', () => {
    render(<Progress value={57} aria-label="Progress" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '57')
  })

  test('renders the track and indicator by default', () => {
    render(<Progress value={50} aria-label="Loading" />)
    expect(document.querySelector('[data-slot="progress-track"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="progress-indicator"]')).toBeInTheDocument()
  })

  test('children render above the track', () => {
    render(
      <Progress value={50}>
        <span data-testid="custom">Custom content</span>
      </Progress>,
    )
    const progress = screen.getByTestId('custom').parentElement!
    expect(progress).toHaveAttribute('data-slot', 'progress')
  })

  describe('variants', () => {
    test('primary uses secondary track and primary fill', () => {
      render(<Progress value={50} variant="primary" aria-label="p" />)
      const track = document.querySelector('[data-slot="progress-track"]')!
      const indicator = document.querySelector('[data-slot="progress-indicator"]')!
      expect(track).toHaveClass('bg-secondary')
      expect(indicator).toHaveClass('bg-primary')
    })

    test('highlight uses highlight track and highlight-foreground fill', () => {
      render(<Progress value={50} variant="highlight" aria-label="h" />)
      const track = document.querySelector('[data-slot="progress-track"]')!
      const indicator = document.querySelector('[data-slot="progress-indicator"]')!
      expect(track).toHaveClass('bg-highlight')
      expect(indicator).toHaveClass('bg-highlight-foreground')
    })
  })

  describe('sizes', () => {
    test.each([
      ['sm', 'h-1.5'],
      ['md', 'h-2'],
      ['lg', 'h-3'],
    ] as const)('size=%s applies %s', (size, expectedClass) => {
      render(<Progress value={50} size={size} aria-label="p" />)
      const track = document.querySelector('[data-slot="progress-track"]')!
      expect(track).toHaveClass(expectedClass)
    })
  })

  test('indeterminate when value is null', () => {
    render(<Progress value={null} aria-label="Loading" />)
    const indicator = document.querySelector('[data-slot="progress-indicator"]')
    // Base UI sets data-indeterminate on the indicator when value is null.
    expect(indicator).toHaveAttribute('data-indeterminate')
  })

  test('merges custom className', () => {
    render(<Progress value={50} className="custom-class" aria-label="p" />)
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class')
  })
})

describe('ProgressLabel', () => {
  test('renders with data-slot and label styling', () => {
    render(
      <Progress value={50}>
        <ProgressLabel data-testid="label">Weekly</ProgressLabel>
      </Progress>,
    )
    const label = screen.getByTestId('label')
    expect(label).toHaveAttribute('data-slot', 'progress-label')
    expect(label).toHaveClass('text-sm', 'font-medium')
  })

  test('becomes the accessible name of the progress bar', () => {
    render(
      <Progress value={50}>
        <ProgressLabel>Weekly progress</ProgressLabel>
      </Progress>,
    )
    expect(screen.getByRole('progressbar', { name: 'Weekly progress' })).toBeInTheDocument()
  })
})

describe('ProgressValue', () => {
  test('renders numeric value with data-slot', () => {
    render(
      <Progress value={57}>
        <ProgressValue data-testid="value" />
      </Progress>,
    )
    const value = screen.getByTestId('value')
    expect(value).toHaveAttribute('data-slot', 'progress-value')
    expect(value).toHaveClass('tabular-nums')
    expect(value).toHaveTextContent('57%')
  })
})

describe('composition', () => {
  test('label and value render together', () => {
    render(
      <Progress value={57}>
        <div>
          <ProgressLabel>Progress</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>,
    )
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('57%')).toBeInTheDocument()
  })
})

describe('exported subcomponents', () => {
  test('progressTrack and ProgressIndicator can be used standalone', () => {
    render(
      <Progress value={50} aria-label="p">
        <ProgressTrack data-testid="custom-track">
          <ProgressIndicator data-testid="custom-indicator" />
        </ProgressTrack>
      </Progress>,
    )
    expect(screen.getByTestId('custom-track')).toHaveAttribute('data-slot', 'progress-track')
    expect(screen.getByTestId('custom-indicator')).toHaveAttribute(
      'data-slot',
      'progress-indicator',
    )
  })
})
