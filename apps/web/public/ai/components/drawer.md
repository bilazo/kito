# Drawer

> A swipeable sheet anchored to one edge of the viewport.

A swipeable sheet anchored to one edge of the viewport. Shares Base UI’s Dialog primitive with `Sheet` — same focus trapping, scroll locking, Escape-to-close — but adds a gesture layer: drag to dismiss (Base UI handles the release threshold and the snap-back animation), `snapPoints` for discrete heights, and automatic nested-drawer stacking (each parent recedes one step when a child opens). `side` is **physical** (`left` / `right` / `top` / `bottom`) — unlike `Sheet`’s logical `start` / `end`, a `side="right"` drawer stays on the physical right even in RTL. This is intentional for the mobile action-sheet pattern, where the physical edge matters more than the reading direction. `variant="floating"` detaches left/right panels from the viewport edges on `md+`, for inspector panels.

## Import

```tsx

import { Drawer, DrawerTrigger, DrawerClose, DrawerBackdrop, DrawerPopup, DrawerHandle, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription } from '@bilazo/kito/components/drawer'

```

## When to use

- A mobile-first action sheet — `side="bottom"` (the default) with no swipe handle, actions in the footer as the only path.

- A dismissable panel that should respond to a swipe gesture — filters, a comment composer, an inspector that slides away with a flick.

- A multi-height drawer — `snapPoints` gives the user a "peek" state and a "full" state, with a drag between them.

- Nested flows — a detail view that opens from within a list, or a three-level drill-down — Drawer detects the nesting automatically and recedes the parent.

- An inspector panel that leaves the page partially visible — `variant="floating"` on `side="left"` or `side="right"` on `md+`.

- A form in a bottom sheet — `DrawerBody` keeps the header and footer pinned while the form scrolls.

- Anywhere the physical edge matters more than the reading direction — action sheets, navigation drawers, dismissable inspectors.

## When NOT to use

- For a blocking decision that must not be swiped away — use `Dialog` (centered) or `Sheet` (anchored, no gesture). Drawer’s swipe gesture is a feature, but it is also a hazard for destructive confirmations: a mis-swipe dismisses before the user confirms.

- For content that must use logical placement — use `Sheet`. `Sheet`’s `side="start"` / `side="end"` flip in RTL; Drawer’s `left` / `right` do not.

- For a fixed side panel that is always visible — use a `<div>` with `flex` layout. Drawer is modal and portaled.

- For a transient notification — use `Toast`. Drawer blocks interaction with the page behind it (by default); a toast does not.

- Without `DrawerTitle` — every drawer needs an accessible name via `aria-labelledby`. Base UI wires `DrawerTitle` automatically; without one, the dialog is announced as "dialog" with no context.

- On mobile without testing the swipe direction — Base UI’s `swipeDirection` is hardcoded physical per side. In an RTL page, a `side="right"` drawer is still swiped right to dismiss — test it before shipping.

- With three or more nested drawers — even four-level nesting (as `nested.tsx` shows) is a demo. Real flows should stay at two levels or move to a route.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Physical edge the drawer anchors to and the direction to swipe for dismissal. **Unlike `Sheet`, these are physical, not logical** — a `side="right"` drawer stays on the physical right in RTL. This is deliberate: the mobile action-sheet pattern reads better with a fixed physical edge. Set on `Drawer` (the root), not on `DrawerPopup` — the popup reads it from context. `Drawer` prop. |
| `variant` | `'flush' \| 'floating'` | `'flush'` | Visual treatment for `left` / `right` drawers on `md+` viewports. `flush` (default) anchors the panel to the viewport edge with only the inner corners rounded. `floating` insets the panel from the outer edge, top, and bottom (`md:top-3 md:bottom-3 md:{side}-3`), rounds all four corners, adds a soft shadow, and widens the panel (`md:w-96`). Use it for inspector or detail panels where the user benefits from glancing at the underlying list through the visible backdrop. **No effect** on `top` / `bottom` sides, and no effect below `md` — those always render flush. `Drawer` prop. |
| `showSwipeHandle` | `boolean` | `false` | Render a decorative drag-handle pill at the anchor edge. The gesture works without it — the handle is a visual hint only, sized and positioned by `side` (a 6px horizontal bar on `bottom` / `top`, a 6px vertical bar on `left` / `right`). Rendered via `DrawerHandle` with `aria-hidden`. `Drawer` prop. |
| `snapPoints` | `(string \| number)[]` | — | Multi-height states for the drawer. Each entry is a CSS length (`'31rem'`) or a viewport fraction between 0 and 1 (`0.5`, `1`). The user drags between them; the release snaps to the nearest point. When set, `max-h-[85vh]` is removed from the popup so `100%` works. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `defaultSnapPoint` | `string \| number` | — | Initial snap point for a controlled snap-point drawer. **Required when `snapPoints` is set** if you do not want the drawer to open at the *last* entry (often the full-height one). The value must exactly match one of the entries in `snapPoints`. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `modal` | `boolean \| 'trap-focus'` | `true` | Whether the drawer blocks interaction with the page behind it. `true` (default) → the viewport is `pointer-events-auto` and the page is blocked. `false` → the viewport is `pointer-events-none` and the page remains interactive. `'trap-focus'` traps focus without blocking the pointer. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the drawer from outside. Omit both for an uncontrolled drawer. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `dir` | `'ltr' \| 'rtl'` | — | Explicit direction on the popup. The popup is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set. Same gotcha as `SheetPopup` / `DialogPopup`. Available via `DrawerPopupBaseUiProps` (inherited from Base UI’s `Popup.Props`). `DrawerPopup` prop. |
| `className` | `string` | — | Extra classes on any part. For `DrawerBody`, use it to add padding (`p-6`) — the body is padding-free by default. For `DrawerPopup`, use it for a per-instance width (`w-96`) or a custom height. |

