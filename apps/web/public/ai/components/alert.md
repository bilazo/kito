# Alert

> A callout for user attention.

A callout for user attention — a heads-up, an error, an action prompt. Compose it from `AlertTitle`, an optional `AlertDescription`, and an optional `AlertAction`. Put an SVG icon as a direct child of `Alert` and the layout switches to two columns: icon + content, with the icon spanning both the title and the description rows. Without an icon, the alert collapses to a single column. The alert renders `role="alert"` (an assertive live region) by default — override to `role="status"` for non-urgent callouts that should not interrupt a screen reader mid-sentence.

## Import

```tsx

import { Alert, AlertTitle, AlertDescription, AlertAction } from '@bilazo/kito/components/alert'

```

## When to use

- Show an error that the user must acknowledge or act on — a failed payment, a rejected form, a network error.

- Warn about an irreversible action before or after it happens — "This will delete all data" or "Your session expires in 5 minutes".

- Announce a positive state that the user should see — "Your changes are saved", "Subscription upgraded".

- Promote an optional action — enable two-factor authentication, try a new feature — via `AlertAction` with a `Button`.

- Inline context on a page that the user should read in-place — a policy note, a compatibility warning, a deprecation notice.

- A static message rendered at page load that should be part of the page flow — not a floating toast.

- A callout with structured content — a title, a description, and a link or a paragraph with inline emphasis.

## When NOT to use

- For a transient, non-blocking notification — use `Toast`. A Toast auto-dismisses and floats over the page; an Alert stays where it is.

- For a modal decision that blocks the page — use `Dialog`. An Alert is inline, not blocking.

- For field-level errors — use `Field`’s error slot. A field error belongs next to the field it describes, not at the top of the form.

- For a status indicator inside a row — use `Badge`. A `Badge` is a compact chip; an `Alert` is a callout.

- For a permanent, always-visible banner at the top of the page — consider a page-level banner pattern; an `Alert` reads as a discrete message, not a bar.

- As the only way to convey critical information — an alert must be visible, but it should not be the only place the user learns about a state change.

- Without a visible message — an icon-only alert gives no context. The title (or the description) must say what is happening.

- Without a role override when the message is not urgent — `role="alert"` is assertive and interrupts a screen reader mid-sentence. For non-urgent callouts, pass `role="status"` via props.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual treatment. `default` uses the card surface and the standard foreground color — for informational, success, or warning messages where you want the icon to carry the semantic color. `destructive` recolors the whole alert to `text-destructive`; the description uses a slightly softer tint (`text-destructive/90`) so the title stays visually stronger. The icon inherits `currentColor` and turns destructive with the text. `Alert` prop. |
| `className` | `string` | — | Extra classes on any part. For `Alert`, useful for a max-width (`max-w-md`) or a custom background (`bg-amber-50`-style colors from outside the semantic tokens). For `AlertDescription`, useful for a typography override or a different line-height. For `AlertAction`, useful when the action needs a specific vertical offset. |

Four components compose. `Alert` renders a `<div role="alert">` with `data-slot="alert"` and a `grid` layout — one column by default, two columns (`auto 1fr`) when a **direct SVG child** is present. `AlertTitle` and `AlertDescription` render `<div>`s with their own `data-slot`; when an icon is present, `AlertTitle` shifts to column 2 (`group-has-[>svg]/alert:col-start-2`) and the description follows naturally in column 2 row 2. `AlertAction` renders a `<div data-slot="alert-action">` at `absolute top-2 end-2`; the alert reserves `pe-18` end padding when the action is present (`has-data-[slot=alert-action]:pe-18`) so the title and description do not underlap it. The icon treatment applies **only to direct SVG children**: `*:[svg]:row-span-2` (icon spans title + description rows), `*:[svg]:translate-y-0.5` (aligns to the title’s baseline), `*:[svg]:text-current` (inherits the alert’s foreground / destructive color), and `*:[svg:not([class*='size-'])]:size-4` (defaults to 16px when the consumer has not set a size). An icon wrapped in a `<span>` will not trigger the two-column layout — the grid selector is a direct-child `has-[>svg]`. Renders with `role="alert"` by default — an assertive live region that interrupts a screen reader. For non-urgent callouts (informational banners, static hints), pass `role="status"` via props to use a polite announcement instead. Alert has no portal — it stays inline in the page flow, so `dir="rtl"` on an ancestor wrapper works for the whole subtree without the portal exception documented for `Popover` / `Menu` / `Select`.

## Composition

### Basic with icon

The canonical pattern: a leading SVG icon, an `AlertTitle`, and an `AlertDescription`. The icon becomes a left column spanning both rows; the title and description stack in the right column.

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@bilazo/kito/components/alert'
import { Info } from 'lucide-react'

<Alert>
  <Info />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the CLI.
  </AlertDescription>
</Alert>
```

### Destructive variant

Use `variant="destructive"` for errors and irreversible warnings. The icon, title, and description all inherit the destructive color; the description uses a slightly softer tint (`text-destructive/90`) so the title stays visually stronger.

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@bilazo/kito/components/alert'
import { AlertCircle } from 'lucide-react'

<Alert variant="destructive">
  <AlertCircle />
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>
    Your card was declined. Update your payment method and try again.
  </AlertDescription>
</Alert>
```

### With an action

`AlertAction` pins a trailing control to the top-end corner. The alert reserves end padding so the title and description do not underlap the action. Use a `Button` (`size="sm"` or `size="icon-sm"`) inside.

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@bilazo/kito/components/alert'
import { Button } from '@bilazo/kito/components/button'
import { Shield } from 'lucide-react'

<Alert>
  <Shield />
  <AlertTitle>Enable two-factor authentication</AlertTitle>
  <AlertDescription>
    Add a second factor to protect your account.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline" size="sm">Enable</Button>
  </AlertAction>
</Alert>
```

### Without an icon

Omit the SVG child and the grid collapses to a single column. Useful when the message is short and the icon would just repeat the `AlertTitle`’s meaning.

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@bilazo/kito/components/alert'

<Alert>
  <AlertTitle>New version available</AlertTitle>
  <AlertDescription>
    Version 2.4 is out. Reload to pick up the latest fixes.
  </AlertDescription>
</Alert>
```

### Polite announcement

Renders with `role="alert"` by default — an assertive live region. For non-urgent callouts (informational banners, static hints), pass `role="status"` via props to use a polite announcement instead, so a screen reader does not interrupt mid-sentence.

```tsx
import { Alert, AlertDescription, AlertTitle } from '@bilazo/kito/components/alert'

<Alert role="status">
  <AlertTitle>Scheduled maintenance</AlertTitle>
  <AlertDescription>
    The app will be unavailable Saturday 02:00–03:00 UTC.
  </AlertDescription>
</Alert>
```

---

_Generated from `apps/web/src/content/alert/meta.ts`. Do not edit directly._
