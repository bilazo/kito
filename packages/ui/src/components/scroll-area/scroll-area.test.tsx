import { render, screen, waitFor } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { ScrollArea, ScrollBar } from './scroll-area'

// jsdom has no layout engine, so scrollHeight/clientHeight default to 0 and
// Base UI's ScrollArea decides there is no overflow — skipping Scrollbar
// and Corner entirely. Force a fixed overflow so those subcomponents mount.
const originals = {
  scrollHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight'),
  clientHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight'),
  scrollWidth: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth'),
  clientWidth: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth'),
}

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return 1000
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    get() {
      return 100
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get() {
      return 1000
    },
  })
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
      return 100
    },
  })
})

afterAll(() => {
  if (originals.scrollHeight)
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', originals.scrollHeight)
  if (originals.clientHeight)
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', originals.clientHeight)
  if (originals.scrollWidth)
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', originals.scrollWidth)
  if (originals.clientWidth)
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', originals.clientWidth)
})

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

  test('renders a vertical scrollbar by default', async () => {
    render(<ScrollArea />)
    const scrollbar = await waitFor(() => {
      const el = document.querySelector('[data-slot="scroll-area-scrollbar"]')
      expect(el).toBeInTheDocument()
      return el as HTMLElement
    })
    expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
  })

  test('renders a thumb inside the scrollbar', async () => {
    render(<ScrollArea />)
    const thumb = await waitFor(() => {
      const el = document.querySelector('[data-slot="scroll-area-thumb"]')
      expect(el).toBeInTheDocument()
      return el
    })
    expect(thumb).toBeInTheDocument()
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
  test('vertical scrollbar uses the vertical layout classes', async () => {
    render(
      <ScrollArea>
        <ScrollBar data-testid="scrollbar" orientation="vertical" />
      </ScrollArea>,
    )
    const scrollbar = await screen.findByTestId('scrollbar')
    expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
    expect(scrollbar.className).toContain('data-[orientation=vertical]:w-2.5')
    expect(scrollbar.className).toContain('data-[orientation=vertical]:h-full')
  })

  test('horizontal scrollbar uses the horizontal layout classes', async () => {
    render(
      <ScrollArea>
        <ScrollBar data-testid="scrollbar" orientation="horizontal" />
      </ScrollArea>,
    )
    const scrollbar = await screen.findByTestId('scrollbar')
    expect(scrollbar).toHaveAttribute('data-orientation', 'horizontal')
    expect(scrollbar.className).toContain('data-[orientation=horizontal]:h-2.5')
    expect(scrollbar.className).toContain('data-[orientation=horizontal]:flex-col')
  })

  test('merges custom className', async () => {
    render(
      <ScrollArea>
        <ScrollBar className="custom-scrollbar" data-testid="scrollbar" />
      </ScrollArea>,
    )
    expect(await screen.findByTestId('scrollbar')).toHaveClass('custom-scrollbar')
  })

  test('renders a thumb', async () => {
    render(
      <ScrollArea>
        <ScrollBar data-testid="scrollbar" />
      </ScrollArea>,
    )
    const scrollbar = await screen.findByTestId('scrollbar')
    const thumb = scrollbar.querySelector('[data-slot="scroll-area-thumb"]')
    expect(thumb).toBeInTheDocument()
  })
})
