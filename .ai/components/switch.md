# Switch

> A binary on/off toggle for a setting that takes effect immediately.

A binary on/off toggle for a setting that takes effect immediately — notifications, dark mode, an autosave preference. The track and thumb come in two sizes (`sm` 36×20 px, `md` 44×24 px). The thumb is positioned with `inset-inline-start`, a logical CSS property, so it flips sides automatically in RTL without a `translate-x` transform. Base UI’s `Switch.Root` provides `role="switch"`, the `data-checked` / `data-unchecked` / `data-disabled` / `data-invalid` state attributes, and the hidden form input — no manual wiring is needed.

## Import

```tsx

import { Switch } from '@bilazo/kito/components/switch'

```

## When to use

- Toggle a setting that applies immediately — notifications on/off, dark mode, autosave — where the user expects the change to take effect without a Save button.

- The classic settings-panel pattern: one switch per preference, in a vertical or horizontal `Field`, with a label and a short description.

- Inside a `<Field orientation="horizontal">` when the row needs a visible label and description — Base UI wires the label to the control automatically, so `htmlFor` is not needed inside the field.

- When the change is reversible with a single click and the consequence is obvious — a switch reads as "on" and invites the user to flip it back without a second step.

- For a preference that applies across sessions — pass a `name`/`defaultChecked` and let the form or your state layer persist it.

- When the "off" state should look neutral and the "on" state should look active — `data-checked:bg-primary` vs `data-unchecked:bg-input`.

## When NOT to use

- Inside a form that will be submitted — use `Checkbox`. A switch implies "already applied", so a user who flips it and then clicks "Save" is confused about whether the change took effect.

- To choose between two mutually-exclusive options with a visible list — use `Radio` or a `Select`. A switch has no labels for "on" vs "off" beyond its own state.

- For a binary choice with a one-time or destructive consequence — use a `Button` or a `Dialog` with an explicit action. A switch hides the consequence behind a state change.

- As a primary action — a switch is a state, not a command. Use `Button` for "Delete", "Continue", or any action that does not have an on/off state.

- As a checkbox in a list of many options — use `Checkbox`. A switch looks like a form control but carries the "immediate effect" connotation; a list of them reads as a settings panel, not a multi-select.

- Without a visible label — every switch needs an accessible name from an adjacent `<Label htmlFor>` or from the surrounding `<Field>`. A bare switch is announced as "switch, off" with no information about what it toggles.

- When `size="sm"` would be the only option — the small size exists for dense tables; in a regular settings form, `md` is the expected size and reads more clearly.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the track and thumb. `sm` is `h-5 w-9` (20 tall × 36 wide) with a `size-4` (16px) thumb; `md` is `h-6 w-11` (24 tall × 44 wide) with a `size-5` (20px) thumb. The thumb’s offset is computed from the track: `inset-s-0.5` (2px) in the off state, `inset-s-[calc(100%-1.125rem)]` (18px from the end) for `sm` and `inset-s-[calc(100%-1.375rem)]` (22px from the end) for `md` in the on state. Use `sm` in dense tables and compact rows; `md` is the default for a settings form. |
| `checked` | `boolean` | — | Controlled state. Pass with `onCheckedChange` for a controlled switch; omit both for an uncontrolled one (then use `defaultChecked`). Inherited from Base UI’s `Switch.Root`. |
| `defaultChecked` | `boolean` | — | Initial state for an uncontrolled switch. Ignored when `checked` is passed. Inherited from Base UI’s `Switch.Root`. |
| `onCheckedChange` | `(checked: boolean, eventDetails: ...) => void` | — | Change callback. Receives the new boolean value directly — no `event.target.checked` unwrap needed. Fires on user clicks and programmatic toggles. Inherited from Base UI’s `Switch.Root`. |
| `disabled` | `boolean` | — | Prevents interaction — the switch is removed from the tab order and the root gets `data-disabled` (`cursor-not-allowed opacity-50`). To disable the whole row, use `<Field disabled>` around the switch instead. Inherited from Base UI’s `Switch.Root`. |
| `aria-invalid` | `boolean` | — | Marks the switch as invalid. Applies the destructive outline via `data-invalid:outline-2` + `data-invalid:outline-destructive`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control automatically — the same selector applies. Inherited from Base UI’s `Switch.Root`. |
| `children` | `ReactNode` | — | Custom thumb content. Unlike `Checkbox`’s indicator, Base UI keeps the thumb mounted in both on and off states — so a child passed here is always in the DOM, not only when checked. The thumb still inherits the size from the parent (`size-4` / `size-5`), so a custom child should not set its own `size-*` or it will lose to the parent rule. |
| `className` | `string` | — | Extra classes on the root. Merged with the size classes via `cn()`. Use it for a per-instance visual override (e.g. a brand-colored "on" state via `data-checked:bg-…`), not for sizing — set `size` instead so the thumb scales with the track. |

