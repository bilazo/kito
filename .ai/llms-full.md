# Kito — Full Documentation

> A React design system built on Base UI and Tailwind CSS v4. Framework-agnostic.

## Setup

```bash
pnpm add @bilazo/kito
```

Import the stylesheet once near the app root:

```tsx
import '@bilazo/kito/styles.css'
```

All components are imported from subpaths:

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Input } from '@bilazo/kito/components/input'
```

---

This file contains the complete documentation for every component. Each
component has its own section below.

---

# Accordion

> A vertically stacked set of interactive headings that each reveal a section of content.

A vertically stacked set of interactive headings that each reveal a section of content. Only one item is open at a time by default — pass `multiple` to allow any number. Base UI handles the ARIA wiring (`aria-expanded`, `aria-controls`), keyboard navigation (Enter / Space to toggle, ArrowUp / ArrowDown to move, Home / End to jump to the ends), and the open/close animation via the `--accordion-panel-height` CSS variable. The trigger renders a chevron that rotates 180° when its item is open — a direction-agnostic transform, so RTL works without an override.

## Import

```tsx

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@bilazo/kito/components/accordion'

```

## When to use

- An FAQ section — a stack of question triggers with answer panels, where only one answer needs to be visible at a time.

- A long settings page grouped by category — Account, Notifications, Privacy — where the user focuses on one section at a time.

- A mobile filter panel where each filter group collapses to keep the list scannable.

- Documentation or changelog sections — a compact table of contents where clicking a heading reveals its body.

- A multi-step form where steps are collapsible — a compact summary of each step with the fields inside.

- Anywhere one section at a time should be visible on a narrow viewport, with a clear affordance for revealing the rest.

- When the content is optional for most users — a full policy, a long explanation — and the headings should stay visible.

## When NOT to use

- For tabbed content that switches in place — use `Tabs`. Tabs are persistent and horizontal; Accordion stacks vertically and toggles.

- For a single collapsible section — use a plain `<button>` + `<div>` or `Collapsible` (not built yet). Accordion expects two or more items.

- For navigation between pages — use `Menu` or `NavigationMenu`. Accordion does not route; it reveals content in place.

- For a list of independent choices (filters, options) — use `Checkbox` or a list of `Item`s. An Accordion is for reveal, not selection.

- For very long content — a single 2000-line section inside a panel becomes a scrollbar; prefer a dedicated page or a `Dialog`.

- Without a real heading in the trigger — every trigger is a `<button aria-expanded>` and should have a label. Icon-only triggers need an `aria-label`.

- As the only way to reach critical information — collapsed sections are invisible until clicked. Critical information belongs on the page.

- For a tree view (nested, hierarchical items with their own expand state) — use a dedicated tree component. Accordion is flat.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `multiple` | `boolean` | `false` | Allow more than one item to be open at a time. When `false` (default), opening a new item closes the previously open one — the standard FAQ behaviour. `Accordion` prop. |
| `defaultValue` | `string[]` | — | The items open on mount, for an uncontrolled accordion. Each entry is a `value` matching an `AccordionItem`. Omit for a fully collapsed accordion, or pass `multiple` and include multiple entries. `Accordion` prop. |
| `value` | `string[]` | — | Controlled open items. Pass with `onValueChange` to drive the open state from outside. Omit both `value` and `onValueChange` for an uncontrolled accordion. `Accordion` prop. |
| `onValueChange` | `(value: string[], eventDetails: ...) => void` | — | Change callback. Fires with the new set of open item values. Inherited from Base UI’s `Accordion.Root`. `Accordion` prop. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction. `vertical` stacks items; `horizontal` places them side by side. The latter is rare — most accordions stack. `Accordion` prop. |
| `value`* | `string` | — | This item’s identifier — matched against `defaultValue` / `value` on the root. Every item needs a unique value. `AccordionItem` prop. |
| `disabled` | `boolean` | `false` | Make the item inert. The trigger remains visible but cannot be clicked, focused, or toggled, and the panel stays collapsed. `AccordionItem` prop. |
| `className` | `string` | — | Extra classes on any part. On `Accordion`, useful for a max-width or a custom background. On `AccordionTrigger`, a per-item padding. On `AccordionContent`, the `className` lands on the inner wrapper — use it for content padding (`p-4`), background, or typography overrides. |

Four components compose. `Accordion` (root) forwards to Base UI’s `Accordion.Root` — it renders a single `<div>` wrapper and manages the open item(s) plus keyboard navigation. `AccordionItem` renders a `<div>` with a bottom border (the last item’s border is cancelled by the item’s own `border-b` being the only border; add `last:border-b-0` if you need no bottom border) and holds the required `value` plus an optional `disabled`. `AccordionTrigger` renders Base UI’s `Header` (an `<h3>`) wrapping a `<button>` — this gives the accordion real headings in the document outline and makes the whole heading a click target. The chevron lives inside the trigger as an `aria-hidden` SVG and rotates via `group-aria-expanded/accordion-trigger:rotate-180` — a direction-agnostic transform, so RTL needs no override. `AccordionContent` renders Base UI’s `Panel` with `overflow-hidden` and the `animate-accordion-down` / `animate-accordion-up` keyframes defined in `defaults.css`; the inner `<div>` uses `h-(--accordion-panel-height)` (a CSS variable Base UI sets to the content height) with `data-ending-style:h-0 data-starting-style:h-0` so the panel does not clip content at the start of opening or the end of closing. `motion-reduce:animate-none` disables the animation for users who opt out — the panel still toggles, just instantly. `className` on `AccordionContent` is applied to the inner wrapper (not the animating panel) so it can adjust content padding without breaking the height animation. Base UI’s `keepMounted` prop is available (through `AccordionContent` as `Accordion.Panel.Props`) — the default is `false`, meaning closed panels are unmounted; pass `keepMounted` if you need the content to persist for form-state preservation or offscreen measurement.

## Composition

### Basic FAQ

The canonical pattern: one item open by default via `defaultValue`, each item a trigger + content pair. Clicking a trigger closes the previously open item.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'

<Accordion defaultValue={['item-1']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It follows the WAI-ARIA pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It uses Kito’s semantic tokens.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple items open

Pass `multiple` to let the user open any number of sections at once. Useful for a settings page where the user compares several sections.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'

<Accordion multiple defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Account</AccordionTrigger>
    <AccordionContent>Name, email, and profile photo.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Notifications</AccordionTrigger>
    <AccordionContent>Email, push, and in-app preferences.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### With an icon in the trigger

The trigger’s children are rendered before the chevron, so a leading icon works by wrapping it in a flex row. A `bg-muted` square keeps the icon on the same visual footing as the surrounding content.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'
import { User } from 'lucide-react'

<Accordion>
  <AccordionItem value="profile">
    <AccordionTrigger>
      <span className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <User />
        </span>
        Profile
      </span>
    </AccordionTrigger>
    <AccordionContent>Display name, avatar, and public bio.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Controlled

Pass `value` and `onValueChange` to drive the open items from outside — useful for analytics on which sections the user opens, or for syncing the open state to a URL parameter.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'
import { useState } from 'react'

export function Controlled() {
  const [open, setOpen] = useState<string[]>(['item-1'])
  return (
    <Accordion value={open} onValueChange={setOpen}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

### Inside a card

Wrap the `Accordion` in a `Card` for a FAQ-style layout. `CardHeader` provides the section title; the accordion provides the questions.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@bilazo/kito/components/card'

<Card>
  <CardHeader>
    <CardTitle>Frequently asked questions</CardTitle>
    <CardDescription>Short answers to common questions.</CardDescription>
  </CardHeader>
  <CardContent>
    <Accordion>
      <AccordionItem value="q-1">
        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
        <AccordionContent>Click "Forgot password" on the sign-in page.</AccordionContent>
      </AccordionItem>
    </Accordion>
  </CardContent>
</Card>
```

---

_Generated from `apps/web/src/content/accordion/meta.ts`. Do not edit directly._


---

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


---

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


---

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


---

# Badge

> A compact status or label chip.

A compact status or label chip. Six variants cover the common semantic roles — confirmation, default labels, low-emphasis categories, metadata, errors, and secondary brand highlights — and two sizes fit either a form row (md) or a dense list (sm). Badge is purely visual: it is not focusable and not interactive by default.

## Import

```tsx

import { Badge, badgeStyles } from '@bilazo/kito/components/badge'

```

## When to use

- Show the current status of a record — active, pending, failed, overdue, archived.

- Label a category or level that a row belongs to (e.g. "Intermediate", "Pro plan").

- Show a small count next to a label — unread items, active members, filters applied.

- Highlight a feature or achievement — "New", "Beta", "Featured".

- Mark the current filter or tag on a list item, when the badge itself is not clickable. For a clickable chip, wrap it in a `Button`.

## When NOT to use

- As a clickable filter or dismissible tag — wrap the badge inside a `Button` instead of adding `onClick` to the badge. A bare span has no focus state and no keyboard handling.

- For a link to a tag page — use `render={<a/>}` on the badge so it stays a real anchor. Do not put an `onClick` on a bare span.

- As a substitute for a primary action — use `Button`. A badge that does the work of a button confuses both screen readers and users.

- For a status that carries the only meaning of a row — pair it with a visible label ("Status: Failed"). Colored dots and colored text alone are not accessible.

- As a loading indicator that replaces real progress UI — use `Skeleton` for placeholders or `Progress` for measurable work.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'outline' \| 'destructive' \| 'highlight'` | `'secondary'` | Visual style. `primary` for confirmed / active states. `secondary` for default labels. `soft` for low-emphasis categories. `outline` for counts and metadata. `destructive` for errors and overdue states. `highlight` for secondary brand and achievements. |
| `size` | `'sm' \| 'md'` | `'md'` | Controls height and font size. `md` is 20px tall with 12px text, sized for a form row. `sm` is 16px tall with 10px text, sized for a dense list or a table cell. |
| `render` | `ReactElement` | — | Render the badge as a different element. Pass an `<a>` to make it a real link (the badge styling is preserved). Do not pass a `<button>`: for a clickable chip, wrap a `Button` around the badge instead — the badge has no focus state. |
| `className` | `string` | — | Extra classes. Merged with the variant classes via `cn()`. |

`badgeStyles` is also exported — a cva output that returns the class string without rendering a span. Use it to style your own element (a `Link`, a custom chip) with the same visual treatment. All native `<span>` attributes (`id`, `data-*`, `aria-*`) are forwarded to the underlying element.

## Composition

### Status row

Common statuses as badges. Pair each badge with visible text — a colored badge alone does not convey state to screen readers or color-blind users.

```tsx
import { Badge } from '@bilazo/kito/components/badge'

<div className="flex gap-2">
  <Badge variant="primary">Active</Badge>
  <Badge variant="soft">Pending</Badge>
  <Badge variant="outline">Draft</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>
```

### With an icon

Pass an inline SVG as a child. Non-sized icons inherit `size-3` from the badge.

```tsx
import { Check } from 'lucide-react'

<Badge variant="primary">
  <Check />
  Verified
</Badge>
```

### As a link

Render the badge as an anchor to make it a real link. Do not put an onClick on a span — the badge has no focus state.

```tsx
import { Link } from '@tanstack/react-router'

<Badge render={<Link to="/tags/react" />} variant="outline">
  React
</Badge>
```

### Clickable chip

For a clickable filter or dismissible tag, wrap a `Button` around a badge. The button provides the focus state and keyboard handling; the badge provides the visual.

```tsx
<Button variant="ghost" size="sm" className="h-auto gap-1 rounded-full px-2 py-0.5">
  React
  <Badge variant="soft" size="sm">×</Badge>
</Button>
```

### Small size for dense lists

Use `size="sm"` inside a table row or a compact list. Pair with `variant="outline"` to stay low-emphasis.

```tsx
<Badge size="sm" variant="outline">3</Badge>
```

---

_Generated from `apps/web/src/content/badge/meta.ts`. Do not edit directly._


---

# Button

> A pressable action element.

A pressable action element. Use Button to trigger actions (submit, save, delete) and to render router links that look like buttons. Supports a loading state, full-width layouts, six sizes, and seven visual variants. Framework-agnostic: works in Next.js, React Router, TanStack Router, or plain React.

## Import

```tsx

import { Button, buttonVariants } from '@bilazo/kito/components/button'

```

## When to use

- Trigger an action: submit a form, save a change, delete a record.

- Show a loading state during an async action — the label fades, a spinner appears, and the button stays focusable.

- Render a router link with button styling via `buttonVariants()`.

- Place an icon-only action inside a toolbar or table row using `size="icon"`.

## When NOT to use

- Navigation between pages — use your router `<Link>` with `buttonVariants()`. Do not use `<Button render={<a/>}>`: Base UI forces `role="button"` on the anchor, which breaks Cmd/Ctrl-click and right-click "Open in new tab".

- On/off state — use `Switch` or `Checkbox`.

- A list of options the user picks one from — use `Select` or `Combobox`.

- A list of commands — use `Menu`.

- Icon-only buttons without an `aria-label` — screen readers announce nothing.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | `'primary'` | Visual style. `primary` is the main action of a screen. `secondary` pairs with it. `soft` is brand-tinted and low-emphasis. `outline` is transparent with a border. `ghost` has no chrome — for toolbars. `destructive` is for irreversible actions. `link` renders as inline text. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon-sm' \| 'icon' \| 'icon-lg'` | `'md'` | Controls height and horizontal padding. `sm`, `md`, `lg` are text buttons; `icon-sm`, `icon`, `icon-lg` are square buttons for a single icon. |
| `fullWidth` | `boolean` | `false` | Span the full width of the parent. |
| `loading` | `boolean` | `false` | Disables the button, hides the label visually (keeping its width), and shows a spinner. Sets `aria-busy` and keeps the button focusable so keyboard users are not dropped from the tab order. |
| `render` | `ReactElement` | — | Render as a different element. Do not use this for a navigation link — use `buttonVariants()` on your router `<Link>` instead. |
| `disabled` | `boolean` | `false` | Block interaction. Uses the native `disabled` attribute unless `loading` is also true. |
| `nativeButton` | `boolean` | `true` | Set to `false` when the underlying element is not a `<button>` (e.g. `render={<div/>}`). Base UI needs this to apply the correct keyboard behaviour. |
| `focusableWhenDisabled` | `boolean` | — | Keep the button focusable while disabled. Enabled automatically when `loading` is true. |
| `className` | `string` | — | Extra classes. Merged with the variant classes via `cn()`. |

All native `<button>` attributes (`id`, `type`, `onClick`, `aria-*`, `data-*`) are forwarded to the underlying element. `buttonVariants({ variant, size, fullWidth })` returns the class string without rendering a button — use it to style a router `<Link>` or a plain `<a>`.

## Composition

### With an icon

```tsx
<Button>
  <Plus />
  New item
</Button>
```

### Loading state

```tsx
<Button loading>Saving…</Button>
```

### As a router link

Use `buttonVariants()` — do not use `render={<a/>}`.

```tsx
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@bilazo/kito/components/button'

<Link to="/dashboard" className={buttonVariants({ variant: 'primary' })}>
  Dashboard
</Link>
```

### Icon-only

Always pass `aria-label`.

```tsx
<Button size="icon" aria-label="Add item">
  <Plus />
</Button>
```

---

_Generated from `apps/web/src/content/button/meta.ts`. Do not edit directly._


---

# Button Group

> A container that groups related buttons together with consistent styling.

A container that groups related buttons into a single visual unit. Adjacent buttons share a border, the group rounds only at its two outer edges, and focus rings are lifted above siblings so they are not clipped. Uses logical properties throughout — `rounded-s-lg` / `rounded-e-lg` on the outer edges, `border-s-0` on non-first children — so the whole group flips with the page direction without any per-component RTL code. Pair with `ButtonGroupText` for a label that matches the button’s shape, and `ButtonGroupSeparator` for a split-button pattern. Use `ButtonGroup` when grouping buttons that **perform an action**; for buttons that **toggle a state**, use `ToggleGroup` (not built yet).

## Import

```tsx

import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants } from '@bilazo/kito/components/button-group'

```

## When to use

- Group related action buttons into a single control — alignment, zoom, formatting — so they read as one cluster rather than three separate buttons.

- A split-button pattern — a primary action followed by a separator and a smaller menu trigger (Save + Save Options).

- A search bar — an `Input` and a submit button side by side, sharing one border and one rounded shape.

- A counter or stepper — two icon buttons stacked vertically, sharing a top/bottom border.

- A toolbar where several button clusters sit next to each other — nest a `ButtonGroup` inside another to create visual clusters with a small gap.

- A pill group where each button in the group is a different action but they belong to the same task — Backup, Report, Snooze.

- A pair of buttons that should not be mistaken for two unrelated controls — the outer shape (rounded at the ends, straight in the middle) makes the relationship obvious.

## When NOT to use

- For a set of buttons that toggles a state (alignment, text style, view mode) — use `ToggleGroup` (not built yet). A toggle exposes `aria-pressed` on each button; a `ButtonGroup` does not, so a state-toggling group needs the toggle semantics.

- For a single button — a group of one is a button with extra DOM. Use `Button` directly.

- For navigation links that should stay in their own tab order — `role="group"` implies a related set of controls; a nav strip is a `<nav>` with `role="menubar"` or a plain list of links.

- For a group of unrelated buttons that happen to sit next to each other — use a flex row with `gap-2`. The shared border of a `ButtonGroup` says "these belong together"; two unrelated buttons should not.

- As a replacement for a `Menu` — a `ButtonGroup` of three menu items is a menu in disguise; it loses the menu’s keyboard navigation (arrow keys, typeahead, Escape) and role.

- Without an `aria-label` on icon-only groups — a group of icon buttons with no visible label is announced as "group" with no context. Add `aria-label` or `aria-labelledby`.

- For a group with mixed layouts — a `ButtonGroup` expects its children to be the same `size` (or it looks uneven). Mix `sm` and `lg` buttons in a group and the shared borders misalign.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout of the buttons. `horizontal` stacks them in a row — the group rounds the start and end edges (`rounded-s-lg` / `rounded-e-lg`) and strips the start border on every child after the first. `vertical` stacks them in a column — the group rounds the top and bottom edges and strips the top border on every child after the first. Both orientations use logical properties where direction matters, so the visual flips correctly in RTL. `ButtonGroup` prop. |
| `className` | `string` | — | Extra classes on any part. For `ButtonGroup`, useful for a `w-fit` versus `w-full` override, or a `h-fit` on a vertical group so it does not stretch to fill its parent. For `ButtonGroupText`, useful for a wider text slot or a different background. For `ButtonGroupSeparator`, useful for a different height/width or margin. |
| `render` | `ReactElement` | — | Render `ButtonGroupText` as a different element. Pass `render={<Label htmlFor="…" />}` to make it a real `<label>` for an adjacent input. Base UI’s `useRender` merges the component’s `data-slot` and className with the render’s props, so the resulting element keeps both the visual styling and the semantic role of the target. `ButtonGroupText` prop. |

Three components plus one helper compose. `ButtonGroup` renders a `<div role="group">` with `data-slot="button-group"` and `data-orientation`. It uses `items-stretch` so every button matches the group’s cross-axis size, `*:focus-visible:relative *:focus-visible:z-10` so a focused button’s ring is not clipped by its neighbors, `has-[>[data-slot=button-group]]:gap-2` so nested groups get a gap, `[&>input]:flex-1` so an `Input` fills the remaining width, and `[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit` so a `Select` trigger without an explicit width shrinks to fit. `ButtonGroupText` uses `useRender` — a plain `<div>` by default, or any element passed via `render`; pass a `<Label htmlFor="…" />` to make it a real label. `ButtonGroupSeparator` reuses `Separator` with `orientation="vertical"` (default) or `"horizontal"` — it overrides the separator’s `bg-border` with `bg-input` for a more visible divider, and relies on the group’s `items-stretch` so it fills the row (vertical separator) or column (horizontal separator). `buttonGroupVariants` is the exported cva output, so consumers can style their own element with the same look. The rounded-corner logic uses **logical properties** for horizontal (`rounded-s-lg` on first, `rounded-e-lg` on last, `rounded-none` on the middle) so it flips correctly in RTL — a physical `rounded-l` / `rounded-r` implementation would invert in RTL and look wrong. Vertical uses physical `rounded-t` / `rounded-b` because top and bottom are direction-agnostic. Separators are decorative by default (`decorative={true}` on Kito’s Separator) — no `role="separator"` inside a `role="group"`, which is correct: the group already communicates the relationship, and a decorative separator does not need a semantic role.

## Composition

### Basic action group

The canonical pattern: two or three buttons side by side, sharing one border and one rounded outer shape. Give the group an `aria-label` so screen readers announce the group’s purpose.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'

<ButtonGroup aria-label="Alignment">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

### Split button

A primary action followed by a `ButtonGroupSeparator` and a smaller menu trigger. Use `variant="outline"` on both to keep the shared border, or `variant="primary"` on both — do not mix, the shared border breaks.

```tsx
import { ButtonGroup, ButtonGroupSeparator } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'
import { ChevronDown } from 'lucide-react'

<ButtonGroup aria-label="Save">
  <Button variant="primary">Save</Button>
  <ButtonGroupSeparator />
  <Button variant="primary" size="icon" aria-label="More save options">
    <ChevronDown />
  </Button>
</ButtonGroup>
```

### Search bar — input + button

An `Input` as a direct child flexes to fill the remaining width. The button shares the group’s border and rounding, so the pair reads as one search bar rather than two separate controls.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'
import { Input } from '@bilazo/kito/components/input'
import { Search } from 'lucide-react'

<ButtonGroup className="w-full max-w-md" aria-label="Search">
  <Input placeholder="Search…" aria-label="Search query" />
  <Button variant="outline" aria-label="Search">
    <Search />
  </Button>
</ButtonGroup>
```

### Vertical — stepper

Two icon buttons stacked vertically, sharing a top/bottom border. Give the group `className="h-fit"` so it does not stretch to fill its parent.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'
import { Minus, Plus } from 'lucide-react'

<ButtonGroup orientation="vertical" className="h-fit" aria-label="Counter">
  <Button variant="outline" size="icon" aria-label="Increment">
    <Plus />
  </Button>
  <Button variant="outline" size="icon" aria-label="Decrement">
    <Minus />
  </Button>
</ButtonGroup>
```

### Nested groups

Nest a `ButtonGroup` inside another to create two visual clusters with a small gap between them. `has-[>[data-slot=button-group]]:gap-2` adds the gap automatically — no extra spacing class needed on the parent.

```tsx
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Button } from '@bilazo/kito/components/button'

<ButtonGroup aria-label="Formatting">
  <ButtonGroup aria-label="Text style">
    <Button variant="outline" size="icon" aria-label="Bold">B</Button>
    <Button variant="outline" size="icon" aria-label="Italic">I</Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Actions">
    <Button variant="outline">Copy</Button>
    <Button variant="outline">Paste</Button>
  </ButtonGroup>
</ButtonGroup>
```

---

_Generated from `apps/web/src/content/button-group/meta.ts`. Do not edit directly._


---

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


---

# Checkbox

> A checkbox with checked, unchecked, and indeterminate states.

A checkbox with unchecked, checked, and indeterminate states. Base UI drives all states via `data-*` attributes on the root, so the styling stays in sync even when the value is controlled from outside. The visible box is the root; Base UI renders a hidden `<input>` behind it for form participation and label association. `sm` (16px) fits dense tables; `md` (20px) is the default. Pass any children to replace the default check/minus glyph with your own icon. The root carries a transparent `after` pseudo-element that extends the click area to a 44×44 WCAG AAA touch target without changing the visual footprint.

## Import

```tsx

import { Checkbox } from '@bilazo/kito/components/checkbox'

```

## When to use

- Collect a yes/no choice from the user — accept terms, enable a setting, remember this option.

- Select zero or more options from a short, visible list — email/SMS/push notification preferences.

- As the parent in a "select all" group — pass `indeterminate` alongside `checked` to show a mixed state when only some children are selected.

- Inside a `<Field orientation="horizontal">` when the row needs a visible label and a description — Base UI wires the label to the control automatically.

- When the choice should be reversible and low-commitment — a checkbox that can be unchecked with one click, unlike a `Switch` which reads as "on" and often implies an immediate effect.

- For filtering or multi-select from a fixed list where the options fit in the page — `Select` and `Combobox` hide the options behind a trigger; a checkbox list keeps them visible.

## When NOT to use

- For a single binary toggle that reads as "on/off" with immediate effect — use `Switch`. A checkbox implies a submission form; a switch implies an instant setting change.

- For choosing exactly one option from a list — use `Radio`. Checkboxes allow multiple selections; a user who checks two options when only one is valid is a bug waiting to happen.

- For a choice from many options where the list is long — use `Select` or `Combobox`. A long checkbox list dominates the page.

- As an action button ("Continue", "Delete") — use `Button`. A checkbox that triggers an action blurs the line between choice and command.

- As the only label of the control — every checkbox needs an accessible name. Pair it with a `Label` via `htmlFor`, or pass `aria-label`. A bare checkbox is announced as "checkbox" with no context.

- As the parent checkbox of a large recursive tree — a deep tree needs a dedicated tree-view component with proper keyboard navigation and ARIA states. Checkbox is for one level of parent/child at most.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the box. `sm` is `size-4` (16px) — fits dense tables. `md` is `size-5` (20px) — the default, lines up with the small icon sizes of `Button`. The size also drives the SVG icon size inside the indicator via `[&_svg]:size-3` / `[&_svg]:size-3.5`. `Checkbox` prop. |
| `indeterminate` | `boolean` | `false` | Renders the "partially selected" state — a minus glyph instead of a check, and `aria-checked="mixed"` on the root. Separate from `checked`: pass both to render a parent-of-mixed-children (e.g. a "select all" checkbox when only some children are on). Inherited from Base UI’s `Checkbox.Root`; Kito sets the default to `false` in the destructure. |
| `checked` | `boolean` | — | Controlled checked state. Pass with `onCheckedChange` for a controlled checkbox. Omit both for an uncontrolled one — Base UI tracks its own state. Inherited from Base UI’s `Checkbox.Root`. |
| `onCheckedChange` | `(checked: boolean, eventDetails: ...) => void` | — | Change callback. Receives the new boolean value directly — no `event.target.checked` unwrap needed. Fires on both user clicks and programmatic changes. Inherited from Base UI’s `Checkbox.Root`. |
| `children` | `ReactNode` | — | Custom indicator icon. When omitted, the checkbox renders an internal check glyph (or a minus glyph when `indeterminate`). The children mount only when the checkbox is on — Base UI unmounts the `Indicator` while unchecked, so a custom icon passed here is not in the DOM until the box is checked. Size is controlled by the parent indicator’s `[&_svg]:size-*` selector, so a `size-*` class on the icon loses to the parent rule. |
| `className` | `string` | — | Extra classes on the box. Merged with the base classes via `cn()`. Use it to override the checked fill (`data-checked:bg-destructive` + `data-checked:border-destructive` for a "favorite" toggle), or to change the border color for a per-instance visual. |

