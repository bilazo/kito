# Tooltip

> A small label that appears on hover or focus of a trigger.

A small label that appears on hover or keyboard focus of a trigger. Tooltips are for short, supplementary labels — a keyboard shortcut, an icon name, a hint. Wrap the app once in TooltipProvider so all tooltips share the same hover delay. Sides are physical (`top` / `right` / `bottom` / `left`); in an app that serves both LTR and RTL, pick the side from the current direction at the call site.

## Import

```tsx

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@bilazo/kito/components/tooltip'

```

## When to use

- Give an icon-only button a short label — a toolbar action, an icon-only "close" or "more" trigger.

- Show a keyboard shortcut for an action that also has a visible label or an icon.

- Explain what a symbol or icon means without taking permanent screen space.

- Add supplementary context to a control whose primary meaning is already clear (a password strength hint on a format icon, for example).

## When NOT to use

- As the only label of an element — every trigger must still have an accessible name (an `aria-label` on icon-only buttons). A tooltip is invisible to touch users and to screen readers when it is not triggered.

- For rich content the user must interact with — form inputs, buttons, links, or a longer panel. Use `Popover` for clickable content.

- For text that is essential to understanding the page — visible labels and descriptions. A tooltip should never be the only place a piece of information lives.

- For a list of options the user picks from — use `Select`, `Combobox`, or `Menu`.

- On mobile as the primary affordance — there is no hover. Use visible labels or an expandable panel instead.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Side of the trigger where the tooltip appears. Sides are **physical** — `left` / `right` do not flip in RTL. In an app that serves both LTR and RTL, choose the side from the current direction (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a logical alias. `TooltipContent` prop. |
| `sideOffset` | `number` | `4` | Gap between the trigger and the tooltip, in pixels. `TooltipContent` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the tooltip relative to the trigger along the cross axis. `TooltipContent` prop. |
| `alignOffset` | `number` | `0` | Offset along the alignment axis, in pixels. `TooltipContent` prop. |
| `showArrow` | `boolean` | `true` | Render a small arrow pointing at the trigger. Set to `false` for a pill-style tooltip. `TooltipContent` prop. |
| `delay` | `number` | `400` | Hover delay in milliseconds. Only accepted by `TooltipProvider` — set once at the app root. `Tooltip` itself accepts a per-tooltip override via its own `delay` prop, but the provider value is what most apps use. |
| `render` | `ReactElement` | — | Render the trigger as a different element. Use this to make a `Button`, a router `Link`, or any other element act as the trigger. `TooltipTrigger` prop. |
| `className` | `string` | — | Extra classes for the popup. Merged with the base classes via `cn()`. `TooltipContent` prop. |

Four components are exported. `TooltipProvider` (mount once, accepts `delay`) → `Tooltip` (root, accepts `open` / `defaultOpen` / `onOpenChange`) → `TooltipTrigger` (accepts `render` and `className`) → `TooltipContent` (accepts the side/align props and `showArrow`). Sides are physical — `left` / `right` do not flip in RTL, so an app serving both directions picks the side from the current direction at the call site. `ArrowShape` is also exported as a low-level utility for building custom arrow shapes (used by `PopoverArrow`); it is not part of the day-to-day API.

## Composition

### Icon-only trigger

Always pair with `aria-label` — the icon is the only visible content, and the tooltip alone does not announce itself to screen readers.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'
import { Plus } from 'lucide-react'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button size="icon" aria-label="Add item" />}>
      <Plus />
    </TooltipTrigger>
    <TooltipContent>Add item</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Provider at the app root

Mount TooltipProvider once, near the top of the app, so hover timings are shared. Individual `<TooltipProvider>` wrappers per tooltip defeat the purpose.

```tsx
import { TooltipProvider } from '@bilazo/kito/components/tooltip'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}
```

### With a keyboard shortcut

Inline the shortcut as a `Kbd` so it stays readable on the inverted popup surface.

```tsx
import { Kbd } from '@bilazo/kito/components/kbd'

<TooltipContent>Bold <Kbd>⌘B</Kbd></TooltipContent>
```

### Direction-aware side

Sides are physical. In an app that serves both LTR and RTL, pick the side from the current direction at the call site — `right` in an RTL page is where `inline-start` would have put it.

```tsx
<TooltipContent side={dir === 'rtl' ? 'right' : 'left'}>
  Opens on the reading-start edge
</TooltipContent>
```

---

_Generated from `apps/web/src/content/tooltip/meta.ts`. Do not edit directly._