Only `Switch` is exported as a value. The underlying element is Base UI’s `Switch.Root` with a `Switch.Thumb` inside; `role="switch"` and the `data-checked` / `data-unchecked` / `data-disabled` / `data-invalid` state attributes come from Base UI, and the hidden `<input>` for form submission is rendered automatically. Unlike `Checkbox`’s `Indicator`, Base UI does **not** unmount the thumb in either state — a custom `children` passed to `Switch` is always in the DOM, so a consumer who wants per-state rendering should branch on the `data-checked` attribute from a parent selector (or use `checked` in a controlled switch). The thumb is positioned with `inset-inline-start` (a logical CSS property) and `top-1/2 -translate-y-1/2` for vertical centering — no `translate-x` is used, which is what makes RTL work without a `dir`-specific prop. The `after:-inset-2` pseudo-element extends the click area beyond the visible track without changing the layout. `switchStyles` and `thumbStyles` are internal (no cva output export); all native and Base UI props are forwarded untouched via `SwitchBaseUiProps`.

## Composition

### With a Label

The minimum for an accessible switch: pair it with a `Label` via matching `htmlFor` / `id`. Clicking the label toggles the switch and screen readers announce them as one control.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'

<div className="flex items-center gap-2">
  <Switch id="basic-notifications" />
  <Label htmlFor="basic-notifications">Email notifications</Label>
</div>
```

### Controlled

Pass `checked` and `onCheckedChange` when the state lives outside React — a settings store, a server sync. The switch reflects the state but never owns it.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'
import { useState } from 'react'

export function Controlled() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <Switch id="controlled" checked={enabled} onCheckedChange={setEnabled} />
      <Label htmlFor="controlled">
        Dark mode is <span className="font-mono">{enabled ? 'on' : 'off'}</span>
      </Label>
    </div>
  )
}
```

### Inside a Field

For a row with a visible label and description, wrap in `Field orientation="horizontal"` — Base UI wires the label to the control automatically, so `htmlFor` is not needed.

```tsx
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@bilazo/kito/components/field'
import { Switch } from '@bilazo/kito/components/switch'

<FieldGroup className="w-full max-w-md">
  <Field orientation="horizontal">
    <Switch id="f-updates" />
    <FieldContent>
      <FieldLabel htmlFor="f-updates">Product updates</FieldLabel>
      <FieldDescription>Occasional announcements about new features.</FieldDescription>
    </FieldContent>
  </Field>
</FieldGroup>
```

### Sizes

`md` (44 × 24 px) is the default and the right choice for a settings form. `sm` (36 × 20 px) fits dense tables where vertical space is tight.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'

<div className="flex items-center gap-2">
  <Switch id="size-sm" size="sm" />
  <Label htmlFor="size-sm">Small</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="size-md" size="md" />
  <Label htmlFor="size-md">Medium</Label>
</div>
```

### Custom thumb

Pass any children to replace the default thumb. Unlike `Checkbox`, the thumb stays mounted in both states, so a custom icon is always visible. Use a `data-checked` override on the root to swap the icon’s appearance per state.

```tsx
import { Switch } from '@bilazo/kito/components/switch'

<Switch aria-label="Notifications">
  <span className="text-[10px]">✓</span>
</Switch>
```

---

_Generated from `apps/web/src/content/switch/meta.ts`. Do not edit directly._
