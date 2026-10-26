# Navigation Menu

> A horizontal navigation bar with hoverable dropdowns.

A horizontal navigation bar with hoverable dropdowns. A single `NavigationMenu` renders one **shared viewport** — moving the pointer between two open triggers slides and resizes the panel rather than unmounting and remounting it, so the whole strip reads as a single menu instead of independent popovers. Built on Base UI’s `NavigationMenu` with `Portal` + `Positioner` + `Popup` + `Viewport` composed internally by `NavigationMenuPositioner` — consumers never wire that chain themselves. The trigger height (`h-9`) matches `Button`’s default so a nav bar and its adjacent actions line up.

## Import

```tsx

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuPositioner, navigationMenuTriggerStyle } from '@bilazo/kito/components/navigation-menu'

```

## When to use

- A top-level site navigation with dropdown sections — Products, Resources, Solutions — where each section reveals a panel with links.

- A marketing or documentation header where the dropdown content is richer than a plain list — icons, descriptions, multi-column layouts.

- A navigation bar where the pointer should slide between open panels instead of one panel closing before the next opens.

- A horizontal menu that must stay sticky under a header or scroll with a subnav — the trigger and the shared viewport layout handle both.

- A nav item that is a plain link (not a dropdown) — render an `<a>` or a router `Link` with `navigationMenuTriggerStyle()` so it visually matches the triggers.

- A bilingual app where the nav direction flips — every part uses logical properties (`ms-1`, `ps-*`) and the chevron rotates 180° (direction-agnostic), so RTL works without per-component code.

## When NOT to use

- For a single dropdown button that opens a command list — use `Menu`. `NavigationMenu` is for a horizontal strip of nav triggers sharing one viewport; a one-off action menu is a `Menu`.

- For a rich panel that the user clicks to open and dismisses by clicking outside — use `Popover`. `NavigationMenu` opens on hover and closes on pointer-leave, which is right for navigation and wrong for interactive content.

- For a vertical sidebar of links — use a `<nav>` with an `Item` list or a `Menu`. `NavigationMenu` is horizontal by design; its viewport math assumes a horizontal trigger strip.

- For a mobile nav that collapses into a drawer — use `Drawer` (or `Sheet`) triggered by a hamburger button. `NavigationMenu` does not collapse automatically; a mobile pattern needs its own affordance.

- For tabbed page content — use `Tabs`. Tabs switch content in place and stay persistent; `NavigationMenu` is a navigation strip whose panels are transient.

- Without router integration — the nav links must actually navigate. `NavigationMenuLink` renders an `<a>`, but to integrate with a router, pass `render={<Link to="…" />}`; without it, clicks trigger a full page reload.

