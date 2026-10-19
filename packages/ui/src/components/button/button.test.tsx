import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Button, buttonVariants } from './button'

describe('Button', () => {
  test('renders as a native button with data-slot and type', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.tagName).toBe('BUTTON')
    expect(button).toHaveAttribute('data-slot', 'button')
    expect(button).toHaveAttribute('type', 'button')
  })

  test('calls onClick when pressed', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  describe('variants', () => {
    test.each([
      ['primary', 'bg-primary'],
      ['secondary', 'bg-secondary'],
      ['soft', 'bg-primary-soft'],
      ['outline', 'border-input'],
      ['ghost', 'text-foreground'],
      ['destructive', 'bg-destructive'],
      ['link', 'text-primary'],
    ] as const)('variant=%s applies %s', (variant, expectedClass) => {
      render(<Button variant={variant}>Button</Button>)
      expect(screen.getByRole('button')).toHaveClass(expectedClass)
    })

    test('aria-invalid paints the destructive border', () => {
      render(<Button aria-invalid>Invalid</Button>)
      expect(screen.getByRole('button').className).toContain('aria-invalid:border-destructive')
    })
  })

  describe('sizes', () => {
    test('sm is compact', () => {
      render(<Button size="sm">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-(--control-sm)', 'px-3', 'text-sm')
    })

    test('md is the default', () => {
      render(<Button size="md">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-(--control-md)', 'px-4', 'text-sm')
    })

    test('lg is large', () => {
      render(<Button size="lg">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-(--control-lg)', 'px-6', 'text-base')
    })

    test('icon is square', () => {
      render(<Button size="icon" aria-label="Add" />)
      expect(screen.getByRole('button')).toHaveClass('size-(--control-md)')
    })

    test('icon-lg is a larger square', () => {
      render(<Button size="icon-lg" aria-label="Add" />)
      expect(screen.getByRole('button')).toHaveClass('size-(--control-lg)')
    })
  })

  test('fullWidth adds w-full', () => {
    render(<Button fullWidth>Wide</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  test('disabled prevents click', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  test('loading disables interactions and marks aria-busy', async () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    )
    const button = screen.getByRole('button')

    // Uses aria-disabled (Base UI focuses disabled elements so keyboard users
    // are not dropped from the tab order) — the native `disabled` attribute is
    // intentionally not set.
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button).toHaveAttribute('data-disabled')

    // Clicks do not fire while loading.
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  test('disabled without loading uses native disabled attribute', () => {
    render(<Button disabled>Saving</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('loading keeps the label in the accessibility tree', () => {
    render(<Button loading>Saving</Button>)
    // Label is hidden visually but accessible
    expect(screen.getByRole('button', { name: 'Saving' })).toBeInTheDocument()
  })

  test('merges custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  test('forwards native attributes', () => {
    render(
      <Button id="my-id" data-custom="x">
        Button
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('id', 'my-id')
    expect(button).toHaveAttribute('data-custom', 'x')
  })

  test('render prop renders a non-button element with button semantics', () => {
    render(
      <Button render={<div data-testid="custom" />} nativeButton={false}>
        Go
      </Button>,
    )
    const el = screen.getByTestId('custom')
    // Base UI keeps button semantics even when rendering as another element.
    expect(el).toHaveAttribute('role', 'button')
    expect(el).toHaveAttribute('data-slot', 'button')
    expect(el).toHaveClass('bg-primary')
  })

  test('buttonVariants works on a plain anchor (framework-agnostic link)', () => {
    render(
      <a href="/x" className={buttonVariants({ variant: 'outline' })}>
        Go
      </a>,
    )
    const link = screen.getByRole('link', { name: 'Go' })
    expect(link).toHaveAttribute('href', '/x')
    expect(link).toHaveClass('border-input')
    // No data-slot: this anchor isn't a Button, it just borrows its styles.
    expect(link).not.toHaveAttribute('data-slot', 'button')
  })

  describe('buttonVariants helper', () => {
    test('returns the variant className string', () => {
      const cls = buttonVariants({ variant: 'outline', size: 'lg' })
      expect(cls).toContain('border-input')
      expect(cls).toContain('h-(--control-lg)')
    })

    test('returns the default className string when called with no args', () => {
      const cls = buttonVariants()
      expect(cls).toContain('bg-primary')
      expect(cls).toContain('h-(--control-md)')
    })
  })
})