Only `Checkbox` is exported as a value; `CheckIcon` and `MinusIcon` are internal (not exported — Kito’s checkbox does not depend on any icon library; consumers pass their own icon as `children`). The underlying element is Base UI’s `Checkbox.Root` with a hidden `<input>` rendered automatically for form participation and `Label`’s `htmlFor` association. All native and Base UI props (`id`, `name`, `value`, `disabled`, `required`, `checked`, `defaultChecked`, `onCheckedChange`, `aria-invalid`, `data-*`) are forwarded untouched via `CheckboxBaseUiProps`. Base UI sets `aria-checked="mixed"` on the root when `indeterminate` is `true`, and unmounts the internal `Indicator` while the box is unchecked — this is intentional, and passing `children` for a custom icon works only in the checked/indeterminate states. The `after` pseudo-element (`-inset-x-3 -inset-y-3`) extends the click area to a 44×44 WCAG AAA touch target without changing the visual footprint; this is transparent and does not affect layout, but in dense layouts it can overlap the hit area of an adjacent control — add `gap-3` or larger between checkboxes in a tight group.

## Composition

### With a Label

The minimum for an accessible checkbox: pair the box with a `Label` via matching `htmlFor` / `id`. Clicking the label toggles the checkbox, and screen readers announce them as one control.

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'

<div className="flex items-center gap-2">
  <Checkbox id="tos" />
  <Label htmlFor="tos">Accept the terms and conditions</Label>
</div>
```

### Tri-state group with "select all"

The parent checkbox passes both `checked` and `indeterminate` — `indeterminate` when some children are selected but not all. The children are a plain map over the options; the parent’s `onCheckedChange` toggles all of them.

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'
import { useState } from 'react'

const OPTIONS = ['Email', 'SMS', 'Push'] as const

export function Group() {
  const [selected, setSelected] = useState<string[]>(['Email'])
  const allChecked = selected.length === OPTIONS.length
  const anyChecked = selected.length > 0

  function toggle(option: string) {
    setSelected((current) =>
      current.includes(option) ? current.filter((x) => x !== option) : [...current, option],
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <Checkbox
          id="all"
          checked={allChecked}
          indeterminate={!allChecked && anyChecked}
          onCheckedChange={() => setSelected(allChecked ? [] : [...OPTIONS])}
        />
        <Label htmlFor="all" className="font-semibold">
          All channels
        </Label>
      </div>
      {OPTIONS.map((option) => (
        <div key={option} className="flex items-center gap-2 ps-1">
          <Checkbox
            id={`opt-${option}`}
            checked={selected.includes(option)}
            onCheckedChange={() => toggle(option)}
          />
          <Label htmlFor={`opt-${option}`}>{option}</Label>
        </div>
      ))}
    </div>
  )
}
```

### Inside a Field

For a row of checkboxes with a visible label and description, wrap in `Field orientation="horizontal"` — Base UI wires the label to the control automatically, so `htmlFor` is not needed.

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@bilazo/kito/components/field'

<FieldGroup className="w-full max-w-md">
  <Field orientation="horizontal">
    <Checkbox id="f-news" />
    <FieldContent>
      <FieldLabel htmlFor="f-news">Product updates</FieldLabel>
      <FieldDescription>Occasional announcements about new features.</FieldDescription>
    </FieldContent>
  </Field>
</FieldGroup>
```

### Custom indicator icon

Pass any children to replace the default check/minus glyph. The children mount only when the checkbox is checked — Base UI unmounts the `Indicator` while unchecked. Override the fill via `className` on the root (the internal indicator inherits `text-current`).

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'
import { Heart } from 'lucide-react'

<div className="flex items-center gap-2">
  <Checkbox id="fav" className="data-checked:border-destructive data-checked:bg-destructive">
    <Heart className="fill-current" />
  </Checkbox>
  <Label htmlFor="fav">Add to favorites</Label>
</div>
```

### Sizes

`sm` fits dense tables; `md` is the default. Both use the same data attributes, so a controlled checkbox behaves identically at either size.

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'

<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="size-sm" size="sm" />
    <Label htmlFor="size-sm">Small</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="size-md" size="md" />
    <Label htmlFor="size-md">Medium</Label>
  </div>
</div>
```

---

_Generated from `apps/web/src/content/checkbox/meta.ts`. Do not edit directly._


---

# Combobox

> A searchable dropdown — a text input that filters a list as you type.

A searchable dropdown — a text input that filters a list as you type. Pass `items` to the root as `{ value, label }[]`; Base UI filters the list against each label and displays the selected label in the input automatically. The input is also the trigger — there is no separate button — and it wraps Base UI’s `InputGroup` so the popup anchors to the whole control (input + clear + icon), not the narrower `<input>` inside. Two API gotchas worth learning up front: every `ComboboxItem` takes the **whole item object** as its `value` prop (not `item.value`), and `ComboboxList`’s children must be a **function** — Base UI calls it once per filtered item. For a short fixed list with no typing, prefer `Select`.

## Import

```tsx

import { Combobox, ComboboxInput, ComboboxPopup, ComboboxList, ComboboxItem, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxSeparator } from '@bilazo/kito/components/combobox'

```

## When to use

- Choose one option from a longer list — ten or more items — where the user knows the label they want and typing it is faster than scrolling.

- A country / language / timezone picker with dozens of options — the filter input is the primary affordance.

- A search-as-you-type field where selection and query are the same gesture — pick from results as you type.

- An autocomplete field with grouped results — `ComboboxGroup` / `ComboboxGroupLabel` for headings, `ComboboxSeparator` between sections.

- A form control that needs a visible selected value after the popup closes — the input shows the selected label, like a native `<select>`.

- When the empty state matters — `ComboboxEmpty` shows the no-results message automatically when the filtered list has no items; no manual visibility state is needed.

## When NOT to use

- For a short fixed list (under ~10 options) with no typing — use `Select`. `Combobox` adds an input, a filter state, and a clear button that a fixed list does not need; `Select` behaves the way a native `<select>` does with the keyboard.

- For multi-select — use a `Combobox` with `multiple` (Base UI supports it), but do not fake it with a single-value combobox. Users expect multi-select chips, not a single label.

- For choosing between two or three options — use `Radio` or `SegmentedControl`. A combobox for three options hides them behind a click and a keystroke.

- For navigation between pages — use a `Menu` with `Link` items, or a real page. A combobox whose `onValueChange` calls `router.push` is a menu in disguise and loses the router’s prefetching.

- Without an accessible name — every combobox needs an `aria-label` or a `Field` / `Label` pairing. A bare input is announced as "combobox" with no context.

- For free-text input with no list — use `Input`. The dropdown and filter are overhead if there is nothing to filter.

- As the only way to enter a value that must match the list exactly — use `Select`. A combobox lets the user type anything; if invalid input is not handled, the form submits a value the app does not expect.

- For a numeric picker (a range, a number from 1 to 100) — use `Slider` or `Input type="number"`. A combobox of numbers is a dropdown of numbers; scrolling through is slower than dragging.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly { value: string; label: ReactNode }[] \| Record<string, ReactNode>` | — | The option list. Base UI filters it as the user types and matches against each item’s `label`. `ComboboxInput` displays the selected item’s label — no manual lookup is needed. Inherited from Base UI’s `Combobox.Root`. `Combobox` prop. |
| `value` | `unknown` | — | Controlled value. Pass with `onValueChange` for a controlled combobox; omit both for an uncontrolled one (then use `defaultValue`). The type is generic — a strongly-typed item shape survives the composed props. Inherited from Base UI’s `Combobox.Root`. `Combobox` prop. |
| `onValueChange` | `(value: unknown, eventDetails: ...) => void` | — | Change callback. Fires when the user selects an item; receives the whole item object (not `item.value`). Inherited from Base UI’s `Combobox.Root`. `Combobox` prop. |
| `defaultValue` | `unknown` | — | Initial value for an uncontrolled combobox. Ignored when `value` is passed. Inherited from Base UI’s `Combobox.Root`. `Combobox` prop. |
| `size` | `'sm' \| 'md'` | `'md'` | Height of the input group. `sm` is `h-(--control-sm)` (32px); `md` is `h-(--control-md)` (40px). Shares the `--control-*` tokens with `Input` and `SelectTrigger` — a combobox and an input sit in the same row at matching heights. `ComboboxInput` prop. |
| `showClear` | `boolean` | `true` | Render a clear (×) button at the end side when the input has content. The button hides itself when the input is empty — no manual state is needed. `ComboboxInput` prop. |
| `showTrigger` | `boolean` | `true` | Render a chevron icon at the end side. Purely decorative — the popup opens on input focus or click, not on the chevron. `ComboboxInput` prop. |
| `sideOffset` | `number` | `6` | Gap between the input group and the popup, in pixels. `ComboboxPopup` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Horizontal alignment of the popup relative to the input group. Kito defaults to `start`, matching `Select`. `ComboboxPopup` prop. |
| `placeholder` | `string` | — | Shown in the input when nothing is selected. Rendered in `text-muted-foreground` via `placeholder:text-muted-foreground`. `ComboboxInput` prop. |
| `className` | `string` | — | Extra classes on any part. For `ComboboxInput`, useful for a width cap (`max-w-xs`); for `ComboboxPopup`, a `w-(--anchor-width)` override or a fixed width. |

Nine components compose. `Combobox` (root) renders no DOM — it forwards to Base UI’s `Combobox.Root` and manages the value, open state, and filtering. `ComboboxInput` renders a `BaseCombobox.InputGroup` (the popup’s anchor) containing a `BaseCombobox.Input` (the text field + `role="combobox"`) plus an optional clear button and an optional chevron icon. `ComboboxPopup` is portaled and its width matches the input group (`min-w-(--anchor-width)`). `ComboboxList`’s **children must be a function** (`{(item) => <ComboboxItem …/>}`) — Base UI calls it once per matching item; static children bypass filtering and only show if the list is short and always visible. Every `ComboboxItem` takes the **whole item object** as its `value` prop (`value={item}`, not `value={item.value}`) — Base UI uses the object’s `label` for the input and its `value` for the form submission, and a mismatch breaks both. `ComboboxEmpty` follows Kito’s `Empty` pattern: hidden by default (`hidden group-data-empty/combobox-popup:block`), revealed only when the popup gets `data-empty` — this removes the blank padded row that Base UI’s `Empty` would otherwise leave, and prevents the empty element’s `role="status"` from interrupting keyboard navigation. `ComboboxGroup` / `ComboboxGroupLabel` / `ComboboxSeparator` are pass-through wrappers. `inputGroupStyles`, `ChevronIcon`, `CheckIcon`, and `XIcon` are internal. **Portal gotcha:** the popup is portaled, so `dir="rtl"` on an ancestor wrapper does not reach it — the items’ logical padding (`ps-3 pe-8`) and the checkmark’s `inset-e-2` would resolve to the wrong side without a `dir` ancestor. Pass `dir="rtl"` on `ComboboxPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup` / `SelectPopup`).

## Composition

### Basic

The canonical pattern: `Combobox` with `items`, a `ComboboxInput` with a placeholder, a `ComboboxPopup` with a `ComboboxList` and a `ComboboxEmpty`. Note two gotchas: `ComboboxList`’s children is a function of `item`, and each `ComboboxItem` takes `value={item}` (the whole object), not `item.value`.

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

<Combobox items={LANGUAGES}>
  <ComboboxInput placeholder="Search languages…" />
  <ComboboxPopup>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item.value} value={item}>
          {item.label}
        </ComboboxItem>
      )}
    </ComboboxList>
    <ComboboxEmpty>No languages found.</ComboboxEmpty>
  </ComboboxPopup>
</Combobox>
```

### Inside a Field

Wrap the `Combobox` in a `Field` with a `FieldLabel`. The input fills the field width, matching `Input` and `SelectTrigger`. Base UI wires the label to the input automatically.

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'
import { Field, FieldLabel } from '@bilazo/kito/components/field'

<Field name="language">
  <FieldLabel>Language</FieldLabel>
  <Combobox items={LANGUAGES}>
    <ComboboxInput placeholder="Search languages…" />
    <ComboboxPopup>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item.value} value={item}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
</Field>
```

### Grouped options

Use `ComboboxGroup` with `ComboboxGroupLabel` for a heading and `ComboboxSeparator` between groups. Groups still respect filtering — a group whose items are all filtered out hides itself.

```tsx
import {
  Combobox,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
} from '@bilazo/kito/components/combobox'

<Combobox items={ITEMS}>
  <ComboboxInput placeholder="Search languages…" />
  <ComboboxPopup>
    <ComboboxList>
      <ComboboxGroup>
        <ComboboxGroupLabel>European</ComboboxGroupLabel>
        <ComboboxItem value={ITEMS[0]}>English</ComboboxItem>
        <ComboboxItem value={ITEMS[1]}>French</ComboboxItem>
        <ComboboxItem value={ITEMS[2]}>German</ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup>
        <ComboboxGroupLabel>Middle Eastern</ComboboxGroupLabel>
        <ComboboxItem value={ITEMS[3]}>Persian</ComboboxItem>
        <ComboboxItem value={ITEMS[4]}>Arabic</ComboboxItem>
        <ComboboxItem value={ITEMS[5]}>Turkish</ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
```

### Controlled

Pass `value` and `onValueChange` to drive the selected item from outside. The type is generic — a strongly-typed item shape survives without a cast.

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'
import { useState } from 'react'

type Language = { value: string; label: string }

