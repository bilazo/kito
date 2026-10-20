import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

describe('Card', () => {
  test('renders with data-slot and defaults', () => {
    render(<Card data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-slot', 'card')
    expect(card).toHaveAttribute('data-size', 'md')
    expect(card).toHaveAttribute('data-variant', 'filled')
  })

  test('filled variant paints the card surface', () => {
    render(<Card data-testid="card" />)
    expect(screen.getByTestId('card')).toHaveClass('bg-card', 'ring-border')
  })

  test('outline variant has no fill', () => {
    render(<Card variant="outline" data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-transparent')
    expect(card).not.toHaveClass('bg-card')
    expect(card).toHaveAttribute('data-variant', 'outline')
  })

  test('size md applies the larger spacing token', () => {
    render(<Card size="md" data-testid="card" />)
    expect(screen.getByTestId('card')).toHaveClass('[--card-spacing:--spacing(6)]')
  })

  test('size sm applies the smaller spacing token', () => {
    render(<Card size="sm" data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('[--card-spacing:--spacing(4)]')
    expect(card).toHaveAttribute('data-size', 'sm')
  })

  test('interactive marks the card and adds hover affordance', () => {
    render(<Card interactive data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-interactive', 'true')
    expect(card.className).toContain('has-[a:hover,button:hover]')
    expect(card.className).toContain('has-[a:focus-visible,button:focus-visible]')
  })

  test('non-interactive card has no data-interactive attribute', () => {
    render(<Card data-testid="card" />)
    expect(screen.getByTestId('card')).not.toHaveAttribute('data-interactive')
  })

  test('merges custom className', () => {
    render(<Card className="custom-class" data-testid="card" />)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  test('render prop changes the root element', () => {
    render(<Card render={<article data-testid="card" />}>Content</Card>)
    const card = screen.getByTestId('card')
    expect(card.tagName).toBe('ARTICLE')
    expect(card).toHaveAttribute('data-slot', 'card')
  })
})

describe('CardHeader', () => {
  test('renders with data-slot and grid layout', () => {
    render(<CardHeader data-testid="header" />)
    const header = screen.getByTestId('header')
    expect(header).toHaveAttribute('data-slot', 'card-header')
    expect(header).toHaveClass('grid', 'auto-rows-min')
  })

  test('grid rules adapt to card-action and card-description', () => {
    render(
      <CardHeader data-testid="header">
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
        <CardAction>Action</CardAction>
      </CardHeader>,
    )
    const header = screen.getByTestId('header')
    expect(header.className).toContain('has-data-[slot=card-action]:grid-cols-[1fr_auto]')
    expect(header.className).toContain('has-data-[slot=card-description]:grid-rows-[auto_auto]')
  })
})

describe('CardTitle', () => {
  test('renders as an h3 by default', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    const title = screen.getByTestId('title')
    expect(title.tagName).toBe('H3')
    expect(title).toHaveAttribute('data-slot', 'card-title')
    expect(title).toHaveClass('text-base', 'font-semibold')
  })

  test('render prop switches to a different element', () => {
    render(
      <CardTitle render={<div />} data-testid="title">
        Title
      </CardTitle>,
    )
    expect(screen.getByTestId('title').tagName).toBe('DIV')
  })
})

describe('CardDescription', () => {
  test('renders with muted styling', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>)
    const desc = screen.getByTestId('desc')
    expect(desc).toHaveAttribute('data-slot', 'card-description')
    expect(desc).toHaveClass('text-sm', 'text-muted-foreground')
  })
})

describe('CardAction', () => {
  test('positions itself in the top-end corner of the header grid', () => {
    render(<CardAction data-testid="action" />)
    const action = screen.getByTestId('action')
    expect(action).toHaveAttribute('data-slot', 'card-action')
    expect(action).toHaveClass(
      'col-start-2',
      'row-span-2',
      'row-start-1',
      'self-start',
      'justify-self-end',
    )
  })
})

describe('CardContent', () => {
  test('uses the card spacing for horizontal padding', () => {
    render(<CardContent data-testid="content" />)
    const content = screen.getByTestId('content')
    expect(content).toHaveAttribute('data-slot', 'card-content')
    expect(content).toHaveClass('px-(--card-spacing)')
  })
})

describe('CardFooter', () => {
  test('has border, muted background and matches card spacing', () => {
    render(<CardFooter data-testid="footer" />)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveAttribute('data-slot', 'card-footer')
    expect(footer).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'border-t',
      'bg-muted/40',
      'p-(--card-spacing)',
    )
  })
})

describe('Card composition', () => {
  test('renders every slot in a full composition', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
