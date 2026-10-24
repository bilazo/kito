import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Tabs', 'TabsList', 'TabsTab', 'TabsIndicator', 'TabsPanel'],

  summary:
    'A set of layered panels switched by a row (or column) of tabs. `Tabs` renders no DOM of its own — it manages the active value and keyboard navigation (arrow keys, Home, End); the visible parts are the four subcomponents. Two visual variants: `default` puts a muted container behind the strip and slides a pill under the active tab, `line` slides an underline instead for navigation-style tabs. Two orientations: `horizontal` (default) and `vertical`, where the strip becomes a column and the panels sit beside it. `TabsIndicator` is optional and must be the last child of `TabsList` — it reads the active tab’s geometry from Base UI’s CSS variables to slide between tabs.',

  whenToUse: [
    'Switch between related views of the same context — Overview / Projects / Account inside one settings page — without leaving the page.',
    'Split a long form or panel into sections that stay in the same URL — account settings with Profile / Security / Billing tabs.',
    'Filter-style tabs (All / Mine / Archived) where the content below changes but the header and chrome do not.',
    'Documentation examples in multiple flavors — React / HTML / CSS — that the reader switches at a glance.',
    'In a wizard or stepper where each step is a panel and the order matters — arrow keys move between steps.',
    'Inside a vertical layout where a sidebar of tabs switches the content beside it — settings-page layout with `orientation="vertical"`.',
  ],

  whenNotToUse: [
    'For navigation between pages or URLs — use `Link` or a router. Tabs switch content in place; if the content is a distinct page, it should have its own URL and its own route.',
    'For more than about seven tabs — the strip becomes hard to scan and the active tab is easy to lose. Use a `Select` or a menu.',
    'For a form’s forward/back steps that the user must complete in order — use a stepper or a wizard with explicit Next/Back buttons. Tabs imply the user can jump between any tab at any time.',
    'For panels whose content is large enough to need its own scroll — the tab strip stays fixed but each panel scrolls independently, which reads as a bug. Split into routes instead.',
    'Without a `TabsPanel` for every `TabsTab` value — an active tab with no matching panel leaves a blank area. Every `TabsTab value="x"` must have a `<TabsPanel value="x">` sibling.',
    'Without passing `variant` to every `TabsTab` — the styling fails silently. See the note below.',
    'Without passing `orientation` to the root, the list, and each tab — vertical tabs lose their column layout on the list or their full-width styling on the tabs.',
  ],

  props: [
    {
      name: 'value',
      type: 'string',
      description:
        'Controlled active tab value. Pass with `onValueChange` to drive the active tab from outside (a router, a store). Omit both `value` and `defaultValue` for an uncontrolled tabs. `Tabs` prop.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description:
        'Initial active tab value for an uncontrolled tabs. Ignored when `value` is passed. `Tabs` prop.',
    },
    {
      name: 'onValueChange',
      type: '(value: string, eventDetails: ...) => void',
      description:
        'Change callback. Fires with the newly-selected value — no `event.target` unwrap needed. Inherited from Base UI’s `Tabs.Root`. `Tabs` prop.',
    },
    {
      name: 'keepMounted',
      type: 'boolean',
      description:
        'Keep every panel in the DOM, hidden when not active. Use this when a panel has expensive setup that should survive tab switches (a chart, an editor). Default off — panels are unmounted when inactive. `Tabs` prop; the same prop also exists on `TabsPanel`.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description:
        'Layout direction of the whole component. Pass to **all three** — `Tabs` (drives keyboard navigation: left/right vs up/down), `TabsList` (drives `flex-row` vs `flex-col`), and every `TabsTab` (drives `w-full justify-start` on vertical). The list and tabs do not read this from the root — the type system does not enforce it, and a mismatch fails visually. `Tabs` / `TabsList` / `TabsTab` prop.',
    },
    {
      name: 'variant',
      type: "'default' | 'line'",
      default: "'default'",
      description:
        'Visual style. `default` puts a muted container behind the strip and slides a pill under the active tab — for filter-style tabs that read as one unit. `line` replaces the container with a transparent background and slides an underline beneath the active tab — for navigation-style tabs that should blend into the page. Pass to **both** `TabsList` and each `TabsTab` — the tab’s padding differs per variant, and a mismatch yields mixed styling. `TabsList` / `TabsTab` prop.',
    },
    {
      name: 'value',
      type: 'string',
      required: true,
      description:
        'The value this specific tab activates. Required — Base UI throws a runtime error without it, because the root needs to know which panel to show. Must match a `TabsPanel`’s `value`. `TabsTab` prop.',
    },
    {
      name: 'value',
      type: 'string',
      required: true,
      description:
        'The value this panel belongs to. Required — a panel with no value can never be activated. Must match a `TabsTab`’s `value`. `TabsPanel` prop.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description:
        'Disables this tab. Disabled tabs are skipped by keyboard navigation, cannot be clicked, and cannot be focused. The root gets `data-disabled` (`pointer-events-none opacity-50`). `TabsTab` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part — `Tabs`, `TabsList`, `TabsTab`, `TabsIndicator`, `TabsPanel`. Merged with the base classes via `cn()`.',
    },
  ],

  propsNote:
    'Five components compose. `Tabs` (root) renders no DOM of its own — it manages the active value and keyboard navigation, and passes its configuration to Base UI’s `Tabs.Root`. `TabsList` is the strip — its container styles (`bg-muted` for `default`, transparent for `line`, `flex-row` vs `flex-col` per orientation) live on this part. `TabsTab` is one tab — its padding differs per variant, and on vertical its width is `w-full justify-start`, so the tab fills the strip and the text starts at the reading start. `TabsIndicator` is optional, and MUST be placed **last** in `TabsList` — it uses Base UI’s CSS variables (`--active-tab-left`, `--active-tab-width`, `--active-tab-top`, `--active-tab-height`) to slide between tabs, and those variables are set relative to the list, so any element after the indicator would be inside the wrong stacking context. `TabsPanel` is one panel — only the panel matching the active value is rendered, unless `keepMounted` is set on the root (or on the panel). Two configuration props cross subcomponent boundaries and are easy to get wrong: `variant` must be passed to **both** `TabsList` and every `TabsTab` (they share styling via the `group/tabs-list` selector, but each needs its own class), and `orientation` must be passed to **the root, the list, and every tab** (keyboard navigation, layout, and tab styling each read it independently). Neither is enforced by the type system — mismatches fail silently as mixed styling.',

  composition: [
    {
      title: 'Basic',
      description:
        'The canonical pattern: `Tabs` with a `defaultValue`, a `TabsList` with `TabsTab` children plus a `TabsIndicator` last, and a `TabsPanel` per tab value.',
      code: `import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'\n\n<Tabs defaultValue="overview" className="w-full max-w-md">\n  <TabsList>\n    <TabsTab value="overview">Overview</TabsTab>\n    <TabsTab value="projects">Projects</TabsTab>\n    <TabsTab value="account">Account</TabsTab>\n    <TabsIndicator />\n  </TabsList>\n  <TabsPanel value="overview" className="pt-4">\n    Workspace stats and recent activity.\n  </TabsPanel>\n  <TabsPanel value="projects" className="pt-4">\n    Milestones and deadlines for active projects.\n  </TabsPanel>\n  <TabsPanel value="account" className="pt-4">\n    Profile, password, and notification preferences.\n  </TabsPanel>\n</Tabs>`,
    },
    {
      title: 'Line variant',
      description:
        'Pass `variant="line"` to **both** `TabsList` and each `TabsTab`. The list becomes transparent, the tabs get extra bottom padding for the underline, and the indicator renders a 2px bar at the bottom of the active tab. A mismatch (`variant` on the list but not on the tab) leaves the tab with the default padding — the underline floats without enough room.',
      code: `import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'\n\n<Tabs defaultValue="overview" className="w-full max-w-md">\n  <TabsList variant="line">\n    <TabsTab variant="line" value="overview">Overview</TabsTab>\n    <TabsTab variant="line" value="projects">Projects</TabsTab>\n    <TabsTab variant="line" value="account">Account</TabsTab>\n    <TabsIndicator />\n  </TabsList>\n  <TabsPanel value="overview" className="pt-4">\n    Overview content\n  </TabsPanel>\n</Tabs>`,
    },
    {
      title: 'Vertical',
      description:
        'Pass `orientation="vertical"` to the root, the list, and every tab. The list becomes `flex-col` and stretches its children; each tab is `w-full justify-start` so the text starts at the reading start. Panels sit beside the list — wrap the panels in a `flex-1` div so they take the remaining width.',
      code: `import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'\n\n<Tabs defaultValue="general" orientation="vertical" className="flex w-full max-w-md gap-6">\n  <TabsList orientation="vertical" className="w-40">\n    <TabsTab orientation="vertical" value="general">General</TabsTab>\n    <TabsTab orientation="vertical" value="security">Security</TabsTab>\n    <TabsTab orientation="vertical" value="billing">Billing</TabsTab>\n    <TabsIndicator />\n  </TabsList>\n  <div className="flex-1">\n    <TabsPanel value="general">Display name, timezone, language.</TabsPanel>\n    <TabsPanel value="security">Password, two-factor authentication.</TabsPanel>\n    <TabsPanel value="billing">Payment methods and invoices.</TabsPanel>\n  </div>\n</Tabs>`,
    },
    {
      title: 'Controlled',
      description:
        'Pass `value` and `onValueChange` on the root to drive the active tab from outside. The value is the tab that is currently active, not the one clicked — a mismatch leaves the UI in a wrong state until the parent catches up.',
      code: `import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'\nimport { useState } from 'react'\n\nexport function Controlled() {\n  const [value, setValue] = useState('a')\n  return (\n    <Tabs value={value} onValueChange={(v) => setValue(v as string)}>\n      <TabsList>\n        <TabsTab value="a">Tab A</TabsTab>\n        <TabsTab value="b">Tab B</TabsTab>\n        <TabsIndicator />\n      </TabsList>\n      <TabsPanel value="a">Panel A</TabsPanel>\n      <TabsPanel value="b">Panel B</TabsPanel>\n    </Tabs>\n  )\n}`,
    },
    {
      title: 'With icons',
      description:
        'Tabs accept inline SVG icons. Non-sized icons inherit `size-4` from the tab’s `[&_svg:not([class*="size-"])]` rule; sized icons keep their own class.',
      code: `import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'\nimport { Bell, CreditCard, User } from 'lucide-react'\n\n<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTab value="account">\n      <User />\n      Account\n    </TabsTab>\n    <TabsTab value="notifications">\n      <Bell />\n      Notifications\n    </TabsTab>\n    <TabsTab value="billing">\n      <CreditCard />\n      Billing\n    </TabsTab>\n    <TabsIndicator />\n  </TabsList>\n  <TabsPanel value="account">Profile settings.</TabsPanel>\n</Tabs>`,
    },
  ],
}
