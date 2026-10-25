import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Popover',
    'PopoverTrigger',
    'PopoverClose',
    'PopoverPopup',
    'PopoverHeader',
    'PopoverTitle',
    'PopoverDescription',
  ],

  summary:
    'A panel anchored to a trigger, opened by click. Unlike `Tooltip` — opens on click (not hover), stays open until dismissed (outside click, Escape, or an explicit `PopoverClose`), and its content is fully interactive: inputs, buttons, and links inside work as usual. The popup is portaled and its width defaults to `w-72`. The optional arrow is rendered as a `rotate-45` square with `data-side`-aware borders, so it points toward the trigger on any side. `PopoverHeader` bleeds to the popup edges via negative margins, so its `border-b` reads as a full-width divider rather than a padded bar.',

  whenToUse: [
    'A richer panel than a Tooltip — a user-info card, a small inline form, a "what\'s this" callout with a link.',
    'Click-triggered content that must stay open until dismissed — an account menu, a settings mini-panel, a filter form.',
    'Interactive popups where the user needs to read, type, or click inside — inputs and buttons inside are reachable by mouse and keyboard.',
    'An inline edit form anchored to the button that opens it — pair with `Field` and `Input`.',
    'A dismissable callout — `PopoverClose` in the header gives the user an explicit exit.',
    'A contextual action that needs a confirmation or a short form, without a full `Dialog` and its modal backdrop.',
  ],

  whenNotToUse: [
    'For a short, non-interactive label — use `Tooltip`. A Popover that only shows text is a Tooltip with extra steps; it blocks a click, and it steals focus.',
    'For a list of commands — use `Menu`. A Popover with a list of buttons is a menu in disguise; `Menu` gives the right keyboard navigation (arrow keys, typeahead, Escape).',
    'For a blocking decision — use `Dialog`. A Popover does not trap focus or block the page; it is not the right shape for a modal confirmation.',
    'For a mobile-first bottom panel — use `Drawer` (or `Sheet` with `side="bottom"`). A Popover anchored to a small trigger is hard to hit on a narrow viewport.',
    'As the only place to show essential information — a Popover disappears; content that must be readable at a glance belongs on the page.',
    'Without a `PopoverTitle` — every popover needs an accessible name for screen readers. Base UI wires `PopoverTitle` to `aria-labelledby`; without one, the popup is announced as "dialog" with no context.',
    'Nested more than one level deep — a Popover inside a Popover is supported by Base UI but confuses focus and outside-click detection. Flatten the flow or use a `Dialog`.',
    'For content that must persist across route changes — use a route. A Popover lives in the render tree; navigation unmounts it.',
  ],

  props: [
    {
      name: 'side',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'bottom'",
      description:
        'Side of the trigger to place the popup on. The sides are **physical** — `left` / `right` do not flip in RTL. In an app that serves both LTR and RTL pages, choose the side from the current direction (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a logical alias. The arrow follows the side automatically.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '4',
      description:
        'Gap between the trigger and the popup, in pixels. `4` matches `Tooltip`, but a Popover usually wants a bit more breathing room — pass `8` for a wider gap.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'center'",
      description:
        'Alignment of the popup relative to the trigger along the cross axis. `center` matches `Tooltip`; use `start` / `end` for a popup that should anchor to one edge of the trigger (a user-info card anchored to the right edge of an avatar, for example).',
    },
    {
      name: 'alignOffset',
      type: 'number',
      default: '0',
      description: 'Offset along the alignment axis, in pixels.',
    },
    {
      name: 'showArrow',
      type: 'boolean',
      default: 'true',
      description:
        'Render a small arrow pointing at the trigger. The arrow is a `rotate-45` square whose two visible borders depend on which side the popup is on — the diamond reads as a triangle pointing toward the trigger. Set to `false` for a plain panel (an inline edit form, an anchored card with its own elevation).',
    },
    {
      name: 'open',
      type: 'boolean',
      description:
        'Controlled open state. Pass with `onOpenChange` to drive the popover from outside (an external button, a store, a route change). Omit both for an uncontrolled popover.',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean, eventDetails: ...) => void',
      description:
        'Change callback. Fires on trigger click, `PopoverClose`, Escape, and outside click.',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'false',
      description:
        'Whether the popover traps focus and blocks interaction with the page behind it. Kito defaults to `false` — a Popover is an interactive panel, not a modal; the user may want to click a field on the page while the popover is open. Set to `true` for the rare case where the popover is a full-form dialog-lite.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part. For `PopoverPopup`, useful for a width override (`w-80`, `w-96`) — the default is `w-72`. For `PopoverHeader`, use it to remove the full-width divider (the `border-b` and negative margins are the default header look).',
    },
  ],

  propsNote:
    'Seven components compose. `Popover` (root) forwards to Base UI’s `Popover.Root` — it renders no DOM of its own (the `data-slot="popover"` prop it receives lands in the Root’s props, not the DOM; a `[data-slot="popover"]` selector is not available). `PopoverTrigger` and `PopoverClose` are Base UI’s `Trigger`/`Close` with `data-slot`; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `PopoverPopup` is portaled to `document.body`, default width `w-72`, with a scale + fade animation from the positioner’s transform origin. `PopoverHeader` bleeds to the popup edges via `-mx-4 -mt-4` (canceling the popup’s `p-4`) — its `border-b` then reads as a full-width divider rather than an inset bar. **The negative margins depend on the popup NOT having `overflow: hidden`** — a future change that adds it would clip the header. `PopoverTitle` becomes `aria-labelledby` and `PopoverDescription` becomes `aria-describedby` on the popup automatically. `PopoverArrow` is internal; it uses `ArrowShape` from `tooltip/tooltip` for the shared diamond shape, and adds per-side border classes so the arrow points toward the trigger. Sides are **physical** — `left` / `right` do not flip in RTL, so an app serving both directions picks the side from the current direction at the call site. **Portal + RTL:** the popup is portaled to `document.body`, so `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir="rtl"` on `PopoverPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup` / `SelectPopup` / `ComboboxPopup`).',

  composition: [
    {
      title: 'Basic',
      description:
        'The canonical pattern: `Popover` with a `PopoverTrigger`, a `PopoverPopup` with a `PopoverHeader` (title + description) and body. The popup opens on click and stays open until the user clicks outside, presses Escape, or clicks a `PopoverClose`.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Popover,\n  PopoverDescription,\n  PopoverHeader,\n  PopoverPopup,\n  PopoverTitle,\n  PopoverTrigger,\n} from '@bilazo/kito/components/popover'\n\n<Popover>\n  <PopoverTrigger render={<Button variant="outline" />}>Show details</PopoverTrigger>\n  <PopoverPopup>\n    <PopoverHeader>\n      <PopoverTitle>Your plan: Pro</PopoverTitle>\n      <PopoverDescription>Based on the last 12 months of usage.</PopoverDescription>\n    </PopoverHeader>\n    <p className="text-sm text-muted-foreground">\n      Pro includes unlimited projects, 100 GB storage, and priority support.\n    </p>\n  </PopoverPopup>\n</Popover>`,
    },
    {
      title: 'Interactive form',
      description:
        'Popover content is fully interactive — put a `Field` and `Input` inside for an inline edit form. Pair the cancel button with `PopoverClose` so the popup closes on cancel.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport { Field, FieldLabel } from '@bilazo/kito/components/field'\nimport { Input } from '@bilazo/kito/components/input'\nimport {\n  Popover,\n  PopoverClose,\n  PopoverDescription,\n  PopoverHeader,\n  PopoverPopup,\n  PopoverTitle,\n  PopoverTrigger,\n} from '@bilazo/kito/components/popover'\n\n<Popover>\n  <PopoverTrigger render={<Button variant="outline" />}>Edit name</PopoverTrigger>\n  <PopoverPopup className="w-80">\n    <PopoverHeader>\n      <PopoverTitle>Display name</PopoverTitle>\n      <PopoverDescription>Shown on your profile and comments.</PopoverDescription>\n    </PopoverHeader>\n    <Field name="name">\n      <FieldLabel className="sr-only">Name</FieldLabel>\n      <Input placeholder="Your name" />\n    </Field>\n    <div className="flex justify-end gap-2">\n      <PopoverClose render={<Button variant="ghost" size="sm" />}>Cancel</PopoverClose>\n      <Button size="sm">Save</Button>\n    </div>\n  </PopoverPopup>\n</Popover>`,
    },
    {
      title: 'Dismissable callout',
      description:
        'A `PopoverClose` rendered as a ghost icon button in the header gives the user an explicit way to dismiss — useful for onboarding tips and "what\'s this" panels.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Popover,\n  PopoverClose,\n  PopoverDescription,\n  PopoverHeader,\n  PopoverPopup,\n  PopoverTitle,\n  PopoverTrigger,\n} from '@bilazo/kito/components/popover'\n\n<Popover>\n  <PopoverTrigger render={<Button variant="outline" />}>What is this?</PopoverTrigger>\n  <PopoverPopup className="w-96">\n    <div className="flex items-start justify-between gap-4">\n      <PopoverHeader>\n        <PopoverTitle>Real-time sync</PopoverTitle>\n        <PopoverDescription>Changes propagate instantly.</PopoverDescription>\n      </PopoverHeader>\n      <PopoverClose render={<Button variant="ghost" size="icon-sm" aria-label="Dismiss" />}>\n        {/* X icon */}\n      </PopoverClose>\n    </div>\n    <p className="text-sm text-muted-foreground">\n      Sync uses WebSocket for active sessions.\n    </p>\n  </PopoverPopup>\n</Popover>`,
    },
    {
      title: 'Controlled',
      description:
        'Pass `open` and `onOpenChange` to drive the open state from outside. The trigger stays inside `Popover` so Base UI knows what to anchor the popup to — but the state can be changed from anywhere (a store, an external button).',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Popover,\n  PopoverPopup,\n  PopoverTitle,\n  PopoverTrigger,\n} from '@bilazo/kito/components/popover'\nimport { useState } from 'react'\n\nexport function Controlled() {\n  const [open, setOpen] = useState(false)\n  return (\n    <>\n      <Popover open={open} onOpenChange={setOpen}>\n        <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>\n        <PopoverPopup>\n          <PopoverTitle>Controlled</PopoverTitle>\n        </PopoverPopup>\n      </Popover>\n      <Button onClick={() => setOpen((v) => !v)}>Toggle from outside</Button>\n    </>\n  )\n}`,
    },
    {
      title: 'Without an arrow',
      description:
        'Pass `showArrow={false}` for a plain panel. Use it when the popup opens flush against the trigger, or when the arrow would just add noise (an inline form, a settings mini-panel).',
      code: `import {\n  Popover,\n  PopoverDescription,\n  PopoverHeader,\n  PopoverPopup,\n  PopoverTitle,\n  PopoverTrigger,\n} from '@bilazo/kito/components/popover'\n\n<Popover>\n  <PopoverTrigger render={<Button variant="outline" />}>No arrow</PopoverTrigger>\n  <PopoverPopup showArrow={false} className="w-80">\n    <PopoverHeader>\n      <PopoverTitle>Without an arrow</PopoverTitle>\n      <PopoverDescription>A plain panel for cases where a pointer would add noise.</PopoverDescription>\n    </PopoverHeader>\n  </PopoverPopup>\n</Popover>`,
    },
  ],
}