export function Controlled() {
  const [value, setValue] = useState<Language | null>(null)
  return (
    <Combobox
      items={LANGUAGES}
      value={value}
      onValueChange={(v) => setValue(v as Language | null)}
    >
      <ComboboxInput placeholder="Pick a language…" />
      <ComboboxPopup>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
```

### Empty state

`ComboboxEmpty` shows automatically when the filtered list has no items — you do not control its visibility. Base UI fills it only when nothing matches; the container is hidden by default via `group-data-empty/combobox-popup:block`, so it leaves no blank row.

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'

<Combobox items={CITIES}>
  <ComboboxInput placeholder="Type to search cities…" />
  <ComboboxPopup>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item.value} value={item}>
          {item.label}
        </ComboboxItem>
      )}
    </ComboboxList>
    <ComboboxEmpty>No cities match your search.</ComboboxEmpty>
  </ComboboxPopup>
</Combobox>
```

---

_Generated from `apps/web/src/content/combobox/meta.ts`. Do not edit directly._


---

# Context Menu

> A menu of actions triggered by right-click.

A menu of actions triggered by right-click. Shares its primitive with `Menu` — the same roving tabindex, arrow-key navigation, typeahead, and submenu opening — only the trigger differs: right-click opens the menu at the **pointer**, not below a button. The main popup opens at the cursor position, so it has no `side` or `align` props; only the submenu popup has them. Item types mirror `Menu` — `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup` + `ContextMenuRadioItem`, plus `ContextMenuGroup` / `ContextMenuGroupLabel` / `ContextMenuSeparator` / `ContextMenuShortcut` / `ContextMenuSub` for structure.

## Import

```tsx

import { ContextMenu, ContextMenuTrigger, ContextMenuPopup, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuGroup, ContextMenuGroupLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubPopup } from '@bilazo/kito/components/context-menu'

```

## When to use

- Actions on an object the user has already focused with a right-click — a file row, a table cell, an image thumbnail, a canvas element.

- A tree or list view where each node exposes contextual actions via right-click — rename, duplicate, delete.

- Rich content where a visible menu button would clutter the surface — a text editor, a board or canvas.

- File or media management — quick actions on a card or a tile that would otherwise need a hover menu.

- An app that mimics the OS convention for right-click — desktop-style or editor-style interfaces where users expect a context menu on secondary click.

## When NOT to use

- For a menu triggered by a visible button — use `Menu`. A `ContextMenu` requires a right-click, which touch users cannot perform.

- On touch devices as the only way to reach actions — mobile has no right-click. Pair it with a long-press or a visible overflow menu (`Menu` with a "⋯" trigger).

- For primary navigation — use `NavigationMenu` or a real nav strip. A context menu hides behind a gesture and cannot be the primary path.

- For a menu whose items are links to routes — use `Menu` with `MenuLinkItem`. A right-click menu on a link is confusing; use the browser’s native link menu.

- As a replacement for a toolbar — visible actions beat hidden ones. A context menu is supplementary; the primary actions should be discoverable.

- For destructive actions without a confirmation — a right-click Delete with no undo is a foot-gun. Pair destructive context items with a `Dialog` confirmation or an undo `Toast`.

- Without a right-click affordance on the region — some users do not try right-click. If the actions are essential, expose them with a visible button too.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dir` | `'ltr' \| 'rtl'` | — | Direction on the popup subtree. The popup is **portaled to `document.body`**, so it does not inherit `dir` from any wrapper — pass it here when the page’s `<html dir="rtl">` is not set. Also reaches the `Positioner` so a submenu with `align="start"` aligns at the reading-start edge (right in RTL). Same portal exception as `MenuPopup` / `PopoverPopup` / `SelectPopup` / `ComboboxPopup` / `SheetPopup` / `DialogPopup` / `DrawerPopup`. `ContextMenuPopup` / `ContextMenuSubPopup` prop. |
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual treatment. `destructive` renders the item in the destructive color — use for irreversible actions like Delete. The item also tints its background (`bg-destructive/10`) on highlight. `ContextMenuItem` prop. |
| `inset` | `boolean` | `false` | Adds `ps-8` (a start padding) so a plain item’s text aligns with the label of a `ContextMenuCheckboxItem` or `ContextMenuRadioItem` — those carry an indicator at the start, and without `inset` the plain items sit off-grid. `ContextMenuItem` prop. |
| `closeOnClick` | `boolean` | — | Whether the menu closes when the item is activated. `ContextMenuCheckboxItem` defaults to `false` (a checkbox group is multi-select — reopening the menu per toggle is the wrong trade). `ContextMenuRadioItem` defaults to `true` (a radio is single-select — leaving the menu open strands the user). Inherited from Base UI’s primitive. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right' (ContextMenuSubPopup)` | Side of the parent item to place the **submenu** on. Sides are **physical** — `left` / `right` do not flip in RTL. The default is `right` (assumes LTR); in an RTL page pass `side="left"` — the chevron flips automatically via `rtl:-scale-x-100` to match. The **main** context menu popup has no `side` prop — it opens at the cursor. `ContextMenuSubPopup` prop. |
| `sideOffset` | `number` | `4` | Gap between the parent item and the submenu, in pixels. `ContextMenuSubPopup` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment of the submenu along the cross axis. `start` anchors at the parent item’s start edge. `ContextMenuSubPopup` prop. |
| `alignOffset` | `number` | `-4` | Offset along the alignment axis. `-4` lifts the submenu so its first item lines up with the parent item’s text rather than its frame. `ContextMenuSubPopup` prop. |
| `className` | `string` | — | Extra classes on any part. For `ContextMenuTrigger`, useful for sizing the right-click area (`h-32`, `p-6`). For `ContextMenuPopup`, useful for a fixed width (`w-48`) — the default is `min-w-40` with content-driven growth. |

Fourteen components compose. `ContextMenu` (root) forwards to Base UI’s `ContextMenu.Root` — it renders no DOM of its own. `ContextMenuTrigger` renders a `BaseContextMenu.Trigger` (usually a `<div>`) with `select-none` baked in so right-clicking does not start a text selection under the menu. `ContextMenuPopup` is portaled to `document.body` and **opens at the cursor** — it has no `side` / `align` props because it follows the pointer, not a trigger. `ContextMenuSubPopup` **does** have `side` / `align` / `sideOffset` / `alignOffset` because the submenu anchors to a parent item. The item types mirror `Menu` exactly — `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup` + `ContextMenuRadioItem` — and all reuse `menuItemStyles` from `lib/menu-shared.tsx`, so the highlight, hover, disabled, and destructive states are the same across Menu, ContextMenu, and the future Menubar. The checkbox and radio indicators wrap Base UI’s `CheckboxItemIndicator` / `RadioItemIndicator` in a positioning `<span>` — Base UI’s indicators toggle their own `display`, so putting `flex` on them directly would keep them permanently visible. `ContextMenuShortcut` uses `ms-auto` (logical) so the hint sits at the reading-end side in both LTR and RTL. `ContextMenuSubTrigger`’s chevron flips via `rtl:-scale-x-100` to match the `side="left"` convention for RTL submenus. **No `LinkItem`** — a right-click menu on a link is confusing, and Base UI’s `ContextMenu` has no `LinkItem` primitive. For a menu with links, use `Menu` + `MenuLinkItem`. `ContextMenuGroup`, `ContextMenuGroupLabel`, `ContextMenuSeparator`, and `ContextMenuSub` are pass-through wrappers. **Portal gotcha:** both popups are portaled, so `dir="rtl"` on an ancestor wrapper does not reach them — pass `dir="rtl"` on the popup directly. `menuPopupBase` and `menuItemStyles` live in `lib/menu-shared.tsx` and are shared with `Menu` (and the future `Menubar`). `ContextMenuSide`, `ContextMenuAlign`, and `ContextMenuItemVariant` are re-exported as type-only aliases from `menu-shared`.

## Composition

### Basic

The canonical pattern: wrap the area the menu applies to in `ContextMenuTrigger`, put a `ContextMenuPopup` with `ContextMenuItem` children. The menu opens at the cursor on right-click, closes on Escape or outside click.

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border">
    Right-click anywhere in this box
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuItem>Reload</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

### With icons and shortcuts

Item icons render at the start, `ContextMenuShortcut` at the end. The shortcut is decorative — the actual handler is wired elsewhere (a global keydown listener).

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { Copy, Pencil } from 'lucide-react'

<ContextMenu>
  <ContextMenuTrigger>Right-click</ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuItem>
      <Pencil />
      Rename
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Copy />
      Duplicate
      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

### Checkbox items — multi-select

`ContextMenuCheckboxItem` toggles one or many options and keeps the menu open (`closeOnClick: false` by default) — a checkbox group is multi-select.

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuPopup,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { useState } from 'react'

function ViewMenu() {
  const [showGrid, setShowGrid] = useState(true)
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right-click</ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show grid
        </ContextMenuCheckboxItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
```

### Submenu

`ContextMenuSub` / `ContextMenuSubTrigger` / `ContextMenuSubPopup` opens a nested menu on hover or keyboard activation. The default `side="right"` places it on the physical right of the parent item; in RTL, pass `side="left"` — the chevron flips automatically.

```tsx
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
} from '@bilazo/kito/components/context-menu'

<ContextMenuSub>
  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
  <ContextMenuSubPopup>
    <ContextMenuItem>Email</ContextMenuItem>
    <ContextMenuItem>Copy link</ContextMenuItem>
  </ContextMenuSubPopup>
</ContextMenuSub>
```

### With groups and shortcuts

Group related items with `ContextMenuGroup` + `ContextMenuGroupLabel`, and separate groups with `ContextMenuSeparator`. Shortcut hints on individual items complete the OS-style menu look.

```tsx
import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'

<ContextMenu>
  <ContextMenuTrigger>Right-click</ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuGroup>
      <ContextMenuGroupLabel>Edit</ContextMenuGroupLabel>
      <ContextMenuItem>
        Cut
        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Copy
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuPopup>
</ContextMenu>
```

---

_Generated from `apps/web/src/content/context-menu/meta.ts`. Do not edit directly._


---

# Dialog

> A centered modal for a focused task.

A centered modal for a focused task. Shares its primitive with `Sheet` — the same focus trapping, scroll locking, Escape-to-close, and outside-click-to-close behavior — only the shell differs: Dialog is centered, Sheet is anchored to an edge. `size` controls the maximum popup width (`sm` 24rem / `md` 32rem / `lg` 42rem). The popup is wrapped in a full-screen scroll container, so a dialog taller than the viewport is still fully reachable: the wrapper scrolls, not the popup. An animated close (×) button is rendered in the top-end corner by default; set `showCloseButton={false}` for confirmation dialogs where the footer actions are the only path.

## Import

```tsx

import { Dialog, DialogTrigger, DialogClose, DialogBackdrop, DialogPopup, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@bilazo/kito/components/dialog'

```

## When to use

- A blocking decision the user must acknowledge before continuing — a confirmation, a destructive action, a form submit that must not slip past.

- A focused task the user should complete or cancel — edit profile, create project, rename an item — where the page behind should not be interrupted but the task should.

- A short form that is easier to submit from a modal than a new route — a sign-in modal, a comment composer, a quick-add.

- A confirmation of an irreversible action — delete, archive, unfollow — with `showCloseButton={false}` so the footer actions are the only path.

- Content that must be legible on any viewport — the popup’s full-screen scroll wrapper keeps it centered on short content and reachable on tall content.

- A modal that needs a visible accessible name — `DialogTitle` becomes `aria-labelledby` on the popup automatically.

## When NOT to use

- For a side panel that leaves the page partially visible — use `Sheet`. A centered modal blocks the page; a sheet says "work on the side".

- For a navigation drawer on mobile — use `Sheet` with `side="start"` or `side="end"`. A centered dialog for navigation is a modal in disguise.

- For a transient, non-blocking notification — use `Toast`. A dialog blocks the page; a toast informs without blocking.

- For a full-page task that needs a URL — use a route. A dialog has no URL of its own, so two users cannot share a link to what is open in it.

- Without `DialogTitle` — every dialog needs an accessible name. Without one, screen readers announce "dialog" with no context and the user has no way to know what they are confirming. Base UI wires `DialogTitle` to `aria-labelledby` automatically.

- For nested dialogs more than two levels deep — Base UI supports nesting, but three stacked modals is a UX smell. Flatten the flow into one level.

- As the only confirmation of a save — pair the submit with an inline success state on the page, or a `Toast`. A dialog that closes on submit without feedback leaves the user unsure whether it worked.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Maximum popup width. `sm` is `max-w-sm` (24rem), `md` is `max-w-lg` (32rem), `lg` is `max-w-2xl` (42rem). Note the mapping — `md` resolves to Tailwind’s `max-w-lg`, not `max-w-md`, because the sizes were chosen for the popup’s visual rhythm, not its literal name. The popup is always at least `1rem` from the viewport edges on small screens (the outer wrapper’s `p-4`). |
| `showCloseButton` | `boolean` | `true` | Render a close (×) button in the top-end corner. Set to `false` for confirmation dialogs — the footer actions become the only path, which prevents accidental dismissal. The button uses `inset-e-3` (a logical property), so it flips to the correct corner in RTL. |
| `backdropClassName` | `string` | — | Extra classes for the backdrop. Use it for a one-off tint — for example, a destructive confirmation with a red overlay (`backdropClassName="bg-destructive/30"`) or a warning with amber. Merged with the base backdrop classes via `cn()`. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the dialog from outside (a store, a form submit result, a route param). Omit both for an uncontrolled dialog (then use `defaultOpen`). Inherited from Base UI’s `Dialog.Root`. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger, close button, Escape, and backdrop click. Inherited from Base UI’s `Dialog.Root`. |
| `modal` | `boolean` | `true` | Whether the dialog blocks interaction with the page behind it. `false` allows interacting with the page while the popup stays open — rare for a `Dialog`, useful for a non-modal command palette or tool window. Inherited from Base UI’s `Dialog.Root`. |
| `dir` | `'ltr' \| 'rtl'` | — | Explicit direction on the popup. The popup is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set (a localized preview, a Storybook demo). In a real Persian app, `<html dir="rtl">` covers it and this prop is not needed. Same gotcha as `SheetPopup`. |
| `className` | `string` | — | Extra classes on any part. Merged with the base classes via `cn()`. Commonly used on `DialogPopup` for a custom `max-w-*` or a per-instance min-height, or on `DialogFooter` when a destructive flow needs a different button alignment. |

Nine components compose. `Dialog` (root) renders no DOM of its own — it forwards to Base UI’s `Dialog.Root` and manages the open state. `DialogTrigger` and `DialogClose` are Base UI’s `Trigger`/`Close` with `data-slot`; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `DialogBackdrop` and `DialogPopup` are portaled to `document.body` — `DialogBackdrop` is rendered automatically by `DialogPopup`, and `DialogPopup` renders its children **plus** an optional close button (last in DOM, so it appears in the tab order after the footer). **Unlike Sheet, `Dialog` has no `DialogBody`** — the popup itself is padded (`p-6`) and the whole popup grows naturally on tall content; the outer wrapper (`fixed inset-0 overflow-y-auto` with `p-4 flex min-h-full items-center justify-center`) is what scrolls, not any inner region. This is the difference from Sheet’s padding-free popup with an internal `SheetBody`: a centered modal that grows is easier to read than a centered modal with its own scrollbar. `DialogHeader` and `DialogFooter` are plain `<div>`s with no padding of their own — the popup’s `p-6` provides the inset for everything inside. `DialogTitle` becomes `aria-labelledby` and `DialogDescription` becomes `aria-describedby` on the popup automatically. **Portal gotcha:** because the popup is portaled, `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir` on `DialogPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup`). `DialogSize` is internal to the module.

## Composition

### Basic

The canonical pattern: `Dialog` with a `DialogTrigger`, a `DialogPopup` with a `DialogHeader` (title + description) and a `DialogFooter` (actions). Every dialog needs a `DialogTitle` — it becomes the accessible name via `aria-labelledby`.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Changes are saved immediately.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### Confirmation for a destructive action

For an irreversible action, set `showCloseButton={false}` on the popup. The footer actions become the only path — no accidental Escape or corner-× dismissal. Pair the destructive action with `variant="destructive"` on its button.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Delete lesson</DialogTrigger>
  <DialogPopup showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Delete lesson 42?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. All progress and saved vocabulary will be lost.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### With a form

The dialog is a container — put any content inside. `Field` and `Input` work; the dialog does not intercept their state. Pair the submit with `DialogClose` on Cancel and a plain `Button` for the primary action.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

<Dialog>
  <DialogTrigger render={<Button />}>Create project</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Create project</DialogTitle>
      <DialogDescription>Give your project a name.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-4">
      <Field name="name">
        <FieldLabel>Project name</FieldLabel>
        <Input placeholder="My new project" />
      </Field>
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <Button>Create</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### Long content

The popup is wrapped in a full-screen scroll container. When the content is taller than the viewport, the **wrapper** scrolls — the popup grows naturally and stays centered on short content. Nothing gets clipped; no inner scrollbar is needed. For a long block of text, give it an explicit `max-h-*` to keep the footer in view (as this example does), or let the whole popup grow and rely on the wrapper’s scroll.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Terms of service</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Terms of service</DialogTitle>
      <DialogDescription>Scroll through to read the full text.</DialogDescription>
    </DialogHeader>
    <div className="max-h-64 overflow-y-auto text-sm text-muted-foreground">
      {/* long text */}
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Decline</DialogClose>
      <Button>Accept</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### Sizes

`sm`, `md`, and `lg` control the maximum popup width — 24rem, 32rem, and 42rem. The popup keeps at least `1rem` from the viewport edges on small screens.

```tsx
import { Dialog, DialogPopup } from '@bilazo/kito/components/dialog'

<DialogPopup size="sm">…</DialogPopup>
<DialogPopup size="md">…</DialogPopup>
<DialogPopup size="lg">…</DialogPopup>
```

---

_Generated from `apps/web/src/content/dialog/meta.ts`. Do not edit directly._


---

# Direction

> Sets the text direction (LTR or RTL) for a subtree.

Sets the text direction (ltr or rtl) for a subtree, and reads it back with `useDirection()`. Essential for RTL languages like Arabic, Hebrew, and Persian. Most apps set `dir` on the `<html>` element once and never think about direction again — DirectionProvider is for scoping direction to a portion of a page where the surrounding context is different.

## Import

```tsx

import { DirectionProvider, useDirection } from '@bilazo/kito/components/direction'

```

## When to use

- Scope RTL to a portion of a page inside an otherwise LTR app — a preview pane, an embedded widget in an RTL host, a docs page that demonstrates both directions.

- Provide direction context to Base UI components whose popups are portaled to `<body>` — the portal escapes the `dir` attribute on an ancestor container but keeps the React context, so DirectionProvider keeps the popup oriented correctly.

- Read the current direction in your own component via `useDirection()` without manually traversing `dir` attributes in the DOM.

## When NOT to use

- For a whole-app RTL layout — set `dir="rtl"` on `<html>` once. Every element and every Base UI portal picks it up from the DOM. DirectionProvider is redundant.

- For direction on a single element — use the HTML `dir` attribute on that element. A React provider is overkill.

- For a small inline fragment (a sentence, a single word) — use the HTML `dir` attribute directly.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction`* | `'ltr' \| 'rtl'` | — | The text direction applied to the subtree. Base UI components inside read it from React context. A DOM `dir` on a wrapper is still needed for CSS logical properties to flip — the provider only sets the React context. |
| `children`* | `React.ReactNode` | — | The content to render inside the provider. |

DirectionProvider does not render a DOM element — it only provides React context. To make CSS logical properties (`ps-*`, `me-*`, `text-start`) flip as well, also set `dir="rtl"` on a wrapping DOM element.

## Composition

### Scoped RTL in an LTR app

Wrap only the part that should flip. Pair with `dir="rtl"` on a DOM wrapper so both the React context and CSS logical properties flip.

```tsx
<DirectionProvider direction="rtl">
  <div dir="rtl">
    <PersianWidget />
  </div>
</DirectionProvider>
```

### Reading the current direction

Useful when a component needs to branch on direction for behavior, not just CSS.

```tsx
import { useDirection } from '@bilazo/kito/components/direction'

function MyComponent() {
  const direction = useDirection()
  return <div>Current: {direction}</div>
}
```

### Whole-app RTL

Set it once at the HTML level. No provider is needed for the common case.

```tsx
<html dir="rtl">
  <body>
    <App />
  </body>
</html>
```

---

_Generated from `apps/web/src/content/direction/meta.ts`. Do not edit directly._


---

# Drawer

> A swipeable sheet anchored to one edge of the viewport.

A swipeable sheet anchored to one edge of the viewport. Shares Base UI’s Dialog primitive with `Sheet` — same focus trapping, scroll locking, Escape-to-close — but adds a gesture layer: drag to dismiss (Base UI handles the release threshold and the snap-back animation), `snapPoints` for discrete heights, and automatic nested-drawer stacking (each parent recedes one step when a child opens). `side` is **physical** (`left` / `right` / `top` / `bottom`) — unlike `Sheet`’s logical `start` / `end`, a `side="right"` drawer stays on the physical right even in RTL. This is intentional for the mobile action-sheet pattern, where the physical edge matters more than the reading direction. `variant="floating"` detaches left/right panels from the viewport edges on `md+`, for inspector panels.

## Import

```tsx

import { Drawer, DrawerTrigger, DrawerClose, DrawerBackdrop, DrawerPopup, DrawerHandle, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription } from '@bilazo/kito/components/drawer'

```

## When to use

- A mobile-first action sheet — `side="bottom"` (the default) with no swipe handle, actions in the footer as the only path.

- A dismissable panel that should respond to a swipe gesture — filters, a comment composer, an inspector that slides away with a flick.

- A multi-height drawer — `snapPoints` gives the user a "peek" state and a "full" state, with a drag between them.

- Nested flows — a detail view that opens from within a list, or a three-level drill-down — Drawer detects the nesting automatically and recedes the parent.

- An inspector panel that leaves the page partially visible — `variant="floating"` on `side="left"` or `side="right"` on `md+`.

- A form in a bottom sheet — `DrawerBody` keeps the header and footer pinned while the form scrolls.

- Anywhere the physical edge matters more than the reading direction — action sheets, navigation drawers, dismissable inspectors.

## When NOT to use

- For a blocking decision that must not be swiped away — use `Dialog` (centered) or `Sheet` (anchored, no gesture). Drawer’s swipe gesture is a feature, but it is also a hazard for destructive confirmations: a mis-swipe dismisses before the user confirms.

- For content that must use logical placement — use `Sheet`. `Sheet`’s `side="start"` / `side="end"` flip in RTL; Drawer’s `left` / `right` do not.

- For a fixed side panel that is always visible — use a `<div>` with `flex` layout. Drawer is modal and portaled.

- For a transient notification — use `Toast`. Drawer blocks interaction with the page behind it (by default); a toast does not.

- Without `DrawerTitle` — every drawer needs an accessible name via `aria-labelledby`. Base UI wires `DrawerTitle` automatically; without one, the dialog is announced as "dialog" with no context.

- On mobile without testing the swipe direction — Base UI’s `swipeDirection` is hardcoded physical per side. In an RTL page, a `side="right"` drawer is still swiped right to dismiss — test it before shipping.

- With three or more nested drawers — even four-level nesting (as `nested.tsx` shows) is a demo. Real flows should stay at two levels or move to a route.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Physical edge the drawer anchors to and the direction to swipe for dismissal. **Unlike `Sheet`, these are physical, not logical** — a `side="right"` drawer stays on the physical right in RTL. This is deliberate: the mobile action-sheet pattern reads better with a fixed physical edge. Set on `Drawer` (the root), not on `DrawerPopup` — the popup reads it from context. `Drawer` prop. |
| `variant` | `'flush' \| 'floating'` | `'flush'` | Visual treatment for `left` / `right` drawers on `md+` viewports. `flush` (default) anchors the panel to the viewport edge with only the inner corners rounded. `floating` insets the panel from the outer edge, top, and bottom (`md:top-3 md:bottom-3 md:{side}-3`), rounds all four corners, adds a soft shadow, and widens the panel (`md:w-96`). Use it for inspector or detail panels where the user benefits from glancing at the underlying list through the visible backdrop. **No effect** on `top` / `bottom` sides, and no effect below `md` — those always render flush. `Drawer` prop. |
| `showSwipeHandle` | `boolean` | `false` | Render a decorative drag-handle pill at the anchor edge. The gesture works without it — the handle is a visual hint only, sized and positioned by `side` (a 6px horizontal bar on `bottom` / `top`, a 6px vertical bar on `left` / `right`). Rendered via `DrawerHandle` with `aria-hidden`. `Drawer` prop. |
| `snapPoints` | `(string \| number)[]` | — | Multi-height states for the drawer. Each entry is a CSS length (`'31rem'`) or a viewport fraction between 0 and 1 (`0.5`, `1`). The user drags between them; the release snaps to the nearest point. When set, `max-h-[85vh]` is removed from the popup so `100%` works. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `defaultSnapPoint` | `string \| number` | — | Initial snap point for a controlled snap-point drawer. **Required when `snapPoints` is set** if you do not want the drawer to open at the *last* entry (often the full-height one). The value must exactly match one of the entries in `snapPoints`. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `modal` | `boolean \| 'trap-focus'` | `true` | Whether the drawer blocks interaction with the page behind it. `true` (default) → the viewport is `pointer-events-auto` and the page is blocked. `false` → the viewport is `pointer-events-none` and the page remains interactive. `'trap-focus'` traps focus without blocking the pointer. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the drawer from outside. Omit both for an uncontrolled drawer. Inherited from Base UI’s `Drawer.Root`. `Drawer` prop. |
| `dir` | `'ltr' \| 'rtl'` | — | Explicit direction on the popup. The popup is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set. Same gotcha as `SheetPopup` / `DialogPopup`. Available via `DrawerPopupBaseUiProps` (inherited from Base UI’s `Popup.Props`). `DrawerPopup` prop. |
| `className` | `string` | — | Extra classes on any part. For `DrawerBody`, use it to add padding (`p-6`) — the body is padding-free by default. For `DrawerPopup`, use it for a per-instance width (`w-96`) or a custom height. |

Eleven components compose. `Drawer` (root) reads `side`, `variant`, `modal`, and `showSwipeHandle` into a React context (`DrawerContext`) — the popup and handle subcomponents read from it, so consumers set these once on the root, **not** on `DrawerPopup`. This is a deliberate difference from `Sheet` (where `side` is on `SheetPopup`). The reason: Drawer has more root-level configuration (`snapPoints`, `defaultSnapPoint`, `showSwipeHandle`) and grouping all of it on the root keeps the popup focused on structure. `DrawerTrigger` and `DrawerClose` are Base UI’s primitives with `data-slot`. `DrawerBackdrop` fades via Base UI’s `--drawer-swipe-progress` (opacity tracks the drag) with `--drawer-overlay-min-opacity` keeping a floor when snap points are active. `DrawerPopup` is portaled and padding-free — the popup contains a `BaseDrawer.Viewport` (which carries the `pointer-events-*` classes per `modal`) wrapping the actual `BaseDrawer.Popup`. `DrawerHandle` is a decorative `aria-hidden` div sized/positioned per side. `DrawerHeader` and `DrawerFooter` have their own padding and are `shrink-0`; `DrawerBody` is the scrollable middle with `min-h-0 flex-1 overflow-y-auto overscroll-contain`. **No close button is rendered by default** — unlike `Sheet` and `Dialog`, Drawer expects the swipe gesture or a `DrawerClose` in the footer as the dismissal path. `DrawerTitle` becomes `aria-labelledby` and `DrawerDescription` becomes `aria-describedby` on the popup automatically. **Physical sides:** `side` is physical (`left`/`right`), not logical (`start`/`end`). The safe-area insets (`pb-[env(safe-area-inset-bottom)]`, etc.) and the swipe direction map are all physical. A `side="right"` drawer stays on the physical right in an RTL page — do not expect it to flip.

## Composition

### Basic bottom drawer

The canonical pattern: `Drawer` with `showSwipeHandle` on the root, a `DrawerTrigger`, a `DrawerPopup` with a `DrawerHeader` and `DrawerFooter`. `DrawerTitle` becomes the accessible name automatically. The default `side="bottom"` gives the mobile action-sheet shape.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>Drag down to dismiss, or use the buttons below.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="secondary" />}>Cancel</DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

### Snap points

Pass `snapPoints` with a `defaultSnapPoint` matching one entry — without `defaultSnapPoint`, the drawer opens at the **last** entry (often the full-height one). The user drags between the states; the release snaps to the nearest. `max-h-[85vh]` is removed from the popup when snap points are set, so `100%` works.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

const SNAP_POINTS = ['31rem', 1]

<Drawer snapPoints={SNAP_POINTS} defaultSnapPoint="31rem" showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Snap points</DrawerTitle>
      <DrawerDescription>Drag between peek and full height.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button>Close</Button>} />
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

### Floating inspector panel

For `side="left"` or `side="right"`, pass `variant="floating"` to detach the panel from the viewport edges on `md+`. The panel gets a small inset on the outer side, top, and bottom; all four corners rounded; a soft shadow; a slightly wider default. **No effect** on `top` / `bottom` sides, and no effect below `md`.

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer variant="floating" side="right">
  <DrawerTrigger render={<Button variant="outline" />}>Open inspector</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Customer details</DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="p-6">…</DrawerBody>
  </DrawerPopup>
</Drawer>
```

### Nested drawers

A `Drawer` opened from within another `Drawer` is detected automatically — the parent dims and recedes one step, the child opens above. Place the nested drawer inside the parent’s `DrawerPopup`. Base UI links them through the render tree. Even four-level nesting works; two levels is usually enough for real flows.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button />}>Open level 1</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Level 1</DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="p-6">
      <Drawer showSwipeHandle>
        <DrawerTrigger render={<Button />}>Open level 2</DrawerTrigger>
        <DrawerPopup>
          <DrawerHeader>
            <DrawerTitle>Level 2</DrawerTitle>
          </DrawerHeader>
        </DrawerPopup>
      </Drawer>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

### Action sheet

`side="bottom"` (the default) with no swipe handle is the standard action sheet: a short panel from the bottom with the footer actions as the only path. A destructive action should carry `variant="destructive"` on its button.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Delete lesson</DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader>
      <DrawerTitle>Delete lesson 42?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
      <Button variant="destructive">Delete</Button>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
```

---

_Generated from `apps/web/src/content/drawer/meta.ts`. Do not edit directly._


---

# Field

> A single form field wired for accessibility — label, control, description, and error.

A compound form primitive. A `Field` wraps one control and auto-wires label, description, and error to it through Base UI's `Field.Control`. `FieldGroup` stacks related fields, `FieldSet` + `FieldLegend` group them semantically, and `FieldSeparator` divides sections. Controls built on `Field.Control` (our `Input` and `Textarea`) inherit the labelling without any manual `htmlFor`/`id`.

## Import

```tsx

import { Field, FieldSet, FieldLegend, FieldGroup, FieldContent, FieldTitle, FieldLabel, FieldDescription, FieldError, FieldSeparator } from '@bilazo/kito/components/field'

```

## When to use

- Build any form: login, signup, settings, checkout. Every input that has a visible label belongs inside a `Field`.

- Group related fields under a shared heading — a `FieldSet` with a `FieldLegend`, e.g. "Shipping address" or "Notification preferences".

- Display a control row with a label and a short description — a checkbox with an explanation, a switch with a helper line.

- Show validation errors next to the control. Add `invalid` on the `Field` and `aria-invalid` on the control; `FieldError` renders below and the label inherits the destructive color.

- Switch between vertical and horizontal layouts with one prop — `orientation="horizontal"` for a checkbox row, `"responsive"` inside a `FieldGroup` for a layout that adapts to its container.

## When NOT to use

- For a standalone label that is not part of a form — use `Label`. Field adds structure, auto-wiring, and a role that are only useful when there is an actual control inside.

- For a small inline control that does not need a label row — a compact switch in a toolbar. Use the control directly.

- For a set of controls the user picks one from — use `RadioGroup` inside a `Field` when there is a single label, or `FieldSet` + `FieldLegend` when each option has its own label. Do not wrap every `<input type="radio">` in its own `Field` — the group needs one legend.

- For rich form flows that need field arrays, dependent fields, and cross-field validation — use a form library (`react-hook-form`, `tanstack-form`, `formisch`). `Field` is the presentation primitive; the library owns the state.

- For a panel or card wrapping a group of fields with visible chrome — wrap a `FieldGroup` in a `Card`. A `Field` alone has no surface.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | Layout of the label and control. `Field` prop. `vertical` for text fields, `horizontal` for checkboxes and switches (label beside a small control), `responsive` for a layout that becomes horizontal at the `md` container width of the enclosing `FieldGroup`. |
| `variant` | `'legend' \| 'label'` | `'legend'` | Visual scale of a legend. `FieldLegend` prop. `legend` is the default larger scale (16px). `label` matches the small label size (14px) — use it for a nested `FieldSet` inside a `FieldGroup`. |
| `errors` | `({ message?: string } \| undefined)[]` | — | Form-library errors. `FieldError` prop. Duplicate messages collapse; two or more unique messages render as a bulleted list. Ignored when `children` is provided. Pass `undefined` entries safely — they are filtered out. |
| `invalid` | `boolean` | — | Mark the whole field as invalid. `Field` prop. Colors the label with the destructive token and, in combination with `aria-invalid` on the control, tells assistive technology that the value is rejected. |

Field is a compound of ten parts. The props table lists the four that carry behaviour: `orientation` on `Field`, `variant` on `FieldLegend`, `errors` on `FieldError`, and `invalid` on `Field`. Everything else (`FieldSet`, `FieldGroup`, `FieldContent`, `FieldTitle`, `FieldLabel`, `FieldDescription`, `FieldSeparator`) accepts `className` plus native HTML attributes and has no own props. `FieldLabel` and `FieldDescription` delegate to Base UI's `Field.Label` and `Field.Description` and share the auto-wiring with `Field.Control`.

## Composition

### Single field with label, control, and description

`Input` uses `Field.Control`, so `FieldLabel` wires the `htmlFor`/`id` pairing automatically.

```tsx
import { Field, FieldDescription, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldDescription>Used to recover your account.</FieldDescription>
</Field>
```

### Field with validation error

Add `invalid` on the `Field` for the visual state and `aria-invalid` on the control for assistive technology. `FieldError` only renders when it has content.

```tsx
<Field invalid>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>
```

### Errors from a form library

Pass the form library's errors array directly. Duplicates collapse; multiple unique messages become a bulleted list.

```tsx
<Field invalid>
  <FieldLabel>Password</FieldLabel>
  <Input type="password" aria-invalid />
  <FieldError errors={form.formState.errors.password} />
</Field>
```

### Horizontal row

For a checkbox or switch, `orientation="horizontal"` sits the label beside a small control. Add `FieldContent` when there is also a description.

```tsx
<Field orientation="horizontal">
  <Switch id="newsletter" />
  <FieldContent>
    <FieldLabel htmlFor="newsletter">Newsletter</FieldLabel>
    <FieldDescription>One email per week.</FieldDescription>
  </FieldContent>
</Field>
```

### Group and set

`FieldSet` + `FieldLegend` give the group a semantic name. `FieldGroup` stacks the fields. `FieldSeparator` divides sections with optional inline text.

```tsx
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>Shown on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel>Name</FieldLabel>
      <Input />
    </Field>
    <FieldSeparator>or</FieldSeparator>
    <Field>
      <FieldLabel>Company</FieldLabel>
      <Input />
    </Field>
  </FieldGroup>
</FieldSet>
```

---

_Generated from `apps/web/src/content/field/meta.ts`. Do not edit directly._


---

# Input

> A single-line text field for forms and inline text entry.

A single-line text input. Picks its own text direction from `type` — `email`, `url`, `tel`, `password`, and `number` inputs always render LTR even inside an RTL page; everything else uses `dir="auto"` and follows the content. Shares the same `--control-*` size tokens as `Button`, so an input and a button placed side by side line up without manual sizing.

## Import

```tsx

import { Input, inputStyles, defaultDir } from '@bilazo/kito/components/input'

```

## When to use

- Collect a single line of text — a name, an email address, a search query, a URL, a phone number.

- Inside a `Field` (or next to a `Label` with matching `htmlFor` / `id`) for a labelled form row.

- For short-form entry that fits on one line — the browser gives you the right on-screen keyboard and autofill for `email`, `tel`, `url`, and `password` types.

- As the text-input slot inside an `InputGroup` when the field needs a leading/trailing icon or button.

## When NOT to use

- For multi-line text — use `Textarea`. A single-line field scrolls horizontally and has no resize handle.

- To choose from a fixed list of options — use `Select` or `Combobox`. A free-text field loses the option list and the keyboard navigation.

- For a search box with suggestions as the user types — use `Combobox`. A raw `Input` with `type="search"` is fine for a submit-then-navigate search, not for suggestion lists.

- As the only label of a field — every input needs an accessible name (`Label` with `htmlFor`, or `aria-label`). Placeholder text disappears on the first keystroke and is not announced as the field’s name.

- To display formatted or read-only output — use plain text. An input that the user cannot edit but that occupies a full form row looks editable and steals focus.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls the input height. Heights come from the same `--control-*` tokens as `Button`, so an input and a button placed side-by-side line up. `sm` and `md` bump their font to `text-base` on touch devices (iOS Safari zooms the page on focus when the field font is smaller than 16px). |
| `type` | `string` | `'text'` | Native input type. Also drives the text direction: `email`, `url`, `tel`, `password`, and `number` force `dir="ltr"`; everything else defaults to `dir="auto"`. |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | — | Explicit text direction. Overrides the `type`-based default from `defaultDir(type)`. Use this for the rare field where the heuristic is wrong — an email field that should still follow the page direction, for example. |
| `aria-invalid` | `boolean` | — | Marks the input as invalid. Applies the destructive border and the destructive outline on `:focus-visible`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control instead — both selectors are styled, so either works. |
| `className` | `string` | — | Extra classes. Merged with the size classes via `cn()` — use it for width (`max-w-xs`), layout, or a one-off visual override. |

Two helpers are also exported. `inputStyles` is a cva output that returns the class string without rendering an `<input>` — use it to style your own control (or a future `Textarea`) with the same border, focus, and invalid treatment. `defaultDir(type)` is a small utility that returns `"ltr"` for `email`, `url`, `tel`, `password`, and `number`, and `"auto"` otherwise. The underlying element is Base UI’s `Field.Control` rendered as a native `<input>`, so all native attributes (`id`, `placeholder`, `autoComplete`, `readOnly`, `required`, `disabled`, `aria-*`, `data-*`) are forwarded untouched.

## Composition

### Labelled input

Every field needs an accessible name. Pair the input with a `Label` via matching `htmlFor` / `id` — the browser wires the pair up automatically.

```tsx
import { Input } from '@bilazo/kito/components/input'
import { Label } from '@bilazo/kito/components/label'

<div className="flex max-w-xs flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Sizes share the control scale

`sm`, `md`, and `lg` map to the same `--control-*` tokens that `Button` uses, so pairing an input with an adjacent button lines them up without manual sizing.

```tsx
import { Input } from '@bilazo/kito/components/input'

<div className="flex max-w-xs flex-col gap-2">
  <Input size="sm" aria-label="Small" placeholder="Small" />
  <Input size="md" aria-label="Medium" placeholder="Medium" />
  <Input size="lg" aria-label="Large" placeholder="Large" />
</div>
```

### Invalid state

Set `aria-invalid` for standalone use. Inside `<Field invalid>` Base UI sets `data-invalid` for you — both selectors apply the destructive border.

```tsx
import { Input } from '@bilazo/kito/components/input'

<Input aria-invalid aria-label="Email" placeholder="you@example.com" defaultValue="not-an-email" />
```

### Auto-direction from type

`email`, `url`, `tel`, `password`, and `number` fields always render LTR — even inside an RTL page. This keeps addresses and phone numbers readable while labels and surrounding UI stay in RTL.

```tsx
import { Input } from '@bilazo/kito/components/input'

<Input type="email" aria-label="Email" placeholder="you@example.com" />
<Input type="tel" aria-label="Phone" placeholder="+1 555 0100" />
```

---

_Generated from `apps/web/src/content/input/meta.ts`. Do not edit directly._


---

# Input Group

> A single visually-merged control — an input plus icon, text, or button slots.

A single visually-merged control — an input plus icon, text, or button slots inside one frame. Use it for search boxes, prefixed URLs, currency fields, and password inputs with a show/hide toggle. The group renders the border, the focus ring, and the invalid styling; the inner input carries none of its own. Size comes from the same `--control-*` tokens as `Button` and is shared with addons and the input through React context, so text scales together and the whole strip lines up with adjacent controls.

## Import

```tsx

import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'

```

## When to use

- A search box with a leading icon — the `basic` pattern with a `Search` icon and an `InputGroupInput`.

- A prefixed field — `https://`, a domain, an `@` handle — where the prefix is part of the control, not a separate label.

- A currency or unit suffix — `USD`, `تومان`, `kg` — that belongs to the value and should sit inside the frame.

- A password field with a show/hide toggle — put a `Button` (`variant="ghost"` `size="icon-sm"`) directly inside the group.

- An input with a clear or copy action inside the frame — render the button conditionally so an empty field has no clear affordance.

- A single-line text control where a small, related piece of UI (icon, prefix, suffix, button) needs to share the same border, focus ring, and invalid state as the input.

## When NOT to use

- For a plain input with no slots — use `Input`. `InputGroup` adds a wrapper `<div role="group">`, a context provider, and a flex layout that a bare `Input` does not need.

- For multi-line text — the group is constrained to a fixed `--control-*` height; use `Textarea` for multi-line entry.

- To choose from a fixed list of options — use `Select` or `Combobox`. A text field that happens to accept the same values loses the option list and the keyboard navigation.

- When the trailing action is the form’s primary action (Submit, Save) — render it as a normal `Button` next to the input, not inside the frame. Cramming the primary action into the border blurs where the form ends and the action begins.

- As a form layout primitive — `Field` and `FieldGroup` handle the vertical rhythm, labels, and descriptions. `InputGroup` is a single control, not a form row.

- When the controls inside the frame are peers, not slots — a row of buttons with a shared border is a `ButtonGroup`, not an `InputGroup`. The group role and the focus-within ring assume one primary control.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Group height, from the same `--control-*` tokens as `Button`, `Input`, and `Select` — an input group and an adjacent button line up without manual sizing. Shared with the inner input and addons through React context, so their font sizes scale together: `lg` uses `text-base`, `sm` and `md` use `text-sm` (with `pointer-coarse:text-base` on touch devices). `InputGroup` prop. |
| `align` | `'inline-start' \| 'inline-end' \| 'block-start' \| 'block-end'` | `'inline-start'` | Where the addon sits inside the group. `inline-start` / `inline-end` place the addon at the reading start or end of the flex row and set the padding to match (`ps-3 pe-2` vs `ps-2 pe-3`). `block-start` / `block-end` stack the addon above or below the input — the group switches to a column layout with auto height (via `has-[[data-align=block-*]]:flex-col`), so a block addon never squeezes into the fixed `--control-*` height. `InputGroupAddon` prop. |
| `role` | `string` | `'group'` | ARIA role on the group root. Defaults to `group` so assistive technology announces the composite as a single unit. Override to `search` for a search bar (`<InputGroup role="search">`); the role-override test guarantees the prop reaches the underlying `<div>`. `InputGroup` prop. |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | — | Explicit text direction on the inner input. Defaults from `type` via `defaultDir(type)` — `email`, `url`, `tel`, `password`, and `number` force `dir="ltr"`, everything else is `dir="auto"`. Overrides the default when the heuristic is wrong for a specific field. `InputGroupInput` prop. |
| `className` | `string` | — | Extra classes on `InputGroup`, `InputGroupAddon`, or `InputGroupInput`. Merged with the base classes via `cn()` — typically used for width (`max-w-md`) on the group, layout on the addon, or a one-off visual override on the input. |

Three components compose. `InputGroup` renders a `<div role="group">` that carries the border, the focus ring (`focus-within:border-ring` + `focus-within:outline-1`), and the invalid/disabled detection via `has-*` selectors — `has-[:disabled]` dims the whole strip, `has-[[aria-invalid=true]]` or `has-[[data-invalid]]` draws the destructive border. `InputGroupInput` is a bare `BaseInput` with no border, no background, and no focus ring of its own (`outline-0`) — the group provides them. `InputGroupAddon` is a non-interactive slot; its click handler forwards focus to the input unless the click landed on a real control (`button`, `select`, `a`, `input`) or `preventDefault` was called, so a `Button` inside an addon behaves independently. JSX order equals visual order — the first child sits at the reading start — so RTL works without a direction prop. `groupStyles`, `InputGroupSize`, and `InputGroupAlign` are internal to the module; only the three components and their `*OwnProps` / `*HTMLProps` / `*BaseUiProps` / `*Props` types are exported.

## Composition

### Search with an icon

The canonical pattern: a leading icon in an `InputGroupAddon`, a bare `InputGroupInput`, and the group handles the border and focus ring. Give the input an `aria-label` — the icon is decorative, not a name.

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search } from 'lucide-react'

