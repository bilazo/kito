# Menu

> A dropdown menu of commands or links.

A dropdown menu of commands or links. Opened by click, closed by Escape, outside click, or item activation. Base UI handles roving tabindex, arrow-key navigation, typeahead, and submenu opening — the visible parts are `MenuTrigger`, `MenuPopup`, and the item variants (`MenuItem`, `MenuLinkItem`, `MenuCheckboxItem`, `MenuRadioItem`). Checkbox and radio items keep the menu open by default (multi- or single-select affordances); regular items and links close it. `MenuShortcut` is a decorative hint — the actual keyboard handler lives elsewhere. Sides are physical (`top` / `right` / `bottom` / `left`); in an app that serves both LTR and RTL, pick the side from the current direction at the call site.

## Import

```tsx

import { Menu, MenuTrigger, MenuPopup, MenuItem, MenuLinkItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuGroup, MenuGroupLabel, MenuSeparator, MenuShortcut, MenuSub, MenuSubTrigger, MenuSubPopup } from '@bilazo/kito/components/menu'

```

## When to use

- A list of commands the user invokes — a row "⋮" menu, a user account menu, an editor toolbar overflow.

- Commands grouped by category — `MenuGroup` + `MenuGroupLabel` with `MenuSeparator` between groups.

- Commands with keyboard shortcuts shown as hints — `MenuShortcut` on the reading-end side.

- A menu of navigation links where the target is a route — use `MenuLinkItem` with `render` to keep the router integration.

- A menu with nested actions — `MenuSub` / `MenuSubTrigger` / `MenuSubPopup` opens a submenu on hover or keyboard activation.

- Multi-select toggles — `MenuCheckboxItem` keeps the menu open after each toggle.

- Single-select options — `MenuRadioGroup` + `MenuRadioItem` closes the menu on selection.

- Contextual actions triggered from a button or icon — not from a right-click (that would be `ContextMenu`, not built yet).

## When NOT to use

- For a list of values the user picks from and expects to see the current value — use `Select`. A menu is a list of commands; a select is a single-value control.

- For a rich panel with inputs, forms, cards, or images — use `Popover`. A menu is for click-to-invoke items, not for interactive content.

- For navigation between top-level pages — use a `<nav>` or tabs. A `Menu` of navigation links is fine inside a user menu, but a horizontal menu of page links is a nav bar in disguise.

- For a right-click context menu — not yet built. `Menu` opens on trigger click only; right-click support is a separate `ContextMenu` component.

- For a non-interactive list — use `Item` or a plain list. A menu is a command surface; using it for static content confuses the keyboard and a11y contract.

- Without a visible trigger that has an `aria-label` (when icon-only) — a bare `<MenuTrigger>` wrapping an icon is announced as "menu button" with no name; the icon must be the trigger’s label or the trigger must have `aria-label`.

- For a menu that should behave like a tab strip — use `Tabs`. A menu is a transient popup; tabs are persistent.

