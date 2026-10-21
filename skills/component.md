## Props split

Each component exports:

- `<Name>OwnProps` — props defined by this library
- `<Name>BaseUiProps` — props coming from a Base UI primitive
- `<Name>HTMLProps` — props forwarded to the DOM element (type alias)
- `<Name>Props` — composed interface extending the above

The docs generator categorizes props by these suffixes.
Always JSDoc-document own props so the docs table isn't empty.

Rule: Never expose VariantProps<typeof x> in public component prop interfaces. Always declare variant union types explicitly and use satisfies Record<Union, string> inside cva definitions. Reason: cva types include null, which breaks compatibility with primitives (Base UI) that don't accept null.

## JSDoc rules

- Every prop in `<Name>OwnProps` MUST have a JSDoc block.
- The first line is the description (imperative, present tense).
- Optional props with defaults MUST include a `@default <value>` tag.
- Because variant unions are declared manually (not derived from `cva`),
  `defaultVariants` in the `cva` call is NOT read by the docs generator.
  Always duplicate the default as `@default` in JSDoc.

## When to use Base UI `useRender`

Use `useRender` from `@base-ui/react/use-render` for any component that should
support the `render` prop (polymorphism). This is the standard for all Kito
components, not just Button.

- For native-feeling components (Button, Badge, Card), use
  `defaultTagName: "<tag>"` with an explicit `useRender.ComponentProps<"<tag>">`.
- Never wrap a Base UI primitive (Dialog, Select, Menu) manually — those
  already accept `render` through their own API.

## Framework-agnostic rule

Kito components must never depend on a specific React meta-framework
(Next.js, TanStack Start, Remix) or router (TanStack Router, React Router).

- Do not import from `@tanstack/react-router`, `next/link`, etc.
- For polymorphic components, use Base UI's `render` prop.
- For links, provide a `buttonVariants()`-style helper so consumers can apply
  styles to their own Link component.

Router-specific behaviour belongs in the consuming app, not in the library.

## File naming

Every file and folder in the repository uses **kebab-case with lowercase
letters only**. No camelCase, no PascalCase, no underscores, no spaces.

### Applies to

- Component folders: `packages/ui/src/components/<name>/`
- Component files: `packages/ui/src/components/<name>/<name>.tsx`
- Test files: `packages/ui/src/components/<name>/<name>.test.tsx`
- Internal subcomponent files: `packages/ui/src/components/<name>/<name>-content.tsx`
- Type-only files (when split): `packages/ui/src/components/<name>/<name>.types.ts`
- Docs pages: `apps/web/src/content/<name>/index.mdx`
- Examples folder: `apps/web/src/content/<name>/examples/`
- Example files: `apps/web/src/content/<name>/examples/<example-name>.tsx`

### Multi-word rule

When a component has multiple words, **all words are lowercase joined by a
single hyphen**:

- `date-picker` ✅
- `alert-dialog` ✅
- `toggle-group` ✅
- `date_picker` ❌
- `datepicker` ❌ (unless the word is genuinely one word in English)

### Component export names

The rule is about **file and folder names only**. Inside the file, React's
conventions apply:

- Exported component: PascalCase → `export function DatePicker()`
- Props interfaces: PascalCase → `export interface DatePickerOwnProps`
- Type unions: PascalCase → `type DatePickerVariant = ...`
- `data-slot` values: kebab-case → `data-slot="date-picker"`

So a file named `date-picker/date-picker.tsx` exports `DatePicker`,
imported as `@bilazo/kito/components/date-picker`.

### Why

- Case-insensitive file systems (Windows, macOS default) treat `Button.tsx`
  and `button.tsx` as the same file. Kebab-case avoids collisions and
  cross-platform surprises.
- Tools that glob (`tsdown`, `react-docgen`, our `gen-props.ts`) become
  simpler when a single naming scheme is guaranteed.
- Subpath imports (`@bilazo/kito/components/date-picker`) are naturally lowercase,
  matching npm's preference for kebab-case package entry points.

## Testing Base UI's Button

Base UI Button intentionally uses different disabled semantics depending on
`focusableWhenDisabled`:

- `disabled={true}`, `focusableWhenDisabled={false}` → native `disabled` attr
- `disabled={true}`, `focusableWhenDisabled={true}` → `aria-disabled="true"` only

Never assert `toBeDisabled()` on a focusable-disabled button. Instead, assert:

- `aria-disabled="true"`, `aria-busy="true"` if applicable
- A click handler is not fired

## Rendering links through Button

Base UI's `render` prop forces `role="button"` on whatever element you render.
This is intentional. Never use `render={<a />}` for actual navigation links —
use `buttonVariants()` on the consumer's own Link component instead. See the
"As link" example in `button.mdx`.

## Linting

- All code passes `pnpm lint` before commit.
- Never add `// eslint-disable` or `// oxlint-disable` without a one-line
  reason on the same line (e.g. `// oxlint-disable-next-line xyz -- reason`).
- Components must not import router or meta-framework packages. See
  `no-restricted-imports` in `packages/ui/oxlint.config.ts`.