<div className="w-full max-w-md">
  <InputGroup>
    <InputGroupAddon>
      <Search />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search…" aria-label="Search" />
  </InputGroup>
</div>
```

### Prefix and suffix

Addons hold short text as well as icons. `inline-start` and `inline-end` put them at the reading start and end of the row with the matching padding.

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'

<InputGroup>
  <InputGroupAddon>vatyar.com/</InputGroupAddon>
  <InputGroupInput placeholder="username" aria-label="Username" />
</InputGroup>

<InputGroup>
  <InputGroupInput placeholder="0" inputMode="numeric" aria-label="Amount" />
  <InputGroupAddon align="inline-end">تومان</InputGroupAddon>
</InputGroup>
```

### Password with a show/hide toggle

For a clickable slot, skip the addon and put a `Button` (`variant="ghost"` `size="icon-sm"`) directly in the group. The `me-1` trims the trailing inset so the button hugs the border instead of stacking its own padding.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { InputGroup, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export function Password() {
  const [visible, setVisible] = useState(false)
  return (
    <InputGroup>
      <InputGroupInput
        type={visible ? 'text' : 'password'}
        placeholder="Password"
        autoComplete="current-password"
        aria-label="Password"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="me-1"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </InputGroup>
  )
}
```

### Clearable search

Render the trailing clear button conditionally — an always-visible clear on an empty field is visual noise. The `me-1` keeps the button close to the border.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function Clearable() {
  const [query, setQuery] = useState('lesson 42')
  return (
    <InputGroup>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
        aria-label="Search"
      />
      {query.length > 0 && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="me-1"
          aria-label="Clear"
          onClick={() => setQuery('')}
        >
          <X />
        </Button>
      )}
    </InputGroup>
  )
}
```

### Block-aligned addon

Use `align="block-start"` for a labelled slot above the input, like a subject line on a compose field. The group switches to a column layout and auto height so the addon is not squeezed into the fixed control height.

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'

<InputGroup>
  <InputGroupAddon align="block-start">Subject</InputGroupAddon>
  <InputGroupInput placeholder="Re: your message" aria-label="Subject" />
</InputGroup>
```

---

_Generated from `apps/web/src/content/input-group/meta.ts`. Do not edit directly._


---

# Input OTP

> A one-time-password input composed of individual character slots.

A one-time-password input composed of individual character slots. Built on Base UI’s `OTPField` primitive — each slot is a real `<input>`, so focus moves between them natively, the browser’s caret is the real caret, and paste/autofill across slots is handled by the primitive. Give the root a `length` (required) and either let it auto-render the slots or compose them manually with `InputOTPGroup` / `InputOTPSeparator`. `validationType` restricts accepted characters (numeric / alpha / alphanumeric / none); `mask` obscures the input; `autoSubmit` submits the form on completion; `onValueComplete` fires when all slots are filled.

## Import

```tsx

import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@bilazo/kito/components/input-otp'

```

## When to use

- A verification code sent by email or SMS — the standard 6-digit OTP on a login or signup flow.

- A PIN entry pattern — 4 digits from a security app, a device lock, a hardware token — with `validationType="numeric"`.

- An alphanumeric verification code — pass `validationType="alphanumeric"` to accept recovery or invite codes that mix letters and numbers.

- A one-time link code — a share code, an invite code — that the user copies and pastes from another source; Base UI handles paste across slots natively.

- A two-factor authentication step in a form — pair with `Field` for a labelled input, and use `autoSubmit` to submit the form as soon as the code is complete.

- A masked access code on a shared screen — pass `mask` to obscure each character as the user types.

## When NOT to use

- For a regular text field — use `Input`. `InputOTP` renders a fixed number of single-character slots; a longer input (a name, a search query) does not fit the visual model.

- For a numeric input where the digits form one number — e.g. an amount `1234.56`, a year `2026`, a quantity — use `Input type="number"` or a plain `Input`.

- For a code longer than ~8 characters — the slot row becomes too wide. A longer code belongs in a single `<input>` or a textarea.

- Without a `length` matching the sum of slot counts — `length` is required, and the total number of `InputOTPSlot` children must equal `length`. A mismatch means dead slots or dropped characters.

- Without an accessible name — wrap the OTP in a `Field` with a label, or pass `id` on `InputOTP` with an adjacent `<label htmlFor>`. Auto-rendered slots add `aria-label="Character N of L"` on their own; manually composed slots need `aria-label` per slot.

- Without `aria-invalid` on each slot for the invalid state — passing it on `InputOTP` or `InputOTPGroup` does not cascade. Each slot must carry its own `aria-invalid` (or be inside a `<Field invalid>` where Base UI sets `data-invalid` automatically).

- On mobile without `autoComplete="one-time-code"` — Base UI sets this by default on the first slot and hidden validation input, so you get it for free; do not override it unless you have a reason.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length`* | `number` | — | Total number of slot characters. **Required** — Base UI needs it to clamp the value, detect completion, and generate consistent markup before all slots hydrate. Every slot from index `0` to `length - 1` must be covered by exactly one `InputOTPSlot`. `InputOTP` prop. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the auto-rendered slots. Only applies when `children` is not provided — for manual composition, pass `size` to each `InputOTPSlot`. `sm` is `size-8` (32px square, 14px text); `md` is `size-(--control-md)` (40px, matching the default control height); `lg` is `size-12` (48px square, 16px text). `InputOTP` / `InputOTPGroup` / `InputOTPSlot` prop. |
| `value` | `string` | — | Controlled value. Pass with `onValueChange` for a controlled OTP. Omit both for an uncontrolled one (then use `defaultValue`). Inherited from Base UI’s `OTPField.Root`. `InputOTP` prop. |
| `defaultValue` | `string` | — | Initial value for an uncontrolled OTP. The characters are distributed across slots in order. Ignored when `value` is passed. `InputOTP` prop. |
| `onValueChange` | `(value: string, eventDetails: ...) => void` | — | Change callback. Fires with the complete value (all slot characters concatenated) whenever the input changes — typing, pasting, deleting. `eventDetails.reason` distinguishes `input-change` (typing / autofill), `input-clear`, `input-paste`, and `keyboard`. `InputOTP` prop. |
| `onValueComplete` | `(value: string, eventDetails: ...) => void` | — | Fires when all slots are filled — after the internal value update. The callback runs when the code becomes complete by typing or pasting a complete value while the OTP is already complete. Pair with `autoSubmit` to submit the owning form. `InputOTP` prop. |
| `onValueInvalid` | `(value: string, eventDetails: ...) => void` | — | Fires when the user types or pastes characters that are rejected by `validationType` or `normalizeValue`. The `value` argument is the attempted input before normalization — useful for surfacing a hint like “this code only accepts digits”. `InputOTP` prop. |
| `validationType` | `'numeric' \| 'alpha' \| 'alphanumeric' \| 'none'` | `'numeric'` | Character type the OTP accepts. `numeric` allows digits only — the default and the right choice for a PIN or SMS code. `alpha` allows letters only. `alphanumeric` allows both — for recovery and invite codes. `none` accepts any character — pair with `normalizeValue` for a fully custom rule. `InputOTP` prop. |
| `normalizeValue` | `(value: string) => string` | — | Function that normalizes the value after `validationType` filtering — for example, converting alphanumeric codes to uppercase. It must be **idempotent**, since Base UI may run it more than once across state changes. Characters rejected here fire `onValueInvalid`. `InputOTP` prop. |
| `mask` | `boolean` | `false` | Whether to obscure entered characters — each slot renders as a password-style dot. Use it on shared screens or for access codes that should not be visible over a shoulder. `InputOTP` prop. |
| `autoSubmit` | `boolean` | `false` | Whether to submit the owning form automatically when all slots are filled. Base UI runs `onValueComplete` immediately before submitting. Requires the OTP to live inside a `<form>`. `InputOTP` prop. |
| `disabled` | `boolean` | `false` | Prevents interaction — the OTP cannot be typed into, and the root gets `data-disabled` (`opacity-50`). `InputOTP` prop. |
| `readOnly` | `boolean` | `false` | Renders the OTP’s value without allowing edits — for a display-only code (a share code the user has already entered, an archived record). `InputOTP` prop. |
| `required` | `boolean` | `false` | Marks the OTP as required for form submission. `InputOTP` prop. |
| `autoComplete` | `string` | `'one-time-code'` | The autocomplete attribute applied to the first slot and the hidden validation input. Default `one-time-code` lets mobile keyboards surface the SMS code as a tap-to-fill suggestion. `InputOTP` prop. |
| `id` | `string` | — | The `id` of the first input. Subsequent inputs derive their ids from it (`{id}-2`, `{id}-3`, and so on). Combine with an adjacent `<label htmlFor={id}>` to give the OTP an accessible name. `InputOTP` prop. |
| `count` | `number` | — | Auto-render this many slots inside an `InputOTPGroup`. Only applies when no children are provided. The sum of `count` across all groups must equal the root’s `length`. `InputOTPGroup` prop. |
| `aria-invalid` | `boolean` | — | Marks an individual slot as invalid — applies `aria-invalid:border-destructive` and a destructive outline on focus. Must be set on **each slot**, not on `InputOTP` or `InputOTPGroup` — the attribute does not cascade. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the slots automatically; both selectors are styled. `InputOTPSlot` prop. |
| `className` | `string` | — | Extra classes on any part. For `InputOTP`, useful for `flex-wrap` on very long codes or a custom background. For `InputOTPSlot`, useful for a per-slot size override — or pass `size` on `InputOTP` for auto-rendered slots. For `InputOTPSeparator`, a per-instance `mx-*` for the group gap. |

Four components compose. `InputOTP` (root) forwards to Base UI’s `OTPField.Root` — it renders a `<div>` wrapper, manages the value across all slots, and auto-renders `length` slots when no children are provided. `InputOTPGroup` is a plain `<div>` that groups adjacent slots; its `count` prop auto-renders `count` slots (its `size` prop cascades to them). `InputOTPSlot` forwards to Base UI’s `OTPField.Input` — a real `<input>` that displays one character. Base UI auto-indexes slots by DOM order, so there is no `index` prop; the position is implicit, and the total slot count must equal the root’s `length`. `InputOTPSeparator` forwards to Base UI’s `OTPField.Separator` — a `<div role="separator">` that Base UI renders, but Kito overrides with `aria-hidden` because a visual dash between 3+3 groups is decorative; each slot already carries its own `aria-label="Character N of L"` so screen reader users get the position from the slot, not from a separator announcement. `InputOTP` **auto-labels** slots 1..N with `aria-label="Character N of L"`; slot 0 inherits the field’s label via the root’s `id` (`<label htmlFor={id}>` → first input). If you compose slots manually, add `aria-label` yourself. `aria-invalid` must be set on **each slot** — the attribute does not cascade; inside a `<Field invalid>` Base UI sets `data-invalid` on the slots, and both selectors are styled. `InputOTP` is **not portaled** — it renders inline in the page flow, so `dir` inherits from `<html dir>` or any wrapper and RTL works without an explicit `dir` prop. No `cva` output is exported (the slot cva is internal); all Base UI props (`name`, `form`, `inputMode`, `autoComplete`, `onValueComplete`, `onValueInvalid`, `normalizeValue`, `readOnly`, etc.) are forwarded untouched via `InputOTPBaseUiProps`. `InputOTPSize` is exported as a type-only alias.

## Composition

### Basic

Give the root a `length` and let it auto-render the slots. The first slot inherits the field’s label via the root’s `id`; subsequent slots auto-label as `Character N of L`.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP length={6} defaultValue="123456" />
```

### Grouped with a separator

Pass `count` on each `InputOTPGroup` to auto-render a subset of slots, with an `InputOTPSeparator` between groups for the `123-456` presentation. The sum of `count` must equal `length`.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
} from '@bilazo/kito/components/input-otp'

<InputOTP length={6}>
  <InputOTPGroup count={3} />
  <InputOTPSeparator />
  <InputOTPGroup count={3} />
</InputOTP>
```

### Validation type — PIN

Use `validationType="numeric"` for a numeric PIN. The default is `numeric`, so for a PIN you can omit it; keep it explicit when the intent is a PIN specifically.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP length={4} validationType="numeric" />
```

### Validation type — alphanumeric

Use `validationType="alphanumeric"` for recovery, backup, or invite codes that mix letters and numbers. Pair with `normalizeValue={(v) => v.toUpperCase()}` to display codes consistently.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP
  length={6}
  validationType="alphanumeric"
  normalizeValue={(value) => value.toUpperCase()}
/>
```

### In a form with auto-submit

Give `InputOTP` an `id`, wrap it in a `Field` for a labelled input, and pass `autoSubmit` so the owning form submits as soon as all slots are filled. Combine with `onValueComplete` for analytics or a follow-up action.

```tsx
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { InputOTP } from '@bilazo/kito/components/input-otp'

<form>
  <Field name="otp">
    <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
    <InputOTP
      id="otp-verification"
      length={6}
      required
      autoSubmit
      onValueComplete={(value) => console.log('complete', value)}
    />
  </Field>
</form>
```

### Masked entry

Pass `mask` to obscure each character on the screen — for access codes on shared screens. The value is still typed as normal; each slot renders as a password-style dot.

```tsx
import { InputOTP } from '@bilazo/kito/components/input-otp'

<InputOTP length={6} mask />
```

---

_Generated from `apps/web/src/content/input-otp/meta.ts`. Do not edit directly._


---

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


---

# Kbd

> Renders a single keyboard key or a short sequence like ⌘K.

Renders a single keyboard key or a short sequence like ⌘K. Non-interactive — `pointer-events-none` and non-selectable — but readable by assistive technology: the text content is the meaning, not an `aria-label`. Inside a Tooltip, the popup surface is inverted (`bg-foreground text-background`), so `Kbd` detects the context via a parent selector and inverts its own colors. `KbdGroup` lays out multiple keys in a row for a chord like `Ctrl + Shift + P`.

## Import

```tsx

import { Kbd, KbdGroup } from '@bilazo/kito/components/kbd'

```

## When to use

- Show a keyboard shortcut next to the action it triggers — a menu item, a toolbar button, a tooltip.

- Inside a Tooltip, as supplementary content that reveals a shortcut — the standard pattern for icon-only toolbar buttons.

- Inside a Button as a secondary hint — a search button that also shows its ⌘K shortcut.

- Inside an `InputGroupAddon` with `align="inline-end"` — a shortcut hint at the trailing edge of an input.

- In documentation and onboarding text, as an inline reference to a shortcut like "Press ⌘K to open".

- To display a chord like `Ctrl + Shift + P` — wrap the keys in `KbdGroup` so the gap between them comes from the group, not from a manual `+` or non-breaking space.

## When NOT to use

- As an interactive element — `Kbd` is `pointer-events-none` and non-focusable. For a clickable key-cap, wrap a `Button` around the `Kbd` so the button provides focus, hover, and keyboard handling.

- As the only label of an action — the button or menu item still needs a visible label or `aria-label`. `Kbd` is a supplementary hint, not a name.

- For an arrow glyph or symbol that a screen reader would mispronounce — write the key name (`Ctrl`, `Enter`, `ArrowLeft`) unless the symbol is unambiguous in context. The text content is announced as-is.

- For styling arbitrary code or inline literals — use a `<code>` element. `Kbd` means "this is a keyboard key"; `code` means "this is code". The two carry different semantics.

- To grab attention or as an animated affordance — `Kbd` is a static visual marker, not an interactive element. Use `Badge` or an icon when the emphasis is the point.

- Inside a non-inverted surface where `bg-muted` would be invisible (a `bg-muted` container) — pass `className="bg-background"` to lift it, but consider whether the Kbd is really adding information there.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Extra classes on `Kbd` or `KbdGroup`. Merged with the base classes via `cn()` — commonly used to override the surface color when the Kbd sits on a background that matches `bg-muted` (`className="bg-background"` inside a Button), or to add a margin (`ms-2`) when the Kbd sits next to a label. |

Two components are exported. `Kbd` renders a native `<kbd>` element — size, background, text color, and the icon sizing rule (`[&_svg:not([class*="size-"])]:size-3`) live in the base classes, and every native `<kbd>` attribute (`id`, `data-*`, `aria-*`) is forwarded untouched. `KbdGroup` renders a `<div>` (not a `<kbd>`) because the group is a layout container, not a keyboard input — the children are the keyboard inputs. Both components are typed as `React.ComponentProps<"tag">` — no `cva` output, no Base UI primitive, and no `*OwnProps` because they define no library-specific props. The tooltip inversion is done via `in-data-[slot=tooltip-content]` (Tailwind v4 parent selector): a Kbd nested anywhere inside the tooltip popup inverts its own colors without any prop or context. `KbdGroup` does not carry the inversion selector; the inversion applies per-child, so a Kbd inside a KbdGroup inside a tooltip still inverts.

## Composition

### Inside a Button

A shortcut hint next to a label. Pass `bg-background` on the Kbd when the button already has a surface (a `Button` with `variant="outline"` uses the page background), and `ms-2` on the `KbdGroup` to separate the keys from the label.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Kbd, KbdGroup } from '@bilazo/kito/components/kbd'
import { Search } from 'lucide-react'

<Button variant="outline">
  <Search />
  Search
  <KbdGroup className="ms-2">
    <Kbd className="bg-background">⌘</Kbd>
    <Kbd className="bg-background">K</Kbd>
  </KbdGroup>
</Button>
```

### Inside a Tooltip

The common pattern for icon-only toolbar buttons. The tooltip popup surface is `bg-foreground text-background`; `Kbd` inverts its own colors automatically via the `in-data-[slot=tooltip-content]` parent selector — no `bg-background` needed here.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Kbd } from '@bilazo/kito/components/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@bilazo/kito/components/tooltip'
import { Bold } from 'lucide-react'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Bold" />}>
      <Bold />
    </TooltipTrigger>
    <TooltipContent>
      Bold <Kbd>⌘B</Kbd>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Inside an InputGroup

An `InputGroupAddon` with `align="inline-end"` places the shortcut at the trailing edge of an input — the search-bar pattern. The `Kbd` is non-interactive, so clicking it falls through to the addon’s onClick, which focuses the sibling input.

```tsx
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Kbd } from '@bilazo/kito/components/kbd'
import { Search } from 'lucide-react'

<InputGroup>
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search…" aria-label="Search" />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>
```

### Chord with KbdGroup

A chord like `Ctrl + Shift + P` renders as three `Kbd` elements inside a `KbdGroup`. The gap comes from the group — do not add a `+` or a non-breaking space between the keys.

```tsx
import { Kbd, KbdGroup } from '@bilazo/kito/components/kbd'

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>
```

### Inline in prose

In documentation text, `Kbd` sits inline next to the sentence. `inline-flex` keeps the line box height stable; the text content is announced by assistive technology as-is — write the key name in a readable form (`Ctrl` not `⌃`).

```tsx
import { Kbd } from '@bilazo/kito/components/kbd'

<p className="flex items-center gap-2">
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
</p>
```

---

_Generated from `apps/web/src/content/kbd/meta.ts`. Do not edit directly._


---

# Label

> An accessible form control label.

A form control label. Renders a plain `<label>` and pre-wires three disabled affordances — the label itself (`data-disabled`), a preceding peer control (`peer-disabled`), and a disabled ancestor group (`group-data-[disabled=true]`). Use it standalone for checkbox rows and any control that is not part of a Base UI `<Field>`.

## Import

```tsx

import { Label, labelStyles } from '@bilazo/kito/components/label'

```

## When to use

- Pair a text label with a form control that is not inside a Base UI `<Field>` — a checkbox, a radio, a switch, or a standalone `<input>`.

- Wrap a checkbox row so the label text and the box act as one click target.

- Add a required marker to a field — a red `*` after the label text, while the `required` attribute stays on the control.

- Compose a label with an inline action ("Forgot password?"), using `buttonVariants({ variant: "link" })` on the anchor.

- Label a custom control that is not a native form element, using `htmlFor` + `id`.

## When NOT to use

- Inside a Base UI `<Field>` — use `FieldLabel` instead. It reads the control's id from the surrounding field and wires `htmlFor` automatically, and it inherits the same `labelStyles`.

- As a group heading above several controls — use `<fieldset>` with `<legend>` (or `FieldSet` / `FieldLegend` once `Field` ships) so the group has a semantic name.

- As visible body text or a heading — use a paragraph, an `<h2>`, or the typography utilities directly. A `<label>` outside a form has no meaningful role.

- As a clickable element without a control — if the "label" is actually a button or a link, use `Button` or an anchor. `Label` associates with a control; it does not perform actions.

- On its own with `onClick` handlers — the interaction belongs on the control, not the label. `htmlFor` gives you click-to-focus for free.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `htmlFor` | `string` | — | The `id` of the control this label describes. Clicking the label focuses the control, and screen readers use the label text as the control's accessible name. Required for any real use — a `<label>` without an association is invalid HTML. |
| `children` | `React.ReactNode` | — | The label text. Can include an inline icon, a required marker (a `<span aria-hidden>*</span>`), or an inline link styled with `buttonVariants({ variant: "link" })`. |
| `className` | `string` | — | Extra classes. Merged with `labelStyles` via `cn()`. |

Label has no own props — `LabelProps` is `React.ComponentProps<"label">`. Everything (`htmlFor`, `id`, `title`, `data-*`) is native. Three disabled affordances are pre-wired in `labelStyles` and drive the visual: `data-disabled` on the label itself, `peer-disabled` when a sibling control with `className="peer"` is disabled, and `group-data-[disabled=true]` from an ancestor group. `labelStyles` is exported so a future `FieldLabel` can share the exact same class list.

## Composition

### With an input

The `htmlFor` matches the input's `id`, so clicking the label focuses the field.

```tsx
import { Label } from '@bilazo/kito/components/label'

