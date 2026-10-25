import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Button } from '../button/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './item'

describe('Item', () => {
  test('renders as a div with data-slot, variant and size', () => {
    render(<Item data-testid="item" />)
    const item = screen.getByTestId('item')
    expect(item.tagName).toBe('DIV')
    expect(item).toHaveAttribute('data-slot', 'item')
    expect(item).toHaveAttribute('data-variant', 'default')
    expect(item).toHaveAttribute('data-size', 'default')
  })

  test('applies the variant classes', () => {
    const { rerender } = render(<Item data-testid="item" />)
    // default: transparent border
    expect(screen.getByTestId('item')).toHaveClass('border-transparent')

    rerender(<Item variant="outline" data-testid="item" />)
    expect(screen.getByTestId('item')).toHaveClass('border-border')

    rerender(<Item variant="muted" data-testid="item" />)
    expect(screen.getByTestId('item')).toHaveClass('bg-muted/50')
  })

  test('applies the size classes', () => {
    const { rerender } = render(<Item size="default" data-testid="item" />)
    expect(screen.getByTestId('item')).toHaveClass('gap-2.5', 'px-3', 'py-2.5')

    rerender(<Item size="sm" data-testid="item" />)
    expect(screen.getByTestId('item')).toHaveClass('gap-2', 'px-2.5', 'py-2')

    rerender(<Item size="xs" data-testid="item" />)
    expect(screen.getByTestId('item')).toHaveClass('gap-1.5', 'px-2', 'py-1.5')
  })

  test('renders as an anchor via the render prop', () => {
    render(
      <Item render={<a href="/x" />} data-testid="item">
        Link item
      </Item>,
    )
    const item = screen.getByTestId('item')
    expect(item.tagName).toBe('A')
    expect(item).toHaveAttribute('href', '/x')
    expect(item).toHaveAttribute('data-slot', 'item')
  })

  test('merges custom className', () => {
    render(<Item className="custom" data-testid="item" />)
    expect(screen.getByTestId('item')).toHaveClass('custom')
  })
})

describe('ItemMedia', () => {
  test('renders with data-slot and defaults to variant=default', () => {
    render(<ItemMedia data-testid="media" />)
    const media = screen.getByTestId('media')
    expect(media).toHaveAttribute('data-slot', 'item-media')
    expect(media).toHaveAttribute('data-variant', 'default')
  })

  test('icon variant sizes svg children', () => {
    render(
      <ItemMedia variant="icon" data-testid="media">
        <svg />
      </ItemMedia>,
    )
    const media = screen.getByTestId('media')
    expect(media).toHaveAttribute('data-variant', 'icon')
    expect(media.className).toContain("[&_svg:not([class*='size-'])]:size-4")
  })

  test('image variant is a square with rounded corners', () => {
    render(<ItemMedia variant="image" data-testid="media" />)
    const media = screen.getByTestId('media')
    expect(media).toHaveClass('size-10', 'overflow-hidden', 'rounded-sm')
  })
})

describe('ItemContent / ItemTitle / ItemDescription', () => {
  test('renders the content structure', () => {
    render(
      <Item>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
          <ItemDescription>Description</ItemDescription>
        </ItemContent>
      </Item>,
    )
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'item-title')
    expect(screen.getByText('Description')).toHaveAttribute('data-slot', 'item-description')
  })

  test('uses min-w-0 on ItemContent so children can truncate', () => {
    render(
      <Item>
        <ItemContent data-testid="content" />
      </Item>,
    )
    expect(screen.getByTestId('content')).toHaveClass('min-w-0', 'flex-1')
  })

  test('truncates ItemTitle to one line', () => {
    render(<ItemTitle data-testid="title">A very long title</ItemTitle>)
    expect(screen.getByTestId('title')).toHaveClass('line-clamp-1')
  })

  test('truncates ItemDescription to two lines', () => {
    render(<ItemDescription data-testid="desc">…</ItemDescription>)
    expect(screen.getByTestId('desc')).toHaveClass('line-clamp-2')
  })
})

describe('ItemActions', () => {
  test('renders a trailing flex row', () => {
    render(
      <ItemActions data-testid="actions">
        <Button size="sm">Go</Button>
      </ItemActions>,
    )
    const actions = screen.getByTestId('actions')
    expect(actions).toHaveAttribute('data-slot', 'item-actions')
    expect(actions).toHaveClass('flex', 'items-center', 'gap-2', 'ms-auto')
  })
})

describe('ItemGroup / ItemSeparator', () => {
  test('renders ItemGroup as role=list with vertical gap', () => {
    render(<ItemGroup data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('role', 'list')
    expect(group).toHaveAttribute('data-slot', 'item-group')
    expect(group).toHaveClass('flex', 'flex-col', 'gap-4')
  })

  test('renders ItemSeparator as a horizontal divider', () => {
    render(<ItemSeparator data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-slot', 'item-separator')
    expect(sep).toHaveAttribute('aria-orientation', 'horizontal')
  })
})

describe('ItemHeader / ItemFooter', () => {
  test('spans ItemHeader across the full width of the wrap container', () => {
    render(<ItemHeader data-testid="header">Source</ItemHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveAttribute('data-slot', 'item-header')
    expect(header).toHaveClass('basis-full')
  })

  test('spans ItemFooter across the full width of the wrap container', () => {
    render(<ItemFooter data-testid="footer">Updated</ItemFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveAttribute('data-slot', 'item-footer')
    expect(footer).toHaveClass('basis-full')
  })
})

describe('composition', () => {
  test('a typical media + content + actions row', () => {
    render(
      <Item>
        <ItemMedia variant="icon">
          <svg data-testid="icon" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Report.pdf</ItemTitle>
          <ItemDescription>Updated 2 days ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Open</Button>
        </ItemActions>
      </Item>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Report.pdf')).toBeInTheDocument()
    expect(screen.getByText('Updated 2 days ago')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  test('a grouped list with a separator between items', () => {
    render(
      <ItemGroup>
        <Item>
          <ItemContent>
            <ItemTitle>First</ItemTitle>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemContent>
            <ItemTitle>Second</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>,
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getAllByRole('list')).toHaveLength(1)
  })
})
