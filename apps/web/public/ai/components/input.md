# Input

> A single-line text field for forms and inline text entry.

A single-line text input. Picks its own text direction from `type` — `email`, `url`, `tel`, `password`, and `number` inputs always render LTR even inside an RTL page; everything else uses `dir="auto"` and follows the content. Shares the same `--control-*` size tokens as `Button`, so an input and a button placed side by side line up without manual sizing.

## Import

```tsx

import { Input, inputStyles, defaultDir } from '@bilazo/kito/components/input'

```

## When to use

- Collect a single line of text — a name, an email address, a search query, a URL, a phone number.

- Inside a `Field` (or next to a `Label` with matching `htmlFor` / `id`) for a labelled form row.

- For short-form entry that fits on one line — the browser gives you the right on-screen keyboard and autofill for `email`, `tel`, `url`, and `password` types.

- As the text-input slot inside an `InputGroup` when the field needs a leading/trailing icon or button.

## When NOT to use

- For multi-line text — use `Textarea`. A single-line field scrolls horizontally and has no resize handle.

- To choose from a fixed list of options — use `Select` or `Combobox`. A free-text field loses the option list and the keyboard navigation.

- For a search box with suggestions as the user types — use `Combobox`. A raw `Input` with `type="search"` is fine for a submit-then-navigate search, not for suggestion lists.

- As the only label of a field — every input needs an accessible name (`Label` with `htmlFor`, or `aria-label`). Placeholder text disappears on the first keystroke and is not announced as the field’s name.

- To display formatted or read-only output — use plain text. An input that the user cannot edit but that occupies a full form row looks editable and steals focus.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls the input height. Heights come from the same `--control-*` tokens as `Button`, so an input and a button placed side-by-side line up. `sm` and `md` bump their font to `text-base` on touch devices (iOS Safari zooms the page on focus when the field font is smaller than 16px). |
| `type` | `string` | `'text'` | Native input type. Also drives the text direction: `email`, `url`, `tel`, `password`, and `number` force `dir="ltr"`; everything else defaults to `dir="auto"`. |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | — | Explicit text direction. Overrides the `type`-based default from `defaultDir(type)`. Use this for the rare field where the heuristic is wrong — an email field that should still follow the page direction, for example. |
| `aria-invalid` | `boolean` | — | Marks the input as invalid. Applies the destructive border and the destructive outline on `:focus-visible`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control instead — both selectors are styled, so either works. |
| `className` | `string` | — | Extra classes. Merged with the size classes via `cn()` — use it for width (`max-w-xs`), layout, or a one-off visual override. |

Two helpers are also exported. `inputStyles` is a cva output that returns the class string without rendering an `<input>` — use it to style your own control (or a future `Textarea`) with the same border, focus, and invalid treatment. `defaultDir(type)` is a small utility that returns `"ltr"` for `email`, `url`, `tel`, `password`, and `number`, and `"auto"` otherwise. The underlying element is Base UI’s `Field.Control` rendered as a native `<input>`, so all native attributes (`id`, `placeholder`, `autoComplete`, `readOnly`, `required`, `disabled`, `aria-*`, `data-*`) are forwarded untouched.

## Composition

### Labelled input

Every field needs an accessible name. Pair the input with a `Label` via matching `htmlFor` / `id` — the browser wires the pair up automatically.

```tsx
import { Input } from '@bilazo/kito/components/input'
import { Label } from '@bilazo/kito/components/label'

<div className="flex max-w-xs flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Sizes share the control scale

`sm`, `md`, and `lg` map to the same `--control-*` tokens that `Button` uses, so pairing an input with an adjacent button lines them up without manual sizing.

```tsx
import { Input } from '@bilazo/kito/components/input'

<div className="flex max-w-xs flex-col gap-2">
  <Input size="sm" aria-label="Small" placeholder="Small" />
  <Input size="md" aria-label="Medium" placeholder="Medium" />
  <Input size="lg" aria-label="Large" placeholder="Large" />
</div>
```

### Invalid state

Set `aria-invalid` for standalone use. Inside `<Field invalid>` Base UI sets `data-invalid` for you — both selectors apply the destructive border.

```tsx
import { Input } from '@bilazo/kito/components/input'

<Input aria-invalid aria-label="Email" placeholder="you@example.com" defaultValue="not-an-email" />
```

### Auto-direction from type

`email`, `url`, `tel`, `password`, and `number` fields always render LTR — even inside an RTL page. This keeps addresses and phone numbers readable while labels and surrounding UI stay in RTL.

```tsx
import { Input } from '@bilazo/kito/components/input'

<Input type="email" aria-label="Email" placeholder="you@example.com" />
<Input type="tel" aria-label="Phone" placeholder="+1 555 0100" />
```

---

_Generated from `apps/web/src/content/input/meta.ts`. Do not edit directly._
