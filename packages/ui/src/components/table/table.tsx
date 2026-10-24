import { cn } from 'cn'

import type * as React from 'react'

/** Props defined by Kito. */
export interface TableOwnProps {
  /**
   * Classes for the outer scroll container. Use it to cap the height and
   * pair with a sticky `TableHeader` for a scrolling table with a fixed
   * header.
   */
  containerClassName?: string
}

/** Props forwarded to the underlying `<table>` element. */
export type TableHTMLProps = React.ComponentProps<'table'>

/** Public composed props. */
export interface TableProps extends TableOwnProps, TableHTMLProps {}

/**
 * A data table. Plain semantic HTML with our styling — no sorting, no
 * pagination, no row selection logic. Wire any of those yourself around
 * these primitives.
 *
 * The table is wrapped in a horizontally scrollable container by default, so
 * wide tables do not overflow the page on small screens. Every element is a
 * plain `<table>`/`<thead>`/`<tbody>`/`<tr>`/`<th>`/`<td>` — nothing here
 * needs managed state.
 */
export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn('relative w-full overflow-x-auto', containerClassName)}
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        'bg-muted/50 [&_tr]:border-b',
        // The header never highlights on hover — only data rows do.
        // Cancel the row's hover background inside the header.
        '[&_tr]:hover:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

export function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('font-medium border-t bg-muted/50 [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-10 px-3 font-medium text-start align-middle whitespace-nowrap text-foreground',
        // When the cell contains a checkbox, drop the end padding so the
        // checkbox sits flush against the column edge.
        'has-[[role=checkbox]]:pe-0',
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn('p-3 align-middle whitespace-nowrap', 'has-[[role=checkbox]]:pe-0', className)}
      {...props}
    />
  )
}

export function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