<Label htmlFor="email">Email address</Label>
<input id="email" type="email" />
```

### Checkbox row with peer-disabled

The `peer` class on the input must come before the label in the DOM. When the input is disabled, the label dims automatically — no extra prop.

```tsx
<input id="tos" type="checkbox" className="peer" disabled />
<Label htmlFor="tos">Accept the terms</Label>
```

### Disabled group

A `<fieldset disabled>` or any ancestor with `data-disabled="true"` dims every label inside.

```tsx
<fieldset disabled data-disabled="true" className="group">
  <Label htmlFor="x">Field</Label>
  <input id="x" />
</fieldset>
```

### With a required marker

The marker is visual; the `required` attribute stays on the control so assistive technology announces it.

```tsx
<Label htmlFor="name">
  Name <span aria-hidden className="text-destructive">*</span>
</Label>
<input id="name" required />
```

### With an inline link

A label with a "Forgot password?" link sits naturally in a flex row. Use `buttonVariants({ variant: "link" })` on the anchor so the visual matches Button's link variant.

```tsx
import { buttonVariants } from '@bilazo/kito/components/button'

<div className="flex items-center justify-between gap-4">
  <Label htmlFor="password">Password</Label>
  <a href="/forgot" className={buttonVariants({ variant: "link", size: "sm" })}>
    Forgot?
  </a>
</div>
```

---

_Generated from `apps/web/src/content/label/meta.ts`. Do not edit directly._


---

# Menu

> A dropdown menu of commands or links.

A dropdown menu of commands or links. Opened by click, closed by Escape, outside click, or item activation. Base UI handles roving tabindex, arrow-key navigation, typeahead, and submenu opening — the visible parts are `MenuTrigger`, `MenuPopup`, and the item variants (`MenuItem`, `MenuLinkItem`, `MenuCheckboxItem`, `MenuRadioItem`). Checkbox and radio items keep the menu open by default (multi- or single-select affordances); regular items and links close it. `MenuShortcut` is a decorative hint — the actual keyboard handler lives elsewhere. Sides are physical (`top` / `right` / `bottom` / `left`); in an app that serves both LTR and RTL, pick the side from the current direction at the call site.

## Import

```tsx

import { Menu, MenuTrigger, MenuPopup, MenuItem, MenuLinkItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuGroup, MenuGroupLabel, MenuSeparator, MenuShortcut, MenuSub, MenuSubTrigger, MenuSubPopup } from '@bilazo/kito/components/menu'

```

## When to use

- A list of commands the user invokes — a row "⋮" menu, a user account menu, an editor toolbar overflow.

- Commands grouped by category — `MenuGroup` + `MenuGroupLabel` with `MenuSeparator` between groups.

- Commands with keyboard shortcuts shown as hints — `MenuShortcut` on the reading-end side.

- A menu of navigation links where the target is a route — use `MenuLinkItem` with `render` to keep the router integration.

- A menu with nested actions — `MenuSub` / `MenuSubTrigger` / `MenuSubPopup` opens a submenu on hover or keyboard activation.

- Multi-select toggles — `MenuCheckboxItem` keeps the menu open after each toggle.

- Single-select options — `MenuRadioGroup` + `MenuRadioItem` closes the menu on selection.

- Contextual actions triggered from a button or icon — not from a right-click (that would be `ContextMenu`, not built yet).

## When NOT to use

- For a list of values the user picks from and expects to see the current value — use `Select`. A menu is a list of commands; a select is a single-value control.

- For a rich panel with inputs, forms, cards, or images — use `Popover`. A menu is for click-to-invoke items, not for interactive content.

- For navigation between top-level pages — use a `<nav>` or tabs. A `Menu` of navigation links is fine inside a user menu, but a horizontal menu of page links is a nav bar in disguise.

- For a right-click context menu — not yet built. `Menu` opens on trigger click only; right-click support is a separate `ContextMenu` component.

- For a non-interactive list — use `Item` or a plain list. A menu is a command surface; using it for static content confuses the keyboard and a11y contract.

- Without a visible trigger that has an `aria-label` (when icon-only) — a bare `<MenuTrigger>` wrapping an icon is announced as "menu button" with no name; the icon must be the trigger’s label or the trigger must have `aria-label`.

- For a menu that should behave like a tab strip — use `Tabs`. A menu is a transient popup; tabs are persistent.

- As the only affordance for a critical action — a menu hides destructive actions one level down. Put the destructive button in plain sight when it is the primary action.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dir` | `'ltr' \| 'rtl'` | — | Direction on the popup subtree. The popup is **portaled to `document.body`**, so it does not inherit `dir` from any wrapper — pass it here when the page’s `<html dir="rtl">` is not set. Also reaches the `Positioner` so a submenu with `align="start"` aligns at the reading-start edge (right in RTL). Same portal exception as `MenuPopup` / `PopoverPopup` / `SelectPopup` / `ComboboxPopup` / `SheetPopup` / `DialogPopup` / `DrawerPopup`. `ContextMenuPopup` / `ContextMenuSubPopup` prop. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom' (MenuPopup) / 'right' (MenuSubPopup)` | Side of the trigger to place the popup on. Sides are **physical** — `left` / `right` do not flip in RTL. `MenuPopup` defaults to `bottom`; `MenuSubPopup` defaults to `right` (assumes LTR). In an RTL page, pass `side="left"` to `MenuSubPopup` — the `MenuSubTrigger` chevron flips automatically (`rtl:-scale-x-100`) to match, so the visual and the semantic direction stay aligned. `MenuPopup` / `MenuSubPopup` prop. |
| `sideOffset` | `number` | `6` | Gap between the trigger and the popup, in pixels. `MenuPopup` defaults to `6`; `MenuSubPopup` to `4` (submenus are usually tighter to their parent item). `MenuPopup` / `MenuSubPopup` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment along the cross axis. `MenuPopup` and `MenuSubPopup` default to `start` — menus anchor at the start of the trigger, not the center. `MenuPopup` / `MenuSubPopup` prop. |
| `alignOffset` | `number` | `0` | Offset along the alignment axis, in pixels. `MenuSubPopup` defaults to `-4` — a small negative offset lifts the submenu so its first item lines up with the parent item’s text rather than its frame. `MenuPopup` / `MenuSubPopup` prop. |
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual treatment. `destructive` renders the item in the destructive color — use for irreversible actions like Delete. Sets `data-variant` on the item for state-aware styling. `MenuItem` / `MenuLinkItem` prop. |
| `inset` | `boolean` | `false` | Adds `ps-8` (a start padding) so a plain menu item’s text aligns with the label of a `MenuCheckboxItem` or `MenuRadioItem` — those carry an indicator at the start, and without `inset` the plain items sit visually off-grid. `MenuItem` / `MenuLinkItem` prop. |
| `closeOnClick` | `boolean` | — | Whether the menu closes when the item is activated. `MenuLinkItem` and `MenuRadioItem` default to `true` — a link or a radio is a single activation. `MenuCheckboxItem` defaults to `false` — a checkbox group is multi-select, and reopening the menu per toggle is the wrong trade. Inherited from Base UI’s primitive. `MenuLinkItem` / `MenuCheckboxItem` / `MenuRadioItem` prop. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the menu from outside. Omit both for an uncontrolled menu. Inherited from Base UI’s `Menu.Root`. `Menu` prop. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger click, Escape, outside click, item activation, and submenu open/close. Inherited from Base UI’s `Menu.Root`. `Menu` prop. |
| `className` | `string` | — | Extra classes on any part. For `MenuPopup`, useful for a fixed width (`w-56`, `w-40`) — the default is `min-w-40` with content-driven growth. For `MenuItem`, per-instance alignment when `inset` is not quite right. |

Fifteen components compose. `Menu` (root) forwards to Base UI’s `Menu.Root` — it renders no DOM of its own (the `data-slot="menu"` prop it receives lands in the Root’s props, not on the DOM; a `[data-slot="menu"]` selector is not available). `MenuTrigger` opens the menu on click — use its `render` prop to render as a `Button` or another control. `MenuPopup` and `MenuSubPopup` are portaled to `document.body`; both default to `align: "start"` because menus anchor at the start of their trigger, not the center. `MenuItem` is a command — it fires `onClick` and closes the menu. `MenuLinkItem` renders a real `<a>` (`BaseMenu.LinkItem`), stays in the roving tab order, and closes the menu on activation (`closeOnClick` defaults to `true`); pass `render` to integrate with a router (`render={<Link to="/x" />}`). `MenuCheckboxItem` and `MenuRadioItem` wrap their indicator in a positioning `<span>` — Base UI’s `CheckboxItemIndicator` / `RadioItemIndicator` toggle their own `display` based on the item state, so they must not carry layout classes; putting `flex` on the indicator would override Base UI’s `display: none` and make the checkmark / dot permanently visible. Checkbox items keep the menu open (`closeOnClick: false`); radio items close it (`closeOnClick: true`). `MenuShortcut` is a decorative hint at `ms-auto` (logical start-auto) — the actual keyboard handler lives outside the component. `MenuSub` is a nested submenu; its chevron on `MenuSubTrigger` flips in RTL (`rtl:-scale-x-100`) so the visual matches the `side="left"` convention for RTL submenus. Sides are **physical** — `left` / `right` do not flip with `dir`. `MenuSubPopup` defaults to `side="right"` (LTR); in RTL, pass `side="left"` explicitly. `MenuGroup`, `MenuGroupLabel`, and `MenuSeparator` are pass-through wrappers. **Portal gotcha:** both popups are portaled, so `dir="rtl"` on an ancestor wrapper does not reach them — pass `dir="rtl"` on `MenuPopup` / `MenuSubPopup` when the page’s `<html dir="rtl">` is not set (same exception as `Tooltip` / `Popover` / `Select` / `Combobox` / `Sheet` / `Dialog` / `Drawer`). `menuItemStyles` and `menuPopupBase` live in `lib/menu-shared.tsx` and are shared with `ContextMenu` (not built yet). `MenuSide`, `MenuAlign`, and `MenuItemVariant` are exported as type-only aliases.

## Composition

### Basic command menu

The canonical pattern: `Menu` with a `MenuTrigger`, a `MenuPopup` with `MenuItem` children, and a `MenuSeparator` to divide destructive actions. Items close the menu on activation by default.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@bilazo/kito/components/menu'

<Menu>
  <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
  <MenuPopup>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuPopup>
</Menu>
```

### Icons and shortcuts

Menu items accept inline SVG icons. `MenuShortcut` renders a right-aligned hint — the actual key handling must be wired elsewhere (a global `keydown` listener or a command palette).

```tsx
import { MenuShortcut } from '@bilazo/kito/components/menu'
import { Edit } from 'lucide-react'

<MenuItem>
  <Edit />
  Rename
  <MenuShortcut>⌘R</MenuShortcut>
</MenuItem>
```

### Submenu

`MenuSub` / `MenuSubTrigger` / `MenuSubPopup` opens a nested menu on hover or keyboard activation. The default `side="right"` places it on the physical right of the parent item (assumes LTR); in an RTL page, pass `side="left"` — the chevron flips automatically to match via `rtl:-scale-x-100`.

```tsx
import { MenuItem, MenuSub, MenuSubPopup, MenuSubTrigger } from '@bilazo/kito/components/menu'

<MenuSub>
  <MenuSubTrigger>Share</MenuSubTrigger>
  <MenuSubPopup>
    <MenuItem>Email</MenuItem>
    <MenuItem>Copy link</MenuItem>
  </MenuSubPopup>
</MenuSub>

{/* In RTL — the chevron flips automatically */}
<MenuSubPopup side="left">…</MenuSubPopup>
```

### Checkbox items — multi-select

`MenuCheckboxItem` toggles one or many options and keeps the menu open (`closeOnClick: false` by default). Pair with `MenuSeparator` to group toggles.

```tsx
import { MenuCheckboxItem } from '@bilazo/kito/components/menu'
import { useState } from 'react'

export function ViewMenu() {
  const [showGrid, setShowGrid] = useState(true)
  return (
    <MenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
      Show grid
    </MenuCheckboxItem>
  )
}
```

### Radio items — single-select

`MenuRadioGroup` + `MenuRadioItem` for a single choice. Selecting an item closes the menu (`closeOnClick: true` by default) — a radio is a single activation.

```tsx
import { MenuGroupLabel, MenuRadioGroup, MenuRadioItem } from '@bilazo/kito/components/menu'

<MenuRadioGroup defaultValue="medium">
  <MenuGroupLabel>Size</MenuGroupLabel>
  <MenuRadioItem value="small">Small</MenuRadioItem>
  <MenuRadioItem value="medium">Medium</MenuRadioItem>
  <MenuRadioItem value="large">Large</MenuRadioItem>
</MenuRadioGroup>
```

### Link items — router integration

`MenuLinkItem` renders a real `<a>`, stays in the roving tab order, and closes the menu on activation. Pass `render` to integrate with any router — the component stays framework-agnostic.

```tsx
import { MenuLinkItem } from '@bilazo/kito/components/menu'

// Plain anchor
<MenuLinkItem href="/profile">Profile</MenuLinkItem>

// TanStack Router
import { Link } from '@tanstack/react-router'
<MenuLinkItem render={<Link to="/profile" />}>Profile</MenuLinkItem>
```

---

_Generated from `apps/web/src/content/menu/meta.ts`. Do not edit directly._


---

# Navigation Menu

> A horizontal navigation bar with hoverable dropdowns.

A horizontal navigation bar with hoverable dropdowns. A single `NavigationMenu` renders one **shared viewport** — moving the pointer between two open triggers slides and resizes the panel rather than unmounting and remounting it, so the whole strip reads as a single menu instead of independent popovers. Built on Base UI’s `NavigationMenu` with `Portal` + `Positioner` + `Popup` + `Viewport` composed internally by `NavigationMenuPositioner` — consumers never wire that chain themselves. The trigger height (`h-9`) matches `Button`’s default so a nav bar and its adjacent actions line up.

## Import

```tsx

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuPositioner, navigationMenuTriggerStyle } from '@bilazo/kito/components/navigation-menu'

```

## When to use

- A top-level site navigation with dropdown sections — Products, Resources, Solutions — where each section reveals a panel with links.

- A marketing or documentation header where the dropdown content is richer than a plain list — icons, descriptions, multi-column layouts.

- A navigation bar where the pointer should slide between open panels instead of one panel closing before the next opens.

- A horizontal menu that must stay sticky under a header or scroll with a subnav — the trigger and the shared viewport layout handle both.

- A nav item that is a plain link (not a dropdown) — render an `<a>` or a router `Link` with `navigationMenuTriggerStyle()` so it visually matches the triggers.

- A bilingual app where the nav direction flips — every part uses logical properties (`ms-1`, `ps-*`) and the chevron rotates 180° (direction-agnostic), so RTL works without per-component code.

## When NOT to use

- For a single dropdown button that opens a command list — use `Menu`. `NavigationMenu` is for a horizontal strip of nav triggers sharing one viewport; a one-off action menu is a `Menu`.

- For a rich panel that the user clicks to open and dismisses by clicking outside — use `Popover`. `NavigationMenu` opens on hover and closes on pointer-leave, which is right for navigation and wrong for interactive content.

- For a vertical sidebar of links — use a `<nav>` with an `Item` list or a `Menu`. `NavigationMenu` is horizontal by design; its viewport math assumes a horizontal trigger strip.

- For a mobile nav that collapses into a drawer — use `Drawer` (or `Sheet`) triggered by a hamburger button. `NavigationMenu` does not collapse automatically; a mobile pattern needs its own affordance.

- For tabbed page content — use `Tabs`. Tabs switch content in place and stay persistent; `NavigationMenu` is a navigation strip whose panels are transient.

- Without router integration — the nav links must actually navigate. `NavigationMenuLink` renders an `<a>`, but to integrate with a router, pass `render={<Link to="…" />}`; without it, clicks trigger a full page reload.

- As the only way to reach critical pages on mobile — a hover-based nav is unusable on touch. Pair it with a mobile navigation pattern (drawer, bottom bar, or a visible menu button).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Horizontal alignment of the shared viewport relative to the active trigger. `start` anchors the viewport’s start edge to the trigger’s start edge — in LTR that is the trigger’s left, in RTL the trigger’s right (Base UI’s `Positioner` reads the direction from the `DirectionProvider` context). `center` and `end` follow the same logical convention. `NavigationMenu` prop. |
| `className` | `string` | — | Extra classes on `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, or `NavigationMenuLink`. Merged with the base classes via `cn()`. For `NavigationMenuContent`, use it for a fixed panel width (`w-80`, `w-96`) — the default is content-driven. For `NavigationMenu`, use it for a custom max-width or a container background. |

Eight components plus one helper compose. `NavigationMenu` (root) renders a `BaseNavMenu.Root` with the positioner as its last child. **`NavigationMenuPositioner` must be a separate component** — Base UI’s context reads through this component boundary, and a `NavigationMenuContent` opening inside a tree where the positioner is not mounted throws "NavigationMenu.Item parts must be used within NavigationMenuItem". `NavigationMenu` renders it automatically; the export is for advanced compositions only (a second nav with a different viewport, a custom positioner). `NavigationMenuPositioner` wraps `Portal` + `Positioner` + `Popup` + `Viewport` internally, and sets `align` / `side` / `sideOffset` defaults (`bottom`, `8`, `start`) — the shared viewport slides between triggers by animating `top` / `left` / `right` / `bottom` on the positioner, which is why pointer movement between two open triggers looks like one panel resizing rather than two independent popups. `NavigationMenuTrigger` renders a `<button>` with a chevron that rotates 180° when the panel is open (`group-data-popup-open/nav-trigger:rotate-180`) — the rotation is direction-agnostic (a 180° turn of a down-chevron is an up-chevron), so no `rtl:-scale-x-100` is needed. `NavigationMenuLink` renders a `BaseNavMenu.Link` (an `<a>`) — use it inside `NavigationMenuContent` for a card-style row, or directly inside `NavigationMenuItem` for a top-level nav link; the `in-data-[slot=navigation-menu-list]:` variants adjust the top-level shape (`h-9 px-3 py-1.5`) to match the trigger. `navigationMenuTriggerStyle` is the exported cva output so consumers can style their own anchor (a router `Link`) to look identical to a trigger. All parts use logical properties (`ms-1`, `ps-*`) so the whole component flips with the page direction. **Portal gotcha:** the positioner is portaled to `document.body`, so `dir="rtl"` on an ancestor wrapper does not reach it — Base UI’s `Positioner` computes `align` from the `DirectionProvider` context, which means the app must provide a `DirectionProvider` (the standard pattern is to mount it once near the app root, the same place `TooltipProvider` goes). Without it, `align="start"` aligns at the physical left in both directions.

## Composition

### Basic nav

A trigger with a content panel of links, plus plain `<a>` nav items styled with `navigationMenuTriggerStyle()` so they read as part of the same strip.

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@bilazo/kito/components/navigation-menu'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-80 gap-1">
          <NavigationMenuLink href="/products/analytics">Analytics</NavigationMenuLink>
          <NavigationMenuLink href="/products/inbox">Inbox</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <a href="/pricing" className={navigationMenuTriggerStyle()}>
        Pricing
      </a>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Router integration

Use `render` on `NavigationMenuLink` (or `navigationMenuTriggerStyle()` on your own Link) to keep the router’s prefetching, client-side navigation, and active-state logic. The Kito component stays framework-agnostic.

```tsx
import { Link } from '@tanstack/react-router'
import { navigationMenuTriggerStyle } from '@bilazo/kito/components/navigation-menu'

// Top-level nav link with the trigger’s look
<Link to="/docs" className={navigationMenuTriggerStyle()}>
  Documentation
</Link>

// Inside the shared viewport
<NavigationMenuLink render={<Link to="/products/analytics" />}>
  Analytics
</NavigationMenuLink>
```

### With icons and descriptions

The shared viewport makes a rich panel natural — an icon in a soft-filled square, a bold label, a muted description. All three share the same hover and focus treatment via `NavigationMenuLink`.

```tsx
import { BarChart3 } from 'lucide-react'
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from '@bilazo/kito/components/navigation-menu'

<NavigationMenuContent>
  <div className="grid w-96 gap-1">
    <NavigationMenuLink href="/analytics">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <BarChart3 />
      </div>
      <div className="flex flex-col">
        <span className="font-medium">Analytics</span>
        <span className="text-xs text-muted-foreground">Realtime traffic and conversions.</span>
      </div>
    </NavigationMenuLink>
  </div>
</NavigationMenuContent>
```

### Multiple menus

Add a second `NavigationMenuItem` with its own trigger and content. The single shared viewport slides between them as the pointer moves — that is what makes the whole strip feel like one menu rather than a set of independent popovers.

```tsx
import { NavigationMenuItem, NavigationMenuTrigger } from '@bilazo/kito/components/navigation-menu'

<NavigationMenuItem>
  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
  <NavigationMenuContent>…</NavigationMenuContent>
</NavigationMenuItem>
```

---

_Generated from `apps/web/src/content/navigation-menu/meta.ts`. Do not edit directly._


---

# Popover

> A panel anchored to a trigger, opened by click.

A panel anchored to a trigger, opened by click. Unlike `Tooltip` — opens on click (not hover), stays open until dismissed (outside click, Escape, or an explicit `PopoverClose`), and its content is fully interactive: inputs, buttons, and links inside work as usual. The popup is portaled and its width defaults to `w-72`. The optional arrow is rendered as a `rotate-45` square with `data-side`-aware borders, so it points toward the trigger on any side. `PopoverHeader` bleeds to the popup edges via negative margins, so its `border-b` reads as a full-width divider rather than a padded bar.

## Import

```tsx

import { Popover, PopoverTrigger, PopoverClose, PopoverPopup, PopoverHeader, PopoverTitle, PopoverDescription } from '@bilazo/kito/components/popover'

```

## When to use

- A richer panel than a Tooltip — a user-info card, a small inline form, a "what's this" callout with a link.

- Click-triggered content that must stay open until dismissed — an account menu, a settings mini-panel, a filter form.

- Interactive popups where the user needs to read, type, or click inside — inputs and buttons inside are reachable by mouse and keyboard.

- An inline edit form anchored to the button that opens it — pair with `Field` and `Input`.

- A dismissable callout — `PopoverClose` in the header gives the user an explicit exit.

- A contextual action that needs a confirmation or a short form, without a full `Dialog` and its modal backdrop.

## When NOT to use

- For a short, non-interactive label — use `Tooltip`. A Popover that only shows text is a Tooltip with extra steps; it blocks a click, and it steals focus.

- For a list of commands — use `Menu`. A Popover with a list of buttons is a menu in disguise; `Menu` gives the right keyboard navigation (arrow keys, typeahead, Escape).

- For a blocking decision — use `Dialog`. A Popover does not trap focus or block the page; it is not the right shape for a modal confirmation.

- For a mobile-first bottom panel — use `Drawer` (or `Sheet` with `side="bottom"`). A Popover anchored to a small trigger is hard to hit on a narrow viewport.

- As the only place to show essential information — a Popover disappears; content that must be readable at a glance belongs on the page.

- Without a `PopoverTitle` — every popover needs an accessible name for screen readers. Base UI wires `PopoverTitle` to `aria-labelledby`; without one, the popup is announced as "dialog" with no context.

- Nested more than one level deep — a Popover inside a Popover is supported by Base UI but confuses focus and outside-click detection. Flatten the flow or use a `Dialog`.

- For content that must persist across route changes — use a route. A Popover lives in the render tree; navigation unmounts it.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Side of the trigger to place the popup on. The sides are **physical** — `left` / `right` do not flip in RTL. In an app that serves both LTR and RTL pages, choose the side from the current direction (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a logical alias. The arrow follows the side automatically. |
| `sideOffset` | `number` | `4` | Gap between the trigger and the popup, in pixels. `4` matches `Tooltip`, but a Popover usually wants a bit more breathing room — pass `8` for a wider gap. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the popup relative to the trigger along the cross axis. `center` matches `Tooltip`; use `start` / `end` for a popup that should anchor to one edge of the trigger (a user-info card anchored to the right edge of an avatar, for example). |
| `alignOffset` | `number` | `0` | Offset along the alignment axis, in pixels. |
| `showArrow` | `boolean` | `true` | Render a small arrow pointing at the trigger. The arrow is a `rotate-45` square whose two visible borders depend on which side the popup is on — the diamond reads as a triangle pointing toward the trigger. Set to `false` for a plain panel (an inline edit form, an anchored card with its own elevation). |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the popover from outside (an external button, a store, a route change). Omit both for an uncontrolled popover. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger click, `PopoverClose`, Escape, and outside click. |
| `modal` | `boolean` | `false` | Whether the popover traps focus and blocks interaction with the page behind it. Kito defaults to `false` — a Popover is an interactive panel, not a modal; the user may want to click a field on the page while the popover is open. Set to `true` for the rare case where the popover is a full-form dialog-lite. |
| `className` | `string` | — | Extra classes on any part. For `PopoverPopup`, useful for a width override (`w-80`, `w-96`) — the default is `w-72`. For `PopoverHeader`, use it to remove the full-width divider (the `border-b` and negative margins are the default header look). |

Seven components compose. `Popover` (root) forwards to Base UI’s `Popover.Root` — it renders no DOM of its own (the `data-slot="popover"` prop it receives lands in the Root’s props, not the DOM; a `[data-slot="popover"]` selector is not available). `PopoverTrigger` and `PopoverClose` are Base UI’s `Trigger`/`Close` with `data-slot`; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `PopoverPopup` is portaled to `document.body`, default width `w-72`, with a scale + fade animation from the positioner’s transform origin. `PopoverHeader` bleeds to the popup edges via `-mx-4 -mt-4` (canceling the popup’s `p-4`) — its `border-b` then reads as a full-width divider rather than an inset bar. **The negative margins depend on the popup NOT having `overflow: hidden`** — a future change that adds it would clip the header. `PopoverTitle` becomes `aria-labelledby` and `PopoverDescription` becomes `aria-describedby` on the popup automatically. `PopoverArrow` is internal; it uses `ArrowShape` from `tooltip/tooltip` for the shared diamond shape, and adds per-side border classes so the arrow points toward the trigger. Sides are **physical** — `left` / `right` do not flip in RTL, so an app serving both directions picks the side from the current direction at the call site. **Portal + RTL:** the popup is portaled to `document.body`, so `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir="rtl"` on `PopoverPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup` / `SelectPopup` / `ComboboxPopup`).

## Composition

### Basic

The canonical pattern: `Popover` with a `PopoverTrigger`, a `PopoverPopup` with a `PopoverHeader` (title + description) and body. The popup opens on click and stays open until the user clicks outside, presses Escape, or clicks a `PopoverClose`.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Show details</PopoverTrigger>
  <PopoverPopup>
    <PopoverHeader>
      <PopoverTitle>Your plan: Pro</PopoverTitle>
      <PopoverDescription>Based on the last 12 months of usage.</PopoverDescription>
    </PopoverHeader>
    <p className="text-sm text-muted-foreground">
      Pro includes unlimited projects, 100 GB storage, and priority support.
    </p>
  </PopoverPopup>
