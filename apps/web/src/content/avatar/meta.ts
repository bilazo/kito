import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Avatar', 'AvatarImage', 'AvatarFallback', 'AvatarBadge', 'AvatarGroup'],

  summary:
    'A profile image with an automatic fallback and an optional status badge. Base UI tracks the image load and error state itself, so the fallback shows instantly and is swapped for the image once it loads — no broken-image icon and no layout shift. `sm`, `md`, and `lg` line up exactly with `Button` and `Input` heights (from the same `--control-*` tokens) so an avatar sits flush next to a form control; `xl` is for profile headers. `AvatarGroup` overlaps avatars with a logical negative margin (`-ms-2`), so RTL works without extra classes, and `max` collapses the rest into a `+N` avatar.',

  whenToUse: [
    'Represent a user, a profile, or an identity next to their name — a comment header, a chat message, a settings row.',
    'Inside a row, list, or table where each entry has an owner — pair the avatar with the visible name for the full identity.',
    'Show presence (online, offline, busy, away) alongside the avatar via `AvatarBadge`.',
    'In a header for a settings, profile, or account page — use `size="xl"` there.',
    'As an overlapping group of participants — a card, a list item, a document header — with `AvatarGroup` and `max` when the count exceeds what fits.',
    'For the summary of an entity in a card, dropdown, or mention picker.',
  ],

  whenNotToUse: [
    'As the only identifier of a user — always pair the avatar with a visible name or `aria-label`ed context. A bare image is not announced as a name to assistive technology.',
    'For a non-person identity where a logo or a generic icon would do — use `Skeleton` during load, or a plain `Icon` for an object. Avatar is for people.',
    'As a substitute for a status text — a colored `AvatarBadge` is decorative. If the status is meaningful, expose it in text elsewhere (title attribute is not enough for screen readers).',
    'For an editable profile image with upload/crop UI — use a dedicated upload component. Avatar shows a fixed image; it does not edit one.',
    'Inside a `<button>` or `<a>` as the only content — put a `Button` around the avatar or wrap it in a link with an `aria-label`. An image alone is not a control.',
    'When the count is more than a row can hold and overflow is not relevant — use a plain list or a "see all" link. `AvatarGroup`\'s `+N` is for a fixed, small list.',
  ],

  props: [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description:
        'Size of the avatar. `sm`, `md`, and `lg` map to `size-(--control-sm)`, `size-(--control-md)`, and `size-(--control-lg)` — the same tokens as `Button` and `Input`, so an avatar sits flush next to a form control. `xl` is `size-16` with `text-lg`, for profile headers. The badge size is derived from this via `group-data-[size=…]/avatar` selectors, so setting `size` on the avatar also sizes its badge. `Avatar` prop.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description:
        'Milliseconds to wait before showing the fallback. Useful on fast connections where the fallback would otherwise flash for a frame before the image loads. `AvatarFallback` prop.',
    },
    {
      name: 'status',
      type: "'online' | 'offline' | 'busy' | 'away'",
      description:
        'Presence state on the badge dot. Each maps to a semantic color pair: `online` → `bg-primary`, `offline` → `bg-muted-foreground`, `busy` → `bg-destructive`, `away` → `bg-highlight`. Set to `undefined` (default) for an icon-only badge — pass `children` with an SVG and `className` for the surface color. `AvatarBadge` prop.',
    },
    {
      name: 'max',
      type: 'number',
      description:
        'Show at most this many avatars; the rest are collapsed into a single `+N` avatar at the end. Pass the full list, not a pre-sliced one. `AvatarGroup` prop.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description:
        'Size used only for the `+N` overflow avatar. Set `size` on each `<Avatar>` individually to control the rest. `AvatarGroup` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes on any subcomponent. Merged with the base classes via `cn()`.',
    },
  ],

  propsNote:
    'Five components are exported. `Avatar` (root, wraps Base UI’s `Avatar.Root`) sets `data-slot="avatar"` and `data-size`, so the badge can size itself from the parent. `AvatarImage` (wraps Base UI’s `Avatar.Image`) renders nothing visible until the image has loaded — the fallback is what the user sees before that. `AvatarFallback` (wraps Base UI’s `Avatar.Fallback`) adds an own `delay` prop that Base UI forwards; the root’s tracking shows/hides the fallback automatically. `AvatarBadge` is a plain `<span>` (not a Base UI primitive) — it positions itself at `bottom-0 end-0` (logical, so it flips in RTL) and its size is derived from the parent’s `data-size` via `group-data-[size=…]/avatar` selectors, so it always matches the avatar it sits on. `AvatarGroup` is a plain `<div>` that overlaps children with a logical `-ms-2` and applies `ring-background` cut-outs per child; `max` collapses overflow into a `+N` avatar rendered as a normal `Avatar` with a `secondary` fallback. `avatarStyles` and `badgeStyles` are internal (no cva output export); all native props (`id`, `data-*`, `aria-*`) are forwarded untouched.',

  composition: [
    {
      title: 'Image with a fallback',
      description:
        'The canonical pattern: `Avatar` wraps an `AvatarImage` and an `AvatarFallback`. Base UI shows the fallback while the image loads and swaps to the image on load — no broken-image icon, no layout shift.',
      code: `import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'\n\n<Avatar>\n  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>`,
    },
    {
      title: 'With a presence badge',
      description:
        '`AvatarBadge` sits at the bottom-end corner (logical, so it flips in RTL) and sizes itself from the parent avatar. Pass `status` for the common presence states. The dot is decorative — if the status is meaningful, expose it in text.',
      code: `import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'\n\n<Avatar>\n  <AvatarImage src="https://github.com/shadcn.png" alt="Online" />\n  <AvatarFallback>ON</AvatarFallback>\n  <AvatarBadge status="online" />\n</Avatar>`,
    },
    {
      title: 'Overlapping group',
      description:
        '`AvatarGroup` overlaps children with a logical negative margin, so the order and the visual overlap flip together in RTL. Each avatar keeps its own size and gets a `ring-background` cut-out.',
      code: `import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@bilazo/kito/components/avatar'\n\nconst users = [\n  { id: 1, src: 'https://github.com/shadcn.png', initials: 'CN' },\n  { id: 2, src: 'https://github.com/maxleiter.png', initials: 'ML' },\n  { id: 3, src: 'https://github.com/evilrabbit.png', initials: 'ER' },\n]\n\n<AvatarGroup>\n  {users.map((user) => (\n    <Avatar key={user.id}>\n      <AvatarImage src={user.src} alt={user.initials} />\n      <AvatarFallback>{user.initials}</AvatarFallback>\n    </Avatar>\n  ))}\n</AvatarGroup>`,
    },
    {
      title: 'Group with overflow',
      description:
        'Pass `max` to collapse the rest into a single `+N` avatar. Pass the full list — the group slices it. `size` on the group controls only the `+N` avatar; set `size` on each `<Avatar>` individually for the rest.',
      code: `import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@bilazo/kito/components/avatar'\n\n<AvatarGroup max={3}>\n  {users.map((user) => (\n    <Avatar key={user.id}>\n      <AvatarImage src={user.src} alt={user.initials} />\n      <AvatarFallback>{user.initials}</AvatarFallback>\n    </Avatar>\n  ))}\n</AvatarGroup>`,
    },
    {
      title: 'Sizes across the control scale',
      description:
        '`sm`, `md`, and `lg` use the same `--control-*` tokens as `Button` and `Input`. `xl` is `size-16` with `text-lg`, for profile headers rather than form rows.',
      code: `import { Avatar, AvatarFallback, AvatarImage } from '@bilazo/kito/components/avatar'\n\n<Avatar size="sm">\n  <AvatarImage src="/alice.jpg" alt="Alice" />\n  <AvatarFallback>AL</AvatarFallback>\n</Avatar>\n<Avatar size="md">…</Avatar>\n<Avatar size="lg">…</Avatar>\n<Avatar size="xl">…</Avatar>`,
    },
  ],
}
