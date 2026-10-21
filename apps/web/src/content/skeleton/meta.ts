import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Skeleton'],

  summary:
    'A loading placeholder. A styled `<div>` sized and shaped entirely with utility classes — `h-4 w-32` for a text line, `size-(--control-md) rounded-full` for an avatar, or any composition that matches the real content. Two animation styles: `pulse` (default) fades the placeholder in and out, `shimmer` sweeps a highlight across it. Both respect `prefers-reduced-motion` — users who opt out of animation see a static placeholder. The element is `aria-hidden` by default so screen readers do not announce it; mark the surrounding region with `aria-busy="true"` while data loads.',

  whenToUse: [
    'Show placeholder shapes while data loads, when the shape of the incoming content is known — text lines, an avatar, a card, a table row.',
    'Match the real content’s layout classes on the skeleton so the swap-in has no layout shift — the avatar example uses the same `--control-*` tokens as `Avatar` for this reason.',
    'Give the user a sense of progress for work that takes longer than a single frame but whose duration is unknown — composing multiple skeleton blocks reads as "loading".',
    'Fill a region marked `aria-busy="true"` so the visual placeholder and the assistive-tech announcement stay in sync.',
  ],

  whenNotToUse: [
    'For very short operations (under ~1 second) — the flash is more distracting than a spinner or no indicator at all.',
    'When the shape of the incoming content is unknown — use a `Spinner` (or a generic loading state). A skeleton that does not match the eventual layout is more disorienting than a spinner.',
    'For measurable, known-duration work — use `Progress`. A progress bar communicates completion; a skeleton communicates "something is loading".',
    'For empty states — "no results" and "still loading" are different states. Use an empty-state component for the former; a skeleton that never resolves trains users to wait forever.',
    'As the only accessible signal of loading — Skeleton is `aria-hidden` by design. Always pair it with `aria-busy="true"` on the region and (optionally) an `sr-only` "Loading…" line so assistive tech knows content is on its way.',
  ],

  props: [
    {
      name: 'variant',
      type: "'pulse' | 'shimmer'",
      default: "'pulse'",
      description:
        'Animation style. `pulse` fades the placeholder in and out — the safe default that works on every surface. `shimmer` sweeps a highlight from left to right across the placeholder via a `before:` pseudo-element, for larger areas where pulse reads as flat. Both respect `prefers-reduced-motion`: users who opt out see a static placeholder.',
    },
    {
      name: 'aria-hidden',
      type: 'boolean',
      default: 'true',
      description:
        'Set to `true` on the root — the placeholder is decorative and should not be announced. Override with `aria-hidden={false}` only when the skeleton carries meaning to assistive technology (rare; the pattern is to keep it hidden and mark the region with `aria-busy`).',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Sizing and shape. Skeleton has no built-in dimensions — `h-4 w-32`, `size-(--control-md) rounded-full`, or any other utility class defines the placeholder. Merged with the base `relative overflow-hidden rounded-md bg-muted` via `cn()`.',
    },
  ],

  propsNote:
    'Skeleton is a native `<div>` — `React.ComponentProps<"div">` is the base type, so all native attributes (`id`, `data-*`, `children`, `style`, `ref`) are forwarded untouched. `SkeletonVariant` is also exported as a type-only import for consumers who want to type a variable; it is not a value export. No cva output is exported (`skeletonStyles` is internal to the module). The two animation styles are implemented without extra DOM: `shimmer` renders its gradient on the root’s `::before` pseudo-element, so the placeholder stays a single node. `--skeleton-shimmer` is a semantic token defined in `defaults.css` — it swaps in dark mode automatically, so the shimmer highlight never uses a hardcoded `bg-white/…` that would break in dark theme.',

  composition: [
    {
      title: 'Text lines',
      description:
        'Stack as many as you need and make the last one shorter so it reads like real wrapped text. Widths like `w-full` / `w-5/6` / `w-2/3` approximate a real paragraph.',
      code: `import { Skeleton } from '@bilazo/kito/components/skeleton'\n\n<div className="flex w-full max-w-md flex-col gap-2">\n  <Skeleton className="h-4 w-full" />\n  <Skeleton className="h-4 w-full" />\n  <Skeleton className="h-4 w-2/3" />\n</div>`,
    },
    {
      title: 'Avatar — match the real sizes',
      description:
        'Use the same `--control-*` tokens as `Avatar` so the swap-in has no layout shift. `rounded-full` turns the placeholder into a circle.',
      code: `import { Skeleton } from '@bilazo/kito/components/skeleton'\n\n<div className="flex items-center gap-3">\n  <Skeleton className="size-(--control-sm) rounded-full" />\n  <Skeleton className="size-(--control-md) rounded-full" />\n  <Skeleton className="size-(--control-lg) rounded-full" />\n</div>`,
    },
    {
      title: 'Composite card',
      description:
        'Skeletons compose. Build a placeholder for any real UI by combining `Skeleton` elements with the same layout classes as the real content — a flex row with an avatar, a title, a subtitle, and a body of text.',
      code: `import { Skeleton } from '@bilazo/kito/components/skeleton'\n\n<div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">\n  <div className="flex items-center gap-3">\n    <Skeleton className="size-(--control-md) shrink-0 rounded-full" />\n    <div className="flex flex-1 flex-col gap-2">\n      <Skeleton className="h-4 w-1/3" />\n      <Skeleton className="h-3 w-1/2" />\n    </div>\n  </div>\n  <div className="mt-4 flex flex-col gap-2">\n    <Skeleton className="h-4 w-full" />\n    <Skeleton className="h-4 w-5/6" />\n  </div>\n</div>`,
    },
    {
      title: 'Accessible loading region',
      description:
        'Skeleton is `aria-hidden` — pair it with `aria-busy="true"` on the region and an `sr-only` line so assistive technology knows content is on its way. The visual placeholder and the announcement stay in sync.',
      code: `import { Skeleton } from '@bilazo/kito/components/skeleton'\n\n<div aria-busy="true" aria-live="polite" className="flex w-full max-w-md flex-col gap-3">\n  <p className="sr-only">Loading content…</p>\n  <Skeleton className="h-6 w-1/2" />\n  <Skeleton className="h-4 w-full" />\n  <Skeleton className="h-4 w-3/4" />\n</div>`,
    },
    {
      title: 'Shimmer on a larger surface',
      description:
        'Use `variant="shimmer"` when the placeholder area is large enough that pulse reads as flat — a media block, a long card body. Mix with pulse for smaller elements if you like; both respect reduced motion.',
      code: `import { Skeleton } from '@bilazo/kito/components/skeleton'\n\n<Skeleton variant="shimmer" className="aspect-video w-full rounded-lg" />`,
    },
  ],
}