</Popover>
```

### Interactive form

Popover content is fully interactive — put a `Field` and `Input` inside for an inline edit form. Pair the cancel button with `PopoverClose` so the popup closes on cancel.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Edit name</PopoverTrigger>
  <PopoverPopup className="w-80">
    <PopoverHeader>
      <PopoverTitle>Display name</PopoverTitle>
      <PopoverDescription>Shown on your profile and comments.</PopoverDescription>
    </PopoverHeader>
    <Field name="name">
      <FieldLabel className="sr-only">Name</FieldLabel>
      <Input placeholder="Your name" />
    </Field>
    <div className="flex justify-end gap-2">
      <PopoverClose render={<Button variant="ghost" size="sm" />}>Cancel</PopoverClose>
      <Button size="sm">Save</Button>
    </div>
  </PopoverPopup>
</Popover>
```

### Dismissable callout

A `PopoverClose` rendered as a ghost icon button in the header gives the user an explicit way to dismiss — useful for onboarding tips and "what's this" panels.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>What is this?</PopoverTrigger>
  <PopoverPopup className="w-96">
    <div className="flex items-start justify-between gap-4">
      <PopoverHeader>
        <PopoverTitle>Real-time sync</PopoverTitle>
        <PopoverDescription>Changes propagate instantly.</PopoverDescription>
      </PopoverHeader>
      <PopoverClose render={<Button variant="ghost" size="icon-sm" aria-label="Dismiss" />}>
        {/* X icon */}
      </PopoverClose>
    </div>
    <p className="text-sm text-muted-foreground">
      Sync uses WebSocket for active sessions.
    </p>
  </PopoverPopup>
</Popover>
```

### Controlled

Pass `open` and `onOpenChange` to drive the open state from outside. The trigger stays inside `Popover` so Base UI knows what to anchor the popup to — but the state can be changed from anywhere (a store, an external button).

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'
import { useState } from 'react'

export function Controlled() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>
        <PopoverPopup>
          <PopoverTitle>Controlled</PopoverTitle>
        </PopoverPopup>
      </Popover>
      <Button onClick={() => setOpen((v) => !v)}>Toggle from outside</Button>
    </>
  )
}
```

### Without an arrow

Pass `showArrow={false}` for a plain panel. Use it when the popup opens flush against the trigger, or when the arrow would just add noise (an inline form, a settings mini-panel).

```tsx
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>No arrow</PopoverTrigger>
  <PopoverPopup showArrow={false} className="w-80">
    <PopoverHeader>
      <PopoverTitle>Without an arrow</PopoverTitle>
      <PopoverDescription>A plain panel for cases where a pointer would add noise.</PopoverDescription>
    </PopoverHeader>
  </PopoverPopup>
</Popover>
```

---

_Generated from `apps/web/src/content/popover/meta.ts`. Do not edit directly._


---

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


---

# Radio

> A group of mutually-exclusive options.

A group of mutually-exclusive radio options. `RadioGroup` owns the shared value; each `Radio` inside it is one option. Base UI handles arrow-key navigation, roving tabindex, and the shared `name` for form submission — no manual wiring is needed. `size` is inherited from the group via a React context, so one prop on `RadioGroup` sets the size of every option (an individual `Radio` can still override it). The selected indicator is centered with flexbox, not a `translate` transform, so it is direction-agnostic by construction. The root carries a symmetric `after:-inset-3` pseudo-element that extends the click area to a 44×44 WCAG AAA touch target.

## Import

```tsx

import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

```

## When to use

- Choose exactly one option from a short list of mutually-exclusive choices — 2 to 7 options is the typical range.

- When all options should be visible at once — a payment method, a plan tier, a subscription length.

- When the choice has no immediate effect and applies only when the form is submitted — checkout, onboarding, settings.

- When users need to compare options side by side — a Select hides the non-selected ones; a Radio group keeps the whole list on screen.

- Inside a `<FieldSet>` with a `<FieldLegend>` when the group needs a visible heading, and each option needs a description via `Field`/`FieldContent`/`FieldDescription`.

- In a form where the group has a `name` and participates in submission — Base UI sets the hidden `name`/`value` pair automatically.

## When NOT to use

- When multiple options can be selected — use `Checkbox`. A radio group that lets you pick two options violates the ARIA pattern and confuses screen readers.

- For an on/off setting with immediate effect — use `Switch`. A radio group that has only two options and applies changes immediately is a switch in disguise.

- For a single yes/no choice in a form — use a single `Checkbox`. A radio group of one option is never the right shape.

- For a long list of options (ten or more) — use `Select` or `Combobox`. A long radio list dominates the page and makes comparison harder, not easier.

- For a primary action or navigation — use `Button` or `Link`. Radios are choices, not commands.

- Without a group-level accessible name — every `RadioGroup` needs `aria-label` (short) or `aria-labelledby` (visible heading). A group of radios without a name is announced as "group" with no context.

- As a bare inline control with no label — every `Radio` needs an accessible name from an adjacent `<Label htmlFor>` or from the surrounding `<Field>` or an `aria-label`. A radio with no name is announced only as "radio, checked" with no information about what it selects.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout of the options. `vertical` stacks them with `gap-2 flex-col` — the default for forms. `horizontal` uses `gap-4 flex-row flex-wrap items-center`, with a wider gap so adjacent labels do not crowd. The orientation also shows up as `data-orientation` for downstream styling. `RadioGroup` prop. |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the radio circles. Set on `RadioGroup` to apply to every option through `RadioSizeContext`: `sm` is `size-4` (16px), `md` is `size-5` (20px). An individual `Radio` can override it by passing its own `size`. The indicator dot scales with it (`size-2` for `sm`, `size-2.5` for `md`). `RadioGroup` prop. |
| `value` | `string` | — | Controlled selected value on the group. Pass with `onValueChange` for a controlled radio group; omit both for an uncontrolled one (then use `defaultValue`). Inherited from Base UI’s `RadioGroup`. `RadioGroup` prop. |
| `onValueChange` | `(value: string, eventDetails: ...) => void` | — | Change callback on the group. Fires with the newly-selected value — no `event.target.value` unwrap needed. Inherited from Base UI’s `RadioGroup`. `RadioGroup` prop. |
| `size` | `'sm' \| 'md'` | — | Override the group’s size for one radio. When omitted, inherits from `RadioGroup` via `RadioSizeContext` (falls back to `md` if the radio is outside any group, though Base UI throws at runtime in that case anyway). `Radio` prop. |
| `value`* | `string` | — | The value this specific option contributes when selected. Required — Base UI throws a runtime error on a `Radio` without it, because the group needs to know which option is on. Read it back from the group’s `value` / `onValueChange`, not from the individual radio. `Radio` prop. |
| `disabled` | `boolean` | — | Disables this option — the user cannot select it, and arrow keys skip it. The root gets `data-disabled` (`cursor-not-allowed opacity-50`). To disable the whole group, pass `disabled` on `RadioGroup` instead. `Radio` prop. |
| `aria-invalid` | `boolean` | — | Marks this option as invalid. Applies the destructive border via `data-invalid:border-destructive`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control automatically — both selectors are styled. `Radio` prop. |
| `className` | `string` | — | Extra classes on `RadioGroup` or `Radio`. Merged with the base classes via `cn()`. |

Two components are exported as values: `RadioGroup` (wraps Base UI’s `RadioGroup`) and `Radio` (wraps Base UI’s `Radio.Root` with a `Radio.Indicator` inside). `RadioSize` and `RadioOrientation` are internal type aliases, not exported. The `orientation` prop is consumed by Kito for the cva class and the `data-orientation` attribute — it is not passed through to Base UI, which is why the test suite covers `data-orientation` and visual layout but not horizontal arrow-key navigation. `size` on `RadioGroup` is stored in `RadioSizeContext` and read by every `Radio` inside; a `Radio` with its own `size` overrides it. Every `RadioGroup` MUST have an accessible name via `aria-label` (short) or `aria-labelledby` (visible heading) — the type system cannot enforce this, so the docs and examples always pair the group with one. `Radio.value` is genuinely required (Base UI throws without it) and is marked required in the props table. `RadioProps<Value>` is generic so a strongly-typed `value` (an enum, a union) survives the composed props — the only generic export in the library so far.

## Composition

### Basic group

The canonical pattern: `RadioGroup` with `defaultValue` and `aria-label`, each option is a `Radio` + `Label` pair with matching `htmlFor` / `id`. Base UI handles arrow-key navigation and the shared `name`.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<RadioGroup defaultValue="medium" aria-label="Level">
  <div className="flex items-center gap-2">
    <Radio value="beginner" id="r1" />
    <Label htmlFor="r1">Beginner</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="medium" id="r2" />
    <Label htmlFor="r2">Medium</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="advanced" id="r3" />
    <Label htmlFor="r3">Advanced</Label>
  </div>
</RadioGroup>
```

### Controlled

Pass `value` and `onValueChange` on the group to drive the state from outside. Read the selected value from the group’s state, not from the individual radios.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'
import { useState } from 'react'

export function Controlled() {
  const [plan, setPlan] = useState('monthly')
  return (
    <RadioGroup value={plan} onValueChange={(value) => setPlan(value as string)} aria-label="Billing cycle">
      <div className="flex items-center gap-2">
        <Radio value="monthly" id="c-monthly" />
        <Label htmlFor="c-monthly">Monthly — $12</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="yearly" id="c-yearly" />
        <Label htmlFor="c-yearly">Yearly — $120</Label>
      </div>
    </RadioGroup>
  )
}
```

### Horizontal group

Pass `orientation="horizontal"` for a row layout. The `gap-4` and `flex-wrap` keep adjacent labels from crowding and let the row wrap on narrow viewports.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<RadioGroup defaultValue="credit" orientation="horizontal" aria-label="Payment method">
  <div className="flex items-center gap-2">
    <Radio value="credit" id="h-credit" />
    <Label htmlFor="h-credit">Credit card</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="paypal" id="h-paypal" />
    <Label htmlFor="h-paypal">PayPal</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="crypto" id="h-crypto" />
    <Label htmlFor="h-crypto">Crypto</Label>
  </div>
</RadioGroup>
```

### Inside a FieldSet with descriptions

Wrap the group in a `FieldSet` with a `FieldLegend` for a visible heading. Each option becomes a `Field orientation="horizontal"` with a `FieldContent` that holds the label and description — Base UI wires the labels to their controls automatically, so no `htmlFor` is needed inside the field.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@bilazo/kito/components/field'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<FieldSet className="w-full max-w-md">
  <FieldLegend>Plan</FieldLegend>
  <RadioGroup defaultValue="pro" aria-label="Plan">
    <Field orientation="horizontal">
      <Radio value="starter" id="plan-starter" />
      <FieldContent>
        <FieldLabel htmlFor="plan-starter">Starter</FieldLabel>
        <FieldDescription>For hobby projects and experiments.</FieldDescription>
      </FieldContent>
    </Field>
    <Field orientation="horizontal">
      <Radio value="pro" id="plan-pro" />
      <FieldContent>
        <FieldLabel htmlFor="plan-pro">Pro</FieldLabel>
        <FieldDescription>For professional developers and small teams.</FieldDescription>
      </FieldContent>
    </Field>
  </RadioGroup>
</FieldSet>
```

### Sizes inherited from the group

Set `size` on `RadioGroup` to apply it to every option. An individual `Radio` can override it with its own `size` prop — useful for a "one option stands out" case, though rare.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

<RadioGroup defaultValue="a" size="sm" aria-label="Small">
  <div className="flex items-center gap-2">
    <Radio value="a" id="size-sm-a" />
    <Label htmlFor="size-sm-a">Small</Label>
  </div>
</RadioGroup>
```

---

_Generated from `apps/web/src/content/radio/meta.ts`. Do not edit directly._


---

# ScrollArea

> Augments native scroll functionality for custom, cross-browser styling.

A native scroll container with consistent, themeable scrollbar styling. Renders Base UI’s `Root` + `Viewport` + a vertical `ScrollBar` + `Corner` automatically — give the root a size and the viewport fills it. Native scrolling keeps working: `overflow: auto`, momentum on touch, keyboard scrolling (arrows, Page Up/Down, Home/End). What ScrollArea adds is a styleable scrollbar that does not depend on the OS-chrome look of `::-webkit-scrollbar`. For horizontal scrolling, add a second `ScrollBar` explicitly with `orientation="horizontal"`. Both scrollbars use logical positioning (`border-s`, `border-t`), so the layout flips correctly in RTL without extra classes.

## Import

```tsx

import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

```

## When to use

- A fixed-height list that scrolls — a member list, a log viewer, a settings panel — where the OS scrollbar would break the design.

- A media carousel or a card strip that scrolls horizontally — add a `ScrollBar orientation="horizontal"`.

- A wide table that must fit a narrow container — add both a vertical (default) and a horizontal scrollbar for bidirectional scrolling.

- A chat thread, an audit log, or any list where the scrollbar should be subtle and consistent across browsers.

- Anywhere the default OS scrollbar would clash with the design system’s neutral palette and radius.

- A scroll container that is itself rounded and bordered — the viewport’s `rounded-[inherit]` clips content to the same corners.

## When NOT to use

- For a single div that never needs a custom scrollbar — use a plain `overflow-y-auto` div. ScrollArea adds a wrapper, a viewport, a scrollbar, and a corner; a few lines of utility classes are simpler when the OS chrome is acceptable.

- For a full-page scroll — the page itself scrolls; wrapping it in a ScrollArea would create a nested scroll context and trap the page scroll.

- For an element whose height is not fixed — ScrollArea needs a bounded height (`h-64`, `max-h-96`, `h-full` inside a sized parent) or the viewport grows to fit its content and there is nothing to scroll.

- Inside another ScrollArea of the same axis — nested scroll containers confuse wheel and touch scrolling. Pick one scroll context per axis.

- For a virtualized long list — use a virtualization library (TanStack Virtual, react-window) and style its outer container. ScrollArea alone renders every child, which is fine for ~100 rows but not for thousands.

- As a replacement for `overflow: hidden` — ScrollArea is for scrolling content, not for clipping. Use a plain div with `overflow-hidden` for a mask.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Axis of the scrollbar. `ScrollBar` renders one vertical scrollbar by default; pass `orientation="horizontal"` for a second one. `ScrollArea` itself always renders a vertical scrollbar and the corner automatically — horizontal scrollbars must be added explicitly inside `ScrollArea`’s children. `ScrollBar` prop. |
| `className` | `string` | — | Extra classes on `ScrollArea` or `ScrollBar`. For `ScrollArea`, must include a size (`h-64`, `max-h-96`, `w-80`) — the viewport fills whatever height and width the root gets. For `ScrollBar`, use it to restyle the track (the thumb uses `[&_[data-slot=scroll-area-thumb]]` from the consumer side). |

Two components are exported. `ScrollArea` renders a `BaseScrollArea.Root` containing a `Viewport`, a vertical `ScrollBar`, and a `Corner` — the corner is a small fill at the intersection of the two scrollbars, so it only appears when a horizontal scrollbar is present. `Viewport` uses `size-full rounded-[inherit]` so it fills the root and clips content to the root’s corners — a `rounded-lg` on `ScrollArea` therefore rounds the scrolling content too. Horizontal scrolling needs an explicit `<ScrollBar orientation="horizontal" />` child; the default only covers vertical. `ScrollBar`’s thumb is `bg-border` and grows on hover, matching the neutral palette without a dedicated scrollbar token — restyle by passing `className` on `ScrollBar` or with the `[&_[data-slot=scroll-area-thumb]]` selector from the consumer side. The vertical scrollbar uses `border-s` (logical) and sits at the inline-end; in RTL it moves to the physical left automatically. `touch-none` on the scrollbar prevents a touch drag on the thumb from being interpreted as a page scroll — do not remove it. No cva output is exported, no own-props interface is needed (both components forward Base UI’s props directly), and `orientation` is the only documented default Kito sets.

## Composition

### Basic

Give the root a fixed size (`h-64`, `w-80`, or both). The viewport fills it. The scrollbar appears only when the content overflows.

```tsx
import { ScrollArea } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="h-64 w-80 rounded-lg border border-border p-4">
  <div className="flex flex-col gap-3 text-sm">
    {Array.from({ length: 25 }, (_, i) => (
      <p key={i}>Line {i + 1}. Lorem ipsum…</p>
    ))}
  </div>
</ScrollArea>
```

### Horizontal scroll

Add an explicit `ScrollBar` with `orientation="horizontal"` for a card strip or a carousel. Both scrollbars can coexist when content overflows on both axes.

```tsx
import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="w-full max-w-lg rounded-lg border border-border p-4">
  <div className="flex gap-4">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="size-32 shrink-0 rounded-lg bg-muted" />
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Both axes — wide table

For a wide table inside a fixed-size container, add a horizontal scrollbar alongside the default vertical one. The corner (rendered automatically) fills the gap between the two scrollbars.

```tsx
import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="h-72 w-80 rounded-lg border border-border">
  <div className="p-4" style={{ width: 800 }}>
    <table className="w-full text-sm">…</table>
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Scrollable list

A fixed-height list of rows — members, messages, log lines. Combine with `Avatar`, `Badge`, or any row-level component; the scrollbar is the only extra DOM node.

```tsx
import { ScrollArea } from '@bilazo/kito/components/scroll-area'

<ScrollArea className="h-72 w-80 rounded-lg border border-border">
  <div className="flex flex-col divide-y divide-border">
    {members.map((m) => (
      <div key={m.id} className="flex items-center gap-3 p-3">
        {/* row content */}
      </div>
    ))}
  </div>
</ScrollArea>
```

---

_Generated from `apps/web/src/content/scroll-area/meta.ts`. Do not edit directly._


---

# Select

> A dropdown for choosing one option from a list.

A dropdown for choosing one option from a list. `Select` renders no DOM of its own — it manages the value and open state; the visible parts are `SelectTrigger`, `SelectValue`, `SelectPopup`, and `SelectItem`, plus `SelectGroup`, `SelectGroupLabel`, and `SelectSeparator` for grouped lists. Passing `items` as `{ value, label }[]` or `Record<value, label>` lets `SelectValue` display the selected item’s label without a manual lookup. The trigger shares the `--control-*` height tokens with `Input` and `Button`, so a select and an input line up in the same form row. The popup is portaled and its width matches the trigger via `min-w-(--anchor-width)`.

## Import

```tsx

import { Select, SelectTrigger, SelectValue, SelectPopup, SelectItem, SelectGroup, SelectGroupLabel, SelectSeparator } from '@bilazo/kito/components/select'

```

## When to use

- Pick one option from a list of 5 to ~15 — long enough that a list of Radio buttons dominates the page, short enough that a search field is overkill.

- When the option list is static and known — language, plan, country, timezone.

- Inside a `Field` for a labelled form row — `Field` provides the label and layout; `SelectTrigger` fills the field width.

- When the current selection should stay visible after the popup closes — the trigger always shows the label, unlike a menu item that disappears.

- For a grouped list — `SelectGroup` with `SelectGroupLabel` and `SelectSeparator` between sections.

- When the trigger needs to behave like a form control — `role="combobox"`, arrow keys open, Home/End jump to ends, Enter selects, Escape closes.

- When the popup is taller than the trigger and needs to escape parent `overflow: hidden` — the popup is portaled, so it is never clipped.

## When NOT to use

- For more than ~15 options — use `Combobox`. The list becomes a scrollable wall; a combobox has a filter input.

- For multi-select — use `Combobox` with `multiple`. A `Select` is single-value.

- For search-as-you-type — use `Combobox`. `Select` has no filter input; the user must scroll.

- For fewer than ~5 options — use `Radio`. A dropdown hides options the user could have seen at a glance.

- For navigation between pages — use a `Menu` with `Link` items, or the page’s own nav. A `Select` whose `onValueChange` calls `router.push` is a menu in disguise and loses the router’s prefetching and back-button integration.

- Without an accessible name — every select needs an `aria-label`, or a `Field` / `Label` pairing with `htmlFor`. A bare trigger is announced as "combobox, collapsed" with no context.

- As the only way to enter a free-text value — use `Input`. A `Select` restricts the user to the options provided.

- Inside a `<Field>` whose label is the only visible text — make sure the `Field` wraps `SelectTrigger`, not `Select`. The label’s `htmlFor` must reach the trigger element.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `readonly { value: string; label: ReactNode }[] \| Record<string, ReactNode>` | — | The option list. Passing it lets `SelectValue` display the selected item’s label without a manual lookup — you do not have to render `LANGUAGES.find(l => l.value === value)?.label`. Accepts either an array of `{ value, label }` or a `Record<value, label>`. Inherited from Base UI’s `Select.Root`. `Select` prop. |
| `value` | `unknown` | — | Controlled value. Pass with `onValueChange` for a controlled select; omit both for an uncontrolled one (then use `defaultValue`). The type is generic so a strongly-typed value (a string union, an enum) survives the composed props. `Select` prop. |
| `onValueChange` | `(value: unknown, eventDetails: ...) => void` | — | Change callback. Fires when the user selects an option; receives the selected value directly. `Select` prop. |
| `defaultValue` | `unknown` | — | Initial value for an uncontrolled select. Ignored when `value` is passed. `Select` prop. |
| `disabled` | `boolean` | — | Disables the whole select — the trigger gets `data-disabled` (`cursor-not-allowed opacity-50`) and cannot be opened. To disable a single option, pass `disabled` on the `SelectItem`. `Select` prop. |
| `size` | `'sm' \| 'md'` | `'md'` | Height of the trigger. `sm` is `h-(--control-sm)` (32px) with `text-sm`; `md` is `h-(--control-md)` (40px) with `text-sm`. Shares the tokens with `Input` and `Button`, so a select and an input sit in the same row at matching heights. `SelectTrigger` prop. |
| `sideOffset` | `number` | `6` | Gap between the trigger and the popup, in pixels. Kito’s default of `6` leaves a small visual breath; pass `0` for a flush dropdown. `SelectPopup` prop. |
| `alignItemWithTrigger` | `boolean` | `false` | When `true`, the popup is positioned so the selected item lines up with the trigger’s value text (a native macOS feel). Kito defaults to `false` for a flat web dropdown: the popup opens below the trigger, cannot be clipped by the top of the viewport, and reads consistently with everything else in a web UI. Pass `true` for a native-feeling picker. `SelectPopup` prop. |
| `placeholder` | `ReactNode` | — | Shown by `SelectValue` when nothing is selected. Rendered in `text-muted-foreground` via the `data-placeholder` attribute that Base UI sets on the value element. `SelectValue` prop. |
| `className` | `string` | — | Extra classes on any part. For `SelectPopup`, useful for `w-(--anchor-width)` overrides or a fixed width; for `SelectTrigger`, a width cap when the trigger would otherwise fill a wide container. |

Eight components compose. `Select` (root) renders no DOM — it forwards to Base UI’s `Select.Root` and manages the value and open state. `SelectTrigger` renders a `<button>` with `role="combobox"` and shows the value + a rotating chevron (`group-data-[popup-open]/select-trigger:rotate-180`). `SelectValue` reads its label from the `items` prop passed to the root — no manual lookup is needed. `SelectPopup` is portaled to `document.body` and its width matches the trigger (`min-w-(--anchor-width)`), so it escapes any parent `overflow: hidden`; it closes on outside click, Escape, or selection. `SelectItem` highlights via `data-highlighted:*` (Base UI sets the attribute) and shows a checkmark at `end-2` (a logical property, so it flips to the correct side in RTL). `SelectGroup` / `SelectGroupLabel` / `SelectSeparator` are pass-through wrappers. `triggerStyles`, `ChevronDownIcon`, and `CheckIcon` are internal — no cva output is exported (unlike `Input`). **Portal gotcha:** the popup is portaled, so `dir="rtl"` on an ancestor wrapper does not reach it — the popup’s `ps-3 pe-8` / `end-2` (logical padding on items, logical position on the checkmark) resolve to the wrong side without a `dir` ancestor. Pass `dir="rtl"` on `SelectPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup`). The `alignItemWithTrigger` default is `false` in Kito (Base UI’s own default is `true`) — this is a deliberate choice for a flat web dropdown.

## Composition

### Basic

The canonical pattern: `Select` with an `items` array, a `defaultValue`, a `SelectTrigger` with `SelectValue`, and a `SelectPopup` with `SelectItem` children. The `items` prop lets `SelectValue` display the selected label without a manual lookup.

```tsx
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

<Select items={LANGUAGES} defaultValue="en">
  <SelectTrigger>
    <SelectValue placeholder="Choose a language" />
  </SelectTrigger>
  <SelectPopup>
    {LANGUAGES.map((l) => (
      <SelectItem key={l.value} value={l.value}>
        {l.label}
      </SelectItem>
    ))}
  </SelectPopup>
</Select>
```

### Inside a Field

Wrap the `Select` in a `Field` with a `FieldLabel`. The trigger fills the field width, matching `Input`. Base UI wires the label automatically through its context — `htmlFor` on `FieldLabel` is not needed inside a `Field`.

```tsx
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

<Field name="language">
  <FieldLabel>Language</FieldLabel>
  <Select items={LANGUAGES} defaultValue="en">
    <SelectTrigger>
      <SelectValue placeholder="Choose a language" />
    </SelectTrigger>
    <SelectPopup>
      {LANGUAGES.map((l) => (
        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
      ))}
    </SelectPopup>
  </Select>
</Field>
```

### Grouped options

Use `SelectGroup` with `SelectGroupLabel` for a visible heading and `SelectSeparator` between groups. Group labels are not focusable and are skipped by keyboard navigation.

```tsx
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

<Select items={ITEMS} defaultValue="en">
  <SelectTrigger>
    <SelectValue placeholder="Choose a language" />
  </SelectTrigger>
  <SelectPopup>
    <SelectGroup>
      <SelectGroupLabel>European</SelectGroupLabel>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="fr">French</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectGroupLabel>Middle Eastern</SelectGroupLabel>
      <SelectItem value="fa">Persian</SelectItem>
    </SelectGroup>
  </SelectPopup>
</Select>
```

### Controlled

Pass `value` and `onValueChange` to drive the state from outside. The generic on `Select<Value>` preserves the value type — a string union or an enum survives without a cast.

```tsx
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'
import { useState } from 'react'

