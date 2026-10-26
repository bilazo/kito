# Select

> A dropdown for choosing one option from a list.

A dropdown for choosing one option from a list. `Select` renders no DOM of its own — it manages the value and open state; the visible parts are `SelectTrigger`, `SelectValue`, `SelectPopup`, and `SelectItem`, plus `SelectGroup`, `SelectGroupLabel`, and `SelectSeparator` for grouped lists. Passing `items` as `{ value, label }[]` or `Record<value, label>` lets `SelectValue` display the selected item’s label without a manual lookup. The trigger shares the `--control-*` height tokens with `Input` and `Button`, so a select and an input line up in the same form row. The popup is portaled and its width matches the trigger via `min-w-(--anchor-width)`.

## Import

```tsx

import { Select, SelectTrigger, SelectValue, SelectPopup, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator } from '@bilazo/kito/components/select'

```

## When to use

- Pick one option from a list of 5 to ~15 — long enough that a list of Radio buttons dominates the page, short enough that a search field is overkill.

- When the option list is static and known — language, plan, country, timezone.

- Inside a `Field` for a labelled form row — `Field` provides the label and layout; `SelectTrigger` fills the field width.

- When the current selection should stay visible after the popup closes — the trigger always shows the label, unlike a menu item that disappears.

- For a grouped list — `SelectGroup` with `SelectGroupLabel` and `SelectSeparator` between sections.

- When the trigger needs to behave like a form control — `role="combobox"`, arrow keys open, Home/End jump to ends, Enter selects, Escape closes.

- When the popup is taller than the trigger and needs to escape parent `overflow: hidden` — the popup is portaled, so it is never clipped.

## When NOT to use

- For more than ~15 options — use `Combobox`. The list becomes a scrollable wall; a combobox has a filter input.

- For multi-select — use `Combobox` with `multiple`. A `Select` is single-value.

- For search-as-you-type — use `Combobox`. `Select` has no filter input; the user must scroll.

- For fewer than ~5 options — use `Radio`. A dropdown hides options the user could have seen at a glance.

- For navigation between pages — use a `Menu` with `Link` items, or the page’s own nav. A `Select` whose `onValueChange` calls `router.push` is a menu in disguise and loses the router’s prefetching and back-button integration.

- Without an accessible name — every select needs an `aria-label`, or a `Field` / `Label` pairing with `htmlFor`. A bare trigger is announced as "combobox, collapsed" with no context.

- As the only way to enter a free-text value — use `Input`. A `Select` restricts the user to the options provided.

- Inside a `<Field>` whose label is the only visible text — make sure the `Field` wraps `SelectTrigger`, not `Select`. The label’s `htmlFor` must reach the trigger element.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly { value: string; label: ReactNode }[] \| Record<string, ReactNode>` | — | The option list. Passing it lets `SelectValue` display the selected item’s label without a manual lookup — you do not have to render `LANGUAGES.find(l => l.value === value)?.label`. Accepts either an array of `{ value, label }` or a `Record<value, label>`. Inherited from Base UI’s `Select.Root`. `Select` prop. |
| `value` | `unknown` | — | Controlled value. Pass with `onValueChange` for a controlled select; omit both for an uncontrolled one (then use `defaultValue`). The type is generic so a strongly-typed value (a string union, an enum) survives the composed props. `Select` prop. |
| `onValueChange` | `(value: unknown, eventDetails: ...) => void` | — | Change callback. Fires when the user selects an option; receives the selected value directly. `Select` prop. |
| `defaultValue` | `unknown` | — | Initial value for an uncontrolled select. Ignored when `value` is passed. `Select` prop. |
| `disabled` | `boolean` | — | Disables the whole select — the trigger gets `data-disabled` (`cursor-not-allowed opacity-50`) and cannot be opened. To disable a single option, pass `disabled` on the `SelectItem`. `Select` prop. |
| `size` | `'sm' \| 'md'` | `'md'` | Height of the trigger. `sm` is `h-(--control-sm)` (32px) with `text-sm`; `md` is `h-(--control-md)` (40px) with `text-sm`. Shares the tokens with `Input` and `Button`, so a select and an input sit in the same row at matching heights. `SelectTrigger` prop. |
| `sideOffset` | `number` | `6` | Gap between the trigger and the popup, in pixels. Kito’s default of `6` leaves a small visual breath; pass `0` for a flush dropdown. `SelectPopup` prop. |
| `alignItemWithTrigger` | `boolean` | `false` | When `true`, the popup is positioned so the selected item lines up with the trigger’s value text (a native macOS feel). Kito defaults to `false` for a flat web dropdown: the popup opens below the trigger, cannot be clipped by the top of the viewport, and reads consistently with everything else in a web UI. Pass `true` for a native-feeling picker. `SelectPopup` prop. |
| `placeholder` | `ReactNode` | — | Shown by `SelectValue` when nothing is selected. Rendered in `text-muted-foreground` via the `data-placeholder` attribute that Base UI sets on the value element. `SelectValue` prop. |
| `className` | `string` | — | Extra classes on any part. For `SelectPopup`, useful for `w-(--anchor-width)` overrides or a fixed width; for `SelectTrigger`, a width cap when the trigger would otherwise fill a wide container. |

Eight components compose. `Select` (root) renders no DOM — it forwards to Base UI’s `Select.Root` and manages the value and open state. `SelectTrigger` renders a `<button>` with `role="combobox"` and shows the value + a rotating chevron (`group-data-[popup-open]/select-trigger:rotate-180`). `SelectValue` reads its label from the `items` prop passed to the root — no manual lookup is needed. `SelectPopup` is portaled to `document.body` and its width matches the trigger (`min-w-(--anchor-width)`), so it escapes any parent `overflow: hidden`; it closes on outside click, Escape, or selection. `SelectItem` highlights via `data-highlighted:*` (Base UI sets the attribute) and shows a checkmark at `end-2` (a logical property, so it flips to the correct side in RTL). `SelectGroup` / `SelectGroupLabel` / `SelectSeparator` are pass-through wrappers. `triggerStyles`, `ChevronDownIcon`, and `CheckIcon` are internal — no cva output is exported (unlike `Input`). **Portal gotcha:** the popup is portaled, so `dir="rtl"` on an ancestor wrapper does not reach it — the popup’s `ps-3 pe-8` / `end-2` (logical padding on items, logical position on the checkmark) resolve to the wrong side without a `dir` ancestor. Pass `dir="rtl"` on `SelectPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup`). The `alignItemWithTrigger` default is `false` in Kito (Base UI’s own default is `true`) — this is a deliberate choice for a flat web dropdown.

## Composition

### Basic

The canonical pattern: `Select` with an `items` array, a `defaultValue`, a `SelectTrigger` with `SelectValue`, and a `SelectPopup` with `SelectItem` children. The `items` prop lets `SelectValue` display the selected label without a manual lookup.

```tsx
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

