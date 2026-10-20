import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { DirectionProvider, useDirection } from './direction'

function DirectionReader() {
  const direction = useDirection()
  return <span data-testid="direction">{direction}</span>
}

describe('DirectionProvider', () => {
  test('renders its children', () => {
    render(
      <DirectionProvider direction="rtl">
        <span>content</span>
      </DirectionProvider>,
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  test('exposes rtl through useDirection', () => {
    render(
      <DirectionProvider direction="rtl">
        <DirectionReader />
      </DirectionProvider>,
    )
    expect(screen.getByTestId('direction')).toHaveTextContent('rtl')
  })

  test('exposes ltr through useDirection', () => {
    render(
      <DirectionProvider direction="ltr">
        <DirectionReader />
      </DirectionProvider>,
    )
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr')
  })

  test('a nested provider overrides its parent', () => {
    render(
      <DirectionProvider direction="rtl">
        <DirectionProvider direction="ltr">
          <DirectionReader />
        </DirectionProvider>
      </DirectionProvider>,
    )
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr')
  })

  test('useDirection still works outside a provider', () => {
    // Does not throw. Base UI falls back to the closest `dir` attribute or
    // a default value when no provider is present.
    render(<DirectionReader />)
    expect(screen.getByTestId('direction')).toBeInTheDocument()
  })
})
