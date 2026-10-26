# Avatar

> A profile image with an automatic fallback and optional status.

A profile image with an automatic fallback and an optional status badge. Base UI tracks the image load and error state itself, so the fallback shows instantly and is swapped for the image once it loads — no broken-image icon and no layout shift. `sm`, `md`, and `lg` line up exactly with `Button` and `Input` heights (from the same `--control-*` tokens) so an avatar sits flush next to a form control; `xl` is for profile headers. `AvatarGroup` overlaps avatars with a logical negative margin (`-ms-2`), so RTL works without extra classes, and `max` collapses the rest into a `+N` avatar.

## Import

```tsx

import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from '@bilazo/kito/components/avatar'

```

## When to use

- Represent a user, a profile, or an identity next to their name — a comment header, a chat message, a settings row.

- Inside a row, list, or table where each entry has an owner — pair the avatar with the visible name for the full identity.

- Show presence (online, offline, busy, away) alongside the avatar via `AvatarBadge`.

- In a header for a settings, profile, or account page — use `size="xl"` there.

- As an overlapping group of participants — a card, a list item, a document header — with `AvatarGroup` and `max` when the count exceeds what fits.

- For the summary of an entity in a card, dropdown, or mention picker.

## When NOT to use

- As the only identifier of a user — always pair the avatar with a visible name or `aria-label`ed context. A bare image is not announced as a name to assistive technology.

- For a non-person identity where a logo or a generic icon would do — use `Skeleton` during load, or a plain `Icon` for an object. Avatar is for people.

- As a substitute for a status text — a colored `AvatarBadge` is decorative. If the status is meaningful, expose it in text elsewhere (title attribute is not enough for screen readers).

- For an editable profile image with upload/crop UI — use a dedicated upload component. Avatar shows a fixed image; it does not edit one.

- Inside a `<button>` or `<a>` as the only content — put a `Button` around the avatar or wrap it in a link with an `aria-label`. An image alone is not a control.

- When the count is more than a row can hold and overflow is not relevant — use a plain list or a "see all" link. `AvatarGroup`'s `+N` is for a fixed, small list.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the avatar. `sm`, `md`, and `lg` map to `size-(--control-sm)`, `size-(--control-md)`, and `size-(--control-lg)` — the same tokens as `Button` and `Input`, so an avatar sits flush next to a form control. `xl` is `size-16` with `text-lg`, for profile headers. The badge size is derived from this via `group-data-[size=…]/avatar` selectors, so setting `size` on the avatar also sizes its badge. `Avatar` prop. |
| `delay` | `number` | `0` | Milliseconds to wait before showing the fallback. Useful on fast connections where the fallback would otherwise flash for a frame before the image loads. `AvatarFallback` prop. |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | — | Presence state on the badge dot. Each maps to a semantic color pair: `online` → `bg-primary`, `offline` → `bg-muted-foreground`, `busy` → `bg-destructive`, `away` → `bg-highlight`. Set to `undefined` (default) for an icon-only badge — pass `children` with an SVG and `className` for the surface color. `AvatarBadge` prop. |
| `max` | `number` | — | Show at most this many avatars; the rest are collapsed into a single `+N` avatar at the end. Pass the full list, not a pre-sliced one. `AvatarGroup` prop. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size used only for the `+N` overflow avatar. Set `size` on each `<Avatar>` individually to control the rest. `AvatarGroup` prop. |
| `className` | `string` | — | Extra classes on any subcomponent. Merged with the base classes via `cn()`. |

Five components are exported. `Avatar` (root, wraps Base UI’s `Avatar.Root`) sets `data-slot="avatar"` and `data-size`, so the badge can size itself from the parent. `AvatarImage` (wraps Base UI’s `Avatar.Image`) renders nothing visible until the image has loaded — the fallback is what the user sees before that. `AvatarFallback` (wraps Base UI’s `Avatar.Fallback`) adds an own `delay` prop that Base UI forwards; the root’s tracking shows/hides the fallback automatically. `AvatarBadge` is a plain `<span>` (not a Base UI primitive) — it positions itself at `bottom-0 end-0` (logical, so it flips in RTL) and its size is derived from the parent’s `data-size` via `group-data-[size=…]/avatar` selectors, so it always matches the avatar it sits on. `AvatarGroup` is a plain `<div>` that overlaps children with a logical `-ms-2` and applies `ring-background` cut-outs per child; `max` collapses overflow into a `+N` avatar rendered as a normal `Avatar` with a `secondary` fallback. `avatarStyles` and `badgeStyles` are internal (no cva output export); all native props (`id`, `data-*`, `aria-*`) are forwarded untouched.

## Composition

### Image with a fallback

The canonical pattern: `Avatar` wraps an `AvatarImage` and an `AvatarFallback`. Base UI shows the fallback while the image loads and swaps to the image on load — no broken-image icon, no layout shift.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

### With a presence badge

`AvatarBadge` sits at the bottom-end corner (logical, so it flips in RTL) and sizes itself from the parent avatar. Pass `status` for the common presence states. The dot is decorative — if the status is meaningful, expose it in text.

```tsx
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="Online" />
  <AvatarFallback>ON</AvatarFallback>
  <AvatarBadge status="online" />
</Avatar>
```

### Overlapping group

`AvatarGroup` overlaps children with a logical negative margin, so the order and the visual overlap flip together in RTL. Each avatar keeps its own size and gets a `ring-background` cut-out.

```tsx
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@bilazo/kito/components/avatar'

const users = [
  { id: 1, src: 'https://github.com/shadcn.png', initials: 'CN' },
  { id: 2, src: 'https://github.com/maxleiter.png', initials: 'ML' },
  { id: 3, src: 'https://github.com/evilrabbit.png', initials: 'ER' },
]

<AvatarGroup>
  {users.map((user) => (
    <Avatar key={user.id}>
      <AvatarImage src={user.src} alt={user.initials} />
      <AvatarFallback>{user.initials}</AvatarFallback>
    </Avatar>
  ))}
</AvatarGroup>
```

### Group with overflow

Pass `max` to collapse the rest into a single `+N` avatar. Pass the full list — the group slices it. `size` on the group controls only the `+N` avatar; set `size` on each `<Avatar>` individually for the rest.

```tsx
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@bilazo/kito/components/avatar'

<AvatarGroup max={3}>
  {users.map((user) => (
    <Avatar key={user.id}>
      <AvatarImage src={user.src} alt={user.initials} />
      <AvatarFallback>{user.initials}</AvatarFallback>
    </Avatar>
  ))}
</AvatarGroup>
```

### Sizes across the control scale

`sm`, `md`, and `lg` use the same `--control-*` tokens as `Button` and `Input`. `xl` is `size-16` with `text-lg`, for profile headers rather than form rows.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'

<Avatar size="sm">
  <AvatarImage src="/alice.jpg" alt="Alice" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>
<Avatar size="md">…</Avatar>
<Avatar size="lg">…</Avatar>
<Avatar size="xl">…</Avatar>
```

---

_Generated from `apps/web/src/content/avatar/meta.ts`. Do not edit directly._
