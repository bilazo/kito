import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

function renderBasic() {
  return render(
    <Table>
      <TableCaption>A list of students</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Advanced</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Beginner</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  )
}

describe('Table', () => {
  test('renders a table with data-slot and the scroll container', () => {
    renderBasic()
    const table = screen.getByRole('table')
    expect(table).toHaveAttribute('data-slot', 'table')
    expect(document.querySelector('[data-slot="table-container"]')).toBeInTheDocument()
  })

  test('is wrapped in a horizontally scrollable container', () => {
    renderBasic()
    const container = document.querySelector('[data-slot="table-container"]')!
    expect(container).toHaveClass('overflow-x-auto', 'w-full', 'relative')
  })

  test('renders all rows and cells', () => {
    renderBasic()
    const rows = screen.getAllByRole('row')
    // header + 2 body rows
    expect(rows).toHaveLength(3)

    const table = screen.getByRole('table')
    expect(within(table).getByText('Alice')).toBeInTheDocument()
    expect(within(table).getByText('Bob')).toBeInTheDocument()
  })

  test('renders column headers', () => {
    renderBasic()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Level' })).toBeInTheDocument()
  })

  test('renders the caption', () => {
    renderBasic()
    expect(screen.getByText('A list of students')).toHaveAttribute('data-slot', 'table-caption')
  })
})

describe('Table subcomponents', () => {
  test('renders a thead with data-slot on TableHeader', () => {
    render(
      <Table>
        <TableHeader data-testid="header">
          <TableRow>
            <TableHead>A</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    )
    expect(screen.getByTestId('header').tagName).toBe('THEAD')
    expect(screen.getByTestId('header')).toHaveAttribute('data-slot', 'table-header')
  })

  test('renders a tbody with data-slot on TableBody', () => {
    render(
      <Table>
        <TableBody data-testid="body">
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByTestId('body').tagName).toBe('TBODY')
    expect(screen.getByTestId('body')).toHaveAttribute('data-slot', 'table-body')
  })

  test('renders a tfoot with muted background on TableFooter', () => {
    render(
      <Table>
        <TableFooter data-testid="footer">
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )
    const footer = screen.getByTestId('footer')
    expect(footer.tagName).toBe('TFOOT')
    expect(footer).toHaveAttribute('data-slot', 'table-footer')
    expect(footer).toHaveClass('bg-muted/50', 'font-medium')
  })

  test('applies a hover background and border to TableRow', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="row">
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    const row = screen.getByTestId('row')
    expect(row).toHaveClass('hover:bg-muted/50', 'border-b')
    expect(row).toHaveAttribute('data-slot', 'table-row')
  })

  test('reacts to data-state=selected on TableRow', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="row" data-state="selected">
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByTestId('row').className).toContain('data-[state=selected]:bg-muted')
  })

  test('uses text-start on TableHead for RTL support', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="head">Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    )
    const head = screen.getByTestId('head')
    expect(head.tagName).toBe('TH')
    expect(head).toHaveClass('text-start')
    expect(head).not.toHaveClass('text-left')
  })

  test('renders a td with data-slot on TableCell', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data-testid="cell">Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    const cell = screen.getByTestId('cell')
    expect(cell.tagName).toBe('TD')
    expect(cell).toHaveAttribute('data-slot', 'table-cell')
  })

  test('must TableHeader has a muted background and no hover highlight', () => {
    render(
      <Table>
        <TableHeader data-testid="header">
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    )
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('bg-muted/50')
    // The row's hover is cancelled inside the header.
    expect(header.className).toContain('[&_tr]:hover:bg-transparent')
  })
})

describe('Table composition', () => {
  test('accepts a header + body + footer', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Apple</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )
    expect(screen.getAllByRole('row')).toHaveLength(3)
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  test('merges custom className on every part', () => {
    render(
      <Table containerClassName="custom-container" className="custom-table">
        <TableHeader className="custom-header">
          <TableRow className="custom-row">
            <TableHead className="custom-head">A</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="custom-body">
          <TableRow>
            <TableCell className="custom-cell">B</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(document.querySelector('[data-slot="table-container"]')).toHaveClass('custom-container')
    expect(screen.getByRole('table')).toHaveClass('custom-table')
    expect(document.querySelector('[data-slot="table-header"]')).toHaveClass('custom-header')
    expect(document.querySelector('[data-slot="table-body"]')).toHaveClass('custom-body')
    expect(screen.getByText('A')).toHaveClass('custom-head')
    expect(screen.getByText('B')).toHaveClass('custom-cell')
  })
})
