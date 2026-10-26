# Toast

> A brief notification that appears at a corner of the viewport.

A brief notification that appears at a corner of the viewport. Mount `Toaster` once near the app root; it renders every toast the imperative `toast(...)` API adds to a shared manager. Toasts stack behind the frontmost one in a peek-card pattern, expand on hover, swipe to dismiss, and auto-dismiss after their duration. The imperative API covers the common shapes — `toast.success/error/info/warning/loading` for variants, `toast.promise` for a loading → success/error state machine, `toast.dismiss()` for closing one or all. The viewport position (`top-left`…`bottom-right`) is physical, not logical, so a "top-right" toast stays at the top-right of the viewport even in an RTL page.

## Import

```tsx

import { Toaster, toast, toastManager } from '@bilazo/kito/components/toast'

```

## When to use

- Confirm a completed action that the user does not need to act on — saved, deleted, uploaded.

- Report an error that is recoverable and does not block the page — a failed network call the user can retry.

- Announce a background result while the user keeps working — a new message, a version update, a job that finished.

- Offer a short-lived undo — delete with an "Undo" action that restores the item before the toast dismisses.

- Track a promise through loading → success/error without blocking the page — `toast.promise(fn(), { loading, success, error })`.

- Notify across route changes — the toast survives navigation because it lives in the shared manager, not the current component tree.

## When NOT to use

- For an error the user must acknowledge before continuing — use a `Dialog` or an inline error state. A toast disappears; a blocking error must not.

- For content the user must read at their own pace — use a permanent UI element (banner, inline message). Toasts auto-dismiss and the user cannot stop the timer.

- For a critical confirmation — use a `Dialog`. A toast that says "Are you sure?" has a built-in timer that can close it before the user acts.

- As the only confirmation of a destructive action — pair the toast with the action that already ran (delete, archive). A toast alone is not a substitute for the pre-action confirmation.

- For transient inline feedback that belongs to a field — use `Field`’s error/description slot. A toast disconnects the message from the field it describes.

- Stacked more than three deep — the peek-card pattern stops being readable past about three. `limit` defaults to 3 for this reason; do not raise it without a UX review.

- Inside a form flow the user will submit — pair success with an inline state on the page. A toast on form submit without inline feedback leaves the form looking unchanged.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Where toasts appear. The values are **physical**, not logical — `top-right` means the top-right of the viewport, and stays there in an RTL page. This is intentional: a notification at "top-right" should be at the top-right of the screen regardless of the page’s reading direction. The stack direction follows the position: top positions stack downward, bottom positions stack upward. |
| `limit` | `number` | `3` | Maximum number of visible toasts. Older toasts are hidden past this limit and marked `data-limited` (pointer-events-none, opacity-0) until they expire. The default of 3 matches the peek-card pattern — past three cards, the stack stops being readable. |
| `duration` | `number` | `5000` | Default auto-dismiss delay in milliseconds. Individual toasts can override this via `duration` in their `ToastInput`; `duration: Infinity` on a toast (or `variant: 'loading'`) means "do not auto-dismiss" — the toast stays until `toast.dismiss(id)` or the user closes it. |
| `showCloseButton` | `boolean` | `true` | Render a close (×) button on every toast. Set to `false` for a leaner look on short-lived success/error toasts that the user does not need to dismiss manually. |
| `className` | `string` | — | Extra classes on the viewport. Merged with the base `fixed z-50 pointer-events-none` and the position classes via `cn()`. Commonly used for a wider/narrower stack or a custom `z-*` above the page’s sticky headers. |

Two value exports. `Toaster` is the React component — mount once near the app root; it renders the shared `toastManager`’s toasts into a `<Portal>` and forwards `limit` and `duration` to Base UI’s `Toast.Provider`. `toast` is the imperative API for adding toasts from anywhere — an event handler, a promise callback, a store action. `toastManager` is a raw export for advanced setups (mounting a second Toaster scoped to a subtree, or subscribing to the manager directly); most consumers use `toast` and never touch it. `ToastInput` accepts a `title`, a `description`, an optional `variant`, an optional `action` (`{ label, onClick }`), an optional `duration`, and an optional `id` (for update-in-place — calling `toast()` with an existing `id` updates that toast instead of adding a new one). `toast.success/error/info/warning/loading` are typed shortcuts: they accept either a string or a full `ToastInput` and set the `variant` field. `toast.promise` takes a `Promise<T>` and returns it unchanged, tracking it through a loading → success/error state machine; each of `loading`, `success`, and `error` can be a string, a `ToastInput`, or a function `(value: T | unknown) => string | ToastInput`. `toast.dismiss(id)` closes one toast; `toast.dismiss()` closes all toasts and clears their timers. The stacking visuals are a direct port of shadcn’s peek-card pattern, driven by CSS variables (`--peek`, `--scale`, `--shrink`, `--height`, `--offset-y`) computed on the toast root. Reduced-motion users get `transition: none` on both the transform and the height changes — the toast appears and disappears without animation.

## Composition

### Mount once

Mount `Toaster` exactly once near the app root — inside a top-level layout, next to the router. Do not mount a second one on a route; the toast manager is a shared singleton and a second Toaster renders duplicate stacks.

```tsx
import { Toaster } from '@bilazo/kito/components/toast'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
```

### Trigger from anywhere

Call `toast(...)` from an event handler, a route loader, a promise callback — anywhere JavaScript runs. Nothing needs a React tree in scope.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

<Button onClick={() => toast('Your changes have been saved.')}>
  Save
</Button>
```

### With a title and description

Pass an object for a two-line toast: a short title in medium weight, a longer description in muted text.

```tsx
import { toast } from '@bilazo/kito/components/toast'

toast({
  title: 'Message sent',
  description: 'We will get back to you within 24 hours.',
})
```

### Undoable action

An action button lets the user react without opening another UI — the standard undo pattern. The toast keeps its own state; the action fires in the current context and can trigger a follow-up toast.

```tsx
import { toast } from '@bilazo/kito/components/toast'

toast({
  title: 'Item deleted',
  description: 'The item was removed from your library.',
  action: {
    label: 'Undo',
    onClick: () => toast.success('Restored'),
  },
})
```

### Promise with loading → success/error

`toast.promise` tracks a promise through a loading state to its resolution. Each state accepts a bare message or a full `ToastInput`. Pass `duration: Infinity` on the loading state to keep it open until the promise resolves.

```tsx
import { toast } from '@bilazo/kito/components/toast'

toast.promise(saveChanges(), {
  loading: 'Saving…',
  success: 'Saved',
  error: 'Could not save',
})
```

### Dismiss one or all

`toast.dismiss(id)` closes a specific toast by the `id` returned from `toast()`. `toast.dismiss()` closes every toast and clears their timers.

```tsx
import { toast } from '@bilazo/kito/components/toast'

const id = toast.loading('Processing…')
// later
toast.dismiss(id)

// or all
toast.dismiss()
```

---

_Generated from `apps/web/src/content/toast/meta.ts`. Do not edit directly._