- As the only way to reach critical pages on mobile — a hover-based nav is unusable on touch. Pair it with a mobile navigation pattern (drawer, bottom bar, or a visible menu button).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Horizontal alignment of the shared viewport relative to the active trigger. `start` anchors the viewport’s start edge to the trigger’s start edge — in LTR that is the trigger’s left, in RTL the trigger’s right (Base UI’s `Positioner` reads the direction from the `DirectionProvider` context). `center` and `end` follow the same logical convention. `NavigationMenu` prop. |
| `className` | `string` | — | Extra classes on `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, or `NavigationMenuLink`. Merged with the base classes via `cn()`. For `NavigationMenuContent`, use it for a fixed panel width (`w-80`, `w-96`) — the default is content-driven. For `NavigationMenu`, use it for a custom max-width or a container background. |

Eight components plus one helper compose. `NavigationMenu` (root) renders a `BaseNavMenu.Root` with the positioner as its last child. **`NavigationMenuPositioner` must be a separate component** — Base UI’s context reads through this component boundary, and a `NavigationMenuContent` opening inside a tree where the positioner is not mounted throws "NavigationMenu.Item parts must be used within NavigationMenuItem". `NavigationMenu` renders it automatically; the export is for advanced compositions only (a second nav with a different viewport, a custom positioner). `NavigationMenuPositioner` wraps `Portal` + `Positioner` + `Popup` + `Viewport` internally, and sets `align` / `side` / `sideOffset` defaults (`bottom`, `8`, `start`) — the shared viewport slides between triggers by animating `top` / `left` / `right` / `bottom` on the positioner, which is why pointer movement between two open triggers looks like one panel resizing rather than two independent popups. `NavigationMenuTrigger` renders a `<button>` with a chevron that rotates 180° when the panel is open (`group-data-popup-open/nav-trigger:rotate-180`) — the rotation is direction-agnostic (a 180° turn of a down-chevron is an up-chevron), so no `rtl:-scale-x-100` is needed. `NavigationMenuLink` renders a `BaseNavMenu.Link` (an `<a>`) — use it inside `NavigationMenuContent` for a card-style row, or directly inside `NavigationMenuItem` for a top-level nav link; the `in-data-[slot=navigation-menu-list]:` variants adjust the top-level shape (`h-9 px-3 py-1.5`) to match the trigger. `navigationMenuTriggerStyle` is the exported cva output so consumers can style their own anchor (a router `Link`) to look identical to a trigger. All parts use logical properties (`ms-1`, `ps-*`) so the whole component flips with the page direction. **Portal gotcha:** the positioner is portaled to `document.body`, so `dir="rtl"` on an ancestor wrapper does not reach it — Base UI’s `Positioner` computes `align` from the `DirectionProvider` context, which means the app must provide a `DirectionProvider` (the standard pattern is to mount it once near the app root, the same place `TooltipProvider` goes). Without it, `align="start"` aligns at the physical left in both directions.

## Composition

### Basic nav

A trigger with a content panel of links, plus plain `<a>` nav items styled with `navigationMenuTriggerStyle()` so they read as part of the same strip.

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@bilazo/kito/components/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-80 gap-1">
          <NavigationMenuLink href="/products/analytics">Analytics</NavigationMenuLink>
          <NavigationMenuLink href="/products/inbox">Inbox</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <a href="/pricing" className={navigationMenuTriggerStyle()}>
        Pricing
      </a>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Router integration

Use `render` on `NavigationMenuLink` (or `navigationMenuTriggerStyle()` on your own Link) to keep the router’s prefetching, client-side navigation, and active-state logic. The Kito component stays framework-agnostic.

```tsx
import { Link } from '@tanstack/react-router'
import { navigationMenuTriggerStyle } from '@bilazo/kito/components/navigation-menu'

// Top-level nav link with the trigger’s look
<Link to="/docs" className={navigationMenuTriggerStyle()}>
  Documentation
</Link>

// Inside the shared viewport
<NavigationMenuLink render={<Link to="/products/analytics" />}>
  Analytics
</NavigationMenuLink>
```

### With icons and descriptions

The shared viewport makes a rich panel natural — an icon in a soft-filled square, a bold label, a muted description. All three share the same hover and focus treatment via `NavigationMenuLink`.

```tsx
import { BarChart3 } from 'lucide-react'
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from '@bilazo/kito/components/navigation-menu'

<NavigationMenuContent>
  <div className="grid w-96 gap-1">
    <NavigationMenuLink href="/analytics">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <BarChart3 />
      </div>
      <div className="flex flex-col">
        <span className="font-medium">Analytics</span>
        <span className="text-xs text-muted-foreground">Realtime traffic and conversions.</span>
      </div>
    </NavigationMenuLink>
  </div>
</NavigationMenuContent>
```

### Multiple menus

Add a second `NavigationMenuItem` with its own trigger and content. The single shared viewport slides between them as the pointer moves — that is what makes the whole strip feel like one menu rather than a set of independent popovers.

```tsx
import { NavigationMenuItem, NavigationMenuTrigger } from '@bilazo/kito/components/navigation-menu'

<NavigationMenuItem>
  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
  <NavigationMenuContent>…</NavigationMenuContent>
</NavigationMenuItem>
```

---

_Generated from `apps/web/src/content/navigation-menu/meta.ts`. Do not edit directly._
