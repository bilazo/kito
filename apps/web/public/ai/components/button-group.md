# Button Group

> A container that groups related buttons together with consistent styling.

A container that groups related buttons into a single visual unit. Adjacent buttons share a border, the group rounds only at its two outer edges, and focus rings are lifted above siblings so they are not clipped. Uses logical properties throughout — `rounded-s-lg` / `rounded-e-lg` on the outer edges, `border-s-0` on non-first children — so the whole group flips with the page direction without any per-component RTL code. Pair with `ButtonGroupText` for a label that matches the button’s shape, and `ButtonGroupSeparator` for a split-button pattern. Use `ButtonGroup` when grouping buttons that **perform an action**; for buttons that **toggle a state**, use `ToggleGroup` (not built yet).

## Import

```tsx

import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants } from '@bilazo/kito/components/button-group'

```

## When to use

- Group related action buttons into a single control — alignment, zoom, formatting — so they read as one cluster rather than three separate buttons.

- A split-button pattern — a primary action followed by a separator and a smaller menu trigger (Save + Save Options).

- A search bar — an `Input` and a submit button side by side, sharing one border and one rounded shape.

- A counter or stepper — two icon buttons stacked vertically, sharing a top/bottom border.

- A toolbar where several button clusters sit next to each other — nest a `ButtonGroup` inside another to create visual clusters with a small gap.

- A pill group where each button in the group is a different action but they belong to the same task — Backup, Report, Snooze.

- A pair of buttons that should not be mistaken for two unrelated controls — the outer shape (rounded at the ends, straight in the middle) makes the relationship obvious.

## When NOT to use

- For a set of buttons that toggles a state (alignment, text style, view mode) — use `ToggleGroup` (not built yet). A toggle exposes `aria-pressed` on each button; a `ButtonGroup` does not, so a state-toggling group needs the toggle semantics.

- For a single button — a group of one is a button with extra DOM. Use `Button` directly.

- For navigation links that should stay in their own tab order — `role="group"` implies a related set of controls; a nav strip is a `<nav>` with `role="menubar"` or a plain list of links.

- For a group of unrelated buttons that happen to sit next to each other — use a flex row with `gap-2`. The shared border of a `ButtonGroup` says "these belong together"; two unrelated buttons should not.

- As a replacement for a `Menu` — a `ButtonGroup` of three menu items is a menu in disguise; it loses the menu’s keyboard navigation (arrow keys, typeahead, Escape) and role.

- Without an `aria-label` on icon-only groups — a group of icon buttons with no visible label is announced as "group" with no context. Add `aria-label` or `aria-labelledby`.

- For a group with mixed layouts — a `ButtonGroup` expects its children to be the same `size` (or it looks uneven). Mix `sm` and `lg` buttons in a group and the shared borders misalign.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout of the buttons. `horizontal` stacks them in a row — the group rounds the start and end edges (`rounded-s-lg` / `rounded-e-lg`) and strips the start border on every child after the first. `vertical` stacks them in a column — the group rounds the top and bottom edges and strips the top border on every child after the first. Both orientations use logical properties where direction matters, so the visual flips correctly in RTL. `ButtonGroup` prop. |
| `className` | `string` | — | Extra classes on any part. For `ButtonGroup`, useful for a `w-fit` versus `w-full` override, or a `h-fit` on a vertical group so it does not stretch to fill its parent. For `ButtonGroupText`, useful for a wider text slot or a different background. For `ButtonGroupSeparator`, useful for a different height/width or margin. |
| `render` | `ReactElement` | — | Render `ButtonGroupText` as a different element. Pass `render={<Label htmlFor="…" />}` to make it a real `<label>` for an adjacent input. Base UI’s `useRender` merges the component’s `data-slot` and className with the render’s props, so the resulting element keeps both the visual styling and the semantic role of the target. `ButtonGroupText` prop. |

