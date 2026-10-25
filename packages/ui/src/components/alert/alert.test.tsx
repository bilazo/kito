import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert'

describe('Alert', () => {
  test('renders with role=alert and data-slot', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>,
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('data-slot', 'alert')
  })

  test('renders title and description with data-slots', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    )
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'alert-title')
    expect(screen.getByText('Description')).toHaveAttribute('data-slot', 'alert-description')
  })

  test('renders the default variant with a card surface', () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Title</AlertTitle>
      </Alert>,
    )
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-card', 'text-card-foreground')
    expect(alert).not.toHaveClass('text-destructive')
  })

  test('destructive variant recolors the alert', () => {
    render(
      <Alert variant="destructive" data-testid="alert">
        <AlertTitle>Error</AlertTitle>
      </Alert>,
    )
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('text-destructive')
    expect(alert).not.toHaveClass('text-card-foreground')
  })

  test('destructive description uses a softer destructive tint', () => {
    render(
      <Alert variant="destructive" data-testid="alert">
        <AlertDescription>Body</AlertDescription>
      </Alert>,
    )
    // jsdom cannot evaluate CSS, but the selector is on the alert's class
    // list — Base UI/consumers rely on `*:data-[slot=alert-description]:…`
    // to tint the description a bit softer than the title.
    expect(screen.getByTestId('alert').className).toContain(
      '*:data-[slot=alert-description]:text-destructive/90',
    )
  })

  test('icon as a direct child switches to two-column grid', () => {
    render(
      <Alert data-testid="alert">
        <svg data-testid="icon" />
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Body</AlertDescription>
      </Alert>,
    )
    const alert = screen.getByTestId('alert')
    // jsdom does not evaluate `:has()`, so assert the contract at the class
    // level — the two-column switch and the title shift are both present.
    expect(alert.className).toContain('has-[>svg]:grid-cols-[auto_1fr]')
    expect(alert.className).toContain('*:[svg]:row-span-2')
    expect(screen.getByText('Title').className).toContain('group-has-[>svg]/alert:col-start-2')
  })

  test('reserves end padding for AlertAction on the alert', () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Title</AlertTitle>
        <AlertAction>
          <button type="button">Go</button>
        </AlertAction>
      </Alert>,
    )
    // The padding is logical (`pe-18`) so it flips to the left in RTL.
    expect(screen.getByTestId('alert').className).toContain('has-data-[slot=alert-action]:pe-18')
    expect(screen.getByTestId('alert').className).not.toContain('pr-18')
  })

  test('absolutely positioned for AlertAction at the end edge', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertAction data-testid="action">
          <button type="button">Go</button>
        </AlertAction>
      </Alert>,
    )
    const action = screen.getByTestId('action')
    expect(action).toHaveAttribute('data-slot', 'alert-action')
    expect(action).toHaveClass('absolute', 'top-2', 'inset-e-2')
    expect(action.className).not.toContain('right-2')
  })

  test('merges custom className on every part', () => {
    render(
      <Alert className="custom-alert" data-testid="alert">
        <AlertTitle className="custom-title">Title</AlertTitle>
        <AlertDescription className="custom-desc">Body</AlertDescription>
        <AlertAction className="custom-action">
          <button type="button">Go</button>
        </AlertAction>
      </Alert>,
    )
    expect(screen.getByTestId('alert')).toHaveClass('custom-alert')
    expect(screen.getByText('Title')).toHaveClass('custom-title')
    expect(screen.getByText('Body')).toHaveClass('custom-desc')
    expect(document.querySelector('[data-slot="alert-action"]')).toHaveClass('custom-action')
  })

  test('consumer can override role for non-urgent callouts', () => {
    render(
      <Alert role="status">
        <AlertTitle>Info</AlertTitle>
      </Alert>,
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
