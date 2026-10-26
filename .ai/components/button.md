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
