import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Input', 'inputStyles', 'defaultDir'],

  summary:
    'A single-line text input. Picks its own text direction from `type` — `email`, `url`, `tel`, `password`, and `number` inputs always render LTR even inside an RTL page; everything else uses `dir="auto"` and follows the content. Shares the same `--control-*` size tokens as `Button`, so an input and a button placed side by side line up without manual sizing.',

  whenToUse: [
    'Collect a single line of text — a name, an email address, a search query, a URL, a phone number.',
    'Inside a `Field` (or next to a `Label` with matching `htmlFor` / `id`) for a labelled form row.',
    'For short-form entry that fits on one line — the browser gives you the right on-screen keyboard and autofill for `email`, `tel`, `url`, and `password` types.',
    'As the text-input slot inside an `InputGroup` when the field needs a leading/trailing icon or button.',
  ],

  whenNotToUse: [
    'For multi-line text — use `Textarea`. A single-line field scrolls horizontally and has no resize handle.',
    'To choose from a fixed list of options — use `Select` or `Combobox`. A free-text field loses the option list and the keyboard navigation.',
    'For a search box with suggestions as the user types — use `Combobox`. A raw `Input` with `type="search"` is fine for a submit-then-navigate search, not for suggestion lists.',
    'As the only label of a field — every input needs an accessible name (`Label` with `htmlFor`, or `aria-label`). Placeholder text disappears on the first keystroke and is not announced as the field’s name.',
    'To display formatted or read-only output — use plain text. An input that the user cannot edit but that occupies a full form row looks editable and steals focus.',
  ],

  props: [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description:
        'Controls the input height. Heights come from the same `--control-*` tokens as `Button`, so an input and a button placed side-by-side line up. `sm` and `md` bump their font to `text-base` on touch devices (iOS Safari zooms the page on focus when the field font is smaller than 16px).',
    },
    {
      name: 'type',
      type: 'string',
      default: "'text'",
      description:
        'Native input type. Also drives the text direction: `email`, `url`, `tel`, `password`, and `number` force `dir="ltr"`; everything else defaults to `dir="auto"`.',
    },
    {
      name: 'dir',
      type: "'ltr' | 'rtl' | 'auto'",
      description:
        'Explicit text direction. Overrides the `type`-based default from `defaultDir(type)`. Use this for the rare field where the heuristic is wrong — an email field that should still follow the page direction, for example.',
    },
    {
      name: 'aria-invalid',
      type: 'boolean',
      description:
        'Marks the input as invalid. Applies the destructive border and the destructive outline on `:focus-visible`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control instead — both selectors are styled, so either works.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes. Merged with the size classes via `cn()` — use it for width (`max-w-xs`), layout, or a one-off visual override.',
    },
  ],

  propsNote:
    'Two helpers are also exported. `inputStyles` is a cva output that returns the class string without rendering an `<input>` — use it to style your own control (or a future `Textarea`) with the same border, focus, and invalid treatment. `defaultDir(type)` is a small utility that returns `"ltr"` for `email`, `url`, `tel`, `password`, and `number`, and `"auto"` otherwise. The underlying element is Base UI’s `Field.Control` rendered as a native `<input>`, so all native attributes (`id`, `placeholder`, `autoComplete`, `readOnly`, `required`, `disabled`, `aria-*`, `data-*`) are forwarded untouched.',

  composition: [
    {
      title: 'Labelled input',
      description:
        'Every field needs an accessible name. Pair the input with a `Label` via matching `htmlFor` / `id` — the browser wires the pair up automatically.',
      code: `import { Input } from '@bilazo/kito/components/input'\nimport { Label } from '@bilazo/kito/components/label'\n\n<div className="flex max-w-xs flex-col gap-2">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" placeholder="you@example.com" />\n</div>`,
    },
    {
      title: 'Sizes share the control scale',
      description:
        '`sm`, `md`, and `lg` map to the same `--control-*` tokens that `Button` uses, so pairing an input with an adjacent button lines them up without manual sizing.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<div className="flex max-w-xs flex-col gap-2">\n  <Input size="sm" aria-label="Small" placeholder="Small" />\n  <Input size="md" aria-label="Medium" placeholder="Medium" />\n  <Input size="lg" aria-label="Large" placeholder="Large" />\n</div>`,
    },
    {
      title: 'Invalid state',
      description:
        'Set `aria-invalid` for standalone use. Inside `<Field invalid>` Base UI sets `data-invalid` for you — both selectors apply the destructive border.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<Input aria-invalid aria-label="Email" placeholder="you@example.com" defaultValue="not-an-email" />`,
    },
    {
      title: 'Auto-direction from type',
      description:
        '`email`, `url`, `tel`, `password`, and `number` fields always render LTR — even inside an RTL page. This keeps addresses and phone numbers readable while labels and surrounding UI stay in RTL.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<Input type="email" aria-label="Email" placeholder="you@example.com" />\n<Input type="tel" aria-label="Phone" placeholder="+1 555 0100" />`,
    },
  ],
}
