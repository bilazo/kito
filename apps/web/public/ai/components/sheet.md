# Sheet

> A slide-in panel anchored to one edge of the viewport.

A slide-in panel anchored to one edge of the viewport. Shares its primitive with `Dialog` — the same focus trapping, scroll locking, Escape-to-close, and outside-click-to-close behavior — only the shell differs: Dialog is centered, Sheet is anchored. `side` accepts logical values (`start`, `end`) so the panel flips automatically in RTL, plus the physical `top` and `bottom` for action sheets. The popup is padding-free on purpose: padding lives on each section (`SheetHeader`, `SheetFooter`, or a `className` on `SheetBody`), so full-bleed content (an image, a divider, a table) can sit edge-to-edge between the header and the footer.

## Import

```tsx

import { Sheet, SheetTrigger, SheetClose, SheetBackdrop, SheetPopup, SheetHeader, SheetFooter, SheetBody, SheetTitle, SheetDescription } from '@bilazo/kito/components/sheet'

```

## When to use

- A secondary surface that opens from the side without leaving the page — settings, a filter panel, a detail view, an edit form.

- A navigation drawer on small screens — `side="start"` with a list of links, close on each link click.

- An action sheet on mobile — `side="bottom"` with `showCloseButton={false}`, actions in the footer as the only path.

- A form that should not block the page — sign-in, profile edit, a create modal where the trigger page stays visible.

- A long scrolling surface (terms of service, an article) — `SheetBody` keeps the header and footer pinned while the middle scrolls.

- Full-bleed content — an image or a table that must touch the edges of the panel (possible because the popup has no padding of its own).

## When NOT to use

- For a blocking decision the user must acknowledge — use `Dialog` (centered) instead. A centered modal says "stop and decide"; a sheet says "work on the side".

- For a short confirmation with one or two actions — use `Dialog`. A side sheet for a two-button confirm leaves a large empty panel; a centered dialog is the tighter shape.

- For content that belongs to the page and should be reachable without a close — use an inline route or a section on the page. Sheets are modal; a consumer who wants to keep the content open has to reopen it.

- For navigation that must be deep-linkable — use the router (`Link`, `Route`). Sheets do not create URLs; two users who both open a sheet cannot share a link to it.

- Without `SheetTitle` — every sheet needs an accessible name (`aria-labelledby` on the popup). Base UI wires `SheetTitle` to it automatically; without one, the dialog has no name for screen readers.

- With more than three or four nav items inside a `side="start"` — the sheet becomes a full page in disguise. Use a real route + page.

