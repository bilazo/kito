import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Checkbox'],

  summary:
    'A checkbox with unchecked, checked, and indeterminate states. Base UI drives all states via `data-*` attributes on the root, so the styling stays in sync even when the value is controlled from outside. The visible box is the root; Base UI renders a hidden `<input>` behind it for form participation and label association. `sm` (16px) fits dense tables; `md` (20px) is the default. Pass any children to replace the default check/minus glyph with your own icon. The root carries a transparent `after` pseudo-element that extends the click area to a 44×44 WCAG AAA touch target without changing the visual footprint.',

  whenToUse: [
    'Collect a yes/no choice from the user — accept terms, enable a setting, remember this option.',
    'Select zero or more options from a short, visible list — email/SMS/push notification preferences.',
    'As the parent in a "select all" group — pass `indeterminate` alongside `checked` to show a mixed state when only some children are selected.',
    'Inside a `<Field orientation="horizontal">` when the row needs a visible label and a description — Base UI wires the label to the control automatically.',
    'When the choice should be reversible and low-commitment — a checkbox that can be unchecked with one click, unlike a `Switch` which reads as "on" and often implies an immediate effect.',
    'For filtering or multi-select from a fixed list where the options fit in the page — `Select` and `Combobox` hide the options behind a trigger; a checkbox list keeps them visible.',
  ],

  whenNotToUse: [
    'For a single binary toggle that reads as "on/off" with immediate effect — use `Switch`. A checkbox implies a submission form; a switch implies an instant setting change.',
    'For choosing exactly one option from a list — use `Radio`. Checkboxes allow multiple selections; a user who checks two options when only one is valid is a bug waiting to happen.',
    'For a choice from many options where the list is long — use `Select` or `Combobox`. A long checkbox list dominates the page.',
    'As an action button ("Continue", "Delete") — use `Button`. A checkbox that triggers an action blurs the line between choice and command.',
    'As the only label of the control — every checkbox needs an accessible name. Pair it with a `Label` via `htmlFor`, or pass `aria-label`. A bare checkbox is announced as "checkbox" with no context.',
    'As the parent checkbox of a large recursive tree — a deep tree needs a dedicated tree-view component with proper keyboard navigation and ARIA states. Checkbox is for one level of parent/child at most.',
  ],

  props: [
    {
      name: 'size',
      type: "'sm' | 'md'",
      default: "'md'",
      description:
        'Size of the box. `sm` is `size-4` (16px) — fits dense tables. `md` is `size-5` (20px) — the default, lines up with the small icon sizes of `Button`. The size also drives the SVG icon size inside the indicator via `[&_svg]:size-3` / `[&_svg]:size-3.5`. `Checkbox` prop.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description:
        'Renders the "partially selected" state — a minus glyph instead of a check, and `aria-checked="mixed"` on the root. Separate from `checked`: pass both to render a parent-of-mixed-children (e.g. a "select all" checkbox when only some children are on). Inherited from Base UI’s `Checkbox.Root`; Kito sets the default to `false` in the destructure.',
    },
    {
      name: 'checked',
      type: 'boolean',
      description:
        'Controlled checked state. Pass with `onCheckedChange` for a controlled checkbox. Omit both for an uncontrolled one — Base UI tracks its own state. Inherited from Base UI’s `Checkbox.Root`.',
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean, eventDetails: ...) => void',
      description:
        'Change callback. Receives the new boolean value directly — no `event.target.checked` unwrap needed. Fires on both user clicks and programmatic changes. Inherited from Base UI’s `Checkbox.Root`.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description:
        'Custom indicator icon. When omitted, the checkbox renders an internal check glyph (or a minus glyph when `indeterminate`). The children mount only when the checkbox is on — Base UI unmounts the `Indicator` while unchecked, so a custom icon passed here is not in the DOM until the box is checked. Size is controlled by the parent indicator’s `[&_svg]:size-*` selector, so a `size-*` class on the icon loses to the parent rule.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on the box. Merged with the base classes via `cn()`. Use it to override the checked fill (`data-checked:bg-destructive` + `data-checked:border-destructive` for a "favorite" toggle), or to change the border color for a per-instance visual.',
    },
  ],

  propsNote:
    'Only `Checkbox` is exported as a value; `CheckIcon` and `MinusIcon` are internal (not exported — Kito’s checkbox does not depend on any icon library; consumers pass their own icon as `children`). The underlying element is Base UI’s `Checkbox.Root` with a hidden `<input>` rendered automatically for form participation and `Label`’s `htmlFor` association. All native and Base UI props (`id`, `name`, `value`, `disabled`, `required`, `checked`, `defaultChecked`, `onCheckedChange`, `aria-invalid`, `data-*`) are forwarded untouched via `CheckboxBaseUiProps`. Base UI sets `aria-checked="mixed"` on the root when `indeterminate` is `true`, and unmounts the internal `Indicator` while the box is unchecked — this is intentional, and passing `children` for a custom icon works only in the checked/indeterminate states. The `after` pseudo-element (`-inset-x-3 -inset-y-3`) extends the click area to a 44×44 WCAG AAA touch target without changing the visual footprint; this is transparent and does not affect layout, but in dense layouts it can overlap the hit area of an adjacent control — add `gap-3` or larger between checkboxes in a tight group.',

  composition: [
    {
      title: 'With a Label',
      description:
        'The minimum for an accessible checkbox: pair the box with a `Label` via matching `htmlFor` / `id`. Clicking the label toggles the checkbox, and screen readers announce them as one control.',
      code: `import { Checkbox } from '@bilazo/kito/components/checkbox'\nimport { Label } from '@bilazo/kito/components/label'\n\n<div className="flex items-center gap-2">\n  <Checkbox id="tos" />\n  <Label htmlFor="tos">Accept the terms and conditions</Label>\n</div>`,
    },
    {
      title: 'Tri-state group with "select all"',
      description:
        'The parent checkbox passes both `checked` and `indeterminate` — `indeterminate` when some children are selected but not all. The children are a plain map over the options; the parent’s `onCheckedChange` toggles all of them.',
      code: `import { Checkbox } from '@bilazo/kito/components/checkbox'\nimport { Label } from '@bilazo/kito/components/label'\nimport { useState } from 'react'\n\nconst OPTIONS = ['Email', 'SMS', 'Push'] as const\n\nexport function Group() {\n  const [selected, setSelected] = useState<string[]>(['Email'])\n  const allChecked = selected.length === OPTIONS.length\n  const anyChecked = selected.length > 0\n\n  function toggle(option: string) {\n    setSelected((current) =>\n      current.includes(option) ? current.filter((x) => x !== option) : [...current, option],\n    )\n  }\n\n  return (\n    <div className="flex flex-col gap-2">\n      <div className="flex items-center gap-2 border-b border-border pb-2">\n        <Checkbox\n          id="all"\n          checked={allChecked}\n          indeterminate={!allChecked && anyChecked}\n          onCheckedChange={() => setSelected(allChecked ? [] : [...OPTIONS])}\n        />\n        <Label htmlFor="all" className="font-semibold">\n          All channels\n        </Label>\n      </div>\n      {OPTIONS.map((option) => (\n        <div key={option} className="flex items-center gap-2 ps-1">\n          <Checkbox\n            id={\`opt-\${option}\`}\n            checked={selected.includes(option)}\n            onCheckedChange={() => toggle(option)}\n          />\n          <Label htmlFor={\`opt-\${option}\`}>{option}</Label>\n        </div>\n      ))}\n    </div>\n  )\n}`,
    },
    {
      title: 'Inside a Field',
      description:
        'For a row of checkboxes with a visible label and description, wrap in `Field orientation="horizontal"` — Base UI wires the label to the control automatically, so `htmlFor` is not needed.',
      code: `import { Checkbox } from '@bilazo/kito/components/checkbox'\nimport {\n  Field,\n  FieldContent,\n  FieldDescription,\n  FieldGroup,\n  FieldLabel,\n} from '@bilazo/kito/components/field'\n\n<FieldGroup className="w-full max-w-md">\n  <Field orientation="horizontal">\n    <Checkbox id="f-news" />\n    <FieldContent>\n      <FieldLabel htmlFor="f-news">Product updates</FieldLabel>\n      <FieldDescription>Occasional announcements about new features.</FieldDescription>\n    </FieldContent>\n  </Field>\n</FieldGroup>`,
    },
    {
      title: 'Custom indicator icon',
      description:
        'Pass any children to replace the default check/minus glyph. The children mount only when the checkbox is checked — Base UI unmounts the `Indicator` while unchecked. Override the fill via `className` on the root (the internal indicator inherits `text-current`).',
      code: `import { Checkbox } from '@bilazo/kito/components/checkbox'\nimport { Label } from '@bilazo/kito/components/label'\nimport { Heart } from 'lucide-react'\n\n<div className="flex items-center gap-2">\n  <Checkbox id="fav" className="data-checked:border-destructive data-checked:bg-destructive">\n    <Heart className="fill-current" />\n  </Checkbox>\n  <Label htmlFor="fav">Add to favorites</Label>\n</div>`,
    },
    {
      title: 'Sizes',
      description:
        '`sm` fits dense tables; `md` is the default. Both use the same data attributes, so a controlled checkbox behaves identically at either size.',
      code: `import { Checkbox } from '@bilazo/kito/components/checkbox'\nimport { Label } from '@bilazo/kito/components/label'\n\n<div className="flex flex-col gap-3">\n  <div className="flex items-center gap-2">\n    <Checkbox id="size-sm" size="sm" />\n    <Label htmlFor="size-sm">Small</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <Checkbox id="size-md" size="md" />\n    <Label htmlFor="size-md">Medium</Label>\n  </div>\n</div>`,
    },
  ],
}
