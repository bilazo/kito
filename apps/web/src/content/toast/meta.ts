import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Toaster', 'toast', 'toastManager'],

  summary:
    'A brief notification that appears at a corner of the viewport. Mount `Toaster` once near the app root; it renders every toast the imperative `toast(...)` API adds to a shared manager. Toasts stack behind the frontmost one in a peek-card pattern, expand on hover, swipe to dismiss, and auto-dismiss after their duration. The imperative API covers the common shapes — `toast.success/error/info/warning/loading` for variants, `toast.promise` for a loading → success/error state machine, `toast.dismiss()` for closing one or all. The viewport position (`top-left`…`bottom-right`) is physical, not logical, so a "top-right" toast stays at the top-right of the viewport even in an RTL page.',

  whenToUse: [
    'Confirm a completed action that the user does not need to act on — saved, deleted, uploaded.',
    'Report an error that is recoverable and does not block the page — a failed network call the user can retry.',
    'Announce a background result while the user keeps working — a new message, a version update, a job that finished.',
    'Offer a short-lived undo — delete with an "Undo" action that restores the item before the toast dismisses.',
    'Track a promise through loading → success/error without blocking the page — `toast.promise(fn(), { loading, success, error })`.',
    'Notify across route changes — the toast survives navigation because it lives in the shared manager, not the current component tree.',
  ],

  whenNotToUse: [
    'For an error the user must acknowledge before continuing — use a `Dialog` or an inline error state. A toast disappears; a blocking error must not.',
    'For content the user must read at their own pace — use a permanent UI element (banner, inline message). Toasts auto-dismiss and the user cannot stop the timer.',
    'For a critical confirmation — use a `Dialog`. A toast that says "Are you sure?" has a built-in timer that can close it before the user acts.',
    'As the only confirmation of a destructive action — pair the toast with the action that already ran (delete, archive). A toast alone is not a substitute for the pre-action confirmation.',
    'For transient inline feedback that belongs to a field — use `Field`’s error/description slot. A toast disconnects the message from the field it describes.',
    'Stacked more than three deep — the peek-card pattern stops being readable past about three. `limit` defaults to 3 for this reason; do not raise it without a UX review.',
    'Inside a form flow the user will submit — pair success with an inline state on the page. A toast on form submit without inline feedback leaves the form looking unchanged.',
  ],

  props: [
    {
      name: 'position',
      type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      default: "'bottom-right'",
      description:
        'Where toasts appear. The values are **physical**, not logical — `top-right` means the top-right of the viewport, and stays there in an RTL page. This is intentional: a notification at "top-right" should be at the top-right of the screen regardless of the page’s reading direction. The stack direction follows the position: top positions stack downward, bottom positions stack upward.',
    },
    {
      name: 'limit',
      type: 'number',
      default: '3',
      description:
        'Maximum number of visible toasts. Older toasts are hidden past this limit and marked `data-limited` (pointer-events-none, opacity-0) until they expire. The default of 3 matches the peek-card pattern — past three cards, the stack stops being readable.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '5000',
      description:
        'Default auto-dismiss delay in milliseconds. Individual toasts can override this via `duration` in their `ToastInput`; `duration: Infinity` on a toast (or `variant: \'loading\'`) means "do not auto-dismiss" — the toast stays until `toast.dismiss(id)` or the user closes it.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      description:
        'Render a close (×) button on every toast. Set to `false` for a leaner look on short-lived success/error toasts that the user does not need to dismiss manually.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on the viewport. Merged with the base `fixed z-50 pointer-events-none` and the position classes via `cn()`. Commonly used for a wider/narrower stack or a custom `z-*` above the page’s sticky headers.',
    },
  ],

  propsNote:
    'Two value exports. `Toaster` is the React component — mount once near the app root; it renders the shared `toastManager`’s toasts into a `<Portal>` and forwards `limit` and `duration` to Base UI’s `Toast.Provider`. `toast` is the imperative API for adding toasts from anywhere — an event handler, a promise callback, a store action. `toastManager` is a raw export for advanced setups (mounting a second Toaster scoped to a subtree, or subscribing to the manager directly); most consumers use `toast` and never touch it. `ToastInput` accepts a `title`, a `description`, an optional `variant`, an optional `action` (`{ label, onClick }`), an optional `duration`, and an optional `id` (for update-in-place — calling `toast()` with an existing `id` updates that toast instead of adding a new one). `toast.success/error/info/warning/loading` are typed shortcuts: they accept either a string or a full `ToastInput` and set the `variant` field. `toast.promise` takes a `Promise<T>` and returns it unchanged, tracking it through a loading → success/error state machine; each of `loading`, `success`, and `error` can be a string, a `ToastInput`, or a function `(value: T | unknown) => string | ToastInput`. `toast.dismiss(id)` closes one toast; `toast.dismiss()` closes all toasts and clears their timers. The stacking visuals are a direct port of shadcn’s peek-card pattern, driven by CSS variables (`--peek`, `--scale`, `--shrink`, `--height`, `--offset-y`) computed on the toast root. Reduced-motion users get `transition: none` on both the transform and the height changes — the toast appears and disappears without animation.',

  composition: [
    {
      title: 'Mount once',
      description:
        'Mount `Toaster` exactly once near the app root — inside a top-level layout, next to the router. Do not mount a second one on a route; the toast manager is a shared singleton and a second Toaster renders duplicate stacks.',
      code: `import { Toaster } from '@bilazo/kito/components/toast'\n\nexport function App() {\n  return (\n    <>\n      <RouterProvider router={router} />\n      <Toaster />\n    </>\n  )\n}`,
    },
    {
      title: 'Trigger from anywhere',
      description:
        'Call `toast(...)` from an event handler, a route loader, a promise callback — anywhere JavaScript runs. Nothing needs a React tree in scope.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport { toast } from '@bilazo/kito/components/toast'\n\n<Button onClick={() => toast('Your changes have been saved.')}>\n  Save\n</Button>`,
    },
    {
      title: 'With a title and description',
      description:
        'Pass an object for a two-line toast: a short title in medium weight, a longer description in muted text.',
      code: `import { toast } from '@bilazo/kito/components/toast'\n\ntoast({\n  title: 'Message sent',\n  description: 'We will get back to you within 24 hours.',\n})`,
    },
    {
      title: 'Undoable action',
      description:
        'An action button lets the user react without opening another UI — the standard undo pattern. The toast keeps its own state; the action fires in the current context and can trigger a follow-up toast.',
      code: `import { toast } from '@bilazo/kito/components/toast'\n\ntoast({\n  title: 'Item deleted',\n  description: 'The item was removed from your library.',\n  action: {\n    label: 'Undo',\n    onClick: () => toast.success('Restored'),\n  },\n})`,
    },
    {
      title: 'Promise with loading → success/error',
      description:
        '`toast.promise` tracks a promise through a loading state to its resolution. Each state accepts a bare message or a full `ToastInput`. Pass `duration: Infinity` on the loading state to keep it open until the promise resolves.',
      code: `import { toast } from '@bilazo/kito/components/toast'\n\ntoast.promise(saveChanges(), {\n  loading: 'Saving…',\n  success: 'Saved',\n  error: 'Could not save',\n})`,
    },
    {
      title: 'Dismiss one or all',
      description:
        '`toast.dismiss(id)` closes a specific toast by the `id` returned from `toast()`. `toast.dismiss()` closes every toast and clears their timers.',
      code: `import { toast } from '@bilazo/kito/components/toast'\n\nconst id = toast.loading('Processing…')\n// later\ntoast.dismiss(id)\n\n// or all\ntoast.dismiss()`,
    },
  ],
}
