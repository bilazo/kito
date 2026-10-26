# Slider

> A control for selecting a value from a range.

A control for selecting a value from a range. The number of thumbs is derived from `value` / `defaultValue` — a number gives one thumb, an array gives one thumb per entry (a two-value range, a three-value multi-range). Base UI’s native `<input type="range">` inside each thumb gives the slider its keyboard navigation (arrows, Home, End, PageUp/PageDown) and its screen-reader announcement without any manual ARIA. Horizontal by default; `orientation="vertical"` swaps the axis and requires the wrapper to set a height. In an RTL page, the track fills from the reading start (right) automatically — Base UI flips the axis when it sees `dir="rtl"` from any ancestor.

## Import

```tsx

import { Slider, SliderValue } from '@bilazo/kito/components/slider'

```

## When to use

- Select a value from a continuous range — volume, brightness, opacity, speed — where the exact value matters less than its position.

- Select a range of values — a price range, a date range, a temperature band — with a two-thumb slider.

- Pick a value with quick feedback — the value changes while the user drags, so the UI can update the preview live.

- In a media or device control panel — a volume slider, a brightness slider — where a numeric input would be slower to operate.

- Pick a numeric value from a bounded set where the bounds are obvious — a rating from 0 to 10, an age from 18 to 100.

- When keyboard precision matters — arrow keys move by one step, PageUp/PageDown by a larger step, Home/End jump to the ends.

## When NOT to use

- For an exact number — use `Input` with `type="number"`. A slider trades precision for speed; a user who needs "exactly 47" cannot reliably hit it on a slider.

- For a range with a huge span (0 to 10,000) — the step becomes a misclick. Use two `Input type="number"` fields, or a slider with a paired input.

- For a small, enumerable set of options — use `Radio` or `Select`. A slider over three options is a hard-to-hit radio group.

- For a yes/no or on/off — use `Checkbox` or `Switch`. A slider with two positions is a switch in disguise.

- For a binary value under 5 steps — the tick marks dominate and the thumb becomes larger than the track. Use a radio group instead.

- As the only way to input a value — always pair a slider with a visible numeric readout (a `SliderValue`, or a labeled `<input>`). The user must be able to read the exact number they landed on.

- Inside an RTL page without verifying the thumb direction — Base UI flips the axis when it detects `dir="rtl"`, but a custom `className` with `translate-x` on the thumb would break that. Use the `size` prop, not manual positioning.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Visual size of the track and thumb. `sm` is a 4px track with a 12px thumb (`size-3`); `md` is 6px with 16px (`size-4`); `lg` is 8px with 20px (`size-5`). The track height is set via the `--slider-track-h` custom property — the thumb is sized separately. All three sizes use the same focus, hover, and disabled treatment. |
| `value` | `number \| readonly number[]` | — | Controlled value. A number renders one thumb; an array renders one thumb per entry. The array length determines the thumb count — pass `[25, 75]` for a range slider, `[10, 50, 90]` for a three-thumb slider. Use with `onValueChange` for a controlled slider. |
| `defaultValue` | `number \| readonly number[]` | — | Initial value for an uncontrolled slider. Same shape as `value`. Ignored when `value` is passed. |
| `min` | `number` | `0` | Lower bound of the range. Forwarded to the underlying `<input type="range">` as `min`. |
| `max` | `number` | `100` | Upper bound of the range. Forwarded to the underlying `<input type="range">` as `max`. |
| `onValueChange` | `(value: number \| number[], eventDetails: ...) => void` | — | Change callback. Receives a `number` for a single-thumb slider and a `number[]` for a multi-thumb one — normalize inside your handler if you want a stable state shape. Inherited from Base UI’s `Slider.Root`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Axis of the slider. Horizontal fills the parent width; vertical fills the parent height and requires the wrapper to set a height (`h-64` or similar). Passed through to Base UI, which uses it for both the layout and the keyboard axis (arrows follow the orientation). |
| `className` | `string` | — | Extra classes on the root. Merged with `data-[orientation=horizontal]:w-full` and `data-[orientation=vertical]:h-full` via `cn()`. |

Two components are exported. `Slider` is the root — it renders the control, the track, the indicator, and one thumb per entry in `value` / `defaultValue`. `SliderValue` renders the current numeric value (a sibling of the thumb), useful next to the track for the exact number. The number of thumbs is computed from the value shape: `Array.isArray(value) ? value.length : Array.isArray(defaultValue) ? defaultValue.length : 1`. Do not pass `size`, `value`, `defaultValue`, `min`, or `max` through `SliderBaseUiProps` — they are omitted from it and only read from `SliderOwnProps` (this prevents type drift between the shape Kito expects and the shape Base UI exposes). The visual thumb is a sibling `<div data-slot="slider-thumb">` next to the `<input type="range">` that Base UI mounts — that input carries the `role="slider"`, the keyboard handling, and the `aria-valuenow` announcement, while the visual thumb renders the ring on hover/drag/focus. RTL is handled by Base UI: when it sees `dir="rtl"` from any ancestor, it flips the thumb axis and the track fill direction automatically — no `translate-x` or `flex-row-reverse` on the consumer side.

## Composition

### Basic

A single-thumb slider from 0 to 100 with a `defaultValue`. Give it an `aria-label` — the thumb’s `<input type="range">` becomes the accessible name, and without one the slider is announced as "slider" with no context.

```tsx
import { Slider } from '@bilazo/kito/components/slider'

<div className="w-full max-w-sm">
  <Slider defaultValue={33} aria-label="Volume" />
</div>
```

### Range with two thumbs

Pass an array to `defaultValue` for a two-thumb range. Base UI clamps the thumbs so the lower one cannot be dragged past the upper one.

```tsx
import { Slider } from '@bilazo/kito/components/slider'

<Slider defaultValue={[25, 75]} aria-label="Price range" />
```

### Controlled

Pass `value` and `onValueChange` to drive the state from outside. `onValueChange` gives a `number` for a single-thumb slider and a `number[]` for a multi-thumb one — normalize inside the handler if you want a stable state shape.

```tsx
import { Slider } from '@bilazo/kito/components/slider'
import { useState } from 'react'

export function Controlled() {
  const [value, setValue] = useState<number[]>([50])
  return (
    <Slider
      value={value}
      onValueChange={(v) => setValue(Array.isArray(v) ? v : [v])}
      aria-label="Volume"
    />
  )
}
```

### Vertical

Set `orientation="vertical"` and give the wrapper a height. The slider fills the height and each thumb is a row-oriented handle — useful for volume columns or stacked comparisons.

```tsx
import { Slider } from '@bilazo/kito/components/slider'

<div className="flex h-64 items-end gap-8">
  <Slider orientation="vertical" defaultValue={25} aria-label="Low" />
  <Slider orientation="vertical" defaultValue={50} aria-label="Medium" />
  <Slider orientation="vertical" defaultValue={75} aria-label="High" />
</div>
```

### Value display

Render `SliderValue` next to the track to show the exact number. Inside an RTL page, pair it with a `dir="auto"` wrapper or let the numeric input inherit — the number itself is direction-agnostic, but the layout of "label + value" flips with the page.

```tsx
import { Slider } from '@bilazo/kito/components/slider'

<Slider defaultValue={50} aria-label="Volume" />
```

---

_Generated from `apps/web/src/content/slider/meta.ts`. Do not edit directly._
