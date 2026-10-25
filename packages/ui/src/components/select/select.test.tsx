import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

function renderSelect(props?: { onValueChange?: (v: unknown) => void; defaultValue?: string }) {
  return render(
    <Select items={LANGUAGES} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Choose a language" />
      </SelectTrigger>
      <SelectPopup>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            {l.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>,
  )
}

describe('SelectTrigger', () => {
  test('renders with role=combobox and data-slot', () => {
    renderSelect()
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-slot', 'select-trigger')
    expect(trigger).toHaveAttribute('data-size', 'md')
  })

  test('shows the placeholder when nothing is selected', () => {
    renderSelect()
    expect(screen.getByText('Choose a language')).toBeInTheDocument()
  })

  test('shows the selected label when a default is set', () => {
    renderSelect({ defaultValue: 'fa' })
    expect(screen.getByText('Persian')).toBeInTheDocument()
  })

  test('size=sm applies h-(--control-sm)', () => {
    render(
      <Select items={LANGUAGES}>
        <SelectTrigger size="sm" data-testid="trigger">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectPopup>
          {LANGUAGES.map((l) => (
            <SelectItem key={l.value} value={l.value}>
              {l.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>,
    )
    expect(screen.getByTestId('trigger')).toHaveClass('h-(--control-sm)')
  })

  test('merges custom className', () => {
    render(
      <Select items={LANGUAGES}>
        <SelectTrigger className="custom-class" data-testid="trigger">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="en">English</SelectItem>
        </SelectPopup>
      </Select>,
    )
    expect(screen.getByTestId('trigger')).toHaveClass('custom-class')
  })
})

describe('opening and closing', () => {
  test('clicking the trigger opens the popup', async () => {
    renderSelect()
    await userEvent.click(screen.getByRole('combobox'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
  })

  test('the popup shows all options', async () => {
    renderSelect()
    await userEvent.click(screen.getByRole('combobox'))
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(LANGUAGES.length)
    LANGUAGES.forEach((l) => {
      expect(screen.getByRole('option', { name: l.label })).toBeInTheDocument()
    })
  })

  test('escape closes the popup', async () => {
    renderSelect()
    await userEvent.click(screen.getByRole('combobox'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('the selected item shows a checkmark', async () => {
    renderSelect({ defaultValue: 'fa' })
    await userEvent.click(screen.getByRole('combobox'))
    const selected = screen.getByRole('option', { name: 'Persian' })
    // Base UI sets aria-selected on the selected option.
    expect(selected).toHaveAttribute('aria-selected', 'true')
  })
})

describe('selection', () => {
  test('clicking an option selects it and closes the popup', async () => {
    renderSelect()
    await userEvent.click(screen.getByRole('combobox'))

    // findByRole waits for the popup to render — Base UI opens it
    // asynchronously, so a sync getByRole can race the opening.
    await userEvent.click(await screen.findByRole('option', { name: 'French' }))

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    const value = document.querySelector('[data-slot="select-value"]')
    expect(value).toHaveTextContent('French')
  })

  test('onValueChange fires with the selected value', async () => {
    const onChange = vi.fn()
    renderSelect({ onValueChange: onChange })
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(await screen.findByRole('option', { name: 'French' }))
    expect(onChange).toHaveBeenCalledWith('fr', expect.anything())
  })

  test('keyboard: arrow down moves highlight, Enter selects', async () => {
    renderSelect({ defaultValue: 'en' })
    await userEvent.click(screen.getByRole('combobox'))

    // Ensure the popup is actually open before sending keyboard events.
    await screen.findByRole('option', { name: 'English' })

    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')

    await waitFor(() => {
      const value = document.querySelector('[data-slot="select-value"]')
      expect(value).toHaveTextContent('Persian')
    })
  })
})

describe('disabled and invalid', () => {
  test('disabled trigger cannot be opened', async () => {
    render(
      <Select items={LANGUAGES} disabled>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="en">English</SelectItem>
        </SelectPopup>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  test('invalid trigger is styled', () => {
    render(
      <Select items={LANGUAGES}>
        <SelectTrigger data-invalid>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="en">English</SelectItem>
        </SelectPopup>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-invalid')
    expect(trigger.className).toContain('data-invalid:border-destructive')
  })
})

describe('groups', () => {
  test('renders groups with labels and separators', async () => {
    render(
      <Select items={[...LANGUAGES]}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectPopup>
          <SelectGroup>
            <SelectGroupLabel>European</SelectGroupLabel>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectGroupLabel>Middle Eastern</SelectGroupLabel>
            <SelectItem value="fa">Persian</SelectItem>
          </SelectGroup>
        </SelectPopup>
      </Select>,
    )

    await userEvent.click(screen.getByRole('combobox'))

    // Base UI opens the popup asynchronously. Wait until at least one option
    // is visible — otherwise `getAllByRole('option')` races the opening and
    // sees an empty popup inside a hidden positioner.
    await screen.findAllByRole('option')

    expect(screen.getByText('European')).toBeInTheDocument()
    expect(screen.getByText('Middle Eastern')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })
})

describe('SelectPopup', () => {
  test('uses a portal — popup is not a descendant of the trigger', async () => {
    renderSelect()
    const trigger = screen.getByRole('combobox')
    await userEvent.click(trigger)
    const listbox = screen.getByRole('listbox')
    expect(trigger.contains(listbox)).toBe(false)
  })

  test('popup has data-slot', async () => {
    renderSelect()
    await userEvent.click(screen.getByRole('combobox'))
    expect(document.querySelector('[data-slot="select-popup"]')).toBeInTheDocument()
  })
})