- As the only affordance for a critical action — a menu hides destructive actions one level down. Put the destructive button in plain sight when it is the primary action.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dir` | `'ltr' \| 'rtl'` | — | Direction on the popup subtree. The popup is **portaled to `document.body`**, so it does not inherit `dir` from any wrapper — pass it here when the page’s `<html dir="rtl">` is not set. Also reaches the `Positioner` so a submenu with `align="start"` aligns at the reading-start edge (right in RTL). Same portal exception as `MenuPopup` / `PopoverPopup` / `SelectPopup` / `ComboboxPopup` / `SheetPopup` / `DialogPopup` / `DrawerPopup`. `ContextMenuPopup` / `ContextMenuSubPopup` prop. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom' (MenuPopup) / 'right' (MenuSubPopup)` | Side of the trigger to place the popup on. Sides are **physical** — `left` / `right` do not flip in RTL. `MenuPopup` defaults to `bottom`; `MenuSubPopup` defaults to `right` (assumes LTR). In an RTL page, pass `side="left"` to `MenuSubPopup` — the `MenuSubTrigger` chevron flips automatically (`rtl:-scale-x-100`) to match, so the visual and the semantic direction stay aligned. `MenuPopup` / `MenuSubPopup` prop. |
| `sideOffset` | `number` | `6` | Gap between the trigger and the popup, in pixels. `MenuPopup` defaults to `6`; `MenuSubPopup` to `4` (submenus are usually tighter to their parent item). `MenuPopup` / `MenuSubPopup` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment along the cross axis. `MenuPopup` and `MenuSubPopup` default to `start` — menus anchor at the start of the trigger, not the center. `MenuPopup` / `MenuSubPopup` prop. |
| `alignOffset` | `number` | `0` | Offset along the alignment axis, in pixels. `MenuSubPopup` defaults to `-4` — a small negative offset lifts the submenu so its first item lines up with the parent item’s text rather than its frame. `MenuPopup` / `MenuSubPopup` prop. |
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual treatment. `destructive` renders the item in the destructive color — use for irreversible actions like Delete. Sets `data-variant` on the item for state-aware styling. `MenuItem` / `MenuLinkItem` prop. |
| `inset` | `boolean` | `false` | Adds `ps-8` (a start padding) so a plain menu item’s text aligns with the label of a `MenuCheckboxItem` or `MenuRadioItem` — those carry an indicator at the start, and without `inset` the plain items sit visually off-grid. `MenuItem` / `MenuLinkItem` prop. |
| `closeOnClick` | `boolean` | — | Whether the menu closes when the item is activated. `MenuLinkItem` and `MenuRadioItem` default to `true` — a link or a radio is a single activation. `MenuCheckboxItem` defaults to `false` — a checkbox group is multi-select, and reopening the menu per toggle is the wrong trade. Inherited from Base UI’s primitive. `MenuLinkItem` / `MenuCheckboxItem` / `MenuRadioItem` prop. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the menu from outside. Omit both for an uncontrolled menu. Inherited from Base UI’s `Menu.Root`. `Menu` prop. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger click, Escape, outside click, item activation, and submenu open/close. Inherited from Base UI’s `Menu.Root`. `Menu` prop. |
| `className` | `string` | — | Extra classes on any part. For `MenuPopup`, useful for a fixed width (`w-56`, `w-40`) — the default is `min-w-40` with content-driven growth. For `MenuItem`, per-instance alignment when `inset` is not quite right. |

Fifteen components compose. `Menu` (root) forwards to Base UI’s `Menu.Root` — it renders no DOM of its own (the `data-slot="menu"` prop it receives lands in the Root’s props, not on the DOM; a `[data-slot="menu"]` selector is not available). `MenuTrigger` opens the menu on click — use its `render` prop to render as a `Button` or another control. `MenuPopup` and `MenuSubPopup` are portaled to `document.body`; both default to `align: "start"` because menus anchor at the start of their trigger, not the center. `MenuItem` is a command — it fires `onClick` and closes the menu. `MenuLinkItem` renders a real `<a>` (`BaseMenu.LinkItem`), stays in the roving tab order, and closes the menu on activation (`closeOnClick` defaults to `true`); pass `render` to integrate with a router (`render={<Link to="/x" />}`). `MenuCheckboxItem` and `MenuRadioItem` wrap their indicator in a positioning `<span>` — Base UI’s `CheckboxItemIndicator` / `RadioItemIndicator` toggle their own `display` based on the item state, so they must not carry layout classes; putting `flex` on the indicator would override Base UI’s `display: none` and make the checkmark / dot permanently visible. Checkbox items keep the menu open (`closeOnClick: false`); radio items close it (`closeOnClick: true`). `MenuShortcut` is a decorative hint at `ms-auto` (logical start-auto) — the actual keyboard handler lives outside the component. `MenuSub` is a nested submenu; its chevron on `MenuSubTrigger` flips in RTL (`rtl:-scale-x-100`) so the visual matches the `side="left"` convention for RTL submenus. Sides are **physical** — `left` / `right` do not flip with `dir`. `MenuSubPopup` defaults to `side="right"` (LTR); in RTL, pass `side="left"` explicitly. `MenuGroup`, `MenuGroupLabel`, and `MenuSeparator` are pass-through wrappers. **Portal gotcha:** both popups are portaled, so `dir="rtl"` on an ancestor wrapper does not reach them — pass `dir="rtl"` on `MenuPopup` / `MenuSubPopup` when the page’s `<html dir="rtl">` is not set (same exception as `Tooltip` / `Popover` / `Select` / `Combobox` / `Sheet` / `Dialog` / `Drawer`). `menuItemStyles` and `menuPopupBase` live in `lib/menu-shared.tsx` and are shared with `ContextMenu` (not built yet). `MenuSide`, `MenuAlign`, and `MenuItemVariant` are exported as type-only aliases.

