import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

function renderBasic(props?: {
  multiple?: boolean
  defaultValue?: string[]
  disabledItem?: boolean
}) {
  return render(
    <Accordion multiple={props?.multiple} defaultValue={props?.defaultValue}>
      <AccordionItem value="item-1" disabled={props?.disabledItem}>
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>,
  )
}

describe('Accordion', () => {
  test('renders both triggers collapsed by default', () => {
    renderBasic()
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getByRole('button', { name: 'Section 2' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  test('opens the item listed in defaultValue', () => {
    renderBasic({ defaultValue: ['item-1'] })
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  test('clicking a trigger expands its content', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('button', { name: 'Section 1' }))
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(await screen.findByText('Content 1')).toBeInTheDocument()
  })

  test('clicking an open trigger collapses it', async () => {
    renderBasic({ defaultValue: ['item-1'] })
    await userEvent.click(screen.getByRole('button', { name: 'Section 1' }))
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  test('single mode collapses the previously open item', async () => {
    renderBasic({ defaultValue: ['item-1'] })
    await userEvent.click(screen.getByRole('button', { name: 'Section 2' }))
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getByRole('button', { name: 'Section 2' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  test('multiple mode allows two items to be open at once', async () => {
    renderBasic({ multiple: true })
    await userEvent.click(screen.getByRole('button', { name: 'Section 1' }))
    await userEvent.click(screen.getByRole('button', { name: 'Section 2' }))
    expect(screen.getByRole('button', { name: 'Section 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Section 2' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  test('disabled item cannot be expanded', async () => {
    renderBasic({ disabledItem: true })
    const trigger = screen.getByRole('button', { name: 'Section 1' })
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  test('keyboard Space toggles the focused trigger', async () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Section 1' })
    trigger.focus()
    await userEvent.keyboard(' ')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  test('renders both items with data-slot', () => {
    renderBasic()
    expect(document.querySelectorAll('[data-slot="accordion-item"]')).toHaveLength(2)
    expect(document.querySelectorAll('[data-slot="accordion-trigger"]')).toHaveLength(2)
  })

  test('merges custom className on the root', () => {
    render(
      <Accordion className="custom-class">
        <AccordionItem value="a">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(document.querySelector('[data-slot="accordion"]')).toHaveClass('custom-class')
  })

  test('trigger chevron rotates via aria-expanded group selector', () => {
    renderBasic()
    const trigger = screen.getByRole('button', { name: 'Section 1' })
    const chevron = trigger.querySelector('svg')!
    // jsdom cannot evaluate CSS, so this asserts the contract: the chevron
    // carries the group-aria-expanded selector that drives its rotation.
    expect(chevron.className).toContain('group-aria-expanded/accordion-trigger:rotate-180')
  })

  test('disabled trigger carries the disabled selector contract', () => {
    render(
      <Accordion>
        <AccordionItem value="a" disabled>
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole('button', { name: 'Section' })

    expect(trigger.className).toContain('aria-disabled:pointer-events-none')
    expect(trigger.className).toContain('aria-disabled:opacity-50')
    expect(trigger.className).toContain('group-data-disabled/accordion-item:pointer-events-none')
    expect(trigger.className).toContain('group-data-disabled/accordion-item:opacity-50')
    expect(trigger.className).toContain('aria-disabled:focus-visible:outline-0')
    expect(trigger.className).toContain(
      'group-data-disabled/accordion-item:focus-visible:outline-0',
    )

    // The item must carry the group name — without it, the group selectors
    // above cannot match.
    const item = document.querySelector('[data-slot="accordion-item"]')!
    expect(item.className).toContain('group/accordion-item')
  })
})
