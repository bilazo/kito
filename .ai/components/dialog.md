# Dialog

> A centered modal for a focused task.

A centered modal for a focused task. Shares its primitive with `Sheet` — the same focus trapping, scroll locking, Escape-to-close, and outside-click-to-close behavior — only the shell differs: Dialog is centered, Sheet is anchored to an edge. `size` controls the maximum popup width (`sm` 24rem / `md` 32rem / `lg` 42rem). The popup is wrapped in a full-screen scroll container, so a dialog taller than the viewport is still fully reachable: the wrapper scrolls, not the popup. An animated close (×) button is rendered in the top-end corner by default; set `showCloseButton={false}` for confirmation dialogs where the footer actions are the only path.

## Import

```tsx

import { Dialog, DialogTrigger, DialogClose, DialogBackdrop, DialogPopup, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@bilazo/kito/components/dialog'

```

## When to use

- A blocking decision the user must acknowledge before continuing — a confirmation, a destructive action, a form submit that must not slip past.

- A focused task the user should complete or cancel — edit profile, create project, rename an item — where the page behind should not be interrupted but the task should.

- A short form that is easier to submit from a modal than a new route — a sign-in modal, a comment composer, a quick-add.

- A confirmation of an irreversible action — delete, archive, unfollow — with `showCloseButton={false}` so the footer actions are the only path.

- Content that must be legible on any viewport — the popup’s full-screen scroll wrapper keeps it centered on short content and reachable on tall content.

- A modal that needs a visible accessible name — `DialogTitle` becomes `aria-labelledby` on the popup automatically.

## When NOT to use

- For a side panel that leaves the page partially visible — use `Sheet`. A centered modal blocks the page; a sheet says "work on the side".

- For a navigation drawer on mobile — use `Sheet` with `side="start"` or `side="end"`. A centered dialog for navigation is a modal in disguise.

- For a transient, non-blocking notification — use `Toast`. A dialog blocks the page; a toast informs without blocking.

- For a full-page task that needs a URL — use a route. A dialog has no URL of its own, so two users cannot share a link to what is open in it.

- Without `DialogTitle` — every dialog needs an accessible name. Without one, screen readers announce "dialog" with no context and the user has no way to know what they are confirming. Base UI wires `DialogTitle` to `aria-labelledby` automatically.

- For nested dialogs more than two levels deep — Base UI supports nesting, but three stacked modals is a UX smell. Flatten the flow into one level.

- As the only confirmation of a save — pair the submit with an inline success state on the page, or a `Toast`. A dialog that closes on submit without feedback leaves the user unsure whether it worked.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Maximum popup width. `sm` is `max-w-sm` (24rem), `md` is `max-w-lg` (32rem), `lg` is `max-w-2xl` (42rem). Note the mapping — `md` resolves to Tailwind’s `max-w-lg`, not `max-w-md`, because the sizes were chosen for the popup’s visual rhythm, not its literal name. The popup is always at least `1rem` from the viewport edges on small screens (the outer wrapper’s `p-4`). |
| `showCloseButton` | `boolean` | `true` | Render a close (×) button in the top-end corner. Set to `false` for confirmation dialogs — the footer actions become the only path, which prevents accidental dismissal. The button uses `inset-e-3` (a logical property), so it flips to the correct corner in RTL. |
| `backdropClassName` | `string` | — | Extra classes for the backdrop. Use it for a one-off tint — for example, a destructive confirmation with a red overlay (`backdropClassName="bg-destructive/30"`) or a warning with amber. Merged with the base backdrop classes via `cn()`. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the dialog from outside (a store, a form submit result, a route param). Omit both for an uncontrolled dialog (then use `defaultOpen`). Inherited from Base UI’s `Dialog.Root`. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger, close button, Escape, and backdrop click. Inherited from Base UI’s `Dialog.Root`. |
| `modal` | `boolean` | `true` | Whether the dialog blocks interaction with the page behind it. `false` allows interacting with the page while the popup stays open — rare for a `Dialog`, useful for a non-modal command palette or tool window. Inherited from Base UI’s `Dialog.Root`. |
| `dir` | `'ltr' \| 'rtl'` | — | Explicit direction on the popup. The popup is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set (a localized preview, a Storybook demo). In a real Persian app, `<html dir="rtl">` covers it and this prop is not needed. Same gotcha as `SheetPopup`. |
| `className` | `string` | — | Extra classes on any part. Merged with the base classes via `cn()`. Commonly used on `DialogPopup` for a custom `max-w-*` or a per-instance min-height, or on `DialogFooter` when a destructive flow needs a different button alignment. |

