# ScrollArea

> Augments native scroll functionality for custom, cross-browser styling.

A native scroll container with consistent, themeable scrollbar styling. Renders Base UI’s `Root` + `Viewport` + a vertical `ScrollBar` + `Corner` automatically — give the root a size and the viewport fills it. Native scrolling keeps working: `overflow: auto`, momentum on touch, keyboard scrolling (arrows, Page Up/Down, Home/End). What ScrollArea adds is a styleable scrollbar that does not depend on the OS-chrome look of `::-webkit-scrollbar`. For horizontal scrolling, add a second `ScrollBar` explicitly with `orientation="horizontal"`. Both scrollbars use logical positioning (`border-s`, `border-t`), so the layout flips correctly in RTL without extra classes.

## Import

```tsx

import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

```

## When to use

- A fixed-height list that scrolls — a member list, a log viewer, a settings panel — where the OS scrollbar would break the design.

- A media carousel or a card strip that scrolls horizontally — add a `ScrollBar orientation="horizontal"`.

- A wide table that must fit a narrow container — add both a vertical (default) and a horizontal scrollbar for bidirectional scrolling.

- A chat thread, an audit log, or any list where the scrollbar should be subtle and consistent across browsers.

- Anywhere the default OS scrollbar would clash with the design system’s neutral palette and radius.

- A scroll container that is itself rounded and bordered — the viewport’s `rounded-[inherit]` clips content to the same corners.

## When NOT to use

- For a single div that never needs a custom scrollbar — use a plain `overflow-y-auto` div. ScrollArea adds a wrapper, a viewport, a scrollbar, and a corner; a few lines of utility classes are simpler when the OS chrome is acceptable.

- For a full-page scroll — the page itself scrolls; wrapping it in a ScrollArea would create a nested scroll context and trap the page scroll.

- For an element whose height is not fixed — ScrollArea needs a bounded height (`h-64`, `max-h-96`, `h-full` inside a sized parent) or the viewport grows to fit its content and there is nothing to scroll.

- Inside another ScrollArea of the same axis — nested scroll containers confuse wheel and touch scrolling. Pick one scroll context per axis.

- For a virtualized long list — use a virtualization library (TanStack Virtual, react-window) and style its outer container. ScrollArea alone renders every child, which is fine for ~100 rows but not for thousands.

- As a replacement for `overflow: hidden` — ScrollArea is for scrolling content, not for clipping. Use a plain div with `overflow-hidden` for a mask.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Axis of the scrollbar. `ScrollBar` renders one vertical scrollbar by default; pass `orientation="horizontal"` for a second one. `ScrollArea` itself always renders a vertical scrollbar and the corner automatically — horizontal scrollbars must be added explicitly inside `ScrollArea`’s children. `ScrollBar` prop. |
| `className` | `string` | — | Extra classes on `ScrollArea` or `ScrollBar`. For `ScrollArea`, must include a size (`h-64`, `max-h-96`, `w-80`) — the viewport fills whatever height and width the root gets. For `ScrollBar`, use it to restyle the track (the thumb uses `[&_[data-slot=scroll-area-thumb]]` from the consumer side). |

Two components are exported. `ScrollArea` renders a `BaseScrollArea.Root` containing a `Viewport`, a vertical `ScrollBar`, and a `Corner` — the corner is a small fill at the intersection of the two scrollbars, so it only appears when a horizontal scrollbar is present. `Viewport` uses `size-full rounded-[inherit]` so it fills the root and clips content to the root’s corners — a `rounded-lg` on `ScrollArea` therefore rounds the scrolling content too. Horizontal scrolling needs an explicit `<ScrollBar orientation="horizontal" />` child; the default only covers vertical. `ScrollBar`’s thumb is `bg-border` and grows on hover, matching the neutral palette without a dedicated scrollbar token — restyle by passing `className` on `ScrollBar` or with the `[&_[data-slot=scroll-area-thumb]]` selector from the consumer side. The vertical scrollbar uses `border-s` (logical) and sits at the inline-end; in RTL it moves to the physical left automatically. `touch-none` on the scrollbar prevents a touch drag on the thumb from being interpreted as a page scroll — do not remove it. No cva output is exported, no own-props interface is needed (both components forward Base UI’s props directly), and `orientation` is the only documented default Kito sets.

## Composition

### Basic

Give the root a fixed size (`h-64`, `w-80`, or both). The viewport fills it. The scrollbar appears only when the content overflows.

```tsx
import { ScrollArea } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="h-64 w-80 rounded-lg border border-border p-4">
  <div className="flex flex-col gap-3 text-sm">
    {Array.from({ length: 25 }, (_, i) => (
      <p key={i}>Line {i + 1}. Lorem ipsum…</p>
    ))}
  </div>
</ScrollArea>
```

### Horizontal scroll

Add an explicit `ScrollBar` with `orientation="horizontal"` for a card strip or a carousel. Both scrollbars can coexist when content overflows on both axes.

```tsx
import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="w-full max-w-lg rounded-lg border border-border p-4">
  <div className="flex gap-4">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="size-32 shrink-0 rounded-lg bg-muted" />
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Both axes — wide table

For a wide table inside a fixed-size container, add a horizontal scrollbar alongside the default vertical one. The corner (rendered automatically) fills the gap between the two scrollbars.

```tsx
import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="h-72 w-80 rounded-lg border border-border">
  <div className="p-4" style={{ width: 800 }}>
    <table className="w-full text-sm">…</table>
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Scrollable list

A fixed-height list of rows — members, messages, log lines. Combine with `Avatar`, `Badge`, or any row-level component; the scrollbar is the only extra DOM node.

```tsx
import { ScrollArea } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="h-72 w-80 rounded-lg border border-border">
  <div className="flex flex-col divide-y divide-border">
    {members.map((m) => (
      <div key={m.id} className="flex items-center gap-3 p-3">
        {/* row content */}
      </div>
    ))}
  </div>
</ScrollArea>
```

---

_Generated from `apps/web/src/content/scroll-area/meta.ts`. Do not edit directly._
