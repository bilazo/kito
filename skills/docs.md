# Examples

Every example under `apps/docs/src/examples/<component>/` must follow these rules.

## Use only library components

Examples must use components imported from `@hooshid/oxin-ui/*`. Never use raw
HTML elements (`<button>`, `<input>`, `<div>` for interaction, etc.) for
anything that already has, or will have, a corresponding library component.

If a library component does not exist yet, mark it with a `TODO` comment
instead of substituting a raw HTML element:

```tsx
// TODO: replace with <Toolbar> from @hooshid/oxin-ui/toolbar once available
<div role="toolbar">...</div>
```

The raw element is only allowed when it is purely structural (spacing, layout)
and has no semantic or interactive role.

## Raw HTML is allowed for

- Layout wrappers: `div`, `span` used only for spacing/alignment.
- Text: `p`, `h1`–`h6`, `strong`, `em`, `code` when not part of a component.
- Examples demonstrating HTML attributes (rare).

Raw HTML is NOT allowed for:

- Interactive elements: use `Button`, `Input`, `Select`, `Checkbox`, etc.
- Anything with a role already covered by the library (`toolbar`, `dialog`,
  `tabs`, `menu`, ...).

## Fill in later

When an example needs a component that does not exist yet:

1. Keep the raw HTML, but add a `// TODO:` comment naming the future component
   and the import path.
2. Add the example to a "Pending components" section in the component's MDX
   page so it is visible that the example is incomplete.
3. Once the component is built, revisit the example and replace the raw HTML.

## Exceptions

- Examples demonstrating polymorphism (`render` prop on Button) may pass raw
  elements to `render`. This is not a violation — the element is the _target_
  of the polymorphism, not a substitute for a library component.

## Language

- All docs, JSDoc comments, examples, and test descriptions must be in English.
- Never mix languages inside a single file.

# Icons in examples

All example files under `apps/docs/src/examples/**` MUST use `lucide-react`
for icons. Never hand-write `<svg>` elements in examples.

Reasons:

- Hand-written SVGs need explicit `width`/`height` (or a `size-*` class) or
  they collapse to zero in the Tailwind preflight.
- `lucide-react` ships with `width="24" height="24"` defaults, so icons
  always render even before component-level sizing rules apply.
- One icon library keeps the docs visually consistent.

## Sizing

Component-level rules size icons automatically where possible:

- `Button` and `Badge` apply `[&_svg:not([class*='size-'])]:size-4` to any
  icon that does not already have a `size-*` class.
- `Card` and other structural components do **not** — pass `className="size-N"`
  on the icon explicitly.

```tsx
// Inside Button — no className needed
<Button>
  <Plus />
  New
</Button>

// Inside Card — size explicitly
<div className="rounded-lg bg-primary-soft p-2">
  <TrendingUp className="size-5" />
</div>
```

## The stretched-link + action pattern

When a card has a stretched link and an independent action, the action
**must** have `z-10` or higher. Otherwise clicks on the action bubble to the
stretched link and navigate away.

```tsx
<Card interactive>
  <CardHeader>
    <CardTitle>
      <a href="/x" className="after:absolute after:inset-0">
        Title
      </a>
    </CardTitle>
    <CardAction className="z-10">
      <Button variant="ghost" size="icon-sm" aria-label="Favorite">
        <Heart />
      </Button>
    </CardAction>
  </CardHeader>
</Card>
```

## Frontmatter for docs pages

Every `apps/docs/src/content/<name>.mdx` starts with a frontmatter block:

```yaml
---
title: Button
description: A pressable action element.
category: Actions
order: 10
links:
  doc: https://base-ui.com/react/components/button
  api: https://base-ui.com/react/components/button#api-reference
---
```

### Rules

- `title` is required. It is shown in the sidebar and as the page's H1.
- The MDX body **must not** start with `# Title` — the H1 comes from
  frontmatter via `PageHeader`. Body sections start at `## `.
- `category` must be one of the values in `CATEGORY_ORDER`
  (`apps/docs/src/lib/content.ts`). Do not invent categories; if you need
  a new one, add it to the array first (its position there is the sidebar
  order).
- `order` is a sort key inside the category. Use increments of 10
  (`10`, `20`, `30`, …) so new components can be inserted without
  renumbering.
- `links` — always include `doc` and `api` when the component wraps a
  Base UI primitive. Skip both for components we built without one
  (e.g. `Card`, `Badge`, `Skeleton`).
- `hidden: true` removes the page from the sidebar without deleting it.

## RTL examples

Every component MUST have an example named `rtl.tsx` — it is the **last**
example on the page and it is written in Persian (Farsi). It exists to
demonstrate how the component looks and behaves inside an RTL page.

### The preview handles RTL automatically

`ComponentPreview` derives the initial direction from the example's file
name:

```tsx
const [direction, setDirection] = useState<Direction>(file === 'rtl' ? 'rtl' : 'ltr')
```

When `file === 'rtl'`:

- The preview wrapper gets `dir="rtl"`.
- The demo is wrapped in `<DirectionProvider direction="rtl">`.
- The RTL toggle button is hidden (`showRtlToggle = file !== 'rtl'`),
  because it would be redundant — the example is already RTL.

### What an RTL example must NOT do

Do **not** wrap the demo in `<div dir="rtl">`. Do **not** wrap it in
`<DirectionProvider>`. Do **not** pass `dir="rtl"` to any component. The
preview already does all of that — doing it again creates a nested RTL
context that is harder to reason about and can double-flip certain
transforms.

```tsx
// ❌ double RTL
export default function Rtl() {
  return (
    <div dir="rtl">
      <Button>ثبت</Button>
    </div>
  )
}

// ✅ the preview provides the RTL context
export default function Rtl() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>ثبت</Button>
    </div>
  )
}
```

A `<div>` for _layout_ (flex, gap) is fine. A `<div>` for _direction_ is
not.

### What an RTL example should show

- Real Persian strings, not Lorem Ipsum. "ثبت تغییرات", "انصراف", "ذخیره".
- 3–8 variants that together cover the component's visual range (sizes,
  variants, states).
- Icons and any component that has a directional layout (chevrons,
  arrows, sliders) so the flip is visible.

A good RTL example reads like a screenshot of the component used in an
actual Persian UI, not like a translation of the Basic example.
