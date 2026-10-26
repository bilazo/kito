# Separator

> A thin line used to visually separate groups of content.

A thin line used to visually separate groups of content. Renders horizontally by default and can also stand as a vertical divider inside a flex row. Three line styles (`solid`, `dashed`, `dotted`) cover the visual range; the `decorative` prop switches the element between purely visual (`role="none"`, the default) and a semantic boundary (`role="separator"`) announced by assistive technology.

## Import

```tsx

import { Separator } from '@bilazo/kito/components/separator'

```

## When to use

- Between two related but distinct groups of content — a settings section and the one below it, a list of items and its footer.

- As a vertical divider inside a toolbar, a nav row, or a metadata list where two clusters need a visible break.

- To separate metadata that sits in a row and would otherwise bleed together — a filename and its size, a label and its value.

- With `decorative={false}` when the boundary carries semantic meaning for assistive technology — for example, between two groups of toolbar controls.

## When NOT to use

- As a vertical rhythm primitive — real content spacing belongs to `gap`, `padding`, or `margin` on the container. A line between every section is visual noise; spacing alone usually reads cleaner.

- Between form fields — `Field` and `FieldGroup` already carry the vertical spacing; a separator between each field is redundant and makes a form look like a settings panel.

- Inside a paragraph or sentence — use an inline character (`,`, `·`, `|`) or spacing. A block-level separator breaks the line box.

- When a CSS `border-t` / `border-b` (or `border-l` / `border-r`) on an existing container would do — if the line is a border of an existing element, use the utility class instead of adding an extra DOM node.

- To convey status, category, or emphasis — a line is decorative. Use `Badge`, colored `Text`, or an icon when the difference carries meaning.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Axis of the line. Horizontal renders `h-px w-full`; vertical renders `w-px self-stretch` so it fills the height of a flex row. `aria-orientation` is set to match. |
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Visual style. `solid` paints a background line; `dashed` and `dotted` switch to a `border-t` (or `border-l` when vertical) so the browser renders the dash pattern. |
| `decorative` | `boolean` | `true` | When `true` (the default), the separator is purely visual: `role="none"` and hidden from assistive technology. Set to `false` when the boundary is semantically meaningful — assistive technology then announces it as a separator. |
| `className` | `string` | — | Extra classes. Merged with the variant classes via `cn()` — commonly used to set an explicit height (`h-8`) or a margin (`mx-1`) when the separator sits inside a toolbar. |

The underlying element is Base UI’s `Separator`. Kito overrides Base UI’s default `role` handling: Base UI ships `role="separator"` by default and lets consumers opt out, while Kito hides the element from assistive technology by default (`decorative={true}` → `role="none"`) and requires an explicit `decorative={false}` to be announced. The reasoning is that most separators in a UI are purely visual rhythm and should not add noise to a screen reader’s reading order. `SeparatorStyles` is not exported — a separator almost never needs to be restyled for another element; if that becomes necessary, export the cva output the way `Input` does with `inputStyles`.

## Composition

### Section break inside a card

The most common use: a horizontal line between two groups of content that share a container. Keep the surrounding `space-y-*` — the separator is the visible cue, not the spacing primitive.

```tsx
import { Separator } from '@bilazo/kito/components/separator'

<div className="max-w-sm space-y-4 rounded-lg border border-border p-4">
  <div className="space-y-1">
    <p className="text-sm font-medium">Billing</p>
    <p className="text-sm text-muted-foreground">Manage your plan and invoices.</p>
  </div>
  <Separator />
  <div className="space-y-1">
    <p className="text-sm font-medium">Team</p>
    <p className="text-sm text-muted-foreground">Invite members and manage roles.</p>
  </div>
</div>
```

### Vertical divider in a toolbar

Inside a flex row, `orientation="vertical"` stretches to the row height. Give it a fixed height (`h-8`) when the row is taller than the controls so the line does not run edge-to-edge.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Separator } from '@bilazo/kito/components/separator'

<div role="toolbar" aria-label="Alignment" className="flex items-center gap-1 rounded-md border border-border p-1">
  <Button size="sm" variant="ghost" aria-label="Left">Left</Button>
  <Button size="sm" variant="ghost" aria-label="Center">Center</Button>
  <Button size="sm" variant="ghost" aria-label="Right">Right</Button>
  <Separator orientation="vertical" decorative={false} className="mx-1 h-8" />
  <Button size="sm" variant="ghost">Reset</Button>
</div>
```

### Semantic boundary

Pass `decorative={false}` when the boundary matters to assistive technology — for example, between two clusters of controls that a screen reader should treat as separate groups.

```tsx
import { Separator } from '@bilazo/kito/components/separator'

<div role="toolbar" aria-label="Formatting">
  {/* …text-style controls… */}
  <Separator orientation="vertical" decorative={false} />
  {/* …alignment controls… */}
</div>
```

### Dashed and dotted dividers

`dashed` and `dotted` render as a border so the browser produces the pattern. Use them for lower emphasis than a solid line — a footnote divider, a “more” separator.

```tsx
import { Separator } from '@bilazo/kito/components/separator'

<div className="space-y-3 text-sm">
  <p>Body copy.</p>
  <Separator variant="dashed" />
  <p className="text-muted-foreground">Footnote.</p>
</div>
```

---

_Generated from `apps/web/src/content/separator/meta.ts`. Do not edit directly._
