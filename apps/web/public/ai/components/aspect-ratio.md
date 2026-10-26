# Aspect Ratio

> Constrains its child to a fixed aspect ratio.

Constrains its child to a fixed aspect ratio. A thin wrapper around CSS `aspect-ratio` — no padding hack, no extra DOM beyond one `<div>`. The ratio is written to a `--ratio` custom property so a consumer can override it per-instance (via `className="[--ratio:21/9]"` or `style={{ "--ratio": 4 / 3 }}`) without touching the component. Positioned `relative` by default so absolutely-positioned children (overlays, captions) anchor to the frame. Direction-agnostic — CSS `aspect-ratio` does not depend on `dir`, so the frame is identical in LTR and RTL.

## Import

```tsx

import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

```

## When to use

- A fixed-ratio media frame — a 16/9 video embed, a 4/3 photo, a 1/1 thumbnail — where the content must fit a specific ratio regardless of its intrinsic size.

- A grid of thumbnails where every cell must be the same size — pass `ratio={1}` so the grid stays aligned even when images have different intrinsic aspect ratios.

- A skeleton placeholder for a media block — reserve the frame ratio before the image loads so the layout does not shift.

- A card or a tile with a portrait or landscape cover — `ratio={9 / 16}` or `ratio={16 / 9}` sized to the design.

- Anywhere you need a stable container for `object-cover` / `object-contain` — the frame is fixed, the child decides how to fill it.

## When NOT to use

- For text — text has natural flow and should dictate its own height; a fixed-ratio box can overflow or leave dead space. Use padding and typography.

- When the child’s own intrinsic size is the goal — a plain image or a video that has not been cropped does not need a frame. Only wrap it when the frame ratio is not the child’s natural ratio.

- When the frame ratio should change at breakpoints — a single `--ratio` value cannot be overridden by a media query without a CSS class. For a mobile-to-desktop ratio flip, use `className="aspect-square md:aspect-video"` directly.

- As a full-page or section container — a page-wide fixed-ratio box makes the layout jump on resize. Use `min-h-screen` / `min-h-svh` for viewport-sized containers.

- When a static Tailwind utility (`aspect-video`, `aspect-square`, `aspect-[16/9]`) is enough — the component exists to provide a `ratio` prop API, useful when the value is dynamic or comes from data. In a one-off static layout, the utility is simpler and avoids an extra wrapper.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio`* | `number` | — | Width divided by height, e.g. `16 / 9`, `1`, `9 / 16`, `3 / 4`. Written to the `--ratio` custom property and applied via `aspect-(--ratio)`. Pass an expression (`16 / 9`), not a string (`'16/9'`) — the property is a CSS number, and arithmetic makes the intent obvious. Required — there is no sensible default; every `AspectRatio` must declare its own ratio. |
| `className` | `string` | — | Extra classes. Merged with `relative aspect-(--ratio)` via `cn()`. Commonly used for a per-instance ratio override (`[--ratio:21/9]`) or for `overflow-hidden rounded-lg` when framing an image. |

Only `AspectRatio` is exported as a value; `AspectRatioProps` is a type-only export (an `interface` extending `React.ComponentProps<"div">` plus the `ratio` prop) and does not appear in `exports`. There is no Base UI primitive, no cva output, and no `*OwnProps` / `*BaseUiProps` split — `ratio` is the only own prop and is declared directly on the interface, the same pattern as `Skeleton`. The element is a `<div>` with `data-slot="aspect-ratio"`, `position: relative`, and `aspect-ratio` set from the `--ratio` custom property. `style` is merged carefully: the computed `{ "--ratio": ratio }` object is spread first, the consumer’s `style` second, so a consumer can override the ratio per-instance via `style={{ "--ratio": 4 / 3 }}` or the `className="[--ratio:4/3]"` utility without the component re-applying the prop. `ratio` is the only required prop in the entire library — every other component has a sensible default; this one does not, because the ratio is the point of the component.

## Composition

### Image frame

The most common use: a fixed-ratio frame for an image that may be any size. `size-full object-cover` fills the frame and crops overflow; `object-contain` letterboxes instead.

```tsx
import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

<div className="w-full max-w-md overflow-hidden rounded-lg">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/photo.jpg"
      alt="A cat"
      className="size-full object-cover"
    />
  </AspectRatio>
</div>
```

### Square grid

Pass `ratio={1}` for a square. In a CSS grid, every cell gets the same height regardless of the image’s intrinsic size — the grid stays aligned.

```tsx
import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

<div className="grid w-full max-w-md grid-cols-3 gap-4">
  <AspectRatio ratio={1}>
    <img src="/a.jpg" alt="A" className="size-full rounded-lg object-cover" />
  </AspectRatio>
  <AspectRatio ratio={1}>
    <img src="/b.jpg" alt="B" className="size-full rounded-lg object-cover" />
  </AspectRatio>
  <AspectRatio ratio={1}>
    <img src="/c.jpg" alt="C" className="size-full rounded-lg object-cover" />
  </AspectRatio>
</div>
```

### Override the ratio per instance

Because the ratio is a CSS custom property, a consumer can override it with a utility class or inline style. The component’s `ratio` prop is the default; the consumer’s override wins.

```tsx
import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

<AspectRatio ratio={16 / 9} className="[--ratio:21/9]">
  <img src="/ultrawide.jpg" alt="Ultrawide" className="size-full object-cover" />
</AspectRatio>
```

### Video embed

YouTube, Vimeo, and most modern video embeds expect a 16/9 frame. The iframe is a direct child with `size-full`; no padding hack is needed.

```tsx
import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Video"
    className="size-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</AspectRatio>
```

### Absolute overlay inside the frame

Because the root is `relative`, an absolutely-positioned child anchors to the frame. Use this for captions, gradients, or controls on top of the image without extra wrappers.

```tsx
import { AspectRatio } from '@bilazo/kito/components/aspect-ratio'

<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
  <img src="/cover.jpg" alt="" className="size-full object-cover" />
  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  <p className="absolute bottom-3 inset-s-3 text-sm text-white">Caption</p>
</AspectRatio>
```

---

_Generated from `apps/web/src/content/aspect-ratio/meta.ts`. Do not edit directly._
