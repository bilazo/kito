import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Input } from '../input/input'
import { Textarea } from '../textarea/textarea'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from './field'

describe('Field', () => {
  test('renders with data-slot and role=group', () => {
    render(<Field data-testid="field" />)
    const field = screen.getByTestId('field')
    expect(field).toHaveAttribute('data-slot', 'field')
    expect(field).toHaveAttribute('role', 'group')
  })

  test('defaults to vertical orientation', () => {
    render(<Field data-testid="field" />)
    const field = screen.getByTestId('field')
    expect(field).toHaveAttribute('data-orientation', 'vertical')
    expect(field).toHaveClass('flex-col')
  })

  test('horizontal orientation switches to a row', () => {
    render(<Field orientation="horizontal" data-testid="field" />)
    const field = screen.getByTestId('field')
    expect(field).toHaveAttribute('data-orientation', 'horizontal')
    expect(field).toHaveClass('flex-row', 'items-center')
  })

  test('responsive orientation uses container-query prefixes', () => {
    render(<Field orientation="responsive" data-testid="field" />)
    const cls = screen.getByTestId('field').className
    expect(cls).toContain('@md/field-group:flex-row')
  })

  test('merges custom className', () => {
    render(<Field className="custom" data-testid="field" />)
    expect(screen.getByTestId('field')).toHaveClass('custom')
  })

  test('invalid propagates to the root data attribute', () => {
    render(<Field invalid data-testid="field" />)
    expect(screen.getByTestId('field')).toHaveAttribute('data-invalid')
  })

  test('disabled propagates to the root data attribute', () => {
    render(<Field disabled data-testid="field" />)
    expect(screen.getByTestId('field')).toHaveAttribute('data-disabled')
  })
})

describe('FieldLabel', () => {
  test('renders with data-slot and label styling', () => {
    render(
      <Field>
        <FieldLabel data-testid="label">Email</FieldLabel>
      </Field>,
    )
    const label = screen.getByTestId('label')
    expect(label).toHaveAttribute('data-slot', 'field-label')
    expect(label).toHaveClass('text-sm', 'font-medium')
  })

  test('auto-wires htmlFor to a Field.Control-based input', () => {
    render(
      <Field>
        <FieldLabel>Message</FieldLabel>
        <Textarea />
      </Field>,
    )
    // Base UI assigns an id to the control and htmlFor to the label.
    const label = screen.getByText('Message')
    expect(label).toHaveAttribute('for')
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })
})

describe('FieldDescription', () => {
  test('renders with muted styling', () => {
    render(
      <Field>
        <FieldDescription data-testid="desc">Short hint</FieldDescription>
      </Field>,
    )
    const desc = screen.getByTestId('desc')
    expect(desc).toHaveAttribute('data-slot', 'field-description')
    expect(desc).toHaveClass('text-sm', 'text-muted-foreground')
  })
})

describe('FieldError', () => {
  test('renders children when provided', () => {
    render(<FieldError data-testid="error">Required field</FieldError>)
    expect(screen.getByTestId('error')).toHaveTextContent('Required field')
  })

  test('renders nothing with no children and no errors', () => {
    render(<FieldError data-testid="error" />)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('renders nothing with an empty errors array', () => {
    render(<FieldError data-testid="error" errors={[]} />)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('errors array with a single message renders it directly', () => {
    render(<FieldError errors={[{ message: 'Invalid email' }]} />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  test('errors array with duplicate messages is deduplicated', () => {
    render(<FieldError errors={[{ message: 'Invalid' }, { message: 'Invalid' }]} />)
    expect(screen.getAllByText('Invalid')).toHaveLength(1)
  })

  test('errors array with multiple unique messages renders a list', () => {
    render(<FieldError errors={[{ message: 'Too short' }, { message: 'No digits' }]} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Too short')).toBeInTheDocument()
    expect(screen.getByText('No digits')).toBeInTheDocument()
  })

  test('has role=alert', () => {
    render(<FieldError>Error</FieldError>)
    expect(screen.getByRole('alert')).toHaveTextContent('Error')
  })

  test('can be conditionally rendered inside a Field', () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Textarea />
        <FieldError>Required field</FieldError>
      </Field>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required field')
  })
})

describe('FieldGroup', () => {
  test('renders with data-slot and container-query class', () => {
    render(<FieldGroup data-testid="group" />)
    const group = screen.getByTestId('group')
    expect(group).toHaveAttribute('data-slot', 'field-group')
    expect(group).toHaveClass('@container/field-group')
  })
})

describe('FieldSet', () => {
  test('renders as a fieldset with data-slot', () => {
    render(<FieldSet data-testid="set" />)
    const set = screen.getByTestId('set')
    expect(set.tagName).toBe('FIELDSET')
    expect(set).toHaveAttribute('data-slot', 'field-set')
  })

  test('with a legend', () => {
    render(
      <FieldSet>
        <FieldLegend>Contact</FieldLegend>
      </FieldSet>,
    )
    const legend = screen.getByText('Contact')
    expect(legend.tagName).toBe('LEGEND')
    expect(legend).toHaveClass('text-base', 'font-medium')
  })

  test('legend with variant=label is smaller', () => {
    render(
      <FieldSet>
        <FieldLegend variant="label">Small label</FieldLegend>
      </FieldSet>,
    )
    const legend = screen.getByText('Small label')
    expect(legend).toHaveClass('text-sm')
    expect(legend).toHaveAttribute('data-variant', 'label')
  })
})

describe('FieldContent', () => {
  test('renders with data-slot', () => {
    render(<FieldContent data-testid="content" />)
    const content = screen.getByTestId('content')
    expect(content).toHaveAttribute('data-slot', 'field-content')
    expect(content).toHaveClass('flex', 'flex-1', 'flex-col')
  })
})

describe('FieldTitle', () => {
  test('renders with data-slot', () => {
    render(<FieldTitle data-testid="title">Notifications</FieldTitle>)
    const title = screen.getByTestId('title')
    expect(title).toHaveAttribute('data-slot', 'field-title')
    expect(title).toHaveClass('text-sm', 'font-medium')
  })
})

describe('FieldSeparator', () => {
  test('renders a plain line without children', () => {
    render(<FieldSeparator data-testid="sep" />)
    const sep = screen.getByTestId('sep')
    expect(sep).toHaveAttribute('data-slot', 'field-separator')
    expect(sep).not.toHaveAttribute('data-has-content')
  })

  test('renders centered content when children provided', () => {
    render(<FieldSeparator>or</FieldSeparator>)
    expect(screen.getByText('or')).toHaveAttribute('data-slot', 'field-separator-content')
  })
})

describe('composition', () => {
  test('a labelled field with description and error', () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" defaultValue="not-an-email" />
        <FieldDescription>Used to recover your account.</FieldDescription>
        <FieldError>Please enter a valid email.</FieldError>
      </Field>,
    )
    expect(screen.getByLabelText('Email')).toHaveValue('not-an-email')
    expect(screen.getByText('Used to recover your account.')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email.')
  })
})
