import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from './tabs'

function renderBasic(props?: {
  variant?: 'default' | 'line'
  orientation?: 'horizontal' | 'vertical'
  defaultValue?: string
  onValueChange?: (v: unknown) => void
}) {
  const variant = props?.variant ?? 'default'
  const orientation = props?.orientation ?? 'horizontal'

  return render(
    <Tabs
      defaultValue={props?.defaultValue ?? 'overview'}
      orientation={orientation}
      onValueChange={props?.onValueChange}
    >
      <TabsList variant={variant} orientation={orientation}>
        <TabsTab variant={variant} orientation={orientation} value="overview">
          Overview
        </TabsTab>
        <TabsTab variant={variant} orientation={orientation} value="projects">
          Projects
        </TabsTab>
        <TabsTab variant={variant} orientation={orientation} value="account">
          Account
        </TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="overview">Overview content</TabsPanel>
      <TabsPanel value="projects">Projects content</TabsPanel>
      <TabsPanel value="account">Account content</TabsPanel>
    </Tabs>,
  )
}

describe('Tabs', () => {
  test('renders with role=tablist and role=tab', () => {
    renderBasic()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  test('renders only the active panel by default', () => {
    renderBasic()
    expect(screen.getByText('Overview content')).toBeInTheDocument()
    expect(screen.queryByText('Projects content')).not.toBeInTheDocument()
  })

  test('renders the panel matching defaultValue', () => {
    renderBasic({ defaultValue: 'projects' })
    expect(screen.getByText('Projects content')).toBeInTheDocument()
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument()
  })

  test('clicking a tab switches the active panel', async () => {
    renderBasic()
    await userEvent.click(screen.getByRole('tab', { name: 'Projects' }))
    expect(screen.getByText('Projects content')).toBeInTheDocument()
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument()
  })

  test('clicked tab becomes aria-selected', async () => {
    renderBasic()
    const projectsTab = screen.getByRole('tab', { name: 'Projects' })
    expect(projectsTab).toHaveAttribute('aria-selected', 'false')
    await userEvent.click(projectsTab)
    expect(projectsTab).toHaveAttribute('aria-selected', 'true')
  })

  test('onValueChange fires with the newly-selected value', async () => {
    const onChange = vi.fn()
    renderBasic({ onValueChange: onChange })
    await userEvent.click(screen.getByRole('tab', { name: 'Projects' }))
    expect(onChange).toHaveBeenCalledWith('projects', expect.anything())
  })

  test('controlled value drives the active panel', () => {
    render(
      <Tabs value="projects">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="projects">Projects</TabsTab>
        </TabsList>
        <TabsPanel value="overview">Overview content</TabsPanel>
        <TabsPanel value="projects">Projects content</TabsPanel>
      </Tabs>,
    )
    expect(screen.getByText('Projects content')).toBeInTheDocument()
  })

  test('disabled tab cannot be selected', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTab value="a">A</TabsTab>
          <TabsTab value="b" disabled>
            B
          </TabsTab>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
        <TabsPanel value="b">Panel B</TabsPanel>
      </Tabs>,
    )
    const b = screen.getByRole('tab', { name: 'B' })
    await userEvent.click(b)
    expect(b).toHaveAttribute('aria-selected', 'false')
  })
})

describe('TabsList', () => {
  test('renders with data-slot and defaults to variant=default', () => {
    renderBasic()
    const list = screen.getByRole('tablist')
    expect(list).toHaveAttribute('data-slot', 'tabs-list')
    expect(list).toHaveAttribute('data-variant', 'default')
    expect(list).toHaveAttribute('data-orientation', 'horizontal')
    expect(list).toHaveClass('bg-muted')
  })

  test('line variant has a transparent background', () => {
    renderBasic({ variant: 'line' })
    const list = screen.getByRole('tablist')
    expect(list).toHaveAttribute('data-variant', 'line')
    expect(list).toHaveClass('bg-transparent')
    expect(list).not.toHaveClass('bg-muted')
  })

  test('vertical orientation uses flex-col', () => {
    renderBasic({ orientation: 'vertical' })
    const list = screen.getByRole('tablist')
    expect(list).toHaveAttribute('data-orientation', 'vertical')
    expect(list).toHaveClass('flex-col')
  })

  test('merges custom className', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList className="custom-class">
          <TabsTab value="a">A</TabsTab>
        </TabsList>
      </Tabs>,
    )
    expect(screen.getByRole('tablist')).toHaveClass('custom-class')
  })
})

describe('TabsTab', () => {
  test('renders with data-slot and data-variant', () => {
    renderBasic()
    const tab = screen.getByRole('tab', { name: 'Overview' })
    expect(tab).toHaveAttribute('data-slot', 'tabs-tab')
    expect(tab).toHaveAttribute('data-variant', 'default')
  })

  test('line variant uses more padding for the underline', () => {
    renderBasic({ variant: 'line' })
    const tab = screen.getByRole('tab', { name: 'Overview' })
    expect(tab).toHaveClass('pb-3')
  })

  test('vertical tab is full-width and left-aligned', () => {
    renderBasic({ orientation: 'vertical' })
    const tab = screen.getByRole('tab', { name: 'Overview' })
    expect(tab).toHaveClass('w-full', 'justify-start')
  })

  test('merges custom className', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTab value="a" className="custom-class">
            A
          </TabsTab>
        </TabsList>
      </Tabs>,
    )
    expect(screen.getByRole('tab')).toHaveClass('custom-class')
  })
})

describe('TabsIndicator', () => {
  test('renders with data-slot', () => {
    renderBasic()
    expect(document.querySelector('[data-slot="tabs-indicator"]')).toBeInTheDocument()
  })

  test('line variant applies the underline styles via group', () => {
    renderBasic({ variant: 'line' })
    const indicator = document.querySelector('[data-slot="tabs-indicator"]')!
    // The indicator uses group-data variants on the list, so we only check
    // that the group-conditional classes are present.
    expect(indicator.className).toContain('group-data-[variant=line]/tabs-list:bg-foreground')
  })

  test('default variant applies the pill styles', () => {
    renderBasic()
    const indicator = document.querySelector('[data-slot="tabs-indicator"]')!
    expect(indicator.className).toContain('group-data-[variant=default]/tabs-list:bg-background')
  })
})

describe('TabsPanel', () => {
  test('renders with data-slot and role=tabpanel', () => {
    renderBasic()
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAttribute('data-slot', 'tabs-panel')
  })

  test('has aria-labelledby pointing to the active tab', () => {
    renderBasic()
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAttribute('aria-labelledby')
  })

  test('merges custom className', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTab value="a">A</TabsTab>
        </TabsList>
        <TabsPanel value="a" className="custom-class">
          Panel A
        </TabsPanel>
      </Tabs>,
    )
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-class')
  })
})
