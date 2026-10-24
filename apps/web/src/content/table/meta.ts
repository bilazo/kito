import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Table',
    'TableHeader',
    'TableBody',
    'TableFooter',
    'TableRow',
    'TableHead',
    'TableCell',
    'TableCaption',
  ],

  summary:
    'A data table. Plain semantic HTML with Kito’s styling — no sorting, pagination, filtering, or row-selection logic; wire any of those yourself around these primitives. `Table` wraps its `<table>` in a horizontally scrollable container, so a wide table does not overflow the page on small screens. Every part is a native element (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`, `<tfoot>`, `<caption>`), so assistive technology gets a real table with header cells and a caption — not a `role="table"` imitation of one. `TableHead` uses `text-start` (a logical property), so the table flips with the page direction without any `dir`-specific code.',

  whenToUse: [
    'Display tabular data with a consistent schema — every row has the same fields in the same order (students, invoices, products, users).',
    'Compare records across rows — sorting by name, scanning a column of amounts, spotting an outlier — where a list or a card grid makes the comparison harder.',
    'Show a summary row — `TableFooter` with a `colSpan` covers the totals or average of a numeric column.',
    'Track a selected row — pass `data-state="selected"` on a `TableRow` for the standard subtle highlight.',
    'Display data that needs to scroll horizontally on narrow viewports — the `Table` wrapper handles this by default via `overflow-x-auto`.',
    'Give the table an accessible name from a `TableCaption` — per HTML spec, `<caption>` is the accessible name of its `<table>`; no `aria-labelledby` is needed.',
    'Lead a table with a row of checkbox columns — `TableHead` and `TableCell` drop the end padding (`has-[[role=checkbox]]:pe-0`) so the checkbox sits flush against the column edge.',
  ],

  whenNotToUse: [
    'For page layout — use a grid or flex layout. A `<table>` communicates data relationships to assistive technology; using one for layout announces a table with meaningless rows and columns.',
    'For a short vertical list — use a `<ul>` or a stack of `Card`s. A 3-row table with one column per row reads as a list with extra ceremony; the table only wins when there is more than one column to compare.',
    'For content that should be cards on mobile and a table on desktop — build the switch yourself with `md:table` + a mobile card layout. A responsive table that only stays a table is a data table; one that becomes cards is a different component.',
    'For complex nested data — hierarchical rows, drill-down, tree-tables. Use a dedicated tree-view or a nested list. `colSpan` and `rowSpan` are available, but a deeply nested structure inside a flat table is not what `<table>` is for.',
    'Without a header row — every data table needs `TableHead` cells to communicate the column meaning. A headerless table forces screen readers to announce every cell as "cell, value" with no context.',
    'For sorting, filtering, and pagination — these are not built in. Compose them around the table with your own controls, or use a data-table library on top of these primitives. A static `<table>` that pretends to be sortable is worse than no affordance at all.',
    'For editable cell content — text inputs inside `<td>` work, but the table has no keyboard navigation between cells. Use a dedicated editable grid or form pattern instead.',
  ],

  props: [
    {
      name: 'containerClassName',
      type: 'string',
      description:
        'Classes for the outer scroll container (`<div data-slot="table-container">`), not the `<table>` itself. The container is `relative w-full overflow-x-auto` by default; use this to cap the height (`max-h-96`) and pair with a sticky `TableHeader` for a scrolling table with a fixed header. `Table` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part — `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, or `TableCaption`. Merged with the base classes via `cn()`. For `Table`’s inner `<table>`, use this; for the scroll container, use `containerClassName`.',
    },
  ],

  propsNote:
    'Eight components compose — `Table` (root), `TableHeader` (`<thead>`), `TableBody` (`<tbody>`), `TableFooter` (`<tfoot>`), `TableRow` (`<tr>`), `TableHead` (`<th>`), `TableCell` (`<td>`), `TableCaption` (`<caption>`). Every part uses `React.ComponentProps<"tag">` inline — no Base UI primitive, no cva output, no split into `*OwnProps` / `*BaseUiProps`. `containerClassName` is `Table`’s only Kito-specific prop and is destructured out of `{...props}` so it does not leak to the `<table>` element. Selection is expressed with the `data-state="selected"` attribute on `TableRow` — that is the API; pass it from your own state, do not toggle a class. `TableHead` uses `text-start` (a logical property), so the table flips with the page direction; its `has-[[role=checkbox]]:pe-0` (and the equivalent on `TableCell`) drops the end padding when the cell contains a `role="checkbox"` element, so the checkbox sits flush against the column edge. `TableHeader` cancels the row hover inside itself (`[&_tr]:hover:bg-transparent`) — headers do not highlight on hover. `TableCaption` renders below the table (`caption-bottom`); per HTML spec, `<caption>` becomes the accessible name of the table, so no `aria-label` or `aria-labelledby` is needed.',

  composition: [
    {
      title: 'Basic data table',
      description:
        'The minimum viable table: a `TableHeader` with `TableHead` cells, a `TableBody` with `TableRow`/`TableCell` pairs. `Table` handles the horizontal scroll on narrow viewports — no extra wrapper is needed.',
      code: `import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from '@bilazo/kito/components/table'\n\nconst STUDENTS = [\n  { id: 1, name: 'Alice Johnson', level: 'Advanced', joined: '2024-03-12' },\n  { id: 2, name: 'Bob Smith', level: 'Beginner', joined: '2024-05-08' },\n]\n\n<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n      <TableHead>Level</TableHead>\n      <TableHead>Joined</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {STUDENTS.map((student) => (\n      <TableRow key={student.id}>\n        <TableCell className="font-medium">{student.name}</TableCell>\n        <TableCell>{student.level}</TableCell>\n        <TableCell className="text-muted-foreground">{student.joined}</TableCell>\n      </TableRow>\n    ))}\n  </TableBody>\n</Table>`,
    },
    {
      title: 'With a caption as the accessible name',
      description:
        'Add `TableCaption` as the first child of `Table`. It renders below the table (`caption-bottom`) in muted text, and per HTML spec it becomes the accessible name of the table — assistive technology announces the caption when the table is entered.',
      code: `import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from '@bilazo/kito/components/table'\n\n<Table>\n  <TableCaption>Recent invoices from the last 30 days.</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Invoice</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead>Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell className="font-mono text-xs">INV-001</TableCell>\n      <TableCell>Paid</TableCell>\n      <TableCell>$250.00</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
    },
    {
      title: 'With a footer and colSpan',
      description:
        '`TableFooter` gets a muted background and bold text. Use `colSpan` on a `TableCell` to span multiple columns for a total row.',
      code: `import {\n  Table,\n  TableBody,\n  TableCell,\n  TableFooter,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from '@bilazo/kito/components/table'\n\n<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Item</TableHead>\n      <TableHead>Qty</TableHead>\n      <TableHead>Price</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {/* …rows… */}\n  </TableBody>\n  <TableFooter>\n    <TableRow>\n      <TableCell colSpan={2}>Total</TableCell>\n      <TableCell>$254.00</TableCell>\n    </TableRow>\n  </TableFooter>\n</Table>`,
    },
    {
      title: 'Selected row',
      description:
        'Selection is expressed with `data-state="selected"` on a `TableRow` — not a class. Pass it from your own state; the base style `data-[state=selected]:bg-muted` applies the highlight.',
      code: `import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from '@bilazo/kito/components/table'\n\n<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Project</TableHead>\n      <TableHead>Status</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow data-state="selected">\n      <TableCell className="font-medium">Project Borealis</TableCell>\n      <TableCell>Active</TableCell>\n    </TableRow>\n    <TableRow>\n      <TableCell className="font-medium">Project Apollo</TableCell>\n      <TableCell>Archived</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
    },
    {
      title: 'Checkbox column',
      description:
        'When a `TableHead` or `TableCell` contains a `role="checkbox"` element, its end padding is dropped (`has-[[role=checkbox]]:pe-0`) so the checkbox sits flush against the column edge. Use this for a "select row" column.',
      code: `import { Checkbox } from '@bilazo/kito/components/checkbox'\nimport {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from '@bilazo/kito/components/table'\n\n<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>\n        <Checkbox aria-label="Select all" />\n      </TableHead>\n      <TableHead>Name</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>\n        <Checkbox aria-label="Select Alice" />\n      </TableCell>\n      <TableCell>Alice Johnson</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
    },
  ],
}
