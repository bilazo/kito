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
