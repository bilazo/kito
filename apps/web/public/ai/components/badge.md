# Badge

> A compact status or label chip.

A compact status or label chip. Six variants cover the common semantic roles — confirmation, default labels, low-emphasis categories, metadata, errors, and secondary brand highlights — and two sizes fit either a form row (md) or a dense list (sm). Badge is purely visual: it is not focusable and not interactive by default.

## Import

```tsx

import { Badge, badgeStyles } from '@bilazo/kito/components/badge'

```

## When to use

- Show the current status of a record — active, pending, failed, overdue, archived.

- Label a category or level that a row belongs to (e.g. "Intermediate", "Pro plan").

- Show a small count next to a label — unread items, active members, filters applied.

- Highlight a feature or achievement — "New", "Beta", "Featured".

- Mark the current filter or tag on a list item, when the badge itself is not clickable. For a clickable chip, wrap it in a `Button`.

## When NOT to use

- As a clickable filter or dismissible tag — wrap the badge inside a `Button` instead of adding `onClick` to the badge. A bare span has no focus state and no keyboard handling.

- For a link to a tag page — use `render={<a/>}` on the badge so it stays a real anchor. Do not put an `onClick` on a bare span.

- As a substitute for a primary action — use `Button`. A badge that does the work of a button confuses both screen readers and users.

- For a status that carries the only meaning of a row — pair it with a visible label ("Status: Failed"). Colored dots and colored text alone are not accessible.

- As a loading indicator that replaces real progress UI — use `Skeleton` for placeholders or `Progress` for measurable work.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'outline' \| 'destructive' \| 'highlight'` | `'secondary'` | Visual style. `primary` for confirmed / active states. `secondary` for default labels. `soft` for low-emphasis categories. `outline` for counts and metadata. `destructive` for errors and overdue states. `highlight` for secondary brand and achievements. |
| `size` | `'sm' \| 'md'` | `'md'` | Controls height and font size. `md` is 20px tall with 12px text, sized for a form row. `sm` is 16px tall with 10px text, sized for a dense list or a table cell. |
| `render` | `ReactElement` | — | Render the badge as a different element. Pass an `<a>` to make it a real link (the badge styling is preserved). Do not pass a `<button>`: for a clickable chip, wrap a `Button` around the badge instead — the badge has no focus state. |
| `className` | `string` | — | Extra classes. Merged with the variant classes via `cn()`. |

`badgeStyles` is also exported — a cva output that returns the class string without rendering a span. Use it to style your own element (a `Link`, a custom chip) with the same visual treatment. All native `<span>` attributes (`id`, `data-*`, `aria-*`) are forwarded to the underlying element.

## Composition

### Status row

Common statuses as badges. Pair each badge with visible text — a colored badge alone does not convey state to screen readers or color-blind users.

```tsx
import { Badge } from '@bilazo/kito/components/badge'

<div className="flex gap-2">
  <Badge variant="primary">Active</Badge>
  <Badge variant="soft">Pending</Badge>
  <Badge variant="outline">Draft</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>
```

### With an icon

Pass an inline SVG as a child. Non-sized icons inherit `size-3` from the badge.

```tsx
import { Check } from 'lucide-react'

<Badge variant="primary">
  <Check />
  Verified
</Badge>
```

### As a link

Render the badge as an anchor to make it a real link. Do not put an onClick on a span — the badge has no focus state.

```tsx
import { Link } from '@tanstack/react-router'

<Badge render={<Link to="/tags/react" />} variant="outline">
  React
</Badge>
```

### Clickable chip

For a clickable filter or dismissible tag, wrap a `Button` around a badge. The button provides the focus state and keyboard handling; the badge provides the visual.

```tsx
<Button variant="ghost" size="sm" className="h-auto gap-1 rounded-full px-2 py-0.5">
  React
  <Badge variant="soft" size="sm">×</Badge>
</Button>
```

### Small size for dense lists

Use `size="sm"` inside a table row or a compact list. Pair with `variant="outline"` to stay low-emphasis.

```tsx
<Badge size="sm" variant="outline">3</Badge>
```

---

_Generated from `apps/web/src/content/badge/meta.ts`. Do not edit directly._