## Composition

### Basic command menu

The canonical pattern: `Menu` with a `MenuTrigger`, a `MenuPopup` with `MenuItem` children, and a `MenuSeparator` to divide destructive actions. Items close the menu on activation by default.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@bilazo/kito/components/menu'

<Menu>
  <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
  <MenuPopup>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuPopup>
</Menu>
```

### Icons and shortcuts

Menu items accept inline SVG icons. `MenuShortcut` renders a right-aligned hint — the actual key handling must be wired elsewhere (a global `keydown` listener or a command palette).

```tsx
import { MenuShortcut } from '@bilazo/kito/components/menu'
import { Edit } from 'lucide-react'

<MenuItem>
  <Edit />
  Rename
  <MenuShortcut>⌘R</MenuShortcut>
</MenuItem>
```

### Submenu

`MenuSub` / `MenuSubTrigger` / `MenuSubPopup` opens a nested menu on hover or keyboard activation. The default `side="right"` places it on the physical right of the parent item (assumes LTR); in an RTL page, pass `side="left"` — the chevron flips automatically to match via `rtl:-scale-x-100`.

```tsx
import { MenuItem, MenuSub, MenuSubPopup, MenuSubTrigger } from '@bilazo/kito/components/menu'

<MenuSub>
  <MenuSubTrigger>Share</MenuSubTrigger>
  <MenuSubPopup>
    <MenuItem>Email</MenuItem>
    <MenuItem>Copy link</MenuItem>
  </MenuSubPopup>
</MenuSub>

{/* In RTL — the chevron flips automatically */}
<MenuSubPopup side="left">…</MenuSubPopup>
```

### Checkbox items — multi-select

`MenuCheckboxItem` toggles one or many options and keeps the menu open (`closeOnClick: false` by default). Pair with `MenuSeparator` to group toggles.

```tsx
import { MenuCheckboxItem } from '@bilazo/kito/components/menu'
import { useState } from 'react'

export function ViewMenu() {
  const [showGrid, setShowGrid] = useState(true)
  return (
    <MenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
      Show grid
    </MenuCheckboxItem>
  )
}
```

### Radio items — single-select

`MenuRadioGroup` + `MenuRadioItem` for a single choice. Selecting an item closes the menu (`closeOnClick: true` by default) — a radio is a single activation.

```tsx
import { MenuGroupLabel, MenuRadioGroup, MenuRadioItem } from '@bilazo/kito/components/menu'

<MenuRadioGroup defaultValue="medium">
  <MenuGroupLabel>Size</MenuGroupLabel>
  <MenuRadioItem value="small">Small</MenuRadioItem>
  <MenuRadioItem value="medium">Medium</MenuRadioItem>
  <MenuRadioItem value="large">Large</MenuRadioItem>
</MenuRadioGroup>
```

### Link items — router integration

`MenuLinkItem` renders a real `<a>`, stays in the roving tab order, and closes the menu on activation. Pass `render` to integrate with any router — the component stays framework-agnostic.

```tsx
import { MenuLinkItem } from '@bilazo/kito/components/menu'

// Plain anchor
<MenuLinkItem href="/profile">Profile</MenuLinkItem>

// TanStack Router
import { Link } from '@tanstack/react-router'
<MenuLinkItem render={<Link to="/profile" />}>Profile</MenuLinkItem>
```

---

_Generated from `apps/web/src/content/menu/meta.ts`. Do not edit directly._
