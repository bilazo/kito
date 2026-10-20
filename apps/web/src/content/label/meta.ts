import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Label', 'labelStyles'],

  summary:
    'A form control label. Renders a plain `<label>` and pre-wires three disabled affordances — the label itself (`data-disabled`), a preceding peer control (`peer-disabled`), and a disabled ancestor group (`group-data-[disabled=true]`). Use it standalone for checkbox rows and any control that is not part of a Base UI `<Field>`.',

  whenToUse: [
    'Pair a text label with a form control that is not inside a Base UI `<Field>` — a checkbox, a radio, a switch, or a standalone `<input>`.',
    'Wrap a checkbox row so the label text and the box act as one click target.',
    'Add a required marker to a field — a red `*` after the label text, while the `required` attribute stays on the control.',
    'Compose a label with an inline action ("Forgot password?"), using `buttonVariants({ variant: "link" })` on the anchor.',
    'Label a custom control that is not a native form element, using `htmlFor` + `id`.',
  ],

  whenNotToUse: [
    "Inside a Base UI `<Field>` — use `FieldLabel` instead. It reads the control's id from the surrounding field and wires `htmlFor` automatically, and it inherits the same `labelStyles`.",
    'As a group heading above several controls — use `<fieldset>` with `<legend>` (or `FieldSet` / `FieldLegend` once `Field` ships) so the group has a semantic name.',
    'As visible body text or a heading — use a paragraph, an `<h2>`, or the typography utilities directly. A `<label>` outside a form has no meaningful role.',
    'As a clickable element without a control — if the "label" is actually a button or a link, use `Button` or an anchor. `Label` associates with a control; it does not perform actions.',
    'On its own with `onClick` handlers — the interaction belongs on the control, not the label. `htmlFor` gives you click-to-focus for free.',
  ],

  props: [
    {
      name: 'htmlFor',
      type: 'string',
      description:
        "The `id` of the control this label describes. Clicking the label focuses the control, and screen readers use the label text as the control's accessible name. Required for any real use — a `<label>` without an association is invalid HTML.",
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description:
        'The label text. Can include an inline icon, a required marker (a `<span aria-hidden>*</span>`), or an inline link styled with `buttonVariants({ variant: "link" })`.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes. Merged with `labelStyles` via `cn()`.',
    },
  ],

  propsNote:
    'Label has no own props — `LabelProps` is `React.ComponentProps<"label">`. Everything (`htmlFor`, `id`, `title`, `data-*`) is native. Three disabled affordances are pre-wired in `labelStyles` and drive the visual: `data-disabled` on the label itself, `peer-disabled` when a sibling control with `className="peer"` is disabled, and `group-data-[disabled=true]` from an ancestor group. `labelStyles` is exported so a future `FieldLabel` can share the exact same class list.',

  composition: [
    {
      title: 'With an input',
      description:
        "The `htmlFor` matches the input's `id`, so clicking the label focuses the field.",
      code: `import { Label } from '@bilazo/kito/components/label'\n\n<Label htmlFor="email">Email address</Label>\n<input id="email" type="email" />`,
    },
    {
      title: 'Checkbox row with peer-disabled',
      description:
        'The `peer` class on the input must come before the label in the DOM. When the input is disabled, the label dims automatically — no extra prop.',
      code: `<input id="tos" type="checkbox" className="peer" disabled />\n<Label htmlFor="tos">Accept the terms</Label>`,
    },
    {
      title: 'Disabled group',
      description:
        'A `<fieldset disabled>` or any ancestor with `data-disabled="true"` dims every label inside.',
      code: `<fieldset disabled data-disabled="true" className="group">\n  <Label htmlFor="x">Field</Label>\n  <input id="x" />\n</fieldset>`,
    },
    {
      title: 'With a required marker',
      description:
        'The marker is visual; the `required` attribute stays on the control so assistive technology announces it.',
      code: `<Label htmlFor="name">\n  Name <span aria-hidden className="text-destructive">*</span>\n</Label>\n<input id="name" required />`,
    },
    {
      title: 'With an inline link',
      description:
        'A label with a "Forgot password?" link sits naturally in a flex row. Use `buttonVariants({ variant: "link" })` on the anchor so the visual matches Button\'s link variant.',
      code: `import { buttonVariants } from '@bilazo/kito/components/button'\n\n<div className="flex items-center justify-between gap-4">\n  <Label htmlFor="password">Password</Label>\n  <a href="/forgot" className={buttonVariants({ variant: "link", size: "sm" })}>\n    Forgot?\n  </a>\n</div>`,
    },
  ],
}
