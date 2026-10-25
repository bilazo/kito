import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Menu',
    'MenuTrigger',
    'MenuPopup',
    'MenuItem',
    'MenuLinkItem',
    'MenuCheckboxItem',
    'MenuRadioGroup',
    'MenuRadioItem',
    'MenuGroup',
    'MenuGroupLabel',
    'MenuSeparator',
    'MenuShortcut',
    'MenuSub',
    'MenuSubTrigger',
    'MenuSubPopup',
  ],

  summary:
    'A dropdown menu of commands or links. Opened by click, closed by Escape, outside click, or item activation. Base UI handles roving tabindex, arrow-key navigation, typeahead, and submenu opening — the visible parts are `MenuTrigger`, `MenuPopup`, and the item variants (`MenuItem`, `MenuLinkItem`, `MenuCheckboxItem`, `MenuRadioItem`). Checkbox and radio items keep the menu open by default (multi- or single-select affordances); regular items and links close it. `MenuShortcut` is a decorative hint — the actual keyboard handler lives elsewhere. Sides are physical (`top` / `right` / `bottom` / `left`); in an app that serves both LTR and RTL, pick the side from the current direction at the call site.',

  whenToUse: [
    'A list of commands the user invokes — a row "⋮" menu, a user account menu, an editor toolbar overflow.',
    'Commands grouped by category — `MenuGroup` + `MenuGroupLabel` with `MenuSeparator` between groups.',
    'Commands with keyboard shortcuts shown as hints — `MenuShortcut` on the reading-end side.',
    'A menu of navigation links where the target is a route — use `MenuLinkItem` with `render` to keep the router integration.',
    'A menu with nested actions — `MenuSub` / `MenuSubTrigger` / `MenuSubPopup` opens a submenu on hover or keyboard activation.',
    'Multi-select toggles — `MenuCheckboxItem` keeps the menu open after each toggle.',
    'Single-select options — `MenuRadioGroup` + `MenuRadioItem` closes the menu on selection.',
    'Contextual actions triggered from a button or icon — not from a right-click (that would be `ContextMenu`, not built yet).',
  ],

  whenNotToUse: [
    'For a list of values the user picks from and expects to see the current value — use `Select`. A menu is a list of commands; a select is a single-value control.',
    'For a rich panel with inputs, forms, cards, or images — use `Popover`. A menu is for click-to-invoke items, not for interactive content.',
    'For navigation between top-level pages — use a `<nav>` or tabs. A `Menu` of navigation links is fine inside a user menu, but a horizontal menu of page links is a nav bar in disguise.',
    'For a right-click context menu — not yet built. `Menu` opens on trigger click only; right-click support is a separate `ContextMenu` component.',
    'For a non-interactive list — use `Item` or a plain list. A menu is a command surface; using it for static content confuses the keyboard and a11y contract.',
    'Without a visible trigger that has an `aria-label` (when icon-only) — a bare `<MenuTrigger>` wrapping an icon is announced as "menu button" with no name; the icon must be the trigger’s label or the trigger must have `aria-label`.',
    'For a menu that should behave like a tab strip — use `Tabs`. A menu is a transient popup; tabs are persistent.',
    'As the only affordance for a critical action — a menu hides destructive actions one level down. Put the destructive button in plain sight when it is the primary action.',
  ],

  props: [
    {
      name: 'side',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'bottom' (MenuPopup) / 'right' (MenuSubPopup)",
      description:
        'Side of the trigger to place the popup on. Sides are **physical** — `left` / `right` do not flip in RTL. `MenuPopup` defaults to `bottom`; `MenuSubPopup` defaults to `right` (assumes LTR). In an RTL page, pass `side="left"` to `MenuSubPopup` — the `MenuSubTrigger` chevron flips automatically (`rtl:-scale-x-100`) to match, so the visual and the semantic direction stay aligned. `MenuPopup` / `MenuSubPopup` prop.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '6',
      description:
        'Gap between the trigger and the popup, in pixels. `MenuPopup` defaults to `6`; `MenuSubPopup` to `4` (submenus are usually tighter to their parent item). `MenuPopup` / `MenuSubPopup` prop.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'start'",
      description:
        'Alignment along the cross axis. `MenuPopup` and `MenuSubPopup` default to `start` — menus anchor at the start of the trigger, not the center. `MenuPopup` / `MenuSubPopup` prop.',
    },
    {
      name: 'alignOffset',
      type: 'number',
      default: '0',
      description:
        'Offset along the alignment axis, in pixels. `MenuSubPopup` defaults to `-4` — a small negative offset lifts the submenu so its first item lines up with the parent item’s text rather than its frame. `MenuPopup` / `MenuSubPopup` prop.',
    },
    {
      name: 'variant',
      type: "'default' | 'destructive'",
      default: "'default'",
      description:
        'Visual treatment. `destructive` renders the item in the destructive color — use for irreversible actions like Delete. Sets `data-variant` on the item for state-aware styling. `MenuItem` / `MenuLinkItem` prop.',
    },
    {
      name: 'inset',
      type: 'boolean',
      default: 'false',
      description:
        'Adds `ps-8` (a start padding) so a plain menu item’s text aligns with the label of a `MenuCheckboxItem` or `MenuRadioItem` — those carry an indicator at the start, and without `inset` the plain items sit visually off-grid. `MenuItem` / `MenuLinkItem` prop.',
    },
    {
      name: 'closeOnClick',
      type: 'boolean',
      description:
        'Whether the menu closes when the item is activated. `MenuLinkItem` and `MenuRadioItem` default to `true` — a link or a radio is a single activation. `MenuCheckboxItem` defaults to `false` — a checkbox group is multi-select, and reopening the menu per toggle is the wrong trade. Inherited from Base UI’s primitive. `MenuLinkItem` / `MenuCheckboxItem` / `MenuRadioItem` prop.',
    },
    {
      name: 'open',
      type: 'boolean',
      description:
        'Controlled open state. Pass with `onOpenChange` to drive the menu from outside. Omit both for an uncontrolled menu. Inherited from Base UI’s `Menu.Root`. `Menu` prop.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean, eventDetails: ...) => void',
      description:
        'Change callback. Fires on trigger click, Escape, outside click, item activation, and submenu open/close. Inherited from Base UI’s `Menu.Root`. `Menu` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part. For `MenuPopup`, useful for a fixed width (`w-56`, `w-40`) — the default is `min-w-40` with content-driven growth. For `MenuItem`, per-instance alignment when `inset` is not quite right.',
    },
  ],

  propsNote:
    'Fifteen components compose. `Menu` (root) forwards to Base UI’s `Menu.Root` — it renders no DOM of its own (the `data-slot="menu"` prop it receives lands in the Root’s props, not on the DOM; a `[data-slot="menu"]` selector is not available). `MenuTrigger` opens the menu on click — use its `render` prop to render as a `Button` or another control. `MenuPopup` and `MenuSubPopup` are portaled to `document.body`; both default to `align: "start"` because menus anchor at the start of their trigger, not the center. `MenuItem` is a command — it fires `onClick` and closes the menu. `MenuLinkItem` renders a real `<a>` (`BaseMenu.LinkItem`), stays in the roving tab order, and closes the menu on activation (`closeOnClick` defaults to `true`); pass `render` to integrate with a router (`render={<Link to="/x" />}`). `MenuCheckboxItem` and `MenuRadioItem` wrap their indicator in a positioning `<span>` — Base UI’s `CheckboxItemIndicator` / `RadioItemIndicator` toggle their own `display` based on the item state, so they must not carry layout classes; putting `flex` on the indicator would override Base UI’s `display: none` and make the checkmark / dot permanently visible. Checkbox items keep the menu open (`closeOnClick: false`); radio items close it (`closeOnClick: true`). `MenuShortcut` is a decorative hint at `ms-auto` (logical start-auto) — the actual keyboard handler lives outside the component. `MenuSub` is a nested submenu; its chevron on `MenuSubTrigger` flips in RTL (`rtl:-scale-x-100`) so the visual matches the `side="left"` convention for RTL submenus. Sides are **physical** — `left` / `right` do not flip with `dir`. `MenuSubPopup` defaults to `side="right"` (LTR); in RTL, pass `side="left"` explicitly. `MenuGroup`, `MenuGroupLabel`, and `MenuSeparator` are pass-through wrappers. **Portal gotcha:** both popups are portaled, so `dir="rtl"` on an ancestor wrapper does not reach them — pass `dir="rtl"` on `MenuPopup` / `MenuSubPopup` when the page’s `<html dir="rtl">` is not set (same exception as `Tooltip` / `Popover` / `Select` / `Combobox` / `Sheet` / `Dialog` / `Drawer`). `menuItemStyles` and `menuPopupBase` live in `lib/menu-shared.tsx` and are shared with `ContextMenu` (not built yet). `MenuSide`, `MenuAlign`, and `MenuItemVariant` are exported as type-only aliases.',

  composition: [
    {
      title: 'Basic command menu',
      description:
        'The canonical pattern: `Menu` with a `MenuTrigger`, a `MenuPopup` with `MenuItem` children, and a `MenuSeparator` to divide destructive actions. Items close the menu on activation by default.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@bilazo/kito/components/menu'\n\n<Menu>\n  <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>\n  <MenuPopup>\n    <MenuItem>Rename</MenuItem>\n    <MenuItem>Duplicate</MenuItem>\n    <MenuSeparator />\n    <MenuItem variant="destructive">Delete</MenuItem>\n  </MenuPopup>\n</Menu>`,
    },
    {
      title: 'Icons and shortcuts',
      description:
        'Menu items accept inline SVG icons. `MenuShortcut` renders a right-aligned hint — the actual key handling must be wired elsewhere (a global `keydown` listener or a command palette).',
      code: `import { MenuShortcut } from '@bilazo/kito/components/menu'\nimport { Edit } from 'lucide-react'\n\n<MenuItem>\n  <Edit />\n  Rename\n  <MenuShortcut>⌘R</MenuShortcut>\n</MenuItem>`,
    },
    {
      title: 'Submenu',
      description:
        '`MenuSub` / `MenuSubTrigger` / `MenuSubPopup` opens a nested menu on hover or keyboard activation. The default `side="right"` places it on the physical right of the parent item (assumes LTR); in an RTL page, pass `side="left"` — the chevron flips automatically to match via `rtl:-scale-x-100`.',
      code: `import { MenuItem, MenuSub, MenuSubPopup, MenuSubTrigger } from '@bilazo/kito/components/menu'\n\n<MenuSub>\n  <MenuSubTrigger>Share</MenuSubTrigger>\n  <MenuSubPopup>\n    <MenuItem>Email</MenuItem>\n    <MenuItem>Copy link</MenuItem>\n  </MenuSubPopup>\n</MenuSub>\n\n{/* In RTL — the chevron flips automatically */}\n<MenuSubPopup side="left">…</MenuSubPopup>`,
    },
    {
      title: 'Checkbox items — multi-select',
      description:
        '`MenuCheckboxItem` toggles one or many options and keeps the menu open (`closeOnClick: false` by default). Pair with `MenuSeparator` to group toggles.',
      code: `import { MenuCheckboxItem } from '@bilazo/kito/components/menu'\nimport { useState } from 'react'\n\nexport function ViewMenu() {\n  const [showGrid, setShowGrid] = useState(true)\n  return (\n    <MenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>\n      Show grid\n    </MenuCheckboxItem>\n  )\n}`,
    },
    {
      title: 'Radio items — single-select',
      description:
        '`MenuRadioGroup` + `MenuRadioItem` for a single choice. Selecting an item closes the menu (`closeOnClick: true` by default) — a radio is a single activation.',
      code: `import { MenuGroupLabel, MenuRadioGroup, MenuRadioItem } from '@bilazo/kito/components/menu'\n\n<MenuRadioGroup defaultValue="medium">\n  <MenuGroupLabel>Size</MenuGroupLabel>\n  <MenuRadioItem value="small">Small</MenuRadioItem>\n  <MenuRadioItem value="medium">Medium</MenuRadioItem>\n  <MenuRadioItem value="large">Large</MenuRadioItem>\n</MenuRadioGroup>`,
    },
    {
      title: 'Link items — router integration',
      description:
        '`MenuLinkItem` renders a real `<a>`, stays in the roving tab order, and closes the menu on activation. Pass `render` to integrate with any router — the component stays framework-agnostic.',
      code: `import { MenuLinkItem } from '@bilazo/kito/components/menu'\n\n// Plain anchor\n<MenuLinkItem href="/profile">Profile</MenuLinkItem>\n\n// TanStack Router\nimport { Link } from '@tanstack/react-router'\n<MenuLinkItem render={<Link to="/profile" />}>Profile</MenuLinkItem>`,
    },
  ],
}
