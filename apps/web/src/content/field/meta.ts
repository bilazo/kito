import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Field',
    'FieldSet',
    'FieldLegend',
    'FieldGroup',
    'FieldContent',
    'FieldTitle',
    'FieldLabel',
    'FieldDescription',
    'FieldError',
    'FieldSeparator',
  ],

  summary:
    "A compound form primitive. A `Field` wraps one control and auto-wires label, description, and error to it through Base UI's `Field.Control`. `FieldGroup` stacks related fields, `FieldSet` + `FieldLegend` group them semantically, and `FieldSeparator` divides sections. Controls built on `Field.Control` (our `Input` and `Textarea`) inherit the labelling without any manual `htmlFor`/`id`.",

  whenToUse: [
    'Build any form: login, signup, settings, checkout. Every input that has a visible label belongs inside a `Field`.',
    'Group related fields under a shared heading — a `FieldSet` with a `FieldLegend`, e.g. "Shipping address" or "Notification preferences".',
    'Display a control row with a label and a short description — a checkbox with an explanation, a switch with a helper line.',
    'Show validation errors next to the control. Add `invalid` on the `Field` and `aria-invalid` on the control; `FieldError` renders below and the label inherits the destructive color.',
    'Switch between vertical and horizontal layouts with one prop — `orientation="horizontal"` for a checkbox row, `"responsive"` inside a `FieldGroup` for a layout that adapts to its container.',
  ],

  whenNotToUse: [
    'For a standalone label that is not part of a form — use `Label`. Field adds structure, auto-wiring, and a role that are only useful when there is an actual control inside.',
    'For a small inline control that does not need a label row — a compact switch in a toolbar. Use the control directly.',
    'For a set of controls the user picks one from — use `RadioGroup` inside a `Field` when there is a single label, or `FieldSet` + `FieldLegend` when each option has its own label. Do not wrap every `<input type="radio">` in its own `Field` — the group needs one legend.',
    'For rich form flows that need field arrays, dependent fields, and cross-field validation — use a form library (`react-hook-form`, `tanstack-form`, `formisch`). `Field` is the presentation primitive; the library owns the state.',
    'For a panel or card wrapping a group of fields with visible chrome — wrap a `FieldGroup` in a `Card`. A `Field` alone has no surface.',
  ],

  props: [
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal' | 'responsive'",
      default: "'vertical'",
      description:
        'Layout of the label and control. `Field` prop. `vertical` for text fields, `horizontal` for checkboxes and switches (label beside a small control), `responsive` for a layout that becomes horizontal at the `md` container width of the enclosing `FieldGroup`.',
    },
    {
      name: 'variant',
      type: "'legend' | 'label'",
      default: "'legend'",
      description:
        'Visual scale of a legend. `FieldLegend` prop. `legend` is the default larger scale (16px). `label` matches the small label size (14px) — use it for a nested `FieldSet` inside a `FieldGroup`.',
    },
    {
      name: 'errors',
      type: '({ message?: string } | undefined)[]',
      description:
        'Form-library errors. `FieldError` prop. Duplicate messages collapse; two or more unique messages render as a bulleted list. Ignored when `children` is provided. Pass `undefined` entries safely — they are filtered out.',
    },
    {
      name: 'invalid',
      type: 'boolean',
      description:
        'Mark the whole field as invalid. `Field` prop. Colors the label with the destructive token and, in combination with `aria-invalid` on the control, tells assistive technology that the value is rejected.',
    },
  ],

  propsNote:
    "Field is a compound of ten parts. The props table lists the four that carry behaviour: `orientation` on `Field`, `variant` on `FieldLegend`, `errors` on `FieldError`, and `invalid` on `Field`. Everything else (`FieldSet`, `FieldGroup`, `FieldContent`, `FieldTitle`, `FieldLabel`, `FieldDescription`, `FieldSeparator`) accepts `className` plus native HTML attributes and has no own props. `FieldLabel` and `FieldDescription` delegate to Base UI's `Field.Label` and `Field.Description` and share the auto-wiring with `Field.Control`.",

  composition: [
    {
      title: 'Single field with label, control, and description',
      description:
        '`Input` uses `Field.Control`, so `FieldLabel` wires the `htmlFor`/`id` pairing automatically.',
      code: `import { Field, FieldDescription, FieldLabel } from '@bilazo/kito/components/field'\nimport { Input } from '@bilazo/kito/components/input'\n\n<Field>\n  <FieldLabel>Email</FieldLabel>\n  <Input type="email" placeholder="you@example.com" />\n  <FieldDescription>Used to recover your account.</FieldDescription>\n</Field>`,
    },
    {
      title: 'Field with validation error',
      description:
        'Add `invalid` on the `Field` for the visual state and `aria-invalid` on the control for assistive technology. `FieldError` only renders when it has content.',
      code: `<Field invalid>\n  <FieldLabel>Email</FieldLabel>\n  <Input type="email" aria-invalid />\n  <FieldError>Enter a valid email address.</FieldError>\n</Field>`,
    },
    {
      title: 'Errors from a form library',
      description:
        "Pass the form library's errors array directly. Duplicates collapse; multiple unique messages become a bulleted list.",
      code: `<Field invalid>\n  <FieldLabel>Password</FieldLabel>\n  <Input type="password" aria-invalid />\n  <FieldError errors={form.formState.errors.password} />\n</Field>`,
    },
    {
      title: 'Horizontal row',
      description:
        'For a checkbox or switch, `orientation="horizontal"` sits the label beside a small control. Add `FieldContent` when there is also a description.',
      code: `<Field orientation="horizontal">\n  <Switch id="newsletter" />\n  <FieldContent>\n    <FieldLabel htmlFor="newsletter">Newsletter</FieldLabel>\n    <FieldDescription>One email per week.</FieldDescription>\n  </FieldContent>\n</Field>`,
    },
    {
      title: 'Group and set',
      description:
        '`FieldSet` + `FieldLegend` give the group a semantic name. `FieldGroup` stacks the fields. `FieldSeparator` divides sections with optional inline text.',
      code: `<FieldSet>\n  <FieldLegend>Profile</FieldLegend>\n  <FieldDescription>Shown on invoices and emails.</FieldDescription>\n  <FieldGroup>\n    <Field>\n      <FieldLabel>Name</FieldLabel>\n      <Input />\n    </Field>\n    <FieldSeparator>or</FieldSeparator>\n    <Field>\n      <FieldLabel>Company</FieldLabel>\n      <Input />\n    </Field>\n  </FieldGroup>\n</FieldSet>`,
    },
  ],
}
