import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage } from './avatar'

describe('Avatar', () => {
  test('renders root with data-slot and defaults to md', () => {
    render(<Avatar data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('data-slot', 'avatar')
    expect(avatar).toHaveAttribute('data-size', 'md')
    expect(avatar).toHaveClass('size-(--control-md)')
  })

  test.each([
    ['sm', 'size-(--control-sm)'],
    ['md', 'size-(--control-md)'],
    ['lg', 'size-(--control-lg)'],
    ['xl', 'size-16'],
  ] as const)('size=%s applies %s', (size, expectedClass) => {
    render(<Avatar size={size} data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toHaveClass(expectedClass)
  })

  test('forwards custom className', () => {
    render(<Avatar className="custom" data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toHaveClass('custom')
  })
})

describe('AvatarFallback', () => {
  test('renders with data-slot and centered content', () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    )
    const fallback = screen.getByText('AL')
    expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback')
    expect(fallback).toHaveClass('flex', 'size-full', 'bg-muted')
  })
})

describe('AvatarImage', () => {
  test('renders the fallback while the image is unavailable', () => {
    render(
      <Avatar>
        <AvatarImage src="/alice.jpg" alt="Alice" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    )
    // In jsdom the image never fires `load`, so Base UI keeps the fallback
    // visible and does not mount the <img> at all. This mirrors the correct
    // user-facing behaviour on a slow connection.
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  test('does not mount an <img> before the image has loaded', () => {
    render(
      <Avatar>
        <AvatarImage src="/alice.jpg" alt="Alice" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    )
    expect(document.querySelector('img')).toBeNull()
  })

  test('renders nothing but the root when no fallback is provided', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="/alice.jpg" alt="Alice" />
      </Avatar>,
    )
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar.querySelector('img')).toBeNull()
  })
})

describe('AvatarBadge', () => {
  test('renders with data-slot and default position', () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
        <AvatarBadge data-testid="badge" />
      </Avatar>,
    )
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-slot', 'avatar-badge')
    expect(badge).toHaveClass('absolute', 'bottom-0', 'end-0')
  })

  test.each([
    ['online', 'bg-primary'],
    ['offline', 'bg-muted-foreground'],
    ['busy', 'bg-destructive'],
    ['away', 'bg-highlight'],
  ] as const)('status=%s applies %s', (status, expectedClass) => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
        <AvatarBadge status={status} data-testid="badge" />
      </Avatar>,
    )
    expect(screen.getByTestId('badge')).toHaveClass(expectedClass)
    expect(screen.getByTestId('badge')).toHaveAttribute('data-status', status)
  })

  test('renders children as an icon badge', () => {
    render(
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
        <AvatarBadge data-testid="badge">
          <svg data-testid="icon" />
        </AvatarBadge>
      </Avatar>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})

describe('AvatarGroup', () => {
  const users = [
    { id: 1, initials: 'AL' },
    { id: 2, initials: 'BO' },
    { id: 3, initials: 'CH' },
    { id: 4, initials: 'DA' },
    { id: 5, initials: 'EV' },
  ]

  test('renders all avatars when max is not set', () => {
    render(
      <AvatarGroup data-testid="group">
        {users.map((u) => (
          <Avatar key={u.id}>
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>,
    )
    expect(screen.getByTestId('group')).toHaveAttribute('data-slot', 'avatar-group')
    users.forEach((u) => expect(screen.getByText(u.initials)).toBeInTheDocument())
  })

  test('collapses overflow into a +N avatar when max is set', () => {
    render(
      <AvatarGroup max={3} data-testid="group">
        {users.map((u) => (
          <Avatar key={u.id}>
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>,
    )
    expect(screen.getByText('AL')).toBeInTheDocument()
    expect(screen.getByText('BO')).toBeInTheDocument()
    expect(screen.getByText('CH')).toBeInTheDocument()
    expect(screen.queryByText('DA')).not.toBeInTheDocument()
    expect(screen.queryByText('EV')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  test('does not render +N when max exceeds children count', () => {
    render(
      <AvatarGroup max={10}>
        {users.map((u) => (
          <Avatar key={u.id}>
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>,
    )
    expect(screen.queryByText(/^\+\d+$/u)).not.toBeInTheDocument()
  })

  test('forwards custom className', () => {
    render(<AvatarGroup className="custom" data-testid="group" />)
    expect(screen.getByTestId('group')).toHaveClass('custom')
  })
})