export function Controlled() {
  const [value, setValue] = useState('en')
  return (
    <Select items={LANGUAGES} value={value} onValueChange={(v) => setValue(v as string)}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
```

### Sizes

`sm` and `md` share the `--control-*` tokens with `Input` and `Button`. Use `sm` in dense toolbars, `md` in form rows — the default matches `Input` height.

```tsx
import { Select, SelectTrigger, SelectValue } from '@bilazo/kito/components/select'

<SelectTrigger size="sm">…</SelectTrigger>
<SelectTrigger size="md">…</SelectTrigger>
```

---

_Generated from `apps/web/src/content/select/meta.ts`. Do not edit directly._


---

# Separator

> A thin line used to visually separate groups of content.

A thin line used to visually separate groups of content. Renders horizontally by default and can also stand as a vertical divider inside a flex row. Three line styles (`solid`, `dashed`, `dotted`) cover the visual range; the `decorative` prop switches the element between purely visual (`role="none"`, the default) and a semantic boundary (`role="separator"`) announced by assistive technology.

## Import

```tsx

import { Separator } from '@bilazo/kito/components/separator'

```

## When to use

- Between two related but distinct groups of content — a settings section and the one below it, a list of items and its footer.

- As a vertical divider inside a toolbar, a nav row, or a metadata list where two clusters need a visible break.

- To separate metadata that sits in a row and would otherwise bleed together — a filename and its size, a label and its value.

- With `decorative={false}` when the boundary carries semantic meaning for assistive technology — for example, between two groups of toolbar controls.

## When NOT to use

- As a vertical rhythm primitive — real content spacing belongs to `gap`, `padding`, or `margin` on the container. A line between every section is visual noise; spacing alone usually reads cleaner.

- Between form fields — `Field` and `FieldGroup` already carry the vertical spacing; a separator between each field is redundant and makes a form look like a settings panel.

- Inside a paragraph or sentence — use an inline character (`,`, `·`, `|`) or spacing. A block-level separator breaks the line box.

- When a CSS `border-t` / `border-b` (or `border-l` / `border-r`) on an existing container would do — if the line is a border of an existing element, use the utility class instead of adding an extra DOM node.

- To convey status, category, or emphasis — a line is decorative. Use `Badge`, colored `Text`, or an icon when the difference carries meaning.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Axis of the line. Horizontal renders `h-px w-full`; vertical renders `w-px self-stretch` so it fills the height of a flex row. `aria-orientation` is set to match. |
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Visual style. `solid` paints a background line; `dashed` and `dotted` switch to a `border-t` (or `border-l` when vertical) so the browser renders the dash pattern. |
| `decorative` | `boolean` | `true` | When `true` (the default), the separator is purely visual: `role="none"` and hidden from assistive technology. Set to `false` when the boundary is semantically meaningful — assistive technology then announces it as a separator. |
| `className` | `string` | — | Extra classes. Merged with the variant classes via `cn()` — commonly used to set an explicit height (`h-8`) or a margin (`mx-1`) when the separator sits inside a toolbar. |

The underlying element is Base UI’s `Separator`. Kito overrides Base UI’s default `role` handling: Base UI ships `role="separator"` by default and lets consumers opt out, while Kito hides the element from assistive technology by default (`decorative={true}` → `role="none"`) and requires an explicit `decorative={false}` to be announced. The reasoning is that most separators in a UI are purely visual rhythm and should not add noise to a screen reader’s reading order. `SeparatorStyles` is not exported — a separator almost never needs to be restyled for another element; if that becomes necessary, export the cva output the way `Input` does with `inputStyles`.

## Composition

### Section break inside a card

The most common use: a horizontal line between two groups of content that share a container. Keep the surrounding `space-y-*` — the separator is the visible cue, not the spacing primitive.

```tsx
import { Separator } from '@bilazo/kito/components/separator'

<div className="max-w-sm space-y-4 rounded-lg border border-border p-4">
  <div className="space-y-1">
    <p className="text-sm font-medium">Billing</p>
    <p className="text-sm text-muted-foreground">Manage your plan and invoices.</p>
  </div>
  <Separator />
  <div className="space-y-1">
    <p className="text-sm font-medium">Team</p>
    <p className="text-sm text-muted-foreground">Invite members and manage roles.</p>
  </div>
</div>
```

### Vertical divider in a toolbar

Inside a flex row, `orientation="vertical"` stretches to the row height. Give it a fixed height (`h-8`) when the row is taller than the controls so the line does not run edge-to-edge.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Separator } from '@bilazo/kito/components/separator'

<div role="toolbar" aria-label="Alignment" className="flex items-center gap-1 rounded-md border border-border p-1">
  <Button size="sm" variant="ghost" aria-label="Left">Left</Button>
  <Button size="sm" variant="ghost" aria-label="Center">Center</Button>
  <Button size="sm" variant="ghost" aria-label="Right">Right</Button>
  <Separator orientation="vertical" decorative={false} className="mx-1 h-8" />
  <Button size="sm" variant="ghost">Reset</Button>
</div>
```

### Semantic boundary

Pass `decorative={false}` when the boundary matters to assistive technology — for example, between two clusters of controls that a screen reader should treat as separate groups.

```tsx
import { Separator } from '@bilazo/kito/components/separator'

<div role="toolbar" aria-label="Formatting">
  {/* …text-style controls… */}
  <Separator orientation="vertical" decorative={false} />
  {/* …alignment controls… */}
</div>
```

### Dashed and dotted dividers

`dashed` and `dotted` render as a border so the browser produces the pattern. Use them for lower emphasis than a solid line — a footnote divider, a “more” separator.

```tsx
import { Separator } from '@bilazo/kito/components/separator'

<div className="space-y-3 text-sm">
  <p>Body copy.</p>
  <Separator variant="dashed" />
  <p className="text-muted-foreground">Footnote.</p>
</div>
```

---

_Generated from `apps/web/src/content/separator/meta.ts`. Do not edit directly._


---

# Sheet

> A slide-in panel anchored to one edge of the viewport.

A slide-in panel anchored to one edge of the viewport. Shares its primitive with `Dialog` — the same focus trapping, scroll locking, Escape-to-close, and outside-click-to-close behavior — only the shell differs: Dialog is centered, Sheet is anchored. `side` accepts logical values (`start`, `end`) so the panel flips automatically in RTL, plus the physical `top` and `bottom` for action sheets. The popup is padding-free on purpose: padding lives on each section (`SheetHeader`, `SheetFooter`, or a `className` on `SheetBody`), so full-bleed content (an image, a divider, a table) can sit edge-to-edge between the header and the footer.

## Import

```tsx

import { Sheet, SheetTrigger, SheetClose, SheetBackdrop, SheetPopup, SheetHeader, SheetFooter, SheetBody, SheetTitle, SheetDescription } from '@bilazo/kito/components/sheet'

```

## When to use

- A secondary surface that opens from the side without leaving the page — settings, a filter panel, a detail view, an edit form.

- A navigation drawer on small screens — `side="start"` with a list of links, close on each link click.

- An action sheet on mobile — `side="bottom"` with `showCloseButton={false}`, actions in the footer as the only path.

- A form that should not block the page — sign-in, profile edit, a create modal where the trigger page stays visible.

- A long scrolling surface (terms of service, an article) — `SheetBody` keeps the header and footer pinned while the middle scrolls.

- Full-bleed content — an image or a table that must touch the edges of the panel (possible because the popup has no padding of its own).

## When NOT to use

- For a blocking decision the user must acknowledge — use `Dialog` (centered) instead. A centered modal says "stop and decide"; a sheet says "work on the side".

- For a short confirmation with one or two actions — use `Dialog`. A side sheet for a two-button confirm leaves a large empty panel; a centered dialog is the tighter shape.

- For content that belongs to the page and should be reachable without a close — use an inline route or a section on the page. Sheets are modal; a consumer who wants to keep the content open has to reopen it.

- For navigation that must be deep-linkable — use the router (`Link`, `Route`). Sheets do not create URLs; two users who both open a sheet cannot share a link to it.

- Without `SheetTitle` — every sheet needs an accessible name (`aria-labelledby` on the popup). Base UI wires `SheetTitle` to it automatically; without one, the dialog has no name for screen readers.

- With more than three or four nav items inside a `side="start"` — the sheet becomes a full page in disguise. Use a real route + page.

- Inside another modal — nesting a Sheet inside a Dialog (or another Sheet) is supported by Base UI but rarely the right shape. Prefer a single-level modal.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'start' \| 'end' \| 'top' \| 'bottom'` | `'end'` | Which edge the panel anchors to. `start` is the inline-start edge (left in LTR, right in RTL); `end` is the inline-end edge (right in LTR, left in RTL) — the default for the classic side panel. `top` and `bottom` are physical edges, used for action sheets and notifications. The panel flips automatically in RTL via logical CSS properties (`inset-inline-start`, `border-s`/`border-e`, `rounded-s`/`rounded-e`); only the enter/exit transforms need an explicit `rtl:` override because `translate-x` is a physical axis. `SheetPopup` prop. |
| `showCloseButton` | `boolean` | `true` | Render a close (×) button in the top-end corner. Set to `false` for action sheets or confirmations where the footer actions are the only affordance. When `false`, the header’s default `pe-12` still reserves the space — override with `pe-6` on `SheetHeader` if you want the padding back. `SheetPopup` prop. |
| `open` | `boolean` | — | Controlled open state. Pass with `onOpenChange` to drive the state from outside (a route param, a store). Omit both for an uncontrolled sheet (then use `defaultOpen`). Inherited from Base UI’s `Dialog.Root`. `Sheet` prop. |
| `onOpenChange` | `(open: boolean, eventDetails: ...) => void` | — | Change callback. Fires on trigger, close button, Escape, and backdrop click. `Sheet` prop. |
| `modal` | `boolean` | `true` | Whether the sheet blocks interaction with the page behind it. `false` allows interacting with the page while the panel stays open (useful for a side panel over a map or a canvas). Inherited from Base UI’s `Dialog.Root`. `Sheet` prop. |
| `dir` | `'ltr' \| 'rtl'` | — | Explicit direction. The sheet is **portaled to `document.body`**, so it does not inherit `dir` from the trigger’s wrapper — pass it here when the page’s `<html dir="rtl">` is not set (for example, a localized preview or a Storybook demo). In a real Persian app, `<html dir="rtl">` covers it and this prop is not needed. `SheetPopup` prop. |
| `className` | `string` | — | Extra classes on any part. For `SheetBody`, use it to add padding (`p-6`) when the panel is not full-bleed — `SheetBody` is padding-free by default. For `SheetPopup`, use it for a per-instance width (`w-96`) or a custom height. |

Ten components compose. `Sheet` (root) renders no DOM of its own — it forwards to Base UI’s `Dialog.Root` and manages the open state. `SheetTrigger` and `SheetClose` are Base UI’s `Trigger`/`Close` with `data-slot` for targeting; use their `render` prop to render as a `Button`, a router `Link`, or any other element. `SheetBackdrop` and `SheetPopup` are portaled to `document.body` — `SheetBackdrop` is rendered automatically by `SheetPopup`, and `SheetPopup` renders its children **plus** an optional close button (last in DOM, so it appears in the tab order after the footer). `SheetBody` has no default padding on purpose: the popup is padding-free so consumers can insert full-bleed content (an image, a divider, a table) between the padded header and footer, and so the scrollbar touches the panel edge rather than floating inside a padded shell — add padding with `className` when full-bleed is not needed. `SheetBody` also carries the critical `min-h-0 flex-1 overflow-y-auto` trio — without `min-h-0`, the flex child grows to fit its content and `overflow-y-auto` never engages. `SheetHeader`/`SheetFooter` are plain `<div>`s with no own props. `SheetTitle`/`SheetDescription` are wired to the popup via `aria-labelledby` / `aria-describedby` automatically — no manual ARIA is needed. **Portal gotcha:** because the popup is portaled, `dir="rtl"` on an ancestor wrapper does not reach it — pass `dir` on `SheetPopup` when the page’s `<html dir="rtl">` is not set. `SheetSide` is exported as a type-only alias (not a value).

## Composition

### Basic side sheet

The canonical pattern: `Sheet` with a `SheetTrigger`, a `SheetPopup` with a `SheetHeader` (title + description) and a `SheetFooter` (actions). The default `side="end"` anchors the panel to the inline-end edge — right in LTR, left in RTL.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open settings</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Changes are saved immediately.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

### With a form

Pair the sheet with `Field` and `Input` inside `SheetBody`. `SheetBody`’s `flex-1` pushes the footer to the bottom; header and footer stay pinned while the form scrolls if it grows.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

<Sheet>
  <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Update your account details.</SheetDescription>
    </SheetHeader>
    <SheetBody className="flex flex-col gap-4 p-6">
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Your name" />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
    </SheetBody>
    <SheetFooter>
      <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
      <Button>Save</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

### Action sheet

`side="bottom"` with `showCloseButton={false}` gives the mobile action-sheet pattern: a short panel from the bottom, footer actions as the only path. Pair destructive actions with a `Button variant="destructive"`.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Delete lesson</SheetTrigger>
  <SheetPopup side="bottom" showCloseButton={false}>
    <SheetHeader>
      <SheetTitle>Delete lesson 42?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. All progress will be lost.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
      <Button variant="destructive">Delete</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

### Navigation drawer

A slide-in menu on small screens. `side="start"` anchors to the inline-start edge (left in LTR, right in RTL). Each nav item is wrapped in `SheetClose` with `render={<a />}` so clicking closes the sheet — an anchor is the trigger, and `SheetClose` provides the close behavior without stealing the anchor’s semantics.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/settings', label: 'Settings' },
]

<Sheet>
  <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
    {/* menu icon */}
  </SheetTrigger>
  <SheetPopup side="start">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <SheetBody className="flex flex-col gap-2 px-2">
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <SheetClose
            key={item.href}
            render={<a href={item.href} />}
            className="rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            {item.label}
          </SheetClose>
        ))}
      </nav>
    </SheetBody>
  </SheetPopup>
</Sheet>
```

### Controlled

Pass `open` and `onOpenChange` to drive the state from outside. Useful when the sheet opens from an external action (a route change, a store) rather than a trigger inside the same subtree.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
} from '@bilazo/kito/components/sheet'
import { useState } from 'react'

export function Controlled() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Controlled sheet</SheetTitle>
            <SheetDescription>The open state lives in React.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose render={<Button variant="secondary" />}>Close</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </>
  )
}
```

---

_Generated from `apps/web/src/content/sheet/meta.ts`. Do not edit directly._


---

# Skeleton

> A loading placeholder.

A loading placeholder. A styled `<div>` sized and shaped entirely with utility classes — `h-4 w-32` for a text line, `size-(--control-md) rounded-full` for an avatar, or any composition that matches the real content. Two animation styles: `pulse` (default) fades the placeholder in and out, `shimmer` sweeps a highlight across it. Both respect `prefers-reduced-motion` — users who opt out of animation see a static placeholder. The element is `aria-hidden` by default so screen readers do not announce it; mark the surrounding region with `aria-busy="true"` while data loads.

## Import

```tsx

import { Skeleton } from '@bilazo/kito/components/skeleton'

```

## When to use

- Show placeholder shapes while data loads, when the shape of the incoming content is known — text lines, an avatar, a card, a table row.

- Match the real content’s layout classes on the skeleton so the swap-in has no layout shift — the avatar example uses the same `--control-*` tokens as `Avatar` for this reason.

- Give the user a sense of progress for work that takes longer than a single frame but whose duration is unknown — composing multiple skeleton blocks reads as "loading".

- Fill a region marked `aria-busy="true"` so the visual placeholder and the assistive-tech announcement stay in sync.

## When NOT to use

- For very short operations (under ~1 second) — the flash is more distracting than a spinner or no indicator at all.

- When the shape of the incoming content is unknown — use a `Spinner` (or a generic loading state). A skeleton that does not match the eventual layout is more disorienting than a spinner.

- For measurable, known-duration work — use `Progress`. A progress bar communicates completion; a skeleton communicates "something is loading".

- For empty states — "no results" and "still loading" are different states. Use an empty-state component for the former; a skeleton that never resolves trains users to wait forever.

- As the only accessible signal of loading — Skeleton is `aria-hidden` by design. Always pair it with `aria-busy="true"` on the region and (optionally) an `sr-only` "Loading…" line so assistive tech knows content is on its way.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'pulse' \| 'shimmer'` | `'pulse'` | Animation style. `pulse` fades the placeholder in and out — the safe default that works on every surface. `shimmer` sweeps a highlight from left to right across the placeholder via a `before:` pseudo-element, for larger areas where pulse reads as flat. Both respect `prefers-reduced-motion`: users who opt out see a static placeholder. |
| `aria-hidden` | `boolean` | `true` | Set to `true` on the root — the placeholder is decorative and should not be announced. Override with `aria-hidden={false}` only when the skeleton carries meaning to assistive technology (rare; the pattern is to keep it hidden and mark the region with `aria-busy`). |
| `className` | `string` | — | Sizing and shape. Skeleton has no built-in dimensions — `h-4 w-32`, `size-(--control-md) rounded-full`, or any other utility class defines the placeholder. Merged with the base `relative overflow-hidden rounded-md bg-muted` via `cn()`. |

Skeleton is a native `<div>` — `React.ComponentProps<"div">` is the base type, so all native attributes (`id`, `data-*`, `children`, `style`, `ref`) are forwarded untouched. `SkeletonVariant` is also exported as a type-only import for consumers who want to type a variable; it is not a value export. No cva output is exported (`skeletonStyles` is internal to the module). The two animation styles are implemented without extra DOM: `shimmer` renders its gradient on the root’s `::before` pseudo-element, so the placeholder stays a single node. `--skeleton-shimmer` is a semantic token defined in `defaults.css` — it swaps in dark mode automatically, so the shimmer highlight never uses a hardcoded `bg-white/…` that would break in dark theme.

## Composition

### Text lines

Stack as many as you need and make the last one shorter so it reads like real wrapped text. Widths like `w-full` / `w-5/6` / `w-2/3` approximate a real paragraph.

```tsx
import { Skeleton } from '@bilazo/kito/components/skeleton'

<div className="flex w-full max-w-md flex-col gap-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>
```

### Avatar — match the real sizes

Use the same `--control-*` tokens as `Avatar` so the swap-in has no layout shift. `rounded-full` turns the placeholder into a circle.

```tsx
import { Skeleton } from '@bilazo/kito/components/skeleton'

<div className="flex items-center gap-3">
  <Skeleton className="size-(--control-sm) rounded-full" />
  <Skeleton className="size-(--control-md) rounded-full" />
  <Skeleton className="size-(--control-lg) rounded-full" />
</div>
```

### Composite card

Skeletons compose. Build a placeholder for any real UI by combining `Skeleton` elements with the same layout classes as the real content — a flex row with an avatar, a title, a subtitle, and a body of text.

```tsx
import { Skeleton } from '@bilazo/kito/components/skeleton'

<div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
  <div className="flex items-center gap-3">
    <Skeleton className="size-(--control-md) shrink-0 rounded-full" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
  <div className="mt-4 flex flex-col gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
</div>
```

### Accessible loading region

Skeleton is `aria-hidden` — pair it with `aria-busy="true"` on the region and an `sr-only` line so assistive technology knows content is on its way. The visual placeholder and the announcement stay in sync.

```tsx
import { Skeleton } from '@bilazo/kito/components/skeleton'

<div aria-busy="true" aria-live="polite" className="flex w-full max-w-md flex-col gap-3">
  <p className="sr-only">Loading content…</p>
  <Skeleton className="h-6 w-1/2" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

### Shimmer on a larger surface

Use `variant="shimmer"` when the placeholder area is large enough that pulse reads as flat — a media block, a long card body. Mix with pulse for smaller elements if you like; both respect reduced motion.

```tsx
import { Skeleton } from '@bilazo/kito/components/skeleton'

<Skeleton variant="shimmer" className="aspect-video w-full rounded-lg" />
```

---

_Generated from `apps/web/src/content/skeleton/meta.ts`. Do not edit directly._


---

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


---

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


---

# Table

> A data table. Plain semantic HTML — no sorting, pagination, or selection logic.

A data table. Plain semantic HTML with Kito’s styling — no sorting, pagination, filtering, or row-selection logic; wire any of those yourself around these primitives. `Table` wraps its `<table>` in a horizontally scrollable container, so a wide table does not overflow the page on small screens. Every part is a native element (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`, `<tfoot>`, `<caption>`), so assistive technology gets a real table with header cells and a caption — not a `role="table"` imitation of one. `TableHead` uses `text-start` (a logical property), so the table flips with the page direction without any `dir`-specific code.

## Import

```tsx

import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '@bilazo/kito/components/table'

```

## When to use

- Display tabular data with a consistent schema — every row has the same fields in the same order (students, invoices, products, users).

- Compare records across rows — sorting by name, scanning a column of amounts, spotting an outlier — where a list or a card grid makes the comparison harder.

- Show a summary row — `TableFooter` with a `colSpan` covers the totals or average of a numeric column.

- Track a selected row — pass `data-state="selected"` on a `TableRow` for the standard subtle highlight.

- Display data that needs to scroll horizontally on narrow viewports — the `Table` wrapper handles this by default via `overflow-x-auto`.

- Give the table an accessible name from a `TableCaption` — per HTML spec, `<caption>` is the accessible name of its `<table>`; no `aria-labelledby` is needed.

- Lead a table with a row of checkbox columns — `TableHead` and `TableCell` drop the end padding (`has-[[role=checkbox]]:pe-0`) so the checkbox sits flush against the column edge.

## When NOT to use

- For page layout — use a grid or flex layout. A `<table>` communicates data relationships to assistive technology; using one for layout announces a table with meaningless rows and columns.

- For a short vertical list — use a `<ul>` or a stack of `Card`s. A 3-row table with one column per row reads as a list with extra ceremony; the table only wins when there is more than one column to compare.

- For content that should be cards on mobile and a table on desktop — build the switch yourself with `md:table` + a mobile card layout. A responsive table that only stays a table is a data table; one that becomes cards is a different component.

- For complex nested data — hierarchical rows, drill-down, tree-tables. Use a dedicated tree-view or a nested list. `colSpan` and `rowSpan` are available, but a deeply nested structure inside a flat table is not what `<table>` is for.

- Without a header row — every data table needs `TableHead` cells to communicate the column meaning. A headerless table forces screen readers to announce every cell as "cell, value" with no context.

- For sorting, filtering, and pagination — these are not built in. Compose them around the table with your own controls, or use a data-table library on top of these primitives. A static `<table>` that pretends to be sortable is worse than no affordance at all.

- For editable cell content — text inputs inside `<td>` work, but the table has no keyboard navigation between cells. Use a dedicated editable grid or form pattern instead.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `containerClassName` | `string` | — | Classes for the outer scroll container (`<div data-slot="table-container">`), not the `<table>` itself. The container is `relative w-full overflow-x-auto` by default; use this to cap the height (`max-h-96`) and pair with a sticky `TableHeader` for a scrolling table with a fixed header. `Table` prop. |
| `className` | `string` | — | Extra classes on any part — `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, or `TableCaption`. Merged with the base classes via `cn()`. For `Table`’s inner `<table>`, use this; for the scroll container, use `containerClassName`. |

Eight components compose — `Table` (root), `TableHeader` (`<thead>`), `TableBody` (`<tbody>`), `TableFooter` (`<tfoot>`), `TableRow` (`<tr>`), `TableHead` (`<th>`), `TableCell` (`<td>`), `TableCaption` (`<caption>`). Every part uses `React.ComponentProps<"tag">` inline — no Base UI primitive, no cva output, no split into `*OwnProps` / `*BaseUiProps`. `containerClassName` is `Table`’s only Kito-specific prop and is destructured out of `{...props}` so it does not leak to the `<table>` element. Selection is expressed with the `data-state="selected"` attribute on `TableRow` — that is the API; pass it from your own state, do not toggle a class. `TableHead` uses `text-start` (a logical property), so the table flips with the page direction; its `has-[[role=checkbox]]:pe-0` (and the equivalent on `TableCell`) drops the end padding when the cell contains a `role="checkbox"` element, so the checkbox sits flush against the column edge. `TableHeader` cancels the row hover inside itself (`[&_tr]:hover:bg-transparent`) — headers do not highlight on hover. `TableCaption` renders below the table (`caption-bottom`); per HTML spec, `<caption>` becomes the accessible name of the table, so no `aria-label` or `aria-labelledby` is needed.

## Composition

### Basic data table

The minimum viable table: a `TableHeader` with `TableHead` cells, a `TableBody` with `TableRow`/`TableCell` pairs. `Table` handles the horizontal scroll on narrow viewports — no extra wrapper is needed.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

const STUDENTS = [
  { id: 1, name: 'Alice Johnson', level: 'Advanced', joined: '2024-03-12' },
  { id: 2, name: 'Bob Smith', level: 'Beginner', joined: '2024-05-08' },
]

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Level</TableHead>
      <TableHead>Joined</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {STUDENTS.map((student) => (
      <TableRow key={student.id}>
        <TableCell className="font-medium">{student.name}</TableCell>
        <TableCell>{student.level}</TableCell>
        <TableCell className="text-muted-foreground">{student.joined}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### With a caption as the accessible name

Add `TableCaption` as the first child of `Table`. It renders below the table (`caption-bottom`) in muted text, and per HTML spec it becomes the accessible name of the table — assistive technology announces the caption when the table is entered.

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableCaption>Recent invoices from the last 30 days.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-mono text-xs">INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### With a footer and colSpan

`TableFooter` gets a muted background and bold text. Use `colSpan` on a `TableCell` to span multiple columns for a total row.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead>Qty</TableHead>
      <TableHead>Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* …rows… */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>$254.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Selected row

Selection is expressed with `data-state="selected"` on a `TableRow` — not a class. Pass it from your own state; the base style `data-[state=selected]:bg-muted` applies the highlight.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell className="font-medium">Project Borealis</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Project Apollo</TableCell>
      <TableCell>Archived</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Checkbox column

When a `TableHead` or `TableCell` contains a `role="checkbox"` element, its end padding is dropped (`has-[[role=checkbox]]:pe-0`) so the checkbox sits flush against the column edge. Use this for a "select row" column.

```tsx
import { Checkbox } from '@bilazo/kito/components/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bilazo/kito/components/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>
        <Checkbox aria-label="Select all" />
      </TableHead>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <Checkbox aria-label="Select Alice" />
      </TableCell>
      <TableCell>Alice Johnson</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

_Generated from `apps/web/src/content/table/meta.ts`. Do not edit directly._


---

# Tabs

> A set of layered panels switched by a row (or column) of tabs.

A set of layered panels switched by a row (or column) of tabs. `Tabs` renders no DOM of its own — it manages the active value and keyboard navigation (arrow keys, Home, End); the visible parts are the four subcomponents. Two visual variants: `default` puts a muted container behind the strip and slides a pill under the active tab, `line` slides an underline instead for navigation-style tabs. Two orientations: `horizontal` (default) and `vertical`, where the strip becomes a column and the panels sit beside it. `TabsIndicator` is optional and must be the last child of `TabsList` — it reads the active tab’s geometry from Base UI’s CSS variables to slide between tabs.

## Import

```tsx

import { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanel } from '@bilazo/kito/components/tabs'

```

## When to use

- Switch between related views of the same context — Overview / Projects / Account inside one settings page — without leaving the page.

- Split a long form or panel into sections that stay in the same URL — account settings with Profile / Security / Billing tabs.

