# Radio

> A group of mutually-exclusive options.

A group of mutually-exclusive radio options. `RadioGroup` owns the shared value; each `Radio` inside it is one option. Base UI handles arrow-key navigation, roving tabindex, and the shared `name` for form submission — no manual wiring is needed. `size` is inherited from the group via a React context, so one prop on `RadioGroup` sets the size of every option (an individual `Radio` can still override it). The selected indicator is centered with flexbox, not a `translate` transform, so it is direction-agnostic by construction. The root carries a symmetric `after:-inset-3` pseudo-element that extends the click area to a 44×44 WCAG AAA touch target.

## Import

```tsx

import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

```

## When to use

- Choose exactly one option from a short list of mutually-exclusive choices — 2 to 7 options is the typical range.

- When all options should be visible at once — a payment method, a plan tier, a subscription length.

- When the choice has no immediate effect and applies only when the form is submitted — checkout, onboarding, settings.

- When users need to compare options side by side — a Select hides the non-selected ones; a Radio group keeps the whole list on screen.

- Inside a `<FieldSet>` with a `<FieldLegend>` when the group needs a visible heading, and each option needs a description via `Field`/`FieldContent`/`FieldDescription`.

- In a form where the group has a `name` and participates in submission — Base UI sets the hidden `name`/`value` pair automatically.

## When NOT to use

- When multiple options can be selected — use `Checkbox`. A radio group that lets you pick two options violates the ARIA pattern and confuses screen readers.

- For an on/off setting with immediate effect — use `Switch`. A radio group that has only two options and applies changes immediately is a switch in disguise.

- For a single yes/no choice in a form — use a single `Checkbox`. A radio group of one option is never the right shape.

- For a long list of options (ten or more) — use `Select` or `Combobox`. A long radio list dominates the page and makes comparison harder, not easier.

- For a primary action or navigation — use `Button` or `Link`. Radios are choices, not commands.

- Without a group-level accessible name — every `RadioGroup` needs `aria-label` (short) or `aria-labelledby` (visible heading). A group of radios without a name is announced as "group" with no context.

- As a bare inline control with no label — every `Radio` needs an accessible name from an adjacent `<Label htmlFor>` or from the surrounding `<Field>` or an `aria-label`. A radio with no name is announced only as "radio, checked" with no information about what it selects.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout of the options. `vertical` stacks them with `gap-2 flex-col` — the default for forms. `horizontal` uses `gap-4 flex-row flex-wrap items-center`, with a wider gap so adjacent labels do not crowd. The orientation also shows up as `data-orientation` for downstream styling. `RadioGroup` prop. |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the radio circles. Set on `RadioGroup` to apply to every option through `RadioSizeContext`: `sm` is `size-4` (16px), `md` is `size-5` (20px). An individual `Radio` can override it by passing its own `size`. The indicator dot scales with it (`size-2` for `sm`, `size-2.5` for `md`). `RadioGroup` prop. |
| `value` | `string` | — | Controlled selected value on the group. Pass with `onValueChange` for a controlled radio group; omit both for an uncontrolled one (then use `defaultValue`). Inherited from Base UI’s `RadioGroup`. `RadioGroup` prop. |
| `onValueChange` | `(value: string, eventDetails: ...) => void` | — | Change callback on the group. Fires with the newly-selected value — no `event.target.value` unwrap needed. Inherited from Base UI’s `RadioGroup`. `RadioGroup` prop. |
| `size` | `'sm' \| 'md'` | — | Override the group’s size for one radio. When omitted, inherits from `RadioGroup` via `RadioSizeContext` (falls back to `md` if the radio is outside any group, though Base UI throws at runtime in that case anyway). `Radio` prop. |
| `value`* | `string` | — | The value this specific option contributes when selected. Required — Base UI throws a runtime error on a `Radio` without it, because the group needs to know which option is on. Read it back from the group’s `value` / `onValueChange`, not from the individual radio. `Radio` prop. |
| `disabled` | `boolean` | — | Disables this option — the user cannot select it, and arrow keys skip it. The root gets `data-disabled` (`cursor-not-allowed opacity-50`). To disable the whole group, pass `disabled` on `RadioGroup` instead. `Radio` prop. |
| `aria-invalid` | `boolean` | — | Marks this option as invalid. Applies the destructive border via `data-invalid:border-destructive`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control automatically — both selectors are styled. `Radio` prop. |
| `className` | `string` | — | Extra classes on `RadioGroup` or `Radio`. Merged with the base classes via `cn()`. |

