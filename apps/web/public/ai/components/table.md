# Table

> A data table. Plain semantic HTML — no sorting, pagination, or selection logic.

A data table. Plain semantic HTML with Kito’s styling — no sorting, pagination, filtering, or row-selection logic; wire any of those yourself around these primitives. `Table` wraps its `<table>` in a horizontally scrollable container, so a wide table does not overflow the page on small screens. Every part is a native element (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`, `<tfoot>`, `<caption>`), so assistive technology gets a real table with header cells and a caption — not a `role="table"` imitation of one. `TableHead` uses `text-start` (a logical property), so the table flips with the page direction without any `dir`-specific code.

## Import

```tsx

import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '@bilazo/kito/components/table'

```

## When to use

- Display tabular data with a consistent schema — every row has the same fields in the same order (students, invoices, products, users).

- Compare records across rows — sorting by name, scanning a column of amounts, spotting an outlier — where a list or a card grid makes the comparison harder.

- Show a summary row — `TableFooter` with a `colSpan` covers the totals or average of a numeric column.

- Track a selected row — pass `data-state="selected"` on a `TableRow` for the standard subtle highlight.

- Display data that needs to scroll horizontally on narrow viewports — the `Table` wrapper handles this by default via `overflow-x-auto`.

- Give the table an accessible name from a `TableCaption` — per HTML spec, `<caption>` is the accessible name of its `<table>`; no `aria-labelledby` is needed.

- Lead a table with a row of checkbox columns — `TableHead` and `TableCell` drop the end padding (`has-[[role=checkbox]]:pe-0`) so the checkbox sits flush against the column edge.

## When NOT to use

- For page layout — use a grid or flex layout. A `<table>` communicates data relationships to assistive technology; using one for layout announces a table with meaningless rows and columns.

- For a short vertical list — use a `<ul>` or a stack of `Card`s. A 3-row table with one column per row reads as a list with extra ceremony; the table only wins when there is more than one column to compare.

- For content that should be cards on mobile and a table on desktop — build the switch yourself with `md:table` + a mobile card layout. A responsive table that only stays a table is a data table; one that becomes cards is a different component.

- For complex nested data — hierarchical rows, drill-down, tree-tables. Use a dedicated tree-view or a nested list. `colSpan` and `rowSpan` are available, but a deeply nested structure inside a flat table is not what `<table>` is for.

- Without a header row — every data table needs `TableHead` cells to communicate the column meaning. A headerless table forces screen readers to announce every cell as "cell, value" with no context.

- For sorting, filtering, and pagination — these are not built in. Compose them around the table with your own controls, or use a data-table library on top of these primitives. A static `<table>` that pretends to be sortable is worse than no affordance at all.

- For editable cell content — text inputs inside `<td>` work, but the table has no keyboard navigation between cells. Use a dedicated editable grid or form pattern instead.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `containerClassName` | `string` | — | Classes for the outer scroll container (`<div data-slot="table-container">`), not the `<table>` itself. The container is `relative w-full overflow-x-auto` by default; use this to cap the height (`max-h-96`) and pair with a sticky `TableHeader` for a scrolling table with a fixed header. `Table` prop. |
| `className` | `string` | — | Extra classes on any part — `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, or `TableCaption`. Merged with the base classes via `cn()`. For `Table`’s inner `<table>`, use this; for the scroll container, use `containerClassName`. |

Eight components compose — `Table` (root), `TableHeader` (`<thead>`), `TableBody` (`<tbody>`), `TableFooter` (`<tfoot>`), `TableRow` (`<tr>`), `TableHead` (`<th>`), `TableCell` (`<td>`), `TableCaption` (`<caption>`). Every part uses `React.ComponentProps<"tag">` inline — no Base UI primitive, no cva output, no split into `*OwnProps` / `*BaseUiProps`. `containerClassName` is `Table`’s only Kito-specific prop and is destructured out of `{...props}` so it does not leak to the `<table>` element. Selection is expressed with the `data-state="selected"` attribute on `TableRow` — that is the API; pass it from your own state, do not toggle a class. `TableHead` uses `text-start` (a logical property), so the table flips with the page direction; its `has-[[role=checkbox]]:pe-0` (and the equivalent on `TableCell`) drops the end padding when the cell contains a `role="checkbox"` element, so the checkbox sits flush against the column edge. `TableHeader` cancels the row hover inside itself (`[&_tr]:hover:bg-transparent`) — headers do not highlight on hover. `TableCaption` renders below the table (`caption-bottom`); per HTML spec, `<caption>` becomes the accessible name of the table, so no `aria-label` or `aria-labelledby` is needed.

## Composition

### Basic data table

The minimum viable table: a `TableHeader` with `TableHead` cells, a `TableBody` with `TableRow`/`TableCell` pairs. `Table` handles the horizontal scroll on narrow viewports — no extra wrapper is needed.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

const STUDENTS = [
  { id: 1, name: 'Alice Johnson', level: 'Advanced', joined: '2024-03-12' },
  { id: 2, name: 'Bob Smith', level: 'Beginner', joined: '2024-05-08' },
]

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Level</TableHead>
      <TableHead>Joined</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {STUDENTS.map((student) => (
      <TableRow key={student.id}>
        <TableCell className="font-medium">{student.name}</TableCell>
        <TableCell>{student.level}</TableCell>
        <TableCell className="text-muted-foreground">{student.joined}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### With a caption as the accessible name

Add `TableCaption` as the first child of `Table`. It renders below the table (`caption-bottom`) in muted text, and per HTML spec it becomes the accessible name of the table — assistive technology announces the caption when the table is entered.

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableCaption>Recent invoices from the last 30 days.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-mono text-xs">INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### With a footer and colSpan

`TableFooter` gets a muted background and bold text. Use `colSpan` on a `TableCell` to span multiple columns for a total row.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead>Qty</TableHead>
      <TableHead>Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* …rows… */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>$254.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Selected row

Selection is expressed with `data-state="selected"` on a `TableRow` — not a class. Pass it from your own state; the base style `data-[state=selected]:bg-muted` applies the highlight.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell className="font-medium">Project Borealis</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Project Apollo</TableCell>
      <TableCell>Archived</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Checkbox column

When a `TableHead` or `TableCell` contains a `role="checkbox"` element, its end padding is dropped (`has-[[role=checkbox]]:pe-0`) so the checkbox sits flush against the column edge. Use this for a "select row" column.

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox aria-label="Select all" />
      </TableHead>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <Checkbox aria-label="Select Alice" />
      </TableCell>
      <TableCell>Alice Johnson</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

_Generated from `apps/web/src/content/table/meta.ts`. Do not edit directly._
