# Input OTP

> A one-time-password input composed of individual character slots.

A one-time-password input composed of individual character slots. Built on Base UI’s `OTPField` primitive — each slot is a real `<input>`, so focus moves between them natively, the browser’s caret is the real caret, and paste/autofill across slots is handled by the primitive. Give the root a `length` (required) and either let it auto-render the slots or compose them manually with `InputOTPGroup` / `InputOTPSeparator`. `validationType` restricts accepted characters (numeric / alpha / alphanumeric / none); `mask` obscures the input; `autoSubmit` submits the form on completion; `onValueComplete` fires when all slots are filled.

## Import

```tsx

import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@bilazo/kito/components/input-otp'

```

## When to use

- A verification code sent by email or SMS — the standard 6-digit OTP on a login or signup flow.

- A PIN entry pattern — 4 digits from a security app, a device lock, a hardware token — with `validationType="numeric"`.

- An alphanumeric verification code — pass `validationType="alphanumeric"` to accept recovery or invite codes that mix letters and numbers.

- A one-time link code — a share code, an invite code — that the user copies and pastes from another source; Base UI handles paste across slots natively.

- A two-factor authentication step in a form — pair with `Field` for a labelled input, and use `autoSubmit` to submit the form as soon as the code is complete.

- A masked access code on a shared screen — pass `mask` to obscure each character as the user types.

## When NOT to use

- For a regular text field — use `Input`. `InputOTP` renders a fixed number of single-character slots; a longer input (a name, a search query) does not fit the visual model.

- For a numeric input where the digits form one number — e.g. an amount `1234.56`, a year `2026`, a quantity — use `Input type="number"` or a plain `Input`.

- For a code longer than ~8 characters — the slot row becomes too wide. A longer code belongs in a single `<input>` or a textarea.

- Without a `length` matching the sum of slot counts — `length` is required, and the total number of `InputOTPSlot` children must equal `length`. A mismatch means dead slots or dropped characters.

- Without an accessible name — wrap the OTP in a `Field` with a label, or pass `id` on `InputOTP` with an adjacent `<label htmlFor>`. Auto-rendered slots add `aria-label="Character N of L"` on their own; manually composed slots need `aria-label` per slot.

- Without `aria-invalid` on each slot for the invalid state — passing it on `InputOTP` or `InputOTPGroup` does not cascade. Each slot must carry its own `aria-invalid` (or be inside a `<Field invalid>` where Base UI sets `data-invalid` automatically).