- Filter-style tabs (All / Mine / Archived) where the content below changes but the header and chrome do not.

- Documentation examples in multiple flavors — React / HTML / CSS — that the reader switches at a glance.

- In a wizard or stepper where each step is a panel and the order matters — arrow keys move between steps.

- Inside a vertical layout where a sidebar of tabs switches the content beside it — settings-page layout with `orientation="vertical"`.

## When NOT to use

- For navigation between pages or URLs — use `Link` or a router. Tabs switch content in place; if the content is a distinct page, it should have its own URL and its own route.

- For more than about seven tabs — the strip becomes hard to scan and the active tab is easy to lose. Use a `Select` or a menu.

- For a form’s forward/back steps that the user must complete in order — use a stepper or a wizard with explicit Next/Back buttons. Tabs imply the user can jump between any tab at any time.

- For panels whose content is large enough to need its own scroll — the tab strip stays fixed but each panel scrolls independently, which reads as a bug. Split into routes instead.

- Without a `TabsPanel` for every `TabsTab` value — an active tab with no matching panel leaves a blank area. Every `TabsTab value="x"` must have a `<TabsPanel value="x">` sibling.

- Without passing `variant` to every `TabsTab` — the styling fails silently. See the note below.

- Without passing `orientation` to the root, the list, and each tab — vertical tabs lose their column layout on the list or their full-width styling on the tabs.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled active tab value. Pass with `onValueChange` to drive the active tab from outside (a router, a store). Omit both `value` and `defaultValue` for an uncontrolled tabs. `Tabs` prop. |
| `defaultValue` | `string` | — | Initial active tab value for an uncontrolled tabs. Ignored when `value` is passed. `Tabs` prop. |
| `onValueChange` | `(value: string, eventDetails: ...) => void` | — | Change callback. Fires with the newly-selected value — no `event.target` unwrap needed. Inherited from Base UI’s `Tabs.Root`. `Tabs` prop. |
| `keepMounted` | `boolean` | — | Keep every panel in the DOM, hidden when not active. Use this when a panel has expensive setup that should survive tab switches (a chart, an editor). Default off — panels are unmounted when inactive. `Tabs` prop; the same prop also exists on `TabsPanel`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the whole component. Pass to **all three** — `Tabs` (drives keyboard navigation: left/right vs up/down), `TabsList` (drives `flex-row` vs `flex-col`), and every `TabsTab` (drives `w-full justify-start` on vertical). The list and tabs do not read this from the root — the type system does not enforce it, and a mismatch fails visually. `Tabs` / `TabsList` / `TabsTab` prop. |
| `variant` | `'default' \| 'line'` | `'default'` | Visual style. `default` puts a muted container behind the strip and slides a pill under the active tab — for filter-style tabs that read as one unit. `line` replaces the container with a transparent background and slides an underline beneath the active tab — for navigation-style tabs that should blend into the page. Pass to **both** `TabsList` and each `TabsTab` — the tab’s padding differs per variant, and a mismatch yields mixed styling. `TabsList` / `TabsTab` prop. |
| `value`* | `string` | — | The value this specific tab activates. Required — Base UI throws a runtime error without it, because the root needs to know which panel to show. Must match a `TabsPanel`’s `value`. `TabsTab` prop. |
| `value`* | `string` | — | The value this panel belongs to. Required — a panel with no value can never be activated. Must match a `TabsTab`’s `value`. `TabsPanel` prop. |
| `disabled` | `boolean` | — | Disables this tab. Disabled tabs are skipped by keyboard navigation, cannot be clicked, and cannot be focused. The root gets `data-disabled` (`pointer-events-none opacity-50`). `TabsTab` prop. |
| `className` | `string` | — | Extra classes on any part — `Tabs`, `TabsList`, `TabsTab`, `TabsIndicator`, `TabsPanel`. Merged with the base classes via `cn()`. |

Five components compose. `Tabs` (root) renders no DOM of its own — it manages the active value and keyboard navigation, and passes its configuration to Base UI’s `Tabs.Root`. `TabsList` is the strip — its container styles (`bg-muted` for `default`, transparent for `line`, `flex-row` vs `flex-col` per orientation) live on this part. `TabsTab` is one tab — its padding differs per variant, and on vertical its width is `w-full justify-start`, so the tab fills the strip and the text starts at the reading start. `TabsIndicator` is optional, and MUST be placed **last** in `TabsList` — it uses Base UI’s CSS variables (`--active-tab-left`, `--active-tab-width`, `--active-tab-top`, `--active-tab-height`) to slide between tabs, and those variables are set relative to the list, so any element after the indicator would be inside the wrong stacking context. `TabsPanel` is one panel — only the panel matching the active value is rendered, unless `keepMounted` is set on the root (or on the panel). Two configuration props cross subcomponent boundaries and are easy to get wrong: `variant` must be passed to **both** `TabsList` and every `TabsTab` (they share styling via the `group/tabs-list` selector, but each needs its own class), and `orientation` must be passed to **the root, the list, and every tab** (keyboard navigation, layout, and tab styling each read it independently). Neither is enforced by the type system — mismatches fail silently as mixed styling.

## Composition

### Basic

The canonical pattern: `Tabs` with a `defaultValue`, a `TabsList` with `TabsTab` children plus a `TabsIndicator` last, and a `TabsPanel` per tab value.

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

<Tabs defaultValue="overview" className="w-full max-w-md">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="projects">Projects</TabsTab>
    <TabsTab value="account">Account</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="overview" className="pt-4">
    Workspace stats and recent activity.
  </TabsPanel>
  <TabsPanel value="projects" className="pt-4">
    Milestones and deadlines for active projects.
  </TabsPanel>
  <TabsPanel value="account" className="pt-4">
    Profile, password, and notification preferences.
  </TabsPanel>
</Tabs>
```

### Line variant

Pass `variant="line"` to **both** `TabsList` and each `TabsTab`. The list becomes transparent, the tabs get extra bottom padding for the underline, and the indicator renders a 2px bar at the bottom of the active tab. A mismatch (`variant` on the list but not on the tab) leaves the tab with the default padding — the underline floats without enough room.

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

<Tabs defaultValue="overview" className="w-full max-w-md">
  <TabsList variant="line">
    <TabsTab variant="line" value="overview">Overview</TabsTab>
    <TabsTab variant="line" value="projects">Projects</TabsTab>
    <TabsTab variant="line" value="account">Account</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="overview" className="pt-4">
    Overview content
  </TabsPanel>
</Tabs>
```

### Vertical

Pass `orientation="vertical"` to the root, the list, and every tab. The list becomes `flex-col` and stretches its children; each tab is `w-full justify-start` so the text starts at the reading start. Panels sit beside the list — wrap the panels in a `flex-1` div so they take the remaining width.

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'

<Tabs defaultValue="general" orientation="vertical" className="flex w-full max-w-md gap-6">
  <TabsList orientation="vertical" className="w-40">
    <TabsTab orientation="vertical" value="general">General</TabsTab>
    <TabsTab orientation="vertical" value="security">Security</TabsTab>
    <TabsTab orientation="vertical" value="billing">Billing</TabsTab>
    <TabsIndicator />
  </TabsList>
  <div className="flex-1">
    <TabsPanel value="general">Display name, timezone, language.</TabsPanel>
    <TabsPanel value="security">Password, two-factor authentication.</TabsPanel>
    <TabsPanel value="billing">Payment methods and invoices.</TabsPanel>
  </div>
</Tabs>
```

### Controlled

Pass `value` and `onValueChange` on the root to drive the active tab from outside. The value is the tab that is currently active, not the one clicked — a mismatch leaves the UI in a wrong state until the parent catches up.

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'
import { useState } from 'react'

export function Controlled() {
  const [value, setValue] = useState('a')
  return (
    <Tabs value={value} onValueChange={(v) => setValue(v as string)}>
      <TabsList>
        <TabsTab value="a">Tab A</TabsTab>
        <TabsTab value="b">Tab B</TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="a">Panel A</TabsPanel>
      <TabsPanel value="b">Panel B</TabsPanel>
    </Tabs>
  )
}
```

### With icons

Tabs accept inline SVG icons. Non-sized icons inherit `size-4` from the tab’s `[&_svg:not([class*="size-"])]` rule; sized icons keep their own class.

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@bilazo/kito/components/tabs'
import { Bell, CreditCard, User } from 'lucide-react'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTab value="account">
      <User />
      Account
    </TabsTab>
    <TabsTab value="notifications">
      <Bell />
      Notifications
    </TabsTab>
    <TabsTab value="billing">
      <CreditCard />
      Billing
    </TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="account">Profile settings.</TabsPanel>
</Tabs>
```

---

_Generated from `apps/web/src/content/tabs/meta.ts`. Do not edit directly._


---

# Textarea

> A multi-line text input.

A multi-line text input. Built on Base UI’s `Field.Control` rendered as a `<textarea>`, so when placed inside a `<Field>` (coming soon) the label, description, error, and disabled states are wired up automatically. Shares `inputStyles` with `Input` for the same border, focus ring, and invalid treatment — but overrides the fixed control height (`h-auto`) with an explicit minimum per size, since a textarea is multi-line. Text direction defaults to `auto`: the browser picks from the content, so Persian stays RTL and Latin stays LTR, both without a `dir` prop.

## Import

```tsx

import { Textarea } from '@bilazo/kito/components/textarea'

```

## When to use

- Collect multi-line text — a comment, a message, a bio, a description, feedback that can span paragraphs.

- Inside a `<Field>` (or next to a `Label` with matching `htmlFor` / `id`) for a labelled multi-line field.

- When the input should grow with its content — pass `autoResize` for comment boxes, chat inputs, or any field where the user is expected to write more than a couple of lines.

- When the user should be able to drag the bottom edge to resize — the default `resize-y` is the standard affordance for a textarea and should be kept unless the field has a better reason to be fixed.

- For content that is naturally RTL or mixed-direction — `dir="auto"` on the underlying `<textarea>` lets the browser choose direction from the content without a per-field prop.

## When NOT to use

- For single-line text — use `Input`. A textarea with `rows={1}` still reserves multi-line space and accepts Enter as a newline; a single-line field is what the user expects for a name, an email, a search query.

- For rich text — bold, italic, links, headings. A `<textarea>` is plain text; use a rich-text editor component when the content needs formatting.

- For code or structured input — syntax highlighting, auto-indent, bracket matching. Use a dedicated code editor; a `<textarea>` gives plain monospace at best.

- As a replacement for `Input` with a fixed height — a `Textarea` with `rows={1}` and `resize-none` looks like a single-line input but behaves differently on Enter. Prefer the correct primitive.

- As the only label of a field — every textarea needs an accessible name (`Label` with `htmlFor`, or `aria-label`). Placeholder text disappears on the first keystroke.

- For very short notes (a single line of confirmation) — a `Textarea` reserves the size of a paragraph; use `Input` for one-liners.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls the minimum height and side padding. Unlike `Input`, `size` does not set a fixed height — a textarea is multi-line, so the class list uses `h-auto` plus `min-h-16` / `min-h-20` / `min-h-24` per size. `lg` switches to `text-base`; `sm` and `md` use `text-sm` (with `pointer-coarse:text-base` on touch devices, same as `Input`). |
| `autoResize` | `boolean` | `false` | When `true`, the textarea grows with its content using CSS `field-sizing: content`, and manual resizing is disabled (`resize-none`). A `max-h-80` cap keeps the field from taking over the page. Sets `data-autoresize="true"` on the element for downstream styling. Browsers without `field-sizing` support fall back to the fixed `rows` height. |
| `rows` | `number` | `3` | Initial number of visible text rows, forwarded to the underlying `<textarea>`. With `autoResize`, `rows={1}` is the common starting point — the field grows as the user types. |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Text direction. Unlike `Input`, there is no `type` to derive from — `defaultDir()` is called with no argument, which always returns `"auto"`. The browser follows the first strong character, so Persian stays RTL and Latin stays LTR. Pass an explicit `dir` to override for the rare case where the content direction should be locked. |
| `onValueChange` | `(value: string, eventDetails) => void` | — | Base UI’s value-based change callback, exposed as the only `TextareaBaseUiProps` entry. Fires with the new string value directly — no `event.target.value` unwrap. Useful when wiring the textarea to a form library; the native `onChange` also works and receives the DOM event. |
| `aria-invalid` | `boolean` | — | Marks the textarea as invalid. Applies the destructive border and the destructive outline on `:focus-visible`. Inside a `<Field invalid>`, Base UI sets `data-invalid` on the control instead — both selectors are styled, so either works. |
| `className` | `string` | — | Extra classes. Merged with the size and resize classes via `cn()` — typically used for width (`max-w-md`), a per-instance min-height, or a one-off visual override. |

Only `Textarea` is exported as a value; all other exports are types (`TextareaOwnProps`, `TextareaBaseUiProps`, `TextareaHTMLProps`, `TextareaProps`). `inputStyles` and `defaultDir` are imported from `input/input.tsx` and `lib/dir.ts` respectively, not re-exported — the shared control look comes for free. The underlying element is Base UI’s `Field.Control` rendered as a `<textarea>` via the `render` prop, so `onValueChange` works out of the box (this is the only Base UI prop surfaced through `TextareaBaseUiProps`). All native `<textarea>` attributes (`id`, `placeholder`, `rows`, `maxLength`, `readOnly`, `disabled`, `value`, `defaultValue`, `aria-*`, `data-*`) are forwarded untouched via `TextareaHTMLProps`. Two style overrides of `inputStyles` matter: `h-auto` cancels the fixed `--control-*` height (a textarea is multi-line), and `py-2` sets vertical padding (`inputStyles` only sets `px-*`). `data-autoresize="true"` is set only when `autoResize` is on, so downstream CSS can target the auto-resize case without a class.

## Composition

### Labelled textarea

The minimum for an accessible field: a `Label` with `htmlFor` matched to the textarea’s `id`. Pair it with a description line when there is a constraint the user should know about before typing.

```tsx
import { Label } from '@bilazo/kito/components/label'
import { Textarea } from '@bilazo/kito/components/textarea'

<div className="flex w-full max-w-md flex-col gap-2">
  <Label htmlFor="demo-message">Message</Label>
  <Textarea id="demo-message" placeholder="Write your message here…" rows={4} />
  <p className="text-xs text-muted-foreground">Maximum 500 characters.</p>
</div>
```

### Auto-resizing comment box

`autoResize` lets the field grow with its content up to a `max-h-80` cap. `rows={1}` starts it small, so the empty state is a single line — the standard chat and comment affordance.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea
  autoResize
  rows={1}
  placeholder="Start typing and watch me grow…"
  aria-label="Comment"
/>
```

### Invalid state

Set `aria-invalid` for standalone use. Inside a `<Field invalid>` Base UI sets `data-invalid` for you — both selectors apply the destructive border.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea aria-invalid defaultValue="This value is not valid" aria-label="Message" />
```

### Auto-direction

`dir="auto"` (the default) lets the browser pick direction from the first strong character — Persian stays RTL, Latin stays LTR. No per-field `dir` prop is needed for mixed-language content.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea defaultValue="متن فارسی" aria-label="Persian" />
<Textarea defaultValue="Latin text" aria-label="Latin" />
```

### Sizes

`sm`, `md`, and `lg` set the minimum height and side padding (not a fixed height, unlike `Input`). `lg` also bumps the text size to `text-base`.

```tsx
import { Textarea } from '@bilazo/kito/components/textarea'

<Textarea size="sm" rows={2} placeholder="sm" aria-label="Small" />
<Textarea size="md" rows={2} placeholder="md" aria-label="Medium" />
<Textarea size="lg" rows={2} placeholder="lg" aria-label="Large" />
```

---

_Generated from `apps/web/src/content/textarea/meta.ts`. Do not edit directly._


---

# Toast

> A brief notification that appears at a corner of the viewport.

A brief notification that appears at a corner of the viewport. Mount `Toaster` once near the app root; it renders every toast the imperative `toast(...)` API adds to a shared manager. Toasts stack behind the frontmost one in a peek-card pattern, expand on hover, swipe to dismiss, and auto-dismiss after their duration. The imperative API covers the common shapes — `toast.success/error/info/warning/loading` for variants, `toast.promise` for a loading → success/error state machine, `toast.dismiss()` for closing one or all. The viewport position (`top-left`…`bottom-right`) is physical, not logical, so a "top-right" toast stays at the top-right of the viewport even in an RTL page.

## Import

```tsx

import { Toaster, toast, toastManager } from '@bilazo/kito/components/toast'

```

## When to use

- Confirm a completed action that the user does not need to act on — saved, deleted, uploaded.

- Report an error that is recoverable and does not block the page — a failed network call the user can retry.

- Announce a background result while the user keeps working — a new message, a version update, a job that finished.

- Offer a short-lived undo — delete with an "Undo" action that restores the item before the toast dismisses.

- Track a promise through loading → success/error without blocking the page — `toast.promise(fn(), { loading, success, error })`.

- Notify across route changes — the toast survives navigation because it lives in the shared manager, not the current component tree.

## When NOT to use

- For an error the user must acknowledge before continuing — use a `Dialog` or an inline error state. A toast disappears; a blocking error must not.

- For content the user must read at their own pace — use a permanent UI element (banner, inline message). Toasts auto-dismiss and the user cannot stop the timer.

- For a critical confirmation — use a `Dialog`. A toast that says "Are you sure?" has a built-in timer that can close it before the user acts.

- As the only confirmation of a destructive action — pair the toast with the action that already ran (delete, archive). A toast alone is not a substitute for the pre-action confirmation.

- For transient inline feedback that belongs to a field — use `Field`’s error/description slot. A toast disconnects the message from the field it describes.

- Stacked more than three deep — the peek-card pattern stops being readable past about three. `limit` defaults to 3 for this reason; do not raise it without a UX review.

- Inside a form flow the user will submit — pair success with an inline state on the page. A toast on form submit without inline feedback leaves the form looking unchanged.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Where toasts appear. The values are **physical**, not logical — `top-right` means the top-right of the viewport, and stays there in an RTL page. This is intentional: a notification at "top-right" should be at the top-right of the screen regardless of the page’s reading direction. The stack direction follows the position: top positions stack downward, bottom positions stack upward. |
| `limit` | `number` | `3` | Maximum number of visible toasts. Older toasts are hidden past this limit and marked `data-limited` (pointer-events-none, opacity-0) until they expire. The default of 3 matches the peek-card pattern — past three cards, the stack stops being readable. |
| `duration` | `number` | `5000` | Default auto-dismiss delay in milliseconds. Individual toasts can override this via `duration` in their `ToastInput`; `duration: Infinity` on a toast (or `variant: 'loading'`) means "do not auto-dismiss" — the toast stays until `toast.dismiss(id)` or the user closes it. |
| `showCloseButton` | `boolean` | `true` | Render a close (×) button on every toast. Set to `false` for a leaner look on short-lived success/error toasts that the user does not need to dismiss manually. |
| `className` | `string` | — | Extra classes on the viewport. Merged with the base `fixed z-50 pointer-events-none` and the position classes via `cn()`. Commonly used for a wider/narrower stack or a custom `z-*` above the page’s sticky headers. |

Two value exports. `Toaster` is the React component — mount once near the app root; it renders the shared `toastManager`’s toasts into a `<Portal>` and forwards `limit` and `duration` to Base UI’s `Toast.Provider`. `toast` is the imperative API for adding toasts from anywhere — an event handler, a promise callback, a store action. `toastManager` is a raw export for advanced setups (mounting a second Toaster scoped to a subtree, or subscribing to the manager directly); most consumers use `toast` and never touch it. `ToastInput` accepts a `title`, a `description`, an optional `variant`, an optional `action` (`{ label, onClick }`), an optional `duration`, and an optional `id` (for update-in-place — calling `toast()` with an existing `id` updates that toast instead of adding a new one). `toast.success/error/info/warning/loading` are typed shortcuts: they accept either a string or a full `ToastInput` and set the `variant` field. `toast.promise` takes a `Promise<T>` and returns it unchanged, tracking it through a loading → success/error state machine; each of `loading`, `success`, and `error` can be a string, a `ToastInput`, or a function `(value: T | unknown) => string | ToastInput`. `toast.dismiss(id)` closes one toast; `toast.dismiss()` closes all toasts and clears their timers. The stacking visuals are a direct port of shadcn’s peek-card pattern, driven by CSS variables (`--peek`, `--scale`, `--shrink`, `--height`, `--offset-y`) computed on the toast root. Reduced-motion users get `transition: none` on both the transform and the height changes — the toast appears and disappears without animation.

## Composition

### Mount once

Mount `Toaster` exactly once near the app root — inside a top-level layout, next to the router. Do not mount a second one on a route; the toast manager is a shared singleton and a second Toaster renders duplicate stacks.

```tsx
import { Toaster } from '@bilazo/kito/components/toast'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
```

### Trigger from anywhere

Call `toast(...)` from an event handler, a route loader, a promise callback — anywhere JavaScript runs. Nothing needs a React tree in scope.

```tsx
import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

<Button onClick={() => toast('Your changes have been saved.')}>
  Save
</Button>
```

### With a title and description

Pass an object for a two-line toast: a short title in medium weight, a longer description in muted text.

```tsx
import { toast } from '@bilazo/kito/components/toast'

toast({
  title: 'Message sent',
  description: 'We will get back to you within 24 hours.',
})
```

### Undoable action

An action button lets the user react without opening another UI — the standard undo pattern. The toast keeps its own state; the action fires in the current context and can trigger a follow-up toast.

```tsx
import { toast } from '@bilazo/kito/components/toast'

toast({
  title: 'Item deleted',
  description: 'The item was removed from your library.',
  action: {
    label: 'Undo',
    onClick: () => toast.success('Restored'),
  },
})
```

### Promise with loading → success/error

`toast.promise` tracks a promise through a loading state to its resolution. Each state accepts a bare message or a full `ToastInput`. Pass `duration: Infinity` on the loading state to keep it open until the promise resolves.

```tsx
import { toast } from '@bilazo/kito/components/toast'

toast.promise(saveChanges(), {
  loading: 'Saving…',
  success: 'Saved',
  error: 'Could not save',
})
```

### Dismiss one or all

`toast.dismiss(id)` closes a specific toast by the `id` returned from `toast()`. `toast.dismiss()` closes every toast and clears their timers.

```tsx
import { toast } from '@bilazo/kito/components/toast'

const id = toast.loading('Processing…')
// later
toast.dismiss(id)

// or all
toast.dismiss()
```

---

_Generated from `apps/web/src/content/toast/meta.ts`. Do not edit directly._


---

# Tooltip

> A small label that appears on hover or focus of a trigger.

A small label that appears on hover or keyboard focus of a trigger. Tooltips are for short, supplementary labels — a keyboard shortcut, an icon name, a hint. Wrap the app once in TooltipProvider so all tooltips share the same hover delay. Sides are physical (`top` / `right` / `bottom` / `left`); in an app that serves both LTR and RTL, pick the side from the current direction at the call site.

## Import

```tsx

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@bilazo/kito/components/tooltip'

```

## When to use

- Give an icon-only button a short label — a toolbar action, an icon-only "close" or "more" trigger.

- Show a keyboard shortcut for an action that also has a visible label or an icon.

- Explain what a symbol or icon means without taking permanent screen space.

- Add supplementary context to a control whose primary meaning is already clear (a password strength hint on a format icon, for example).

## When NOT to use

- As the only label of an element — every trigger must still have an accessible name (an `aria-label` on icon-only buttons). A tooltip is invisible to touch users and to screen readers when it is not triggered.

- For rich content the user must interact with — form inputs, buttons, links, or a longer panel. Use `Popover` for clickable content.

- For text that is essential to understanding the page — visible labels and descriptions. A tooltip should never be the only place a piece of information lives.

- For a list of options the user picks from — use `Select`, `Combobox`, or `Menu`.

- On mobile as the primary affordance — there is no hover. Use visible labels or an expandable panel instead.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Side of the trigger where the tooltip appears. Sides are **physical** — `left` / `right` do not flip in RTL. In an app that serves both LTR and RTL, choose the side from the current direction (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a logical alias. `TooltipContent` prop. |
| `sideOffset` | `number` | `4` | Gap between the trigger and the tooltip, in pixels. `TooltipContent` prop. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the tooltip relative to the trigger along the cross axis. `TooltipContent` prop. |
| `alignOffset` | `number` | `0` | Offset along the alignment axis, in pixels. `TooltipContent` prop. |
| `showArrow` | `boolean` | `true` | Render a small arrow pointing at the trigger. Set to `false` for a pill-style tooltip. `TooltipContent` prop. |
| `delay` | `number` | `400` | Hover delay in milliseconds. Only accepted by `TooltipProvider` — set once at the app root. `Tooltip` itself accepts a per-tooltip override via its own `delay` prop, but the provider value is what most apps use. |
| `render` | `ReactElement` | — | Render the trigger as a different element. Use this to make a `Button`, a router `Link`, or any other element act as the trigger. `TooltipTrigger` prop. |
| `className` | `string` | — | Extra classes for the popup. Merged with the base classes via `cn()`. `TooltipContent` prop. |

Four components are exported. `TooltipProvider` (mount once, accepts `delay`) → `Tooltip` (root, accepts `open` / `defaultOpen` / `onOpenChange`) → `TooltipTrigger` (accepts `render` and `className`) → `TooltipContent` (accepts the side/align props and `showArrow`). Sides are physical — `left` / `right` do not flip in RTL, so an app serving both directions picks the side from the current direction at the call site. `ArrowShape` is also exported as a low-level utility for building custom arrow shapes (used by `PopoverArrow`); it is not part of the day-to-day API.

## Composition

### Icon-only trigger

Always pair with `aria-label` — the icon is the only visible content, and the tooltip alone does not announce itself to screen readers.

```tsx
import { Button } from '@bilazo/kito/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'
import { Plus } from 'lucide-react'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button size="icon" aria-label="Add item" />}>
      <Plus />
    </TooltipTrigger>
    <TooltipContent>Add item</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Provider at the app root

Mount TooltipProvider once, near the top of the app, so hover timings are shared. Individual `<TooltipProvider>` wrappers per tooltip defeat the purpose.

```tsx
import { TooltipProvider } from '@bilazo/kito/components/tooltip'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}
```

### With a keyboard shortcut

Inline the shortcut as a `Kbd` so it stays readable on the inverted popup surface.

```tsx
import { Kbd } from '@bilazo/kito/components/kbd'

<TooltipContent>Bold <Kbd>⌘B</Kbd></TooltipContent>
```

### Direction-aware side

Sides are physical. In an app that serves both LTR and RTL, pick the side from the current direction at the call site — `right` in an RTL page is where `inline-start` would have put it.

```tsx
<TooltipContent side={dir === 'rtl' ? 'right' : 'left'}>
  Opens on the reading-start edge
</TooltipContent>
```

---

_Generated from `apps/web/src/content/tooltip/meta.ts`. Do not edit directly._
