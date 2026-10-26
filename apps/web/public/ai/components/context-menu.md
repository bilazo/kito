# Context Menu

> A menu of actions triggered by right-click.

A menu of actions triggered by right-click. Shares its primitive with `Menu` — the same roving tabindex, arrow-key navigation, typeahead, and submenu opening — only the trigger differs: right-click opens the menu at the **pointer**, not below a button. The main popup opens at the cursor position, so it has no `side` or `align` props; only the submenu popup has them. Item types mirror `Menu` — `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup` + `ContextMenuRadioItem`, plus `ContextMenuGroup` / `ContextMenuGroupLabel` / `ContextMenuSeparator` / `ContextMenuShortcut` / `ContextMenuSub` for structure.

## Import

```tsx

import { ContextMenu, ContextMenuTrigger, ContextMenuPopup, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuGroup, ContextMenuGroupLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubPopup } from '@bilazo/kito/components/context-menu'

```

## When to use

- Actions on an object the user has already focused with a right-click — a file row, a table cell, an image thumbnail, a canvas element.

- A tree or list view where each node exposes contextual actions via right-click — rename, duplicate, delete.

- Rich content where a visible menu button would clutter the surface — a text editor, a board or canvas.

- File or media management — quick actions on a card or a tile that would otherwise need a hover menu.

- An app that mimics the OS convention for right-click — desktop-style or editor-style interfaces where users expect a context menu on secondary click.

## When NOT to use

- For a menu triggered by a visible button — use `Menu`. A `ContextMenu` requires a right-click, which touch users cannot perform.

- On touch devices as the only way to reach actions — mobile has no right-click. Pair it with a long-press or a visible overflow menu (`Menu` with a "⋯" trigger).

- For primary navigation — use `NavigationMenu` or a real nav strip. A context menu hides behind a gesture and cannot be the primary path.

- For a menu whose items are links to routes — use `Menu` with `MenuLinkItem`. A right-click menu on a link is confusing; use the browser’s native link menu.

- As a replacement for a toolbar — visible actions beat hidden ones. A context menu is supplementary; the primary actions should be discoverable.

- For destructive actions without a confirmation — a right-click Delete with no undo is a foot-gun. Pair destructive context items with a `Dialog` confirmation or an undo `Toast`.

- Without a right-click affordance on the region — some users do not try right-click. If the actions are essential, expose them with a visible button too.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dir` | `'ltr' \| 'rtl'` | — | Direction on the popup subtree. The popup is **portaled to `document.body`**, so it does not inherit `dir` from any wrapper — pass it here when the page’s `<html dir="rtl">` is not set. Also reaches the `Positioner` so a submenu with `align="start"` aligns at the reading-start edge (right in RTL). Same portal exception as `MenuPopup` / `PopoverPopup` / `SelectPopup` / `ComboboxPopup` / `SheetPopup` / `DialogPopup` / `DrawerPopup`. `ContextMenuPopup` / `ContextMenuSubPopup` prop. |
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual treatment. `destructive` renders the item in the destructive color — use for irreversible actions like Delete. The item also tints its background (`bg-destructive/10`) on highlight. `ContextMenuItem` prop. |
| `inset` | `boolean` | `false` | Adds `ps-8` (a start padding) so a plain item’s text aligns with the label of a `ContextMenuCheckboxItem` or `ContextMenuRadioItem` — those carry an indicator at the start, and without `inset` the plain items sit off-grid. `ContextMenuItem` prop. |
| `closeOnClick` | `boolean` | — | Whether the menu closes when the item is activated. `ContextMenuCheckboxItem` defaults to `false` (a checkbox group is multi-select — reopening the menu per toggle is the wrong trade). `ContextMenuRadioItem` defaults to `true` (a radio is single-select — leaving the menu open strands the user). Inherited from Base UI’s primitive. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right' (ContextMenuSubPopup)` | Side of the parent item to place the **submenu** on. Sides are **physical** — `left` / `right` do not flip in RTL. The default is `right` (assumes LTR); in an RTL page pass `side="left"` — the chevron flips automatically via `rtl:-scale-x-100` to match. The **main** context menu popup has no `side` prop — it opens at the cursor. `ContextMenuSubPopup` prop. |
| `sideOffset` | `number` | `4` | Gap between the parent item and the submenu, in pixels. `ContextMenuSubPopup` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment of the submenu along the cross axis. `start` anchors at the parent item’s start edge. `ContextMenuSubPopup` prop. |
| `alignOffset` | `number` | `-4` | Offset along the alignment axis. `-4` lifts the submenu so its first item lines up with the parent item’s text rather than its frame. `ContextMenuSubPopup` prop. |
| `className` | `string` | — | Extra classes on any part. For `ContextMenuTrigger`, useful for sizing the right-click area (`h-32`, `p-6`). For `ContextMenuPopup`, useful for a fixed width (`w-48`) — the default is `min-w-40` with content-driven growth. |

