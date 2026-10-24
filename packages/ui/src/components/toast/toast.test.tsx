import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Toaster, toast } from './toast'

// The toast manager is a module-level singleton. Clear all toasts between
// tests so state does not leak.
afterEach(() => {
  act(() => toast.dismiss())
})

function renderToaster(props?: Parameters<typeof Toaster>[0]) {
  return render(<Toaster {...props} />)
}

describe('Toaster', () => {
  test('renders nothing when there are no toasts', () => {
    renderToaster()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders the viewport with data-slot and data-position', () => {
    renderToaster({ position: 'top-center' })
    const viewport = document.querySelector('[data-slot="toaster"]')
    expect(viewport).toBeInTheDocument()
    expect(viewport).toHaveAttribute('data-position', 'top-center')
    expect(viewport).toHaveClass('top-4', 'left-1/2')
  })

  test.each([
    ['top-left', 'top-4', 'left-4'],
    ['top-right', 'top-4', 'right-4'],
    ['bottom-left', 'bottom-4', 'left-4'],
    ['bottom-right', 'bottom-4', 'right-4'],
  ] as const)('position=%s applies %s and %s', (position, edge1, edge2) => {
    renderToaster({ position })
    const viewport = document.querySelector('[data-slot="toaster"]')!
    expect(viewport).toHaveClass(edge1, edge2)
  })
})

describe('toast()', () => {
  test('adds a toast when called with a bare string', async () => {
    renderToaster()
    act(() => {
      toast('Saved')
    })
    expect(await screen.findByText('Saved')).toBeInTheDocument()
  })

  test('adds a toast with title and description', async () => {
    renderToaster()
    act(() => {
      toast({
        title: 'Saved',
        description: 'Your changes are live.',
      })
    })
    expect(await screen.findByText('Saved')).toBeInTheDocument()
    expect(screen.getByText('Your changes are live.')).toBeInTheDocument()
  })

  test('success variant shows a toast with the success data-variant', async () => {
    renderToaster()
    act(() => {
      toast.success('Saved')
    })
    const item = await screen.findByRole('dialog')
    expect(item).toHaveAttribute('data-variant', 'success')
    // Our success icon is rendered inside the toast.
    expect(item.querySelector('svg')).toBeInTheDocument()
  })

  test('error variant is tagged as error', async () => {
    renderToaster()
    act(() => {
      toast.error('Something failed')
    })
    const item = await screen.findByRole('dialog')
    expect(item).toHaveAttribute('data-variant', 'error')
  })

  test('dismisses all toasts when called with no argument', async () => {
    renderToaster()
    act(() => {
      toast('One')
      toast('Two')
    })
    expect(await screen.findByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()

    act(() => toast.dismiss())

    await waitFor(() => {
      expect(screen.queryByText('One')).not.toBeInTheDocument()
      expect(screen.queryByText('Two')).not.toBeInTheDocument()
    })
  })

  test('toast.dismiss(id) closes only the matching toast', async () => {
    renderToaster()
    let firstId = ''
    act(() => {
      firstId = toast('First')
      toast('Second')
    })
    expect(await screen.findByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()

    act(() => toast.dismiss(firstId))

    await waitFor(() => {
      expect(screen.queryByText('First')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  test('renders an action button when provided', async () => {
    const onClick = vi.fn()
    renderToaster()
    act(() => {
      toast({
        title: 'Deleted',
        action: { label: 'Undo', onClick },
      })
    })
    const action = await screen.findByRole('button', { name: 'Undo' })
    expect(action).toBeInTheDocument()
  })

  test('clicking the action fires its callback', async () => {
    const onClick = vi.fn()
    renderToaster()
    act(() => {
      toast({
        title: 'Deleted',
        action: { label: 'Undo', onClick },
      })
    })
    await userEvent.click(await screen.findByRole('button', { name: 'Undo' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('clicking the close button removes the toast', async () => {
    renderToaster()
    act(() => {
      toast('Saved')
    })
    await screen.findByText('Saved')

    // Base UI sets both `aria-hidden="true"` AND `tabindex="0"` on the close
    // button while the toast is collapsed. The mixed state means
    // `findByRole` cannot locate it, even with `{ hidden: true }`. Query the
    // DOM directly — the button is still clickable, only invisible to the
    // accessibility tree.
    const close = document.querySelector<HTMLButtonElement>('[data-slot="toast-close"]')
    expect(close).not.toBeNull()
    await userEvent.click(close!)

    await waitFor(() => {
      expect(screen.queryByText('Saved')).not.toBeInTheDocument()
    })
  })

  test('showCloseButton={false} removes the close button', async () => {
    renderToaster({ showCloseButton: false })
    act(() => {
      toast('Saved')
    })
    await screen.findByText('Saved')
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })
})

describe('toast.promise()', () => {
  test('shows loading then success', async () => {
    renderToaster()

    let resolve!: (v: string) => void
    const promise = new Promise<string>((res) => {
      resolve = res
    })

    act(() => {
      void toast.promise(promise, {
        loading: 'Saving…',
        success: 'Saved!',
        error: 'Failed',
      })
    })

    expect(await screen.findByText('Saving…')).toBeInTheDocument()

    await act(async () => {
      resolve('ok')
      await promise
    })

    expect(await screen.findByText('Saved!')).toBeInTheDocument()
  })

  test('shows loading then error', async () => {
    renderToaster()

    let reject!: (err: Error) => void
    const promise = new Promise<string>((_, rej) => {
      reject = rej
    })

    act(() => {
      void toast
        .promise(promise, {
          loading: 'Saving…',
          success: 'Saved!',
          error: 'Failed',
        })
        .catch(() => {
          /* expected */
        })
    })

    expect(await screen.findByText('Saving…')).toBeInTheDocument()

    await act(async () => {
      reject(new Error('boom'))
      await promise.catch(() => {
        /* expected */
      })
    })

    expect(await screen.findByText('Failed')).toBeInTheDocument()
  })

  test('stacks multiple toasts with increasing --toast-index', async () => {
    renderToaster()

    act(() => {
      toast('First')
      toast('Second')
      toast('Third')
    })

    await screen.findByText('First')

    const toasts = document.querySelectorAll('[data-slot="toast"]')
    expect(toasts).toHaveLength(3)
  })

  test('top position uses a mirrored collapsed transform', async () => {
    renderToaster({ position: 'top-center' })

    act(() => {
      toast('Hello')
    })

    await screen.findByText('Hello')

    const root = document.querySelector('[data-slot="toast"]')!
    // Collapsed transform for top is positive (mirrors bottom's negative).
    expect(root.className).toContain('origin-top')
    expect(root.className).not.toContain('origin-bottom')
  })

  test.each([
    ['success', 'success'],
    ['error', 'error'],
    ['info', 'info'],
    ['warning', 'warning'],
    ['loading', 'loading'],
  ] as const)('variant=%s is tagged with data-variant=%s', async (fn, variant) => {
    renderToaster()
    act(() => {
      toast[fn]('msg')
    })
    const item = await screen.findByRole('dialog')
    expect(item).toHaveAttribute('data-variant', variant)
  })
})
