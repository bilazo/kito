# Item

> A flexible container for one row of content — media, title, description, and actions.

A flexible container for one row of content — an optional `ItemMedia`, an `ItemContent` (title + description), and optional `ItemActions`. Polymorphic via Base UI’s `render` prop, so the same row can render as a `<div>`, an `<a>`, a `<button>`, or any other element. Three surface variants (`default` / `outline` / `muted`) and three sizes (`default` / `sm` / `xs`) cover flat lists, dense sidebars, and selected rows. `ItemGroup` stacks related items with `role="list"`; `ItemHeader` / `ItemFooter` sit above and below the row as full-width strips. Use `Item` for **displaying** content — for a form-control row, use `Field`.

## Import

```tsx

import { Item, ItemGroup, ItemSeparator, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter } from '@bilazo/kito/components/item'

```

## When to use

- A row of content with media, a title, a description, and a trailing action — a file row, a settings row, a team member row.

- A list of links to pages — pass `render={<a href="…" />}` so the whole row navigates; the focus and hover styles travel with the polymorphic render.

- A settings panel where each row is a labelled control — pair `Item` with `Button` (or `Switch` inside `ItemActions`) for the action.

- A compact sidebar of navigation entries — `size="sm"` or `size="xs"` shrinks the padding and gap for a dense list.

- A media-driven card in a vertical list — `ItemMedia variant="image"` gives a fixed-ratio thumbnail; the size scales with `Item`’s `size`.

- A row that needs a full-width header or footer — a source label, a timestamp, a badge strip — via `ItemHeader` / `ItemFooter`.

- A grouped list — wrap items in `ItemGroup` for consistent spacing and `role="list"`; add `ItemSeparator` between items for a divided look.

- A selected or hovered row — `variant="muted"` gives a soft-filled background that reads as a subtle active state.

## When NOT to use

- For a form-control row — use `Field`. `Field` provides the label, description, error wiring, and `aria-` attributes for inputs, selects, and switches; `Item` is display-only.

- For a table with columns and headers — use `Table`. `Item` is a row; multiple columns need the semantic structure a table gives.

- For navigation between pages where the click target is a full row — `Item render={<a />}` works for a single-item link; for a list of nav links, prefer a `Menu` or a real `<nav>` — a scroll area of Items is fine but the semantics differ.

- For content that must persist and reload — `Item` is display; if the row opens a page, use a route, not an interactive `Item` with a modal.

- For an action that must be a button — render `<Item render={<button />}>` is possible but unusual; a `Button` with custom content is clearer.

- As a replacement for `Card` — `Card` is a bigger container (header, content, footer, action slots) with more padding; `Item` is a single row.

- Without an accessible name for icon-only `ItemActions` — the row’s `ItemTitle` is the row’s text; action buttons still need `aria-label` if they are icon-only.