- On mobile without `autoComplete="one-time-code"` — Base UI sets this by default on the first slot and hidden validation input, so you get it for free; do not override it unless you have a reason.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length`* | `number` | — | Total number of slot characters. **Required** — Base UI needs it to clamp the value, detect completion, and generate consistent markup before all slots hydrate. Every slot from index `0` to `length - 1` must be covered by exactly one `InputOTPSlot`. `InputOTP` prop. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the auto-rendered slots. Only applies when `children` is not provided — for manual composition, pass `size` to each `InputOTPSlot`. `sm` is `size-8` (32px square, 14px text); `md` is `size-(--control-md)` (40px, matching the default control height); `lg` is `size-12` (48px square, 16px text). `InputOTP` / `InputOTPGroup` / `InputOTPSlot` prop. |
| `value` | `string` | — | Controlled value. Pass with `onValueChange` for a controlled OTP. Omit both for an uncontrolled one (then use `defaultValue`). Inherited from Base UI’s `OTPField.Root`. `InputOTP` prop. |
| `defaultValue` | `string` | — | Initial value for an uncontrolled OTP. The characters are distributed across slots in order. Ignored when `value` is passed. `InputOTP` prop. |
| `onValueChange` | `(value: string, eventDetails: ...) => void` | — | Change callback. Fires with the complete value (all slot characters concatenated) whenever the input changes — typing, pasting, deleting. `eventDetails.reason` distinguishes `input-change` (typing / autofill), `input-clear`, `input-paste`, and `keyboard`. `InputOTP` prop. |
| `onValueComplete` | `(value: string, eventDetails: ...) => void` | — | Fires when all slots are filled — after the internal value update. The callback runs when the code becomes complete by typing or pasting a complete value while the OTP is already complete. Pair with `autoSubmit` to submit the owning form. `InputOTP` prop. |
| `onValueInvalid` | `(value: string, eventDetails: ...) => void` | — | Fires when the user types or pastes characters that are rejected by `validationType` or `normalizeValue`. The `value` argument is the attempted input before normalization — useful for surfacing a hint like “this code only accepts digits”. `InputOTP` prop. |
| `validationType` | `'numeric' \| 'alpha' \| 'alphanumeric' \| 'none'` | `'numeric'` | Character type the OTP accepts. `numeric` allows digits only — the default and the right choice for a PIN or SMS code. `alpha` allows letters only. `alphanumeric` allows both — for recovery and invite codes. `none` accepts any character — pair with `normalizeValue` for a fully custom rule. `InputOTP` prop. |
| `normalizeValue` | `(value: string) => string` | — | Function that normalizes the value after `validationType` filtering — for example, converting alphanumeric codes to uppercase. It must be **idempotent**, since Base UI may run it more than once across state changes. Characters rejected here fire `onValueInvalid`. `InputOTP` prop. |
| `mask` | `boolean` | `false` | Whether to obscure entered characters — each slot renders as a password-style dot. Use it on shared screens or for access codes that should not be visible over a shoulder. `InputOTP` prop. |
| `autoSubmit` | `boolean` | `false` | Whether to submit the owning form automatically when all slots are filled. Base UI runs `onValueComplete` immediately before submitting. Requires the OTP to live inside a `<form>`. `InputOTP` prop. |
| `disabled` | `boolean` | `false` | Prevents interaction — the OTP cannot be typed into, and the root gets `data-disabled` (`opacity-50`). `InputOTP` prop. |
| `readOnly` | `boolean` | `false` | Renders the OTP’s value without allowing edits — for a display-only code (a share code the user has already entered, an archived record). `InputOTP` prop. |
| `required` | `boolean` | `false` | Marks the OTP as required for form submission. `InputOTP` prop. |
| `autoComplete` | `string` | `'one-time-code'` | The autocomplete attribute applied to the first slot and the hidden validation input. Default `one-time-code` lets mobile keyboards surface the SMS code as a tap-to-fill suggestion. `InputOTP` prop. |
| `id` | `string` | — | The `id` of the first input. Subsequent inputs derive their ids from it (`{id}-2`, `{id}-3`, and so on). Combine with an adjacent `<label htmlFor={id}>` to give the OTP an accessible name. `InputOTP` prop. |
| `count` | `number` | — | Auto-render this many slots inside an `InputOTPGroup`. Only applies when no children are provided. The sum of `count` across all groups must equal the root’s `length`. `InputOTPGroup` prop. |
| `aria-invalid` | `boolean` | — | Marks an individual slot as invalid — applies `aria-invalid:border-destructive` and a destructive outline on focus. Must be set on **each slot**, not on `InputOTP` or `InputOTPGroup` — the attribute does not cascade. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the slots automatically; both selectors are styled. `InputOTPSlot` prop. |
| `className` | `string` | — | Extra classes on any part. For `InputOTP`, useful for `flex-wrap` on very long codes or a custom background. For `InputOTPSlot`, useful for a per-slot size override — or pass `size` on `InputOTP` for auto-rendered slots. For `InputOTPSeparator`, a per-instance `mx-*` for the group gap. |

Four components compose. `InputOTP` (root) forwards to Base UI’s `OTPField.Root` — it renders a `<div>` wrapper, manages the value across all slots, and auto-renders `length` slots when no children are provided. `InputOTPGroup` is a plain `<div>` that groups adjacent slots; its `count` prop auto-renders `count` slots (its `size` prop cascades to them). `InputOTPSlot` forwards to Base UI’s `OTPField.Input` — a real `<input>` that displays one character. Base UI auto-indexes slots by DOM order, so there is no `index` prop; the position is implicit, and the total slot count must equal the root’s `length`. `InputOTPSeparator` forwards to Base UI’s `OTPField.Separator` — a `<div role="separator">` that Base UI renders, but Kito overrides with `aria-hidden` because a visual dash between 3+3 groups is decorative; each slot already carries its own `aria-label="Character N of L"` so screen reader users get the position from the slot, not from a separator announcement. `InputOTP` **auto-labels** slots 1..N with `aria-label="Character N of L"`; slot 0 inherits the field’s label via the root’s `id` (`<label htmlFor={id}>` → first input). If you compose slots manually, add `aria-label` yourself. `aria-invalid` must be set on **each slot** — the attribute does not cascade; inside a `<Field invalid>` Base UI sets `data-invalid` on the slots, and both selectors are styled. `InputOTP` is **not portaled** — it renders inline in the page flow, so `dir` inherits from `<html dir>` or any wrapper and RTL works without an explicit `dir` prop. No `cva` output is exported (the slot cva is internal); all Base UI props (`name`, `form`, `inputMode`, `autoComplete`, `onValueComplete`, `onValueInvalid`, `normalizeValue`, `readOnly`, etc.) are forwarded untouched via `InputOTPBaseUiProps`. `InputOTPSize` is exported as a type-only alias.

## Composition

### Basic

Give the root a `length` and let it auto-render the slots. The first slot inherits the field’s label via the root’s `id`; subsequent slots auto-label as `Character N of L`.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP length={6} defaultValue="123456" />
```

### Grouped with a separator

Pass `count` on each `InputOTPGroup` to auto-render a subset of slots, with an `InputOTPSeparator` between groups for the `123-456` presentation. The sum of `count` must equal `length`.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
} from '@bilazo/kito/components/input-otp'

<InputOTP length={6}>
  <InputOTPGroup count={3} />
  <InputOTPSeparator />
  <InputOTPGroup count={3} />
</InputOTP>
```

### Validation type — PIN

Use `validationType="numeric"` for a numeric PIN. The default is `numeric`, so for a PIN you can omit it; keep it explicit when the intent is a PIN specifically.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP length={4} validationType="numeric" />
```

### Validation type — alphanumeric

Use `validationType="alphanumeric"` for recovery, backup, or invite codes that mix letters and numbers. Pair with `normalizeValue={(v) => v.toUpperCase()}` to display codes consistently.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP
  length={6}
  validationType="alphanumeric"
  normalizeValue={(value) => value.toUpperCase()}
/>
```

### In a form with auto-submit

Give `InputOTP` an `id`, wrap it in a `Field` for a labelled input, and pass `autoSubmit` so the owning form submits as soon as all slots are filled. Combine with `onValueComplete` for analytics or a follow-up action.

```tsx
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { InputOTP } from '@bilazo/kito/components/input-otp'

<form>
  <Field name="otp">
    <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
    <InputOTP
      id="otp-verification"
      length={6}
      required
      autoSubmit
      onValueComplete={(value) => console.log('complete', value)}
    />
  </Field>
</form>
```

### Masked entry

Pass `mask` to obscure each character on the screen — for access codes on shared screens. The value is still typed as normal; each slot renders as a password-style dot.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP length={6} mask />
```

---

_Generated from `apps/web/src/content/input-otp/meta.ts`. Do not edit directly._