- Components must not use `dark:` variants. Use semantic tokens — see
  `no-restricted-syntax` in `packages/ui/oxlint.config.ts`.
- Tests use `test()` (not `it()`) — see the `vitest/consistent-test-it`
  override.

## Root component name

The root component in `components/<name>/<name>.tsx` MUST have a PascalCase
name that exactly matches the folder name:

- `avatar/avatar.tsx` → `export function Avatar(...)`
- `date-picker/date-picker.tsx` → `export function DatePicker(...)`
- `alert-dialog/alert-dialog.tsx` → `export function AlertDialog(...)`

## Props categorization

Props are categorized by the origin of their declaration, not by which
interface they live in:

- `node_modules/@base-ui/**` → **Base UI** tab
- `node_modules/@types/react/**` → **HTML** tab
- Declared in our own source → categorized by the enclosing interface name:
  - `*OwnProps` → **Component** tab
  - `*BaseUiProps` / `*BaseUIProps` → **Base UI** tab
  - `*HTMLProps` / `*HTMLAttributes` → **HTML** tab
  - anything else → **Component** tab

A `className` prop is placed in whichever tab its declaration resolves to —
that is why `Button.className` (explicitly declared) ends up in _Component_
while `Badge.className` (from `useRender.ComponentProps`) ends up in _Base UI_.
Both are correct.

## The `children` prop

`children` MUST always be declared optional (`children?: ReactNode`),
even for components that logically require children at runtime.

Reasons:

- JSX allows `<Foo />` — passing no children is a valid call site.
- Tests and empty/loading states need to render without children.
- `React.ComponentProps<"div">` and `useRender.ComponentProps<"span">`
  declare `children` as optional; a required override is a narrowing that
  forces callers to always provide children.

Runtime validation (if truly needed) belongs in a dev-only `console.error`,
not in the type signature.

## Import style

- Value imports and type imports are separate statements:

  ```tsx
  import { cn } from 'cn'
  import { useMemo } from 'react'

  import type { ReactNode } from 'react'
  ```

- Never mix `type` inside a value import: `import { useMemo, type ReactNode }`
  is rejected by the lint config.

## Array types

- Always `T[]`, never `Array<T>` — even for complex element types:
  `({ message?: string } | undefined)[]`.

## Extending Base UI props

When a component's own prop shares a name with a Base UI prop but has a
different type, omit it explicitly:

```tsx
export type InputBaseUiProps = Omit<
  BaseField.Control.Props,
  'className' | 'render' | 'size' // ← size omitted because InputOwnProps also declares it
>
```

Without the explicit omit, TypeScript reports "Named property X are not
identical" at the interface that extends both.

## Base UI Empty components

Base UI's `*.Empty` components (Combobox.Empty, Autocomplete.Empty, …) render
their wrapper element at all times — even when the list has items — and only
fill it with content when the filtered list is empty. Because these wrappers
usually carry padding, they leave a blank row at the end of the list.

Also, some Empty components have `role="status"` or `aria-live`, which puts
them in the a11y tree and can interrupt keyboard navigation.

Always hide Empty by default and show it only when the parent popup has
`data-empty`. The pattern:

```tsx
// Popup:
<Base.Popup className="group/combobox-popup ..." />

// Empty:
<Base.Empty className="hidden group-data-empty/combobox-popup:block ..." />
```

This removes the wrapper from both the visual flow (no blank row) and the
tab order (no keyboard stop) while the list is populated, and reveals it —
with its `aria-live` announcement — the moment the list becomes empty.

## Base UI Viewport and outside-click detection

Base UI primitives that own a "dismiss on outside click" behaviour (Dialog,
Drawer, Popover, …) detect the outside click through document-level
listeners. For the detection to fire, the click must land on an element that
the primitive owns. A `pointer-events-none` viewport that spans the
viewport lets clicks fall through to other layers — and Base UI never sees
them.

Rule: keep the Viewport `pointer-events-auto` when the component is
`modal={true}` (the default). Only set `pointer-events-none` when
`modal={false}` so clicks can reach the page behind.

```tsx
<BaseDrawer.Viewport
  data-modal={modal}
  className={cn(
    'fixed inset-0 z-50',
    modal ? 'pointer-events-auto' : 'pointer-events-none',
  )}
>
```

This is what makes nested drawers close correctly when clicking the
backdrop of the topmost one — the outer drawer's viewport would otherwise
swallow the click before the inner one could react.

## Subcomponents without own props

When a subcomponent (e.g. `ProgressLabel`, `ProgressValue`) has no library-
specific props — only `className` or a Base UI native override — do not
create empty `<Name>OwnProps` / `<Name>BaseUiProps` interfaces. Use a single
`type` alias instead:

    export type ProgressLabelProps = Omit<BaseProgress.Label.Props, 'className'> & {
      className?: string
    }

The rule requiring the three-way split applies only to components that
define at least one own prop. The split is what makes the docs generator
route each prop to the right tab — with no own prop, there is nothing to
route, and the doc generator treats `*Props` as **Component** origin, which
is correct for the base-UI-derived props plus a className override.
