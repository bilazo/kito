# Textarea

> A multi-line text input.

A multi-line text input. Built on Base UI’s `Field.Control` rendered as a `<textarea>`, so when placed inside a `<Field>` (coming soon) the label, description, error, and disabled states are wired up automatically. Shares `inputStyles` with `Input` for the same border, focus ring, and invalid treatment — but overrides the fixed control height (`h-auto`) with an explicit minimum per size, since a textarea is multi-line. Text direction defaults to `auto`: the browser picks from the content, so Persian stays RTL and Latin stays LTR, both without a `dir` prop.

## Import

```tsx

import { Textarea } from '@bilazo/kito/components/textarea'

```

## When to use

- Collect multi-line text — a comment, a message, a bio, a description, feedback that can span paragraphs.

- Inside a `<Field>` (or next to a `Label` with matching `htmlFor` / `id`) for a labelled multi-line field.

- When the input should grow with its content — pass `autoResize` for comment boxes, chat inputs, or any field where the user is expected to write more than a couple of lines.

- When the user should be able to drag the bottom edge to resize — the default `resize-y` is the standard affordance for a textarea and should be kept unless the field has a better reason to be fixed.

- For content that is naturally RTL or mixed-direction — `dir="auto"` on the underlying `<textarea>` lets the browser choose direction from the content without a per-field prop.

## When NOT to use

- For single-line text — use `Input`. A textarea with `rows={1}` still reserves multi-line space and accepts Enter as a newline; a single-line field is what the user expects for a name, an email, a search query.

- For rich text — bold, italic, links, headings. A `<textarea>` is plain text; use a rich-text editor component when the content needs formatting.

- For code or structured input — syntax highlighting, auto-indent, bracket matching. Use a dedicated code editor; a `<textarea>` gives plain monospace at best.

- As a replacement for `Input` with a fixed height — a `Textarea` with `rows={1}` and `resize-none` looks like a single-line input but behaves differently on Enter. Prefer the correct primitive.

- As the only label of a field — every textarea needs an accessible name (`Label` with `htmlFor`, or `aria-label`). Placeholder text disappears on the first keystroke.

- For very short notes (a single line of confirmation) — a `Textarea` reserves the size of a paragraph; use `Input` for one-liners.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls the minimum height and side padding. Unlike `Input`, `size` does not set a fixed height — a textarea is multi-line, so the class list uses `h-auto` plus `min-h-16` / `min-h-20` / `min-h-24` per size. `lg` switches to `text-base`; `sm` and `md` use `text-sm` (with `pointer-coarse:text-base` on touch devices, same as `Input`). |
| `autoResize` | `boolean` | `false` | When `true`, the textarea grows with its content using CSS `field-sizing: content`, and manual resizing is disabled (`resize-none`). A `max-h-80` cap keeps the field from taking over the page. Sets `data-autoresize="true"` on the element for downstream styling. Browsers without `field-sizing` support fall back to the fixed `rows` height. |
| `rows` | `number` | `3` | Initial number of visible text rows, forwarded to the underlying `<textarea>`. With `autoResize`, `rows={1}` is the common starting point — the field grows as the user types. |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Text direction. Unlike `Input`, there is no `type` to derive from — `defaultDir()` is called with no argument, which always returns `"auto"`. The browser follows the first strong character, so Persian stays RTL and Latin stays LTR. Pass an explicit `dir` to override for the rare case where the content direction should be locked. |
| `onValueChange` | `(value: string, eventDetails) => void` | — | Base UI’s value-based change callback, exposed as the only `TextareaBaseUiProps` entry. Fires with the new string value directly — no `event.target.value` unwrap. Useful when wiring the textarea to a form library; the native `onChange` also works and receives the DOM event. |
| `aria-invalid` | `boolean` | — | Marks the textarea as invalid. Applies the destructive border and the destructive outline on `:focus-visible`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control instead — both selectors are styled, so either works. |
| `className` | `string` | — | Extra classes. Merged with the size and resize classes via `cn()` — typically used for width (`max-w-md`), a per-instance min-height, or a one-off visual override. |

Only `Textarea` is exported as a value; all other exports are types (`TextareaOwnProps`, `TextareaBaseUiProps`, `TextareaHTMLProps`, `TextareaProps`). `inputStyles` and `defaultDir` are imported from `input/input.tsx` and `lib/dir.ts` respectively, not re-exported — the shared control look comes for free. The underlying element is Base UI’s `Field.Control` rendered as a `<textarea>` via the `render` prop, so `onValueChange` works out of the box (this is the only Base UI prop surfaced through `TextareaBaseUiProps`). All native `<textarea>` attributes (`id`, `placeholder`, `rows`, `maxLength`, `readOnly`, `disabled`, `value`, `defaultValue`, `aria-*`, `data-*`) are forwarded untouched via `TextareaHTMLProps`. Two style overrides of `inputStyles` matter: `h-auto` cancels the fixed `--control-*` height (a textarea is multi-line), and `py-2` sets vertical padding (`inputStyles` only sets `px-*`). `data-autoresize="true"` is set only when `autoResize` is on, so downstream CSS can target the auto-resize case without a class.

## Composition

### Labelled textarea

The minimum for an accessible field: a `Label` with `htmlFor` matched to the textarea’s `id`. Pair it with a description line when there is a constraint the user should know about before typing.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Textarea } from '@bilazo/kito/components/textarea'

<div className="flex w-full max-w-md flex-col gap-2">
  <Label htmlFor="demo-message">Message</Label>
  <Textarea id="demo-message" placeholder="Write your message here…" rows={4} />
  <p className="text-xs text-muted-foreground">Maximum 500 characters.</p>
</div>
```

### Auto-resizing comment box

`autoResize` lets the field grow with its content up to a `max-h-80` cap. `rows={1}` starts it small, so the empty state is a single line — the standard chat and comment affordance.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea
  autoResize
  rows={1}
  placeholder="Start typing and watch me grow…"
  aria-label="Comment"
/>
```

### Invalid state

Set `aria-invalid` for standalone use. Inside a `<Field invalid>` Base UI sets `data-invalid` for you — both selectors apply the destructive border.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea aria-invalid defaultValue="This value is not valid" aria-label="Message" />
```

### Auto-direction

`dir="auto"` (the default) lets the browser pick direction from the first strong character — Persian stays RTL, Latin stays LTR. No per-field `dir` prop is needed for mixed-language content.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea defaultValue="متن فارسی" aria-label="Persian" />
<Textarea defaultValue="Latin text" aria-label="Latin" />
```

### Sizes

`sm`, `md`, and `lg` set the minimum height and side padding (not a fixed height, unlike `Input`). `lg` also bumps the text size to `text-base`.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea size="sm" rows={2} placeholder="sm" aria-label="Small" />
<Textarea size="md" rows={2} placeholder="md" aria-label="Medium" />
<Textarea size="lg" rows={2} placeholder="lg" aria-label="Large" />
```

---

_Generated from `apps/web/src/content/textarea/meta.ts`. Do not edit directly._
