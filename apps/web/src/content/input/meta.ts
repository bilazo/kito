import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Input', 'inputStyles', 'defaultDir'],

  summary:
    'A single-line text input. Picks its own text direction from `type` — email, url, tel, password, and number inputs always render LTR even inside an RTL page; everything else follows the content with `dir="auto"`. Shares the same `--control-*` size tokens as Button, so an input and a button placed side by side line up.',

  whenToUse: [
    'Collect a single line of text — name, email, search query, URL, phone number.',
    'Inside a `Field` (or with a `Label`) for a labelled form row with a description or error message.',
    'For short-form text entry that fits on one line — for multi-line text, use `Textarea`.',
    'As the input slot inside an `InputGroup` when you need leading/trailing icons or buttons.',
  ],

  whenNotToUse: [
    'For multi-line text — use `Textarea`. Long content wraps badly on a single line and has no resize handle.',
    'For choosing from a list of options — use `Select` or `Combobox`. A free-text field that happens to accept the same values loses the keyboard navigation and the option list.',
    'For a search box with a dropdown of results — use `Combobox`. A raw `Input` with `type="search"` is fine for a submit-then-navigate search, not for suggestion-as-you-type.',
    'As the only label of a field — every input needs an accessible name (`Label` with `htmlFor`, or `aria-label`). Placeholder text is not a substitute: it disappears on the first keystroke.',
    'To build a whole form row — pair `Input` with `Label` and (optionally) a description/error slot; do not inline error text as an adjacent `<span>`.',
    'With `type="file"` when you need a real dropzone or preview — use a dedicated file-upload component (or `InputGroup` around `type="file"` plus a dropzone) instead of the browser’s default file chrome.',
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
        'Native input type. Also drives `dir`: `email`, `url`, `tel`, `password`, and `number` force `dir="ltr"`, everything else defaults to `dir="auto"`.',
    },
    {
      name: 'dir',
      type: "'ltr' | 'rtl' | 'auto'",
      description:
        'Explicit text direction. Overrides the type-based default from `defaultDir(type)`. Use this for the rare field where the type-based heuristic is wrong (e.g. an email field that should follow the page direction).',
    },
    {
      name: 'aria-invalid',
      type: 'boolean',
      description:
        'Marks the input as invalid. Applies the destructive border and the destructive outline on `:focus-visible`. When the input lives inside a `<Field invalid>`, Base UI sets `data-invalid` instead — both selectors are styled, so either works.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes. Merged with the size classes via `cn()` — use it for width (`max-w-xs`), layout, or a one-off visual override.',
    },
  ],

  propsNote:
    'Two helpers are also exported. `inputStyles` is a cva output that returns the class string without rendering an `<input>` — use it to style your own control (or `Textarea`, which already consumes it) with the same border, focus, and invalid treatment. `defaultDir(type)` is the small utility that returns `"ltr"` for `email`, `url`, `tel`, `password`, and `number`, and `"auto"` otherwise. The underlying element is Base UI’s `Field.Control` rendered as a native `<input>`, so all native attributes (`id`, `placeholder`, `autoComplete`, `readOnly`, `required`, `aria-*`, `data-*`) are forwarded untouched.',

  composition: [
    {
      title: 'Labelled input',
      description:
        'Every field needs an accessible name. Pair the input with a `Label` via matching `htmlFor` / `id` — the browser wires the pair up automatically.',
      code: `import { Input } from '@bilazo/kito/components/input'\nimport { Label } from '@bilazo/kito/components/label'\n\n<div className="flex max-w-xs flex-col gap-2">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" placeholder="you@example.com" />\n</div>`,
    },
    {
      title: 'Invalid state',
      description:
        'Set `aria-invalid` directly for standalone use. Inside a `<Field invalid>` Base UI sets `data-invalid` for you — both selectors apply the destructive border.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<Input aria-invalid aria-label="Email" placeholder="you@example.com" />`,
    },
    {
      title: 'Sizes share the control scale',
      description:
        '`sm`, `md`, and `lg` map to the same `--control-*` tokens that `Button` uses, so pairing an input with an adjacent button lines them up without manual sizing.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<div className="flex max-w-xs flex-col gap-2">\n  <Input size="sm" aria-label="Small" placeholder="Small" />\n  <Input size="md" aria-label="Medium" placeholder="Medium" />\n  <Input size="lg" aria-label="Large" placeholder="Large" />\n</div>`,
    },
    {
      title: 'Auto-direction from type',
      description:
        '`email`, `url`, `tel`, `password`, and `number` fields always render LTR — even inside an RTL page. This keeps addresses and phone numbers readable while the label and the rest of the UI stay in RTL.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<Input type="email" aria-label="Email" placeholder="you@example.com" />\n<Input type="tel" aria-label="Phone" placeholder="+1 555 0100" />`,
    },
    {
      title: 'Search input',
      description:
        'Use `type="search"` for a submit-then-navigate search. The WebKit native clear button is suppressed so it doesn’t fight a custom clear affordance.',
      code: `import { Input } from '@bilazo/kito/components/input'\n\n<Input type="search" aria-label="Search" placeholder="Search components…" />`,
    },
  ],
}