<Select items={LANGUAGES} defaultValue="en">
  <SelectTrigger>
    <SelectValue placeholder="Choose a language" />
  </SelectTrigger>
  <SelectPopup>
    {LANGUAGES.map((l) => (
      <SelectItem key={l.value} value={l.value}>
        {l.label}
      </SelectItem>
    ))}
  </SelectPopup>
</Select>
```

### Inside a Field

Wrap the `Select` in a `Field` with a `FieldLabel`. The trigger fills the field width, matching `Input`. Base UI wires the label automatically through its context — `htmlFor` on `FieldLabel` is not needed inside a `Field`.

```tsx
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

<Field name="language">
  <FieldLabel>Language</FieldLabel>
  <Select items={LANGUAGES} defaultValue="en">
    <SelectTrigger>
      <SelectValue placeholder="Choose a language" />
    </SelectTrigger>
    <SelectPopup>
      {LANGUAGES.map((l) => (
        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
      ))}
    </SelectPopup>
  </Select>
</Field>
```

### Grouped options

Use `SelectGroup` with `SelectGroupLabel` for a visible heading and `SelectSeparator` between groups. Group labels are not focusable and are skipped by keyboard navigation.

```tsx
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

<Select items={ITEMS} defaultValue="en">
  <SelectTrigger>
    <SelectValue placeholder="Choose a language" />
  </SelectTrigger>
  <SelectPopup>
    <SelectGroup>
      <SelectGroupLabel>European</SelectGroupLabel>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="fr">French</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectGroupLabel>Middle Eastern</SelectGroupLabel>
      <SelectItem value="fa">Persian</SelectItem>
    </SelectGroup>
  </SelectPopup>
</Select>
```

### Controlled

Pass `value` and `onValueChange` to drive the state from outside. The generic on `Select<Value>` preserves the value type — a string union or an enum survives without a cast.

```tsx
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'
import { useState } from 'react'

export function Controlled() {
  const [value, setValue] = useState('en')
  return (
    <Select items={LANGUAGES} value={value} onValueChange={(v) => setValue(v as string)}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
```

### Sizes

`sm` and `md` share the `--control-*` tokens with `Input` and `Button`. Use `sm` in dense toolbars, `md` in form rows — the default matches `Input` height.

```tsx
import { Select, SelectTrigger, SelectValue } from '@bilazo/kito/components/select'

<SelectTrigger size="sm">…</SelectTrigger>
<SelectTrigger size="md">…</SelectTrigger>
```

---

_Generated from `apps/web/src/content/select/meta.ts`. Do not edit directly._