Fourteen components compose. `ContextMenu` (root) forwards to Base UI’s `ContextMenu.Root` — it renders no DOM of its own. `ContextMenuTrigger` renders a `BaseContextMenu.Trigger` (usually a `<div>`) with `select-none` baked in so right-clicking does not start a text selection under the menu. `ContextMenuPopup` is portaled to `document.body` and **opens at the cursor** — it has no `side` / `align` props because it follows the pointer, not a trigger. `ContextMenuSubPopup` **does** have `side` / `align` / `sideOffset` / `alignOffset` because the submenu anchors to a parent item. The item types mirror `Menu` exactly — `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup` + `ContextMenuRadioItem` — and all reuse `menuItemStyles` from `lib/menu-shared.tsx`, so the highlight, hover, disabled, and destructive states are the same across Menu, ContextMenu, and the future Menubar. The checkbox and radio indicators wrap Base UI’s `CheckboxItemIndicator` / `RadioItemIndicator` in a positioning `<span>` — Base UI’s indicators toggle their own `display`, so putting `flex` on them directly would keep them permanently visible. `ContextMenuShortcut` uses `ms-auto` (logical) so the hint sits at the reading-end side in both LTR and RTL. `ContextMenuSubTrigger`’s chevron flips via `rtl:-scale-x-100` to match the `side="left"` convention for RTL submenus. **No `LinkItem`** — a right-click menu on a link is confusing, and Base UI’s `ContextMenu` has no `LinkItem` primitive. For a menu with links, use `Menu` + `MenuLinkItem`. `ContextMenuGroup`, `ContextMenuGroupLabel`, `ContextMenuSeparator`, and `ContextMenuSub` are pass-through wrappers. **Portal gotcha:** both popups are portaled, so `dir="rtl"` on an ancestor wrapper does not reach them — pass `dir="rtl"` on the popup directly. `menuPopupBase` and `menuItemStyles` live in `lib/menu-shared.tsx` and are shared with `Menu` (and the future `Menubar`). `ContextMenuSide`, `ContextMenuAlign`, and `ContextMenuItemVariant` are re-exported as type-only aliases from `menu-shared`.

## Composition

### Basic

The canonical pattern: wrap the area the menu applies to in `ContextMenuTrigger`, put a `ContextMenuPopup` with `ContextMenuItem` children. The menu opens at the cursor on right-click, closes on Escape or outside click.

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border">
    Right-click anywhere in this box
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuItem>Reload</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

### With icons and shortcuts

Item icons render at the start, `ContextMenuShortcut` at the end. The shortcut is decorative — the actual handler is wired elsewhere (a global keydown listener).

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { Copy, Pencil } from 'lucide-react'

<ContextMenu>
  <ContextMenuTrigger>Right-click</ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuItem>
      <Pencil />
      Rename
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Copy />
      Duplicate
      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

### Checkbox items — multi-select

`ContextMenuCheckboxItem` toggles one or many options and keeps the menu open (`closeOnClick: false` by default) — a checkbox group is multi-select.

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuPopup,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { useState } from 'react'

function ViewMenu() {
  const [showGrid, setShowGrid] = useState(true)
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right-click</ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show grid
        </ContextMenuCheckboxItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
```

### Submenu

`ContextMenuSub` / `ContextMenuSubTrigger` / `ContextMenuSubPopup` opens a nested menu on hover or keyboard activation. The default `side="right"` places it on the physical right of the parent item; in RTL, pass `side="left"` — the chevron flips automatically.

```tsx
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
} from '@bilazo/kito/components/context-menu'

<ContextMenuSub>
  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
  <ContextMenuSubPopup>
    <ContextMenuItem>Email</ContextMenuItem>
    <ContextMenuItem>Copy link</ContextMenuItem>
  </ContextMenuSubPopup>
</ContextMenuSub>
```

### With groups and shortcuts

Group related items with `ContextMenuGroup` + `ContextMenuGroupLabel`, and separate groups with `ContextMenuSeparator`. Shortcut hints on individual items complete the OS-style menu look.

```tsx
import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'

<ContextMenu>
  <ContextMenuTrigger>Right-click</ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuGroup>
      <ContextMenuGroupLabel>Edit</ContextMenuGroupLabel>
      <ContextMenuItem>
        Cut
        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Copy
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

---

_Generated from `apps/web/src/content/context-menu/meta.ts`. Do not edit directly._