Two components are exported as values: `RadioGroup` (wraps Base UI’s `RadioGroup`) and `Radio` (wraps Base UI’s `Radio.Root` with a `Radio.Indicator` inside). `RadioSize` and `RadioOrientation` are internal type aliases, not exported. The `orientation` prop is consumed by Kito for the cva class and the `data-orientation` attribute — it is not passed through to Base UI, which is why the test suite covers `data-orientation` and visual layout but not horizontal arrow-key navigation. `size` on `RadioGroup` is stored in `RadioSizeContext` and read by every `Radio` inside; a `Radio` with its own `size` overrides it. Every `RadioGroup` MUST have an accessible name via `aria-label` (short) or `aria-labelledby` (visible heading) — the type system cannot enforce this, so the docs and examples always pair the group with one. `Radio.value` is genuinely required (Base UI throws without it) and is marked required in the props table. `RadioProps<Value>` is generic so a strongly-typed `value` (an enum, a union) survives the composed props — the only generic export in the library so far.

## Composition

### Basic group

The canonical pattern: `RadioGroup` with `defaultValue` and `aria-label`, each option is a `Radio` + `Label` pair with matching `htmlFor` / `id`. Base UI handles arrow-key navigation and the shared `name`.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<RadioGroup defaultValue="medium" aria-label="Level">
  <div className="flex items-center gap-2">
    <Radio value="beginner" id="r1" />
    <Label htmlFor="r1">Beginner</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="medium" id="r2" />
    <Label htmlFor="r2">Medium</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="advanced" id="r3" />
    <Label htmlFor="r3">Advanced</Label>
  </div>
</RadioGroup>
```

### Controlled

Pass `value` and `onValueChange` on the group to drive the state from outside. Read the selected value from the group’s state, not from the individual radios.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'
import { useState } from 'react'

export function Controlled() {
  const [plan, setPlan] = useState('monthly')
  return (
    <RadioGroup value={plan} onValueChange={(value) => setPlan(value as string)} aria-label="Billing cycle">
      <div className="flex items-center gap-2">
        <Radio value="monthly" id="c-monthly" />
        <Label htmlFor="c-monthly">Monthly — $12</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="yearly" id="c-yearly" />
        <Label htmlFor="c-yearly">Yearly — $120</Label>
      </div>
    </RadioGroup>
  )
}
```

### Horizontal group

Pass `orientation="horizontal"` for a row layout. The `gap-4` and `flex-wrap` keep adjacent labels from crowding and let the row wrap on narrow viewports.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<RadioGroup defaultValue="credit" orientation="horizontal" aria-label="Payment method">
  <div className="flex items-center gap-2">
    <Radio value="credit" id="h-credit" />
    <Label htmlFor="h-credit">Credit card</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="paypal" id="h-paypal" />
    <Label htmlFor="h-paypal">PayPal</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="crypto" id="h-crypto" />
    <Label htmlFor="h-crypto">Crypto</Label>
  </div>
</RadioGroup>
```

### Inside a FieldSet with descriptions

Wrap the group in a `FieldSet` with a `FieldLegend` for a visible heading. Each option becomes a `Field orientation="horizontal"` with a `FieldContent` that holds the label and description — Base UI wires the labels to their controls automatically, so no `htmlFor` is needed inside the field.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@bilazo/kito/components/field'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<FieldSet className="w-full max-w-md">
  <FieldLegend>Plan</FieldLegend>
  <RadioGroup defaultValue="pro" aria-label="Plan">
    <Field orientation="horizontal">
      <Radio value="starter" id="plan-starter" />
      <FieldContent>
        <FieldLabel htmlFor="plan-starter">Starter</FieldLabel>
        <FieldDescription>For hobby projects and experiments.</FieldDescription>
      </FieldContent>
    </Field>
    <Field orientation="horizontal">
      <Radio value="pro" id="plan-pro" />
      <FieldContent>
        <FieldLabel htmlFor="plan-pro">Pro</FieldLabel>
        <FieldDescription>For professional developers and small teams.</FieldDescription>
      </FieldContent>
    </Field>
  </RadioGroup>
</FieldSet>
```

### Sizes inherited from the group

Set `size` on `RadioGroup` to apply it to every option. An individual `Radio` can override it with its own `size` prop — useful for a "one option stands out" case, though rare.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<RadioGroup defaultValue="a" size="sm" aria-label="Small">
  <div className="flex items-center gap-2">
    <Radio value="a" id="size-sm-a" />
    <Label htmlFor="size-sm-a">Small</Label>
  </div>
</RadioGroup>
```

---

_Generated from `apps/web/src/content/radio/meta.ts`. Do not edit directly._
