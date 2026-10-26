# Progress

> A linear progress bar for completion and measurable processes.

A linear progress bar for completion and measurable processes. Pass `value` between `min` (default 0) and `max` (default 100), or `value={null}` for the indeterminate state where a segment slides along the track. Two color variants cover lesson progress (`primary`) and streak/XP (`highlight`), and three sizes match the control scale. Digits follow the `locale` prop, and the bar fills from the reading start — no direction-specific code is needed inside RTL pages.

## Import

```tsx

import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from '@bilazo/kito/components/progress'

```

## When to use

- Show completion of a known process — file upload, install, form submission, background job with a known number of steps.

- Show completion of a course, lesson, or weekly goal — the `primary` variant on a neutral track is the default for this.

- Show progress toward a gamified goal — streaks, XP, monthly challenges — using the `highlight` variant for a distinct visual.

- Show an indeterminate state for work of unknown length — a background sync, a network request without a byte count — by passing `value={null}`.

- Show progress with a visible numeric value and label, so the user knows both the current percentage and what it belongs to.

## When NOT to use

- As a placeholder for content that has not loaded yet — use `Skeleton`. A progress bar tracks real work, not an unknown wait.

- For very short operations (under ~1 second) — the bar appears and disappears faster than the user can read it, adding visual noise without information.

- As a decorative element on a card or header — a progress bar without a real `value` (or with a fake one) trains users to ignore the real ones.

- For browsing or pagination — use `Pagination` or a scroll indicator. A progress bar communicates completion of a defined task, not position in a list.

- For data visualization — bars in a chart compare magnitudes; use a chart component. `Progress` communicates the fraction of a single goal.

- As a replacement for a `Spinner` when the operation is short but unknown — a spinner is smaller and less visually dominant; reserve the progress bar for longer work.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'highlight'` | `'primary'` | Color pair for the track and the fill. `primary` pairs a neutral `bg-secondary` track with a `bg-primary` fill — lesson and course progress. `highlight` pairs a pale `bg-highlight` track with a `bg-highlight-foreground` fill (the inverted pair, since the `highlight` scale is soft-only) — streaks and XP. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height of the track. `sm` is `h-1.5` (6px), `md` is `h-2` (8px), `lg` is `h-3` (12px). |
| `value` | `number \| null` | — | Current value, clamped between `min` and `max`. Pass `null` for the indeterminate state — a segment slides along the track for work of unknown length. Users with `prefers-reduced-motion: reduce` see a static, semi-transparent bar instead. |
| `min` | `number` | `0` | Lower bound of `value`. |
| `max` | `number` | `100` | Upper bound of `value`. |
| `locale` | `string` | — | BCP 47 language tag used by `ProgressValue` to format the numeric output — `locale="fa-IR"` renders `۵۷٪`, `locale="en-US"` renders `57%`. Inherited by the nested `ProgressValue`; no separate prop is needed on the child. |
| `className` | `string` | — | Extra classes on the root. Merged with the base `flex w-full flex-col gap-2` via `cn()` — commonly used for `max-w-md` or a one-off container override. |

Five components are exported. `Progress` (root) renders the track and indicator automatically and places its children (typically a label/value row) above the bar — children must live inside `Progress` so `ProgressLabel` and `ProgressValue` can read its state. `ProgressLabel` becomes the accessible name of the bar when present, so an explicit `aria-label` is not needed in the labelled pattern. `ProgressValue` renders the numeric value with `tabular-nums` (stable width) and formats according to the parent’s `locale`. `ProgressTrack` and `ProgressIndicator` are exported for advanced composition only — `Progress` already renders both by default, and replacing them requires passing matching `variant` to the track and the indicator separately. No cva output is exported (unlike `Input` / `Badge`); `trackStyles` and `indicatorStyles` are internal to the module. The underlying element is Base UI’s `Progress.Root`, so `role="progressbar"` and `aria-valuenow` are set automatically.

## Composition

### Label and value

The common pattern: a `ProgressLabel` and a `ProgressValue` in a flex row above the bar. `ProgressLabel` becomes the accessible name automatically — do not add a separate `aria-label`.

```tsx
import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

<Progress value={57} className="w-full max-w-md">
  <div className="flex items-center justify-between text-sm">
    <ProgressLabel>Weekly progress</ProgressLabel>
    <ProgressValue />
  </div>
</Progress>
```

### Indeterminate

Pass `value={null}` for work of unknown length. A segment slides along the track. Users with `prefers-reduced-motion: reduce` see a static, semi-transparent bar instead.

```tsx
import { Progress } from '@bilazo/kito/components/progress'

<Progress value={null} aria-label="Loading" />
```

### Locale-aware digits

The `locale` prop drives how `ProgressValue` formats the number. Pass a BCP 47 tag — `fa-IR` for Persian digits (`۵۷٪`), `en-US` for Western (`57%`). The bar itself fills from the reading start automatically.

```tsx
import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

<Progress value={57} locale="fa-IR">
  <div className="flex items-center justify-between text-sm">
    <ProgressLabel>پیشرفت هفتگی</ProgressLabel>
    <ProgressValue />
  </div>
</Progress>
```

### Highlight for streaks and XP

The `highlight` variant inverts the `highlight` scale — a pale track and a dark fill — for a distinct, non-brand look. Use it for gamified progress; keep `primary` for task completion.

```tsx
import { Progress, ProgressLabel, ProgressValue } from '@bilazo/kito/components/progress'

<Progress value={42} variant="highlight" size="lg">
  <div className="flex items-center justify-between text-sm">
    <ProgressLabel>Streak this month</ProgressLabel>
    <ProgressValue />
  </div>
</Progress>
```

---

_Generated from `apps/web/src/content/progress/meta.ts`. Do not edit directly._
