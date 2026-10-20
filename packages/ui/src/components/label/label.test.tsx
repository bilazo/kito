import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Label } from './label'

describe('Label', () => {
  test('renders a <label> with data-slot', () => {
    render(<Label>Email</Label>)
    const label = screen.getByText('Email')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('data-slot', 'label')
  })

  test('applies the default text styling', () => {
    render(<Label>Email</Label>)
    expect(screen.getByText('Email')).toHaveClass('text-sm', 'font-medium', 'select-none')
  })

  test('merges custom className', () => {
    render(<Label className="custom-class">Email</Label>)
    expect(screen.getByText('Email')).toHaveClass('custom-class')
  })

  test('forwards htmlFor to the DOM', () => {
    render(<Label htmlFor="email-input">Email</Label>)
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input')
  })

  test('associates with a control via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" />
      </>,
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  test('renders children inline', () => {
    render(
      <Label>
        Email <span aria-hidden>*</span>
      </Label>,
    )
    expect(screen.getByText('Email', { exact: false })).toBeInTheDocument()
  })

  test('data-disabled adds the disabled classes', () => {
    render(<Label data-disabled>Email</Label>)
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('data-disabled')
    // Classes are present in the class list regardless of state.
    expect(label.className).toContain('data-disabled:opacity-50')
    expect(label.className).toContain('data-disabled:pointer-events-none')
  })

  test('peer-disabled affordance is part of the base class list', () => {
    render(<Label>Email</Label>)
    const label = screen.getByText('Email')
    expect(label.className).toContain('peer-disabled:cursor-not-allowed')
    expect(label.className).toContain('peer-disabled:opacity-50')
  })

  test('group disabled affordance is part of the base class list', () => {
    render(<Label>Email</Label>)
    const label = screen.getByText('Email')
    expect(label.className).toContain('group-data-[disabled=true]:pointer-events-none')
    expect(label.className).toContain('group-data-[disabled=true]:opacity-50')
  })

  test('forwards native attributes', () => {
    render(
      <Label id="lbl" title="Label">
        Email
      </Label>,
    )
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('id', 'lbl')
    expect(label).toHaveAttribute('title', 'Label')
  })
})
