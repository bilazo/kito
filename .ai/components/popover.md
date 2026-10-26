# Popover

> A panel anchored to a trigger, opened by click.

A panel anchored to a trigger, opened by click. Unlike `Tooltip` — opens on click (not hover), stays open until dismissed (outside click, Escape, or an explicit `PopoverClose`), and its content is fully interactive: inputs, buttons, and links inside work as usual. The popup is portaled and its width defaults to `w-72`. The optional arrow is rendered as a `rotate-45` square with `data-side`-aware borders, so it points toward the trigger on any side. `PopoverHeader` bleeds to the popup edges via negative margins, so its `border-b` reads as a full-width divider rather than a padded bar.

## Import

```tsx

import { Popover, PopoverTrigger, PopoverClose, PopoverPopup, PopoverHeader, PopoverTitle, PopoverDescription } from '@bilazo/kito/components/popover'

```

## When to use

- A richer panel than a Tooltip — a user-info card, a small inline form, a "what's this" callout with a link.

- Click-triggered content that must stay open until dismissed — an account menu, a settings mini-panel, a filter form.

- Interactive popups where the user needs to read, type, or click inside — inputs and buttons inside are reachable by mouse and keyboard.

- An inline edit form anchored to the button that opens it — pair with `Field` and `Input`.

- A dismissable callout — `PopoverClose` in the header gives the user an explicit exit.

- A contextual action that needs a confirmation or a short form, without a full `Dialog` and its modal backdrop.

## When NOT to use

- For a short, non-interactive label — use `Tooltip`. A Popover that only shows text is a Tooltip with extra steps; it blocks a click, and it steals focus.

- For a list of commands — use `Menu`. A Popover with a list of buttons is a menu in disguise; `Menu` gives the right keyboard navigation (arrow keys, typeahead, Escape).

- For a blocking decision — use `Dialog`. A Popover does not trap focus or block the page; it is not the right shape for a modal confirmation.

- For a mobile-first bottom panel — use `Drawer` (or `Sheet` with `side="bottom"`). A Popover anchored to a small trigger is hard to hit on a narrow viewport.

- As the only place to show essential information — a Popover disappears; content that must be readable at a glance belongs on the page.

- Without a `PopoverTitle` — every popover needs an accessible name for screen readers. Base UI wires `PopoverTitle` to `aria-labelledby`; without one, the popup is announced as "dialog" with no context.

- Nested more than one level deep — a Popover inside a Popover is supported by Base UI but confuses focus and outside-click detection. Flatten the flow or use a `Dialog`.

- For content that must persist across route changes — use a route. A Popover lives in the render tree; navigation unmounts it.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Side of the trigger to place the popup on. The sides are **physical** — `left` / `right` do not flip in RTL. In an app that serves both LTR and RTL pages, choose the side from the current direction (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a logical alias. The arrow follows the side automatically. |
| `sideOffset` | `number` | `4` | Gap between the trigger and the popup, in pixels. `4` matches `Tooltip`, but a Popover usually wants a bit more breathing room — pass `8` for a wider gap. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the popup relative to the trigger along the cross axis. `center` matches `Tooltip`; use `start` / `end` for a popup that should anchor to one edge of the trigger (a user-info card anchored to the right edge of an avatar, for example). |
| `alignOffset` | `number` | `0` | Offset along the alignment axis, in pixels. |
| `showArrow` | `boolean` | `true` | Render a small arrow pointing at the trigger. The arrow is a `rotate-45` square whose two visible borders depend on which side the popup is on — the diamond reads as a triangle pointing toward the trigger. Set to `false` for a plain panel (an inline edit form, an anchored card with its own elevation). |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the popover from outside (an external button, a store, a route change). Omit both for an uncontrolled popover. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger click, `PopoverClose`, Escape, and outside click. |
| `modal` | `boolean` | `false` | Whether the popover traps focus and blocks interaction with the page behind it. Kito defaults to `false` — a Popover is an interactive panel, not a modal; the user may want to click a field on the page while the popover is open. Set to `true` for the rare case where the popover is a full-form dialog-lite. |
| `className` | `string` | — | Extra classes on any part. For `PopoverPopup`, useful for a width override (`w-80`, `w-96`) — the default is `w-72`. For `PopoverHeader`, use it to remove the full-width divider (the `border-b` and negative margins are the default header look). |

Seven components compose. `Popover` (root) forwards to Base UI’s `Popover.Root` — it renders no DOM of its own (the `data-slot="popover"` prop it receives lands in the Root’s props, not the DOM; a `[data-slot="popover"]` selector is not available). `PopoverTrigger` and `PopoverClose` are Base UI’s `Trigger`/`Close` with `data-slot`; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `PopoverPopup` is portaled to `document.body`, default width `w-72`, with a scale + fade animation from the positioner’s transform origin. `PopoverHeader` bleeds to the popup edges via `-mx-4 -mt-4` (canceling the popup’s `p-4`) — its `border-b` then reads as a full-width divider rather than an inset bar. **The negative margins depend on the popup NOT having `overflow: hidden`** — a future change that adds it would clip the header. `PopoverTitle` becomes `aria-labelledby` and `PopoverDescription` becomes `aria-describedby` on the popup automatically. `PopoverArrow` is internal; it uses `ArrowShape` from `tooltip/tooltip` for the shared diamond shape, and adds per-side border classes so the arrow points toward the trigger. Sides are **physical** — `left` / `right` do not flip in RTL, so an app serving both directions picks the side from the current direction at the call site. **Portal + RTL:** the popup is portaled to `document.body`, so `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir="rtl"` on `PopoverPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup` / `SelectPopup` / `ComboboxPopup`).

