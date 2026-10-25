import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],

  summary:
    'A small label that appears on hover or keyboard focus of a trigger. Tooltips are for short, supplementary labels — a keyboard shortcut, an icon name, a hint. Wrap the app once in TooltipProvider so all tooltips share the same hover delay. Sides are physical (`top` / `right` / `bottom` / `left`); in an app that serves both LTR and RTL, pick the side from the current direction at the call site.',

  whenToUse: [
    'Give an icon-only button a short label — a toolbar action, an icon-only "close" or "more" trigger.',
    'Show a keyboard shortcut for an action that also has a visible label or an icon.',
    'Explain what a symbol or icon means without taking permanent screen space.',
    'Add supplementary context to a control whose primary meaning is already clear (a password strength hint on a format icon, for example).',
  ],

  whenNotToUse: [
    'As the only label of an element — every trigger must still have an accessible name (an `aria-label` on icon-only buttons). A tooltip is invisible to touch users and to screen readers when it is not triggered.',
    'For rich content the user must interact with — form inputs, buttons, links, or a longer panel. Use `Popover` for clickable content.',
    'For text that is essential to understanding the page — visible labels and descriptions. A tooltip should never be the only place a piece of information lives.',
    'For a list of options the user picks from — use `Select`, `Combobox`, or `Menu`.',
    'On mobile as the primary affordance — there is no hover. Use visible labels or an expandable panel instead.',
  ],

  props: [
    {
      name: 'side',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description:
        'Side of the trigger where the tooltip appears. Sides are **physical** — `left` / `right` do not flip in RTL. In an app that serves both LTR and RTL, choose the side from the current direction (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a logical alias. `TooltipContent` prop.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '4',
      description: 'Gap between the trigger and the tooltip, in pixels. `TooltipContent` prop.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'center'",
      description:
        'Alignment of the tooltip relative to the trigger along the cross axis. `TooltipContent` prop.',
    },
    {
      name: 'alignOffset',
      type: 'number',
      default: '0',
      description: 'Offset along the alignment axis, in pixels. `TooltipContent` prop.',
    },
    {
      name: 'showArrow',
      type: 'boolean',
      default: 'true',
      description:
        'Render a small arrow pointing at the trigger. Set to `false` for a pill-style tooltip. `TooltipContent` prop.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '400',
      description:
        'Hover delay in milliseconds. Only accepted by `TooltipProvider` — set once at the app root. `Tooltip` itself accepts a per-tooltip override via its own `delay` prop, but the provider value is what most apps use.',
    },
    {
      name: 'render',
      type: 'ReactElement',
      description:
        'Render the trigger as a different element. Use this to make a `Button`, a router `Link`, or any other element act as the trigger. `TooltipTrigger` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes for the popup. Merged with the base classes via `cn()`. `TooltipContent` prop.',
    },
  ],

  propsNote:
    'Four components are exported. `TooltipProvider` (mount once, accepts `delay`) → `Tooltip` (root, accepts `open` / `defaultOpen` / `onOpenChange`) → `TooltipTrigger` (accepts `render` and `className`) → `TooltipContent` (accepts the side/align props and `showArrow`). Sides are physical — `left` / `right` do not flip in RTL, so an app serving both directions picks the side from the current direction at the call site. `ArrowShape` is also exported as a low-level utility for building custom arrow shapes (used by `PopoverArrow`); it is not part of the day-to-day API.',

  composition: [
    {
      title: 'Icon-only trigger',
      description:
        'Always pair with `aria-label` — the icon is the only visible content, and the tooltip alone does not announce itself to screen readers.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport {\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from '@bilazo/kito/components/tooltip'\nimport { Plus } from 'lucide-react'\n\n<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger render={<Button size="icon" aria-label="Add item" />}>\n      <Plus />\n    </TooltipTrigger>\n    <TooltipContent>Add item</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
    },
    {
      title: 'Provider at the app root',
      description:
        'Mount TooltipProvider once, near the top of the app, so hover timings are shared. Individual `<TooltipProvider>` wrappers per tooltip defeat the purpose.',
      code: `import { TooltipProvider } from '@bilazo/kito/components/tooltip'\n\nexport function RootLayout({ children }: { children: React.ReactNode }) {\n  return <TooltipProvider>{children}</TooltipProvider>\n}`,
    },
    {
      title: 'With a keyboard shortcut',
      description:
        'Inline the shortcut as a `Kbd` so it stays readable on the inverted popup surface.',
      code: `import { Kbd } from '@bilazo/kito/components/kbd'\n\n<TooltipContent>Bold <Kbd>⌘B</Kbd></TooltipContent>`,
    },
    {
      title: 'Direction-aware side',
      description:
        'Sides are physical. In an app that serves both LTR and RTL, pick the side from the current direction at the call site — `right` in an RTL page is where `inline-start` would have put it.',
      code: `<TooltipContent side={dir === 'rtl' ? 'right' : 'left'}>\n  Opens on the reading-start edge\n</TooltipContent>`,
    },
  ],
}
