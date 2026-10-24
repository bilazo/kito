import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Dialog',
    'DialogTrigger',
    'DialogClose',
    'DialogBackdrop',
    'DialogPopup',
    'DialogHeader',
    'DialogFooter',
    'DialogTitle',
    'DialogDescription',
  ],

  summary:
    'A centered modal for a focused task. Shares its primitive with `Sheet` — the same focus trapping, scroll locking, Escape-to-close, and outside-click-to-close behavior — only the shell differs: Dialog is centered, Sheet is anchored to an edge. `size` controls the maximum popup width (`sm` 24rem / `md` 32rem / `lg` 42rem). The popup is wrapped in a full-screen scroll container, so a dialog taller than the viewport is still fully reachable: the wrapper scrolls, not the popup. An animated close (×) button is rendered in the top-end corner by default; set `showCloseButton={false}` for confirmation dialogs where the footer actions are the only path.',

  whenToUse: [
    'A blocking decision the user must acknowledge before continuing — a confirmation, a destructive action, a form submit that must not slip past.',
    'A focused task the user should complete or cancel — edit profile, create project, rename an item — where the page behind should not be interrupted but the task should.',
    'A short form that is easier to submit from a modal than a new route — a sign-in modal, a comment composer, a quick-add.',
    'A confirmation of an irreversible action — delete, archive, unfollow — with `showCloseButton={false}` so the footer actions are the only path.',
    'Content that must be legible on any viewport — the popup’s full-screen scroll wrapper keeps it centered on short content and reachable on tall content.',
    'A modal that needs a visible accessible name — `DialogTitle` becomes `aria-labelledby` on the popup automatically.',
  ],

  whenNotToUse: [
    'For a side panel that leaves the page partially visible — use `Sheet`. A centered modal blocks the page; a sheet says "work on the side".',
    'For a navigation drawer on mobile — use `Sheet` with `side="start"` or `side="end"`. A centered dialog for navigation is a modal in disguise.',
    'For a transient, non-blocking notification — use `Toast`. A dialog blocks the page; a toast informs without blocking.',
    'For a full-page task that needs a URL — use a route. A dialog has no URL of its own, so two users cannot share a link to what is open in it.',
    'Without `DialogTitle` — every dialog needs an accessible name. Without one, screen readers announce "dialog" with no context and the user has no way to know what they are confirming. Base UI wires `DialogTitle` to `aria-labelledby` automatically.',
    'For nested dialogs more than two levels deep — Base UI supports nesting, but three stacked modals is a UX smell. Flatten the flow into one level.',
    'As the only confirmation of a save — pair the submit with an inline success state on the page, or a `Toast`. A dialog that closes on submit without feedback leaves the user unsure whether it worked.',
  ],

  props: [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description:
        'Maximum popup width. `sm` is `max-w-sm` (24rem), `md` is `max-w-lg` (32rem), `lg` is `max-w-2xl` (42rem). Note the mapping — `md` resolves to Tailwind’s `max-w-lg`, not `max-w-md`, because the sizes were chosen for the popup’s visual rhythm, not its literal name. The popup is always at least `1rem` from the viewport edges on small screens (the outer wrapper’s `p-4`).',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      description:
        'Render a close (×) button in the top-end corner. Set to `false` for confirmation dialogs — the footer actions become the only path, which prevents accidental dismissal. The button uses `inset-e-3` (a logical property), so it flips to the correct corner in RTL.',
    },
    {
      name: 'backdropClassName',
      type: 'string',
      description:
        'Extra classes for the backdrop. Use it for a one-off tint — for example, a destructive confirmation with a red overlay (`backdropClassName="bg-destructive/30"`) or a warning with amber. Merged with the base backdrop classes via `cn()`.',
    },
    {
      name: 'open',
      type: 'boolean',
      description:
        'Controlled open state. Pass with `onOpenChange` to drive the dialog from outside (a store, a form submit result, a route param). Omit both for an uncontrolled dialog (then use `defaultOpen`). Inherited from Base UI’s `Dialog.Root`.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean, eventDetails: ...) => void',
      description:
        'Change callback. Fires on trigger, close button, Escape, and backdrop click. Inherited from Base UI’s `Dialog.Root`.',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description:
        'Whether the dialog blocks interaction with the page behind it. `false` allows interacting with the page while the popup stays open — rare for a `Dialog`, useful for a non-modal command palette or tool window. Inherited from Base UI’s `Dialog.Root`.',
    },
    {
      name: 'dir',
      type: "'ltr' | 'rtl'",
      description:
        'Explicit direction on the popup. The popup is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set (a localized preview, a Storybook demo). In a real Persian app, `<html dir="rtl">` covers it and this prop is not needed. Same gotcha as `SheetPopup`.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part. Merged with the base classes via `cn()`. Commonly used on `DialogPopup` for a custom `max-w-*` or a per-instance min-height, or on `DialogFooter` when a destructive flow needs a different button alignment.',
    },
  ],

  propsNote:
    'Nine components compose. `Dialog` (root) renders no DOM of its own — it forwards to Base UI’s `Dialog.Root` and manages the open state. `DialogTrigger` and `DialogClose` are Base UI’s `Trigger`/`Close` with `data-slot`; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `DialogBackdrop` and `DialogPopup` are portaled to `document.body` — `DialogBackdrop` is rendered automatically by `DialogPopup`, and `DialogPopup` renders its children **plus** an optional close button (last in DOM, so it appears in the tab order after the footer). **Unlike Sheet, `Dialog` has no `DialogBody`** — the popup itself is padded (`p-6`) and the whole popup grows naturally on tall content; the outer wrapper (`fixed inset-0 overflow-y-auto` with `p-4 flex min-h-full items-center justify-center`) is what scrolls, not any inner region. This is the difference from Sheet’s padding-free popup with an internal `SheetBody`: a centered modal that grows is easier to read than a centered modal with its own scrollbar. `DialogHeader` and `DialogFooter` are plain `<div>`s with no padding of their own — the popup’s `p-6` provides the inset for everything inside. `DialogTitle` becomes `aria-labelledby` and `DialogDescription` becomes `aria-describedby` on the popup automatically. **Portal gotcha:** because the popup is portaled, `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir` on `DialogPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup`). `DialogSize` is internal to the module.',

  composition: [
    {
      title: 'Basic',
      description:
        'The canonical pattern: `Dialog` with a `DialogTrigger`, a `DialogPopup` with a `DialogHeader` (title + description) and a `DialogFooter` (actions). Every dialog needs a `DialogTitle` — it becomes the accessible name via `aria-labelledby`.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Dialog,\n  DialogClose,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogPopup,\n  DialogTitle,\n  DialogTrigger,\n} from '@bilazo/kito/components/dialog'\n\n<Dialog>\n  <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>\n  <DialogPopup>\n    <DialogHeader>\n      <DialogTitle>Edit profile</DialogTitle>\n      <DialogDescription>Changes are saved immediately.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>\n      <Button>Save</Button>\n    </DialogFooter>\n  </DialogPopup>\n</Dialog>`,
    },
    {
      title: 'Confirmation for a destructive action',
      description:
        'For an irreversible action, set `showCloseButton={false}` on the popup. The footer actions become the only path — no accidental Escape or corner-× dismissal. Pair the destructive action with `variant="destructive"` on its button.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Dialog,\n  DialogClose,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogPopup,\n  DialogTitle,\n  DialogTrigger,\n} from '@bilazo/kito/components/dialog'\n\n<Dialog>\n  <DialogTrigger render={<Button variant="outline" />}>Delete lesson</DialogTrigger>\n  <DialogPopup showCloseButton={false}>\n    <DialogHeader>\n      <DialogTitle>Delete lesson 42?</DialogTitle>\n      <DialogDescription>\n        This action cannot be undone. All progress and saved vocabulary will be lost.\n      </DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>\n      <Button variant="destructive">Delete</Button>\n    </DialogFooter>\n  </DialogPopup>\n</Dialog>`,
    },
    {
      title: 'With a form',
      description:
        'The dialog is a container — put any content inside. `Field` and `Input` work; the dialog does not intercept their state. Pair the submit with `DialogClose` on Cancel and a plain `Button` for the primary action.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Dialog,\n  DialogClose,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogPopup,\n  DialogTitle,\n  DialogTrigger,\n} from '@bilazo/kito/components/dialog'\nimport { Field, FieldLabel } from '@bilazo/kito/components/field'\nimport { Input } from '@bilazo/kito/components/input'\n\n<Dialog>\n  <DialogTrigger render={<Button />}>Create project</DialogTrigger>\n  <DialogPopup>\n    <DialogHeader>\n      <DialogTitle>Create project</DialogTitle>\n      <DialogDescription>Give your project a name.</DialogDescription>\n    </DialogHeader>\n    <div className="flex flex-col gap-4">\n      <Field name="name">\n        <FieldLabel>Project name</FieldLabel>\n        <Input placeholder="My new project" />\n      </Field>\n    </div>\n    <DialogFooter>\n      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>\n      <Button>Create</Button>\n    </DialogFooter>\n  </DialogPopup>\n</Dialog>`,
    },
    {
      title: 'Long content',
      description:
        'The popup is wrapped in a full-screen scroll container. When the content is taller than the viewport, the **wrapper** scrolls — the popup grows naturally and stays centered on short content. Nothing gets clipped; no inner scrollbar is needed. For a long block of text, give it an explicit `max-h-*` to keep the footer in view (as this example does), or let the whole popup grow and rely on the wrapper’s scroll.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Dialog,\n  DialogClose,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogPopup,\n  DialogTitle,\n  DialogTrigger,\n} from '@bilazo/kito/components/dialog'\n\n<Dialog>\n  <DialogTrigger render={<Button variant="outline" />}>Terms of service</DialogTrigger>\n  <DialogPopup>\n    <DialogHeader>\n      <DialogTitle>Terms of service</DialogTitle>\n      <DialogDescription>Scroll through to read the full text.</DialogDescription>\n    </DialogHeader>\n    <div className="max-h-64 overflow-y-auto text-sm text-muted-foreground">\n      {/* long text */}\n    </div>\n    <DialogFooter>\n      <DialogClose render={<Button variant="secondary" />}>Decline</DialogClose>\n      <Button>Accept</Button>\n    </DialogFooter>\n  </DialogPopup>\n</Dialog>`,
    },
    {
      title: 'Sizes',
      description:
        '`sm`, `md`, and `lg` control the maximum popup width — 24rem, 32rem, and 42rem. The popup keeps at least `1rem` from the viewport edges on small screens.',
      code: `import { Dialog, DialogPopup } from '@bilazo/kito/components/dialog'\n\n<DialogPopup size="sm">…</DialogPopup>\n<DialogPopup size="md">…</DialogPopup>\n<DialogPopup size="lg">…</DialogPopup>`,
    },
  ],
}