## Composition

### Basic

The canonical pattern: `Popover` with a `PopoverTrigger`, a `PopoverPopup` with a `PopoverHeader` (title + description) and body. The popup opens on click and stays open until the user clicks outside, presses Escape, or clicks a `PopoverClose`.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Show details</PopoverTrigger>
  <PopoverPopup>
    <PopoverHeader>
      <PopoverTitle>Your plan: Pro</PopoverTitle>
      <PopoverDescription>Based on the last 12 months of usage.</PopoverDescription>
    </PopoverHeader>
    <p className="text-sm text-muted-foreground">
      Pro includes unlimited projects, 100 GB storage, and priority support.
    </p>
  </PopoverPopup>
</Popover>
```

### Interactive form

Popover content is fully interactive — put a `Field` and `Input` inside for an inline edit form. Pair the cancel button with `PopoverClose` so the popup closes on cancel.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Edit name</PopoverTrigger>
  <PopoverPopup className="w-80">
    <PopoverHeader>
      <PopoverTitle>Display name</PopoverTitle>
      <PopoverDescription>Shown on your profile and comments.</PopoverDescription>
    </PopoverHeader>
    <Field name="name">
      <FieldLabel className="sr-only">Name</FieldLabel>
      <Input placeholder="Your name" />
    </Field>
    <div className="flex justify-end gap-2">
      <PopoverClose render={<Button variant="ghost" size="sm" />}>Cancel</PopoverClose>
      <Button size="sm">Save</Button>
    </div>
  </PopoverPopup>
</Popover>
```

### Dismissable callout

A `PopoverClose` rendered as a ghost icon button in the header gives the user an explicit way to dismiss — useful for onboarding tips and "what's this" panels.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>What is this?</PopoverTrigger>
  <PopoverPopup className="w-96">
    <div className="flex items-start justify-between gap-4">
      <PopoverHeader>
        <PopoverTitle>Real-time sync</PopoverTitle>
        <PopoverDescription>Changes propagate instantly.</PopoverDescription>
      </PopoverHeader>
      <PopoverClose render={<Button variant="ghost" size="icon-sm" aria-label="Dismiss" />}>
        {/* X icon */}
      </PopoverClose>
    </div>
    <p className="text-sm text-muted-foreground">
      Sync uses WebSocket for active sessions.
    </p>
  </PopoverPopup>
</Popover>
```

### Controlled

Pass `open` and `onOpenChange` to drive the open state from outside. The trigger stays inside `Popover` so Base UI knows what to anchor the popup to — but the state can be changed from anywhere (a store, an external button).

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'
import { useState } from 'react'

export function Controlled() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>
        <PopoverPopup>
          <PopoverTitle>Controlled</PopoverTitle>
        </PopoverPopup>
      </Popover>
      <Button onClick={() => setOpen((v) => !v)}>Toggle from outside</Button>
    </>
  )
}
```

### Without an arrow

Pass `showArrow={false}` for a plain panel. Use it when the popup opens flush against the trigger, or when the arrow would just add noise (an inline form, a settings mini-panel).

```tsx
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>No arrow</PopoverTrigger>
  <PopoverPopup showArrow={false} className="w-80">
    <PopoverHeader>
      <PopoverTitle>Without an arrow</PopoverTitle>
      <PopoverDescription>A plain panel for cases where a pointer would add noise.</PopoverDescription>
    </PopoverHeader>
  </PopoverPopup>
</Popover>
```

---

_Generated from `apps/web/src/content/popover/meta.ts`. Do not edit directly._
