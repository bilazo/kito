import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
} from './combobox'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
]

function renderCombobox(props?: {
  onValueChange?: (v: unknown) => void
  defaultValue?: (typeof LANGUAGES)[number]
}) {
  return render(
    <Combobox items={LANGUAGES} {...props}>
      <ComboboxInput placeholder="Search…" />
      <ComboboxPopup>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No results.</ComboboxEmpty>
      </ComboboxPopup>
    </Combobox>,
  )
}

describe('ComboboxInput', () => {
  test('renders with role=combobox and data-slot', () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('data-slot', 'combobox-input')
  })

  test('renders the input group wrapper', () => {
    renderCombobox()
    expect(document.querySelector('[data-slot="combobox-input-group"]')).toBeInTheDocument()
  })

  test('default size is md', () => {
    renderCombobox()
    const group = document.querySelector('[data-slot="combobox-input-group"]')!
    expect(group).toHaveAttribute('data-size', 'md')
    expect(group).toHaveClass('h-(--control-md)')
  })

  test('size=sm uses the smaller control token', () => {
    render(
      <Combobox items={LANGUAGES}>
        <ComboboxInput size="sm" placeholder="Search…" />
        <ComboboxPopup>
          <ComboboxList>
            {(item) => <ComboboxItem value={item}>{item.label}</ComboboxItem>}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    )
    const group = document.querySelector('[data-slot="combobox-input-group"]')!
    expect(group).toHaveClass('h-(--control-sm)')
    expect(group).toHaveAttribute('data-size', 'sm')
  })

  test('showClear=false hides the clear button', () => {
    render(
      <Combobox items={LANGUAGES}>
        <ComboboxInput showClear={false} placeholder="Search…" />
        <ComboboxPopup>
          <ComboboxList>
            {(item) => <ComboboxItem value={item}>{item.label}</ComboboxItem>}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    )
    expect(document.querySelector('[data-slot="combobox-clear"]')).not.toBeInTheDocument()
  })

  test('showTrigger=false hides the chevron icon', () => {
    render(
      <Combobox items={LANGUAGES}>
        <ComboboxInput showTrigger={false} placeholder="Search…" />
        <ComboboxPopup>
          <ComboboxList>
            {(item) => <ComboboxItem value={item}>{item.label}</ComboboxItem>}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    )
    expect(document.querySelector('[data-slot="combobox-icon"]')).not.toBeInTheDocument()
  })
})

describe('opening the popup', () => {
  test('focusing the input opens the popup with all items', async () => {
    renderCombobox()
    await userEvent.click(screen.getByRole('combobox'))
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(LANGUAGES.length)
  })

  test('typing filters the list', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.type(input, 'fr')
    await waitFor(() => {
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(1)
      expect(options[0]).toHaveTextContent('French')
    })
  })

  test('shows the empty message when nothing matches', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.type(input, 'zzzzz')
    await waitFor(() => {
      expect(screen.getByText('No results.')).toBeInTheDocument()
    })
  })

  test('escape closes the popup', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    expect(screen.getAllByRole('option').length).toBeGreaterThan(0)
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })
})

describe('selection', () => {
  test('clicking an option selects it', async () => {
    const onChange = vi.fn()
    renderCombobox({ onValueChange: onChange })
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('option', { name: 'French' }))
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByRole('combobox')).toHaveValue('French')
  })

  test('defaultValue shows the selected label in the input', () => {
    renderCombobox({ defaultValue: LANGUAGES[1] })
    expect(screen.getByRole('combobox')).toHaveValue('Persian')
  })

  test('clear button empties the input', async () => {
    renderCombobox({ defaultValue: LANGUAGES[0] })
    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('English')
    const clear = document.querySelector('[data-slot="combobox-clear"]')!
    await userEvent.click(clear)
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveValue('')
    })
  })
})

describe('ComboboxPopup', () => {
  test('renders in a portal — not a descendant of the input', async () => {
    renderCombobox()
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    const listbox = screen.getByRole('listbox')
    expect(input.contains(listbox)).toBe(false)
  })

  test('popup has data-slot', async () => {
    renderCombobox()
    await userEvent.click(screen.getByRole('combobox'))
    expect(document.querySelector('[data-slot="combobox-popup"]')).toBeInTheDocument()
  })
})

describe('groups', () => {
  test('renders groups, labels and separators', async () => {
    render(
      <Combobox items={LANGUAGES}>
        <ComboboxInput placeholder="Search…" />
        <ComboboxPopup>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxGroupLabel>European</ComboboxGroupLabel>
              <ComboboxItem value={LANGUAGES[0]}>English</ComboboxItem>
              <ComboboxItem value={LANGUAGES[2]}>French</ComboboxItem>
              <ComboboxItem value={LANGUAGES[3]}>German</ComboboxItem>
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxGroupLabel>Middle Eastern</ComboboxGroupLabel>
              <ComboboxItem value={LANGUAGES[1]}>Persian</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>,
    )
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('European')).toBeInTheDocument()
    expect(screen.getByText('Middle Eastern')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="combobox-separator"]')).toBeInTheDocument()
  })
})
