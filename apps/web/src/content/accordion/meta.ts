import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],

  summary:
    'A vertically stacked set of interactive headings that each reveal a section of content. Only one item is open at a time by default — pass `multiple` to allow any number. Base UI handles the ARIA wiring (`aria-expanded`, `aria-controls`), keyboard navigation (Enter / Space to toggle, ArrowUp / ArrowDown to move, Home / End to jump to the ends), and the open/close animation via the `--accordion-panel-height` CSS variable. The trigger renders a chevron that rotates 180° when its item is open — a direction-agnostic transform, so RTL works without an override.',

  whenToUse: [
    'An FAQ section — a stack of question triggers with answer panels, where only one answer needs to be visible at a time.',
    'A long settings page grouped by category — Account, Notifications, Privacy — where the user focuses on one section at a time.',
    'A mobile filter panel where each filter group collapses to keep the list scannable.',
    'Documentation or changelog sections — a compact table of contents where clicking a heading reveals its body.',
    'A multi-step form where steps are collapsible — a compact summary of each step with the fields inside.',
    'Anywhere one section at a time should be visible on a narrow viewport, with a clear affordance for revealing the rest.',
    'When the content is optional for most users — a full policy, a long explanation — and the headings should stay visible.',
  ],

  whenNotToUse: [
    'For tabbed content that switches in place — use `Tabs`. Tabs are persistent and horizontal; Accordion stacks vertically and toggles.',
    'For a single collapsible section — use a plain `<button>` + `<div>` or `Collapsible` (not built yet). Accordion expects two or more items.',
    'For navigation between pages — use `Menu` or `NavigationMenu`. Accordion does not route; it reveals content in place.',
    'For a list of independent choices (filters, options) — use `Checkbox` or a list of `Item`s. An Accordion is for reveal, not selection.',
    'For very long content — a single 2000-line section inside a panel becomes a scrollbar; prefer a dedicated page or a `Dialog`.',
    'Without a real heading in the trigger — every trigger is a `<button aria-expanded>` and should have a label. Icon-only triggers need an `aria-label`.',
    'As the only way to reach critical information — collapsed sections are invisible until clicked. Critical information belongs on the page.',
    'For a tree view (nested, hierarchical items with their own expand state) — use a dedicated tree component. Accordion is flat.',
  ],

  props: [
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description:
        'Allow more than one item to be open at a time. When `false` (default), opening a new item closes the previously open one — the standard FAQ behaviour. `Accordion` prop.',
    },
    {
      name: 'defaultValue',
      type: 'string[]',
      description:
        'The items open on mount, for an uncontrolled accordion. Each entry is a `value` matching an `AccordionItem`. Omit for a fully collapsed accordion, or pass `multiple` and include multiple entries. `Accordion` prop.',
    },
    {
      name: 'value',
      type: 'string[]',
      description:
        'Controlled open items. Pass with `onValueChange` to drive the open state from outside. Omit both `value` and `onValueChange` for an uncontrolled accordion. `Accordion` prop.',
    },
    {
      name: 'onValueChange',
      type: '(value: string[], eventDetails: ...) => void',
      description:
        'Change callback. Fires with the new set of open item values. Inherited from Base UI’s `Accordion.Root`. `Accordion` prop.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description:
        'Layout direction. `vertical` stacks items; `horizontal` places them side by side. The latter is rare — most accordions stack. `Accordion` prop.',
    },
    {
      name: 'value',
      type: 'string',
      required: true,
      description:
        'This item’s identifier — matched against `defaultValue` / `value` on the root. Every item needs a unique value. `AccordionItem` prop.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Make the item inert. The trigger remains visible but cannot be clicked, focused, or toggled, and the panel stays collapsed. `AccordionItem` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part. On `Accordion`, useful for a max-width or a custom background. On `AccordionTrigger`, a per-item padding. On `AccordionContent`, the `className` lands on the inner wrapper — use it for content padding (`p-4`), background, or typography overrides.',
    },
  ],

  propsNote:
    'Four components compose. `Accordion` (root) forwards to Base UI’s `Accordion.Root` — it renders a single `<div>` wrapper and manages the open item(s) plus keyboard navigation. `AccordionItem` renders a `<div>` with a bottom border (the last item’s border is cancelled by the item’s own `border-b` being the only border; add `last:border-b-0` if you need no bottom border) and holds the required `value` plus an optional `disabled`. `AccordionTrigger` renders Base UI’s `Header` (an `<h3>`) wrapping a `<button>` — this gives the accordion real headings in the document outline and makes the whole heading a click target. The chevron lives inside the trigger as an `aria-hidden` SVG and rotates via `group-aria-expanded/accordion-trigger:rotate-180` — a direction-agnostic transform, so RTL needs no override. `AccordionContent` renders Base UI’s `Panel` with `overflow-hidden` and the `animate-accordion-down` / `animate-accordion-up` keyframes defined in `defaults.css`; the inner `<div>` uses `h-(--accordion-panel-height)` (a CSS variable Base UI sets to the content height) with `data-ending-style:h-0 data-starting-style:h-0` so the panel does not clip content at the start of opening or the end of closing. `motion-reduce:animate-none` disables the animation for users who opt out — the panel still toggles, just instantly. `className` on `AccordionContent` is applied to the inner wrapper (not the animating panel) so it can adjust content padding without breaking the height animation. Base UI’s `keepMounted` prop is available (through `AccordionContent` as `Accordion.Panel.Props`) — the default is `false`, meaning closed panels are unmounted; pass `keepMounted` if you need the content to persist for form-state preservation or offscreen measurement.',

  composition: [
    {
      title: 'Basic FAQ',
      description:
        'The canonical pattern: one item open by default via `defaultValue`, each item a trigger + content pair. Clicking a trigger closes the previously open item.',
      code: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from '@bilazo/kito/components/accordion'\n\n<Accordion defaultValue={['item-1']}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger>Is it styled?</AccordionTrigger>\n    <AccordionContent>Yes. It uses Kito’s semantic tokens.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    },
    {
      title: 'Multiple items open',
      description:
        'Pass `multiple` to let the user open any number of sections at once. Useful for a settings page where the user compares several sections.',
      code: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from '@bilazo/kito/components/accordion'\n\n<Accordion multiple defaultValue={['item-1', 'item-2']}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Account</AccordionTrigger>\n    <AccordionContent>Name, email, and profile photo.</AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger>Notifications</AccordionTrigger>\n    <AccordionContent>Email, push, and in-app preferences.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    },
    {
      title: 'With an icon in the trigger',
      description:
        'The trigger’s children are rendered before the chevron, so a leading icon works by wrapping it in a flex row. A `bg-muted` square keeps the icon on the same visual footing as the surrounding content.',
      code: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from '@bilazo/kito/components/accordion'\nimport { User } from 'lucide-react'\n\n<Accordion>\n  <AccordionItem value="profile">\n    <AccordionTrigger>\n      <span className="flex items-center gap-3">\n        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">\n          <User />\n        </span>\n        Profile\n      </span>\n    </AccordionTrigger>\n    <AccordionContent>Display name, avatar, and public bio.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    },
    {
      title: 'Controlled',
      description:
        'Pass `value` and `onValueChange` to drive the open items from outside — useful for analytics on which sections the user opens, or for syncing the open state to a URL parameter.',
      code: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from '@bilazo/kito/components/accordion'\nimport { useState } from 'react'\n\nexport function Controlled() {\n  const [open, setOpen] = useState<string[]>(['item-1'])\n  return (\n    <Accordion value={open} onValueChange={setOpen}>\n      <AccordionItem value="item-1">\n        <AccordionTrigger>Section 1</AccordionTrigger>\n        <AccordionContent>Content 1</AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-2">\n        <AccordionTrigger>Section 2</AccordionTrigger>\n        <AccordionContent>Content 2</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}`,
    },
    {
      title: 'Inside a card',
      description:
        'Wrap the `Accordion` in a `Card` for a FAQ-style layout. `CardHeader` provides the section title; the accordion provides the questions.',
      code: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from '@bilazo/kito/components/accordion'\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardHeader,\n  CardTitle,\n} from '@bilazo/kito/components/card'\n\n<Card>\n  <CardHeader>\n    <CardTitle>Frequently asked questions</CardTitle>\n    <CardDescription>Short answers to common questions.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <Accordion>\n      <AccordionItem value="q-1">\n        <AccordionTrigger>How do I reset my password?</AccordionTrigger>\n        <AccordionContent>Click "Forgot password" on the sign-in page.</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  </CardContent>\n</Card>`,
    },
  ],
}