- As a semantic list without `ItemGroup` — `Item` alone has no `role`; `ItemGroup` provides `role="list"` on the wrapper. Without it, screen readers see a stack of `<div>`s.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'outline' \| 'muted'` | `'default'` | Surface treatment. `default` is transparent — the row sits flat on whatever surface it is in. `outline` adds a border for items in a dense list. `muted` is a soft-filled background for a hovered or selected state. Merged with `size` via `itemStyles`. `Item` prop. |
| `size` | `'default' \| 'sm' \| 'xs'` | `'default'` | Controls padding and gap. `default` is `gap-2.5 px-3 py-2.5`; `sm` is `gap-2 px-2.5 py-2` — for compact lists and sidebars; `xs` is `gap-1.5 px-2 py-1.5` — for very dense rows. Also scales the image media (`size-10` → `size-8` → `size-6`) and the description font (`text-sm` → `text-xs` at `xs`). `Item` prop. |
| `render` | `ReactElement` | — | Render the row as a different element — pass `render={<a href="…" />}` for a link, or `render={<button />}` for a button. The `data-slot`, `data-variant`, `data-size`, and className travel with the render via Base UI’s `useRender`. `Item` prop. |
| `variant` | `'default' \| 'icon' \| 'image'` | `'default'` | Treatment for `ItemMedia`. `default` is a bare slot you size yourself (for an avatar or custom content). `icon` sizes an inline SVG to `size-4`. `image` renders a square frame (`size-10`, scaling down with `Item`’s `size`) with `overflow-hidden rounded-sm` and `[&_img]:object-cover`. `ItemMedia` prop. |
| `className` | `string` | — | Extra classes on any part. Merged with the base classes via `cn()`. Commonly used on `ItemContent` for a max-width or a `min-h-*`, on `ItemMedia variant="image"` for a per-instance size override, or on `ItemSeparator` to adjust the vertical margin. |

Ten components compose. `Item` is polymorphic via Base UI’s `useRender` — it renders a `<div>` by default, or any element passed via `render`. `ItemMedia` is the leading slot (an icon, image, avatar, or custom content); its `variant` picks between a bare wrapper, an icon-sized SVG container, and a fixed-ratio image frame. `ItemContent` is the flexible middle column with `min-w-0` (the escape hatch that lets `line-clamp-1` / `line-clamp-2` truncation on `ItemTitle` / `ItemDescription` actually work — without `min-w-0`, a flex child grows to fit its content and the clamp has no effect). `ItemActions` is the trailing slot with `ms-auto` (a logical property, so it aligns to the reading end in RTL). `ItemHeader` and `ItemFooter` are full-width rows above and below the main content — because `Item` is a flex-wrap container, their `basis-full` forces them onto their own lines. `ItemGroup` renders `role="list"` — the wrapper is announced as a list to screen readers even though the markup uses `<div>`s; the `Item`s inside do not carry `role="listitem"` (they render a generic container). If you need strict `role="listitem"` semantics, use a real `<ul>` / `<li>` or a `Table`. `ItemSeparator` reuses the `Separator` component with `orientation="horizontal"` — it renders `role="none"` by default (Kito’s presentational-by-default policy for `Separator`), which is correct inside a list. Two decorative `data-*` attributes to note: `data-slot="item"` on the row (used by `ItemMedia`’s `group-has-data-[slot=item-description]/item` selector to shift the media to `self-start` when a description is present) and `data-slot="item-description"` on the paragraph (the target of that selector). `ItemVariant`, `ItemSize`, and `ItemMediaVariant` are exported as type-only aliases; `itemStyles` and `itemMediaStyles` are internal (no cva output export).

## Composition

### Basic row

The canonical shape: an `ItemMedia` (icon), an `ItemContent` (title + description), and an `ItemActions` slot with a button. Add `variant="outline"` for a bordered row, `variant="muted"` for a soft-filled state.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { FileText } from 'lucide-react'

<Item variant="outline">
  <ItemMedia variant="icon">
    <FileText />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Q3 Report.pdf</ItemTitle>
    <ItemDescription>Updated 2 days ago · 1.4 MB</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline">Open</Button>
  </ItemActions>
</Item>
```

### As a link

Pass `render={<a href="…" />}` to make the whole row navigate. The polymorphic render carries the `data-slot`, `data-variant`, `data-size`, and className to the anchor — the row looks and behaves the same.

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { Home } from 'lucide-react'

<Item render={<a href="/dashboard" />}>
  <ItemMedia variant="icon">
    <Home />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Dashboard</ItemTitle>
    <ItemDescription>Overview of your account and activity.</ItemDescription>
  </ItemContent>
</Item>
```

### Grouped list

Wrap items in an `ItemGroup` for consistent vertical spacing and `role="list"` on the wrapper. Add `ItemSeparator` between items for a divided look — the separator is decorative, which is correct inside a semantic list.

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@bilazo/kito/components/item'

<ItemGroup>
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>First item</ItemTitle>
      <ItemDescription>Description</ItemDescription>
    </ItemContent>
  </Item>
  <ItemSeparator />
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>Second item</ItemTitle>
      <ItemDescription>Description</ItemDescription>
    </ItemContent>
  </Item>
</ItemGroup>
```

### With a header and a footer

`ItemHeader` and `ItemFooter` are full-width strips above and below the main content — a source label, a timestamp, a status strip. Their `basis-full` forces them onto their own lines inside the `Item`’s flex-wrap container.

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@bilazo/kito/components/item'
import { BookOpen } from 'lucide-react'

<Item variant="outline">
  <ItemHeader>
    <span>Lesson</span>
    <span>4 min read</span>
  </ItemHeader>
  <ItemMedia variant="icon">
    <BookOpen />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Travel vocabulary</ItemTitle>
    <ItemDescription>Common phrases for airports and hotels.</ItemDescription>
  </ItemContent>
  <ItemFooter>
    <span>Updated Mar 12</span>
    <span>Beginner</span>
  </ItemFooter>
</Item>
```

### Sizes for dense lists

`size="sm"` and `size="xs"` shrink the padding and gap for compact lists, dropdown menus, and sidebars. The image media and the description font scale together — `size-10` → `size-8` → `size-6` and `text-sm` → `text-xs` at `xs`.

```tsx
import { Item, ItemContent, ItemDescription, ItemTitle } from '@bilazo/kito/components/item'

<Item size="sm" variant="outline">
  <ItemContent>
    <ItemTitle>Compact row</ItemTitle>
    <ItemDescription>Shrunk padding and gap.</ItemDescription>
  </ItemContent>
</Item>
```

---

_Generated from `apps/web/src/content/item/meta.ts`. Do not edit directly._
