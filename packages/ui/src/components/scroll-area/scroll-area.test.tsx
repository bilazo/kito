import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ScrollArea, ScrollBar } from './scroll-area'

describe('ScrollArea', () => {
  test('renders the root with data-slot', () => {
    render(<ScrollArea data-testid="root" />)
    const root = screen.getByTestId('root')
    expect(root).toHaveAttribute('data-slot', 'scroll-area')
    expect(root).toHaveClass('relative')
  })

  test('renders the viewport with data-slot', () => {
    render(<ScrollArea />)
    expect(document.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument()
  })

  test('renders a vertical scrollbar by default', () => {
    render(<ScrollArea />)
    const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')
    expect(scrollbar).toBeInTheDocument()
    expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
  })

  test('renders a thumb inside the scrollbar', () => {
    render(<ScrollArea />)
    expect(document.querySelector('[data-slot="scroll-area-thumb"]')).toBeInTheDocument()
  })

  test('children render inside the viewport', () => {
    render(
      <ScrollArea>
        <div data-testid="content">content</div>
      </ScrollArea>,
    )
    const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!
    expect(viewport).toContainElement(screen.getByTestId('content'))
  })

  test('merges custom className on the root', () => {
    render(<ScrollArea className="custom-root" data-testid="root" />)
    expect(screen.getByTestId('root')).toHaveClass('custom-root')
  })

  test('forwards native attributes to the root', () => {
    render(<ScrollArea id="scroll-1" data-testid="root" />)
    expect(screen.getByTestId('root')).toHaveAttribute('id', 'scroll-1')
  })
})

describe('ScrollBar', () => {
  test('vertical scrollbar uses the vertical layout classes', () => {
    render(
      <ScrollArea>
        <ScrollBar data-testid="scrollbar" orientation="vertical" />
      </ScrollArea>,
    )
    const scrollbar = screen.getByTestId('scrollbar')
    expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
    expect(scrollbar.className).toContain('data-[orientation=vertical]:w-2.5')
    expect(scrollbar.className).toContain('data-[orientation=vertical]:h-full')
  })

  test('horizontal scrollbar uses the horizontal layout classes', () => {
    render(
      <ScrollArea>
        <ScrollBar data-testid="scrollbar" orientation="horizontal" />
      </ScrollArea>,
    )
    const scrollbar = screen.getByTestId('scrollbar')
    expect(scrollbar).toHaveAttribute('data-orientation', 'horizontal')
    expect(scrollbar.className).toContain('data-[orientation=horizontal]:h-2.5')
    expect(scrollbar.className).toContain('data-[orientation=horizontal]:flex-col')
  })

  test('merges custom className', () => {
    render(
      <ScrollArea>
        <ScrollBar className="custom-scrollbar" data-testid="scrollbar" />
      </ScrollArea>,
    )
    expect(screen.getByTestId('scrollbar')).toHaveClass('custom-scrollbar')
  })

  test('renders a thumb', () => {
    render(
      <ScrollArea>
        <ScrollBar data-testid="scrollbar" />
      </ScrollArea>,
    )
    const thumb = screen.getByTestId('scrollbar').querySelector('[data-slot="scroll-area-thumb"]')
    expect(thumb).toBeInTheDocument()
  })
})