Nine components compose. `Dialog` (root) renders no DOM of its own — it forwards to Base UI’s `Dialog.Root` and manages the open state. `DialogTrigger` and `DialogClose` are Base UI’s `Trigger`/`Close` with `data-slot`; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `DialogBackdrop` and `DialogPopup` are portaled to `document.body` — `DialogBackdrop` is rendered automatically by `DialogPopup`, and `DialogPopup` renders its children **plus** an optional close button (last in DOM, so it appears in the tab order after the footer). **Unlike Sheet, `Dialog` has no `DialogBody`** — the popup itself is padded (`p-6`) and the whole popup grows naturally on tall content; the outer wrapper (`fixed inset-0 overflow-y-auto` with `p-4 flex min-h-full items-center justify-center`) is what scrolls, not any inner region. This is the difference from Sheet’s padding-free popup with an internal `SheetBody`: a centered modal that grows is easier to read than a centered modal with its own scrollbar. `DialogHeader` and `DialogFooter` are plain `<div>`s with no padding of their own — the popup’s `p-6` provides the inset for everything inside. `DialogTitle` becomes `aria-labelledby` and `DialogDescription` becomes `aria-describedby` on the popup automatically. **Portal gotcha:** because the popup is portaled, `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir` on `DialogPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup`). `DialogSize` is internal to the module.

## Composition

### Basic

The canonical pattern: `Dialog` with a `DialogTrigger`, a `DialogPopup` with a `DialogHeader` (title + description) and a `DialogFooter` (actions). Every dialog needs a `DialogTitle` — it becomes the accessible name via `aria-labelledby`.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Changes are saved immediately.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### Confirmation for a destructive action

For an irreversible action, set `showCloseButton={false}` on the popup. The footer actions become the only path — no accidental Escape or corner-× dismissal. Pair the destructive action with `variant="destructive"` on its button.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Delete lesson</DialogTrigger>
  <DialogPopup showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Delete lesson 42?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. All progress and saved vocabulary will be lost.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### With a form

The dialog is a container — put any content inside. `Field` and `Input` work; the dialog does not intercept their state. Pair the submit with `DialogClose` on Cancel and a plain `Button` for the primary action.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

<Dialog>
  <DialogTrigger render={<Button />}>Create project</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Create project</DialogTitle>
      <DialogDescription>Give your project a name.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-4">
      <Field name="name">
        <FieldLabel>Project name</FieldLabel>
        <Input placeholder="My new project" />
      </Field>
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <Button>Create</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### Long content

The popup is wrapped in a full-screen scroll container. When the content is taller than the viewport, the **wrapper** scrolls — the popup grows naturally and stays centered on short content. Nothing gets clipped; no inner scrollbar is needed. For a long block of text, give it an explicit `max-h-*` to keep the footer in view (as this example does), or let the whole popup grow and rely on the wrapper’s scroll.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Terms of service</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Terms of service</DialogTitle>
      <DialogDescription>Scroll through to read the full text.</DialogDescription>
    </DialogHeader>
    <div className="max-h-64 overflow-y-auto text-sm text-muted-foreground">
      {/* long text */}
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Decline</DialogClose>
      <Button>Accept</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### Sizes

`sm`, `md`, and `lg` control the maximum popup width — 24rem, 32rem, and 42rem. The popup keeps at least `1rem` from the viewport edges on small screens.

```tsx
import { Dialog, DialogPopup } from '@bilazo/kito/components/dialog'

<DialogPopup size="sm">…</DialogPopup>
<DialogPopup size="md">…</DialogPopup>
<DialogPopup size="lg">…</DialogPopup>
```

---

_Generated from `apps/web/src/content/dialog/meta.ts`. Do not edit directly._