- Inside another modal — nesting a Sheet inside a Dialog (or another Sheet) is supported by Base UI but rarely the right shape. Prefer a single-level modal.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'start' \| 'end' \| 'top' \| 'bottom'` | `'end'` | Which edge the panel anchors to. `start` is the inline-start edge (left in LTR, right in RTL); `end` is the inline-end edge (right in LTR, left in RTL) — the default for the classic side panel. `top` and `bottom` are physical edges, used for action sheets and notifications. The panel flips automatically in RTL via logical CSS properties (`inset-inline-start`, `border-s`/`border-e`, `rounded-s`/`rounded-e`); only the enter/exit transforms need an explicit `rtl:` override because `translate-x` is a physical axis. `SheetPopup` prop. |
| `showCloseButton` | `boolean` | `true` | Render a close (×) button in the top-end corner. Set to `false` for action sheets or confirmations where the footer actions are the only affordance. When `false`, the header’s default `pe-12` still reserves the space — override with `pe-6` on `SheetHeader` if you want the padding back. `SheetPopup` prop. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the state from outside (a route param, a store). Omit both for an uncontrolled sheet (then use `defaultOpen`). Inherited from Base UI’s `Dialog.Root`. `Sheet` prop. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger, close button, Escape, and backdrop click. `Sheet` prop. |
| `modal` | `boolean` | `true` | Whether the sheet blocks interaction with the page behind it. `false` allows interacting with the page while the panel stays open (useful for a side panel over a map or a canvas). Inherited from Base UI’s `Dialog.Root`. `Sheet` prop. |
| `dir` | `'ltr' \| 'rtl'` | — | Explicit direction. The sheet is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set (for example, a localized preview or a Storybook demo). In a real Persian app, `<html dir="rtl">` covers it and this prop is not needed. `SheetPopup` prop. |
| `className` | `string` | — | Extra classes on any part. For `SheetBody`, use it to add padding (`p-6`) when the panel is not full-bleed — `SheetBody` is padding-free by default. For `SheetPopup`, use it for a per-instance width (`w-96`) or a custom height. |

Ten components compose. `Sheet` (root) renders no DOM of its own — it forwards to Base UI’s `Dialog.Root` and manages the open state. `SheetTrigger` and `SheetClose` are Base UI’s `Trigger`/`Close` with `data-slot` for targeting; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `SheetBackdrop` and `SheetPopup` are portaled to `document.body` — `SheetBackdrop` is rendered automatically by `SheetPopup`, and `SheetPopup` renders its children **plus** an optional close button (last in DOM, so it appears in the tab order after the footer). `SheetBody` has no default padding on purpose: the popup is padding-free so consumers can insert full-bleed content (an image, a divider, a table) between the padded header and footer, and so the scrollbar touches the panel edge rather than floating inside a padded shell — add padding with `className` when full-bleed is not needed. `SheetBody` also carries the critical `min-h-0 flex-1 overflow-y-auto` trio — without `min-h-0`, the flex child grows to fit its content and `overflow-y-auto` never engages. `SheetHeader`/`SheetFooter` are plain `<div>`s with no own props. `SheetTitle`/`SheetDescription` are wired to the popup via `aria-labelledby` / `aria-describedby` automatically — no manual ARIA is needed. **Portal gotcha:** because the popup is portaled, `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir` on `SheetPopup` when the page’s `<html dir="rtl">` is not set. `SheetSide` is exported as a type-only alias (not a value).

## Composition

### Basic side sheet

The canonical pattern: `Sheet` with a `SheetTrigger`, a `SheetPopup` with a `SheetHeader` (title + description) and a `SheetFooter` (actions). The default `side="end"` anchors the panel to the inline-end edge — right in LTR, left in RTL.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open settings</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Changes are saved immediately.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

### With a form

Pair the sheet with `Field` and `Input` inside `SheetBody`. `SheetBody`’s `flex-1` pushes the footer to the bottom; header and footer stay pinned while the form scrolls if it grows.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

<Sheet>
  <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Update your account details.</SheetDescription>
    </SheetHeader>
    <SheetBody className="flex flex-col gap-4 p-6">
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Your name" />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
    </SheetBody>
    <SheetFooter>
      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

### Action sheet

`side="bottom"` with `showCloseButton={false}` gives the mobile action-sheet pattern: a short panel from the bottom, footer actions as the only path. Pair destructive actions with a `Button variant="destructive"`.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Delete lesson</SheetTrigger>
  <SheetPopup side="bottom" showCloseButton={false}>
    <SheetHeader>
      <SheetTitle>Delete lesson 42?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. All progress will be lost.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
      <Button variant="destructive">Delete</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

### Navigation drawer

A slide-in menu on small screens. `side="start"` anchors to the inline-start edge (left in LTR, right in RTL). Each nav item is wrapped in `SheetClose` with `render={<a />}` so clicking closes the sheet — an anchor is the trigger, and `SheetClose` provides the close behavior without stealing the anchor’s semantics.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/settings', label: 'Settings' },
]

<Sheet>
  <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
    {/* menu icon */}
  </SheetTrigger>
  <SheetPopup side="start">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <SheetBody className="flex flex-col gap-2 px-2">
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <SheetClose
            key={item.href}
            render={<a href={item.href} />}
            className="rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            {item.label}
          </SheetClose>
        ))}
      </nav>
    </SheetBody>
  </SheetPopup>
</Sheet>
```

### Controlled

Pass `open` and `onOpenChange` to drive the state from outside. Useful when the sheet opens from an external action (a route change, a store) rather than a trigger inside the same subtree.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
} from '@bilazo/kito/components/sheet'
import { useState } from 'react'

export function Controlled() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Controlled sheet</SheetTitle>
            <SheetDescription>The open state lives in React.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose render={<Button variant="secondary" />}>Close</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </>
  )
}
```

---

_Generated from `apps/web/src/content/sheet/meta.ts`. Do not edit directly._
