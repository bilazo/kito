import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Sheet',
    'SheetTrigger',
    'SheetClose',
    'SheetBackdrop',
    'SheetPopup',
    'SheetHeader',
    'SheetFooter',
    'SheetBody',
    'SheetTitle',
    'SheetDescription',
  ],

  summary:
    'A slide-in panel anchored to one edge of the viewport. Shares its primitive with `Dialog` — the same focus trapping, scroll locking, Escape-to-close, and outside-click-to-close behavior — only the shell differs: Dialog is centered, Sheet is anchored. `side` accepts logical values (`start`, `end`) so the panel flips automatically in RTL, plus the physical `top` and `bottom` for action sheets. The popup is padding-free on purpose: padding lives on each section (`SheetHeader`, `SheetFooter`, or a `className` on `SheetBody`), so full-bleed content (an image, a divider, a table) can sit edge-to-edge between the header and the footer.',

  whenToUse: [
    'A secondary surface that opens from the side without leaving the page — settings, a filter panel, a detail view, an edit form.',
    'A navigation drawer on small screens — `side="start"` with a list of links, close on each link click.',
    'An action sheet on mobile — `side="bottom"` with `showCloseButton={false}`, actions in the footer as the only path.',
    'A form that should not block the page — sign-in, profile edit, a create modal where the trigger page stays visible.',
    'A long scrolling surface (terms of service, an article) — `SheetBody` keeps the header and footer pinned while the middle scrolls.',
    'Full-bleed content — an image or a table that must touch the edges of the panel (possible because the popup has no padding of its own).',
  ],

  whenNotToUse: [
    'For a blocking decision the user must acknowledge — use `Dialog` (centered) instead. A centered modal says "stop and decide"; a sheet says "work on the side".',
    'For a short confirmation with one or two actions — use `Dialog`. A side sheet for a two-button confirm leaves a large empty panel; a centered dialog is the tighter shape.',
    'For content that belongs to the page and should be reachable without a close — use an inline route or a section on the page. Sheets are modal; a consumer who wants to keep the content open has to reopen it.',
    'For navigation that must be deep-linkable — use the router (`Link`, `Route`). Sheets do not create URLs; two users who both open a sheet cannot share a link to it.',
    'Without `SheetTitle` — every sheet needs an accessible name (`aria-labelledby` on the popup). Base UI wires `SheetTitle` to it automatically; without one, the dialog has no name for screen readers.',
    'With more than three or four nav items inside a `side="start"` — the sheet becomes a full page in disguise. Use a real route + page.',
    'Inside another modal — nesting a Sheet inside a Dialog (or another Sheet) is supported by Base UI but rarely the right shape. Prefer a single-level modal.',
  ],

  props: [
    {
      name: 'side',
      type: "'start' | 'end' | 'top' | 'bottom'",
      default: "'end'",
      description:
        'Which edge the panel anchors to. `start` is the inline-start edge (left in LTR, right in RTL); `end` is the inline-end edge (right in LTR, left in RTL) — the default for the classic side panel. `top` and `bottom` are physical edges, used for action sheets and notifications. The panel flips automatically in RTL via logical CSS properties (`inset-inline-start`, `border-s`/`border-e`, `rounded-s`/`rounded-e`); only the enter/exit transforms need an explicit `rtl:` override because `translate-x` is a physical axis. `SheetPopup` prop.',
    },
    {
      name: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      description:
        'Render a close (×) button in the top-end corner. Set to `false` for action sheets or confirmations where the footer actions are the only affordance. When `false`, the header’s default `pe-12` still reserves the space — override with `pe-6` on `SheetHeader` if you want the padding back. `SheetPopup` prop.',
    },
    {
      name: 'open',
      type: 'boolean',
      description:
        'Controlled open state. Pass with `onOpenChange` to drive the state from outside (a route param, a store). Omit both for an uncontrolled sheet (then use `defaultOpen`). Inherited from Base UI’s `Dialog.Root`. `Sheet` prop.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean, eventDetails: ...) => void',
      description:
        'Change callback. Fires on trigger, close button, Escape, and backdrop click. `Sheet` prop.',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description:
        'Whether the sheet blocks interaction with the page behind it. `false` allows interacting with the page while the panel stays open (useful for a side panel over a map or a canvas). Inherited from Base UI’s `Dialog.Root`. `Sheet` prop.',
    },
    {
      name: 'dir',
      type: "'ltr' | 'rtl'",
      description:
        'Explicit direction. The sheet is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set (for example, a localized preview or a Storybook demo). In a real Persian app, `<html dir="rtl">` covers it and this prop is not needed. `SheetPopup` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part. For `SheetBody`, use it to add padding (`p-6`) when the panel is not full-bleed — `SheetBody` is padding-free by default. For `SheetPopup`, use it for a per-instance width (`w-96`) or a custom height.',
    },
  ],

  propsNote:
    'Ten components compose. `Sheet` (root) renders no DOM of its own — it forwards to Base UI’s `Dialog.Root` and manages the open state. `SheetTrigger` and `SheetClose` are Base UI’s `Trigger`/`Close` with `data-slot` for targeting; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `SheetBackdrop` and `SheetPopup` are portaled to `document.body` — `SheetBackdrop` is rendered automatically by `SheetPopup`, and `SheetPopup` renders its children **plus** an optional close button (last in DOM, so it appears in the tab order after the footer). `SheetBody` has no default padding on purpose: the popup is padding-free so consumers can insert full-bleed content (an image, a divider, a table) between the padded header and footer, and so the scrollbar touches the panel edge rather than floating inside a padded shell — add padding with `className` when full-bleed is not needed. `SheetBody` also carries the critical `min-h-0 flex-1 overflow-y-auto` trio — without `min-h-0`, the flex child grows to fit its content and `overflow-y-auto` never engages. `SheetHeader`/`SheetFooter` are plain `<div>`s with no own props. `SheetTitle`/`SheetDescription` are wired to the popup via `aria-labelledby` / `aria-describedby` automatically — no manual ARIA is needed. **Portal gotcha:** because the popup is portaled, `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir` on `SheetPopup` when the page’s `<html dir="rtl">` is not set. `SheetSide` is exported as a type-only alias (not a value).',

  composition: [
    {
      title: 'Basic side sheet',
      description:
        'The canonical pattern: `Sheet` with a `SheetTrigger`, a `SheetPopup` with a `SheetHeader` (title + description) and a `SheetFooter` (actions). The default `side="end"` anchors the panel to the inline-end edge — right in LTR, left in RTL.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Sheet,\n  SheetClose,\n  SheetDescription,\n  SheetFooter,\n  SheetHeader,\n  SheetPopup,\n  SheetTitle,\n  SheetTrigger,\n} from '@bilazo/kito/components/sheet'\n\n<Sheet>\n  <SheetTrigger render={<Button variant="outline" />}>Open settings</SheetTrigger>\n  <SheetPopup>\n    <SheetHeader>\n      <SheetTitle>Settings</SheetTitle>\n      <SheetDescription>Changes are saved immediately.</SheetDescription>\n    </SheetHeader>\n    <SheetFooter>\n      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>\n      <Button>Save</Button>\n    </SheetFooter>\n  </SheetPopup>\n</Sheet>`,
    },
    {
      title: 'With a form',
      description:
        'Pair the sheet with `Field` and `Input` inside `SheetBody`. `SheetBody`’s `flex-1` pushes the footer to the bottom; header and footer stay pinned while the form scrolls if it grows.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport { Field, FieldLabel } from '@bilazo/kito/components/field'\nimport { Input } from '@bilazo/kito/components/input'\nimport {\n  Sheet,\n  SheetBody,\n  SheetClose,\n  SheetDescription,\n  SheetFooter,\n  SheetHeader,\n  SheetPopup,\n  SheetTitle,\n  SheetTrigger,\n} from '@bilazo/kito/components/sheet'\n\n<Sheet>\n  <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>\n  <SheetPopup>\n    <SheetHeader>\n      <SheetTitle>Edit profile</SheetTitle>\n      <SheetDescription>Update your account details.</SheetDescription>\n    </SheetHeader>\n    <SheetBody className="flex flex-col gap-4 p-6">\n      <Field name="name">\n        <FieldLabel>Name</FieldLabel>\n        <Input placeholder="Your name" />\n      </Field>\n      <Field name="email">\n        <FieldLabel>Email</FieldLabel>\n        <Input type="email" placeholder="you@example.com" />\n      </Field>\n    </SheetBody>\n    <SheetFooter>\n      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>\n      <Button>Save</Button>\n    </SheetFooter>\n  </SheetPopup>\n</Sheet>`,
    },
    {
      title: 'Action sheet',
      description:
        '`side="bottom"` with `showCloseButton={false}` gives the mobile action-sheet pattern: a short panel from the bottom, footer actions as the only path. Pair destructive actions with a `Button variant="destructive"`.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Sheet,\n  SheetClose,\n  SheetDescription,\n  SheetFooter,\n  SheetHeader,\n  SheetPopup,\n  SheetTitle,\n  SheetTrigger,\n} from '@bilazo/kito/components/sheet'\n\n<Sheet>\n  <SheetTrigger render={<Button variant="outline" />}>Delete lesson</SheetTrigger>\n  <SheetPopup side="bottom" showCloseButton={false}>\n    <SheetHeader>\n      <SheetTitle>Delete lesson 42?</SheetTitle>\n      <SheetDescription>\n        This action cannot be undone. All progress will be lost.\n      </SheetDescription>\n    </SheetHeader>\n    <SheetFooter>\n      <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>\n      <Button variant="destructive">Delete</Button>\n    </SheetFooter>\n  </SheetPopup>\n</Sheet>`,
    },
    {
      title: 'Navigation drawer',
      description:
        'A slide-in menu on small screens. `side="start"` anchors to the inline-start edge (left in LTR, right in RTL). Each nav item is wrapped in `SheetClose` with `render={<a />}` so clicking closes the sheet — an anchor is the trigger, and `SheetClose` provides the close behavior without stealing the anchor’s semantics.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Sheet,\n  SheetBody,\n  SheetClose,\n  SheetHeader,\n  SheetPopup,\n  SheetTitle,\n  SheetTrigger,\n} from '@bilazo/kito/components/sheet'\n\nconst NAV = [\n  { href: '/dashboard', label: 'Dashboard' },\n  { href: '/projects', label: 'Projects' },\n  { href: '/settings', label: 'Settings' },\n]\n\n<Sheet>\n  <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>\n    {/* menu icon */}\n  </SheetTrigger>\n  <SheetPopup side="start">\n    <SheetHeader>\n      <SheetTitle>Navigation</SheetTitle>\n    </SheetHeader>\n    <SheetBody className="flex flex-col gap-2 px-2">\n      <nav className="flex flex-col gap-1">\n        {NAV.map((item) => (\n          <SheetClose\n            key={item.href}\n            render={<a href={item.href} />}\n            className="rounded-md px-3 py-2 text-sm hover:bg-accent"\n          >\n            {item.label}\n          </SheetClose>\n        ))}\n      </nav>\n    </SheetBody>\n  </SheetPopup>\n</Sheet>`,
    },
    {
      title: 'Controlled',
      description:
        'Pass `open` and `onOpenChange` to drive the state from outside. Useful when the sheet opens from an external action (a route change, a store) rather than a trigger inside the same subtree.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Sheet,\n  SheetClose,\n  SheetDescription,\n  SheetFooter,\n  SheetHeader,\n  SheetPopup,\n  SheetTitle,\n} from '@bilazo/kito/components/sheet'\nimport { useState } from 'react'\n\nexport function Controlled() {\n  const [open, setOpen] = useState(false)\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open</Button>\n      <Sheet open={open} onOpenChange={setOpen}>\n        <SheetPopup>\n          <SheetHeader>\n            <SheetTitle>Controlled sheet</SheetTitle>\n            <SheetDescription>The open state lives in React.</SheetDescription>\n          </SheetHeader>\n          <SheetFooter>\n            <SheetClose render={<Button variant="secondary" />}>Close</SheetClose>\n          </SheetFooter>\n        </SheetPopup>\n      </Sheet>\n    </>\n  )\n}`,
    },
  ],
}