Eleven components compose. `Drawer` (root) reads `side`, `variant`, `modal`, and `showSwipeHandle` into a React context (`DrawerContext`) — the popup and handle subcomponents read from it, so consumers set these once on the root, **not** on `DrawerPopup`. This is a deliberate difference from `Sheet` (where `side` is on `SheetPopup`). The reason: Drawer has more root-level configuration (`snapPoints`, `defaultSnapPoint`, `showSwipeHandle`) and grouping all of it on the root keeps the popup focused on structure. `DrawerTrigger` and `DrawerClose` are Base UI’s primitives with `data-slot`. `DrawerBackdrop` fades via Base UI’s `--drawer-swipe-progress` (opacity tracks the drag) with `--drawer-overlay-min-opacity` keeping a floor when snap points are active. `DrawerPopup` is portaled and padding-free — the popup contains a `BaseDrawer.Viewport` (which carries the `pointer-events-*` classes per `modal`) wrapping the actual `BaseDrawer.Popup`. `DrawerHandle` is a decorative `aria-hidden` div sized/positioned per side. `DrawerHeader` and `DrawerFooter` have their own padding and are `shrink-0`; `DrawerBody` is the scrollable middle with `min-h-0 flex-1 overflow-y-auto overscroll-contain`. **No close button is rendered by default** — unlike `Sheet` and `Dialog`, Drawer expects the swipe gesture or a `DrawerClose` in the footer as the dismissal path. `DrawerTitle` becomes `aria-labelledby` and `DrawerDescription` becomes `aria-describedby` on the popup automatically. **Physical sides:** `side` is physical (`left`/`right`), not logical (`start`/`end`). The safe-area insets (`pb-[env(safe-area-inset-bottom)]`, etc.) and the swipe direction map are all physical. A `side="right"` drawer stays on the physical right in an RTL page — do not expect it to flip.

## Composition

### Basic bottom drawer

The canonical pattern: `Drawer` with `showSwipeHandle` on the root, a `DrawerTrigger`, a `DrawerPopup` with a `DrawerHeader` and `DrawerFooter`. `DrawerTitle` becomes the accessible name automatically. The default `side="bottom"` gives the mobile action-sheet shape.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>Drag down to dismiss, or use the buttons below.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="secondary" />}>Cancel</DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

### Snap points

Pass `snapPoints` with a `defaultSnapPoint` matching one entry — without `defaultSnapPoint`, the drawer opens at the **last** entry (often the full-height one). The user drags between the states; the release snaps to the nearest. `max-h-[85vh]` is removed from the popup when snap points are set, so `100%` works.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

const SNAP_POINTS = ['31rem', 1]

<Drawer snapPoints={SNAP_POINTS} defaultSnapPoint="31rem" showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Snap points</DrawerTitle>
      <DrawerDescription>Drag between peek and full height.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button>Close</Button>} />
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

### Floating inspector panel

For `side="left"` or `side="right"`, pass `variant="floating"` to detach the panel from the viewport edges on `md+`. The panel gets a small inset on the outer side, top, and bottom; all four corners rounded; a soft shadow; a slightly wider default. **No effect** on `top` / `bottom` sides, and no effect below `md`.

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer variant="floating" side="right">
  <DrawerTrigger render={<Button variant="outline" />}>Open inspector</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Customer details</DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="p-6">…</DrawerBody>
  </DrawerPopup>
</Drawer>
```

### Nested drawers

A `Drawer` opened from within another `Drawer` is detected automatically — the parent dims and recedes one step, the child opens above. Place the nested drawer inside the parent’s `DrawerPopup`. Base UI links them through the render tree. Even four-level nesting works; two levels is usually enough for real flows.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button />}>Open level 1</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Level 1</DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="p-6">
      <Drawer showSwipeHandle>
        <DrawerTrigger render={<Button />}>Open level 2</DrawerTrigger>
        <DrawerPopup>
          <DrawerHeader>
            <DrawerTitle>Level 2</DrawerTitle>
          </DrawerHeader>
        </DrawerPopup>
      </Drawer>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

### Action sheet

`side="bottom"` (the default) with no swipe handle is the standard action sheet: a short panel from the bottom with the footer actions as the only path. A destructive action should carry `variant="destructive"` on its button.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Delete lesson</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Delete lesson 42?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
      <Button variant="destructive">Delete</Button>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

---

_Generated from `apps/web/src/content/drawer/meta.ts`. Do not edit directly._
