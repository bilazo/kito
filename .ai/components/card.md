# Card

> A structural surface for grouping related content.

A structural surface for grouping related content. A card is composed from seven parts — header, title, description, optional action, content, optional footer — and the whole surface is driven by a single `--card-spacing` CSS variable, so switching between the default and small size (or overriding the spacing on one card) is a single-variable change.

## Import

```tsx

import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@bilazo/kito/components/card'

```

## When to use

- Group a focused unit of content — a profile, a project, a lesson, an invoice — with a title and optional actions.

- Display content alongside a stretched link: pass `interactive` and put an `<a>` with `after:absolute after:inset-0` in the title, so the whole card is clickable while an independent action (favorite, more) lives next to it.

- Present a compact panel with a title and description but no full form — a stat card, a summary, an empty-state placeholder.

- Use the small size (`size="sm"`) and tighter spacing to fit several cards in a dense grid or a mobile list.

## When NOT to use

- For a form field with a label, description, and error message — use `Field`. A card wraps a whole form section, not a single control.

- For a list of rows that share one container (a table, a stack of settings rows) — use `Table` for tabular data, or a plain `div` with `divide-y` for row stacks. Every row becoming a card adds unnecessary visual weight.

- For an interactive element on its own (an action, a toggle) — use `Button`, `Switch`, or `Checkbox`. A card is a container, not an action.

- For navigation between pages — use your router `<Link>` or a `<Button>` rendered as a link. Card with a stretched link is for a card that already exists as a surface; if the whole UI is a set of links, use a list of links.

- For a modal or panel that should float above the page — use `Dialog`, `Sheet`, `Popover`, or `Drawer`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md'` | `'md'` | Controls the shared `--card-spacing` variable that sets the gap between sections and the inset of each section. `sm` uses `--spacing(4)` (16px); `md` uses `--spacing(6)` (24px). Override per card with an arbitrary property class, e.g. `[--card-spacing:--spacing(2)]`. |
| `variant` | `'filled' \| 'outline'` | `'filled'` | Surface treatment. `filled` paints the card with `bg-card` and rings it with `--border`. `outline` is transparent so the page shows through, still ringed. Both use a ring (not a border) so switching variants does not shift the content by 1px. |
| `interactive` | `boolean` | `false` | Adds a hover and focus-within affordance — `:has(a:hover)` and `:has(button:hover)` tint the surface, `:has(a:focus-visible)` draws a focus ring. Use when the card contains a stretched link so the whole surface reads as clickable. Does NOT make the card itself focusable. |
| `render` | `ReactElement` | — | Render the card root as a different element, e.g. `<article>`. Base UI merges the props and preserves `data-slot="card"`. |
| `className` | `string` | — | Extra classes. Merged with the variant classes via `cn()`. |

Card is a compound component. `Card` is the surface; `CardHeader` is a grid that places `CardTitle`, `CardDescription`, and an optional `CardAction` in the top-end corner automatically; `CardContent` is the main body; `CardFooter` sits at the bottom with a divider and a muted background. `CardTitle` renders as `<h3>` by default (a titled section for screen readers) — pass `render={<div />}` for non-heading titles such as numeric stats. Every subcomponent accepts `className` plus native HTML attributes; none of them add behaviour.

## Composition

### Full card

Every part in its default position. Only the parts you need are required.

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'

<Card>
  <CardHeader>
    <CardTitle>Project</CardTitle>
    <CardDescription>A short summary</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm" aria-label="More">…</Button>
    </CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button>Continue</Button>
  </CardFooter>
</Card>
```

### Stretched link

Pass `interactive` and put a real `<a>` in the title with `after:absolute after:inset-0` — the anchor expands to cover the card. Use `buttonVariants()` for the link styling, not `<Button render={<a/>}>`.

```tsx
<Card interactive>
  <CardHeader>
    <CardTitle>
      <a
        href="/lessons/42"
        className="text-primary underline-offset-4 after:absolute after:inset-0 hover:underline"
      >
        Lesson 42: Market visit
      </a>
    </CardTitle>
    <CardDescription>Intermediate · 12 new words</CardDescription>
  </CardHeader>
</Card>
```

### Stretched link with an independent action

A favorite button next to the stretched link. Give `CardAction` a `z-10` so clicks on the action do not navigate.

```tsx
<CardAction className="z-10">
  <Button variant="ghost" size="icon-sm" aria-label="Add to favorites">
    <Heart />
  </Button>
</CardAction>
```

### Edge-to-edge content

Override `--card-spacing` to zero the padding, then add padding to each section that should stay inset. Or use negative margins: `-mx-(--card-spacing)` on `CardContent` for a full-bleed image or table.

```tsx
<Card className="[--card-spacing:0px]">
  <img src="…" alt="" />
  <CardContent className="px-6 py-4">…</CardContent>
</Card>
```

### Non-heading title

A stat card uses a numeric value instead of a heading — pass `render={<div/>}` so the number is not announced as an H3.

```tsx
<CardTitle render={<div />} className="text-3xl">
  1,248
</CardTitle>
```

---

_Generated from `apps/web/src/content/card/meta.ts`. Do not edit directly._