Three components plus one helper compose. `ButtonGroup` renders a `<div role="group">` with `data-slot="button-group"` and `data-orientation`. It uses `items-stretch` so every button matches the group’s cross-axis size, `*:focus-visible:relative *:focus-visible:z-10` so a focused button’s ring is not clipped by its neighbors, `has-[>[data-slot=button-group]]:gap-2` so nested groups get a gap, `[&>input]:flex-1` so an `Input` fills the remaining width, and `[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit` so a `Select` trigger without an explicit width shrinks to fit. `ButtonGroupText` uses `useRender` — a plain `<div>` by default, or any element passed via `render`; pass a `<Label htmlFor="…" />` to make it a real label. `ButtonGroupSeparator` reuses `Separator` with `orientation="vertical"` (default) or `"horizontal"` — it overrides the separator’s `bg-border` with `bg-input` for a more visible divider, and relies on the group’s `items-stretch` so it fills the row (vertical separator) or column (horizontal separator). `buttonGroupVariants` is the exported cva output, so consumers can style their own element with the same look. The rounded-corner logic uses **logical properties** for horizontal (`rounded-s-lg` on first, `rounded-e-lg` on last, `rounded-none` on the middle) so it flips correctly in RTL — a physical `rounded-l` / `rounded-r` implementation would invert in RTL and look wrong. Vertical uses physical `rounded-t` / `rounded-b` because top and bottom are direction-agnostic. Separators are decorative by default (`decorative={true}` on Kito’s Separator) — no `role="separator"` inside a `role="group"`, which is correct: the group already communicates the relationship, and a decorative separator does not need a semantic role.

## Composition

### Basic action group

The canonical pattern: two or three buttons side by side, sharing one border and one rounded outer shape. Give the group an `aria-label` so screen readers announce the group’s purpose.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'

<ButtonGroup aria-label="Alignment">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

### Split button

A primary action followed by a `ButtonGroupSeparator` and a smaller menu trigger. Use `variant="outline"` on both to keep the shared border, or `variant="primary"` on both — do not mix, the shared border breaks.

```tsx
import { ButtonGroup, ButtonGroupSeparator } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'
import { ChevronDown } from 'lucide-react'

<ButtonGroup aria-label="Save">
  <Button variant="primary">Save</Button>
  <ButtonGroupSeparator />
  <Button variant="primary" size="icon" aria-label="More save options">
    <ChevronDown />
  </Button>
</ButtonGroup>
```

### Search bar — input + button

An `Input` as a direct child flexes to fill the remaining width. The button shares the group’s border and rounding, so the pair reads as one search bar rather than two separate controls.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'
import { Input } from '@bilazo/kito/components/input'
import { Search } from 'lucide-react'

<ButtonGroup className="w-full max-w-md" aria-label="Search">
  <Input placeholder="Search…" aria-label="Search query" />
  <Button variant="outline" aria-label="Search">
    <Search />
  </Button>
</ButtonGroup>
```

### Vertical — stepper

Two icon buttons stacked vertically, sharing a top/bottom border. Give the group `className="h-fit"` so it does not stretch to fill its parent.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'
import { Minus, Plus } from 'lucide-react'

<ButtonGroup orientation="vertical" className="h-fit" aria-label="Counter">
  <Button variant="outline" size="icon" aria-label="Increment">
    <Plus />
  </Button>
  <Button variant="outline" size="icon" aria-label="Decrement">
    <Minus />
  </Button>
</ButtonGroup>
```

### Nested groups

Nest a `ButtonGroup` inside another to create two visual clusters with a small gap between them. `has-[>[data-slot=button-group]]:gap-2` adds the gap automatically — no extra spacing class needed on the parent.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'

<ButtonGroup aria-label="Formatting">
  <ButtonGroup aria-label="Text style">
    <Button variant="outline" size="icon" aria-label="Bold">B</Button>
    <Button variant="outline" size="icon" aria-label="Italic">I</Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Actions">
    <Button variant="outline">Copy</Button>
    <Button variant="outline">Paste</Button>
  </ButtonGroup>
</ButtonGroup>
```

---

_Generated from `apps/web/src/content/button-group/meta.ts`. Do not edit directly._
