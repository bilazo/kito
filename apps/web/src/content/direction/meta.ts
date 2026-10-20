import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['DirectionProvider', 'useDirection'],

  summary:
    'Sets the text direction (ltr or rtl) for a subtree, and reads it back with `useDirection()`. Essential for RTL languages like Arabic, Hebrew, and Persian. Most apps set `dir` on the `<html>` element once and never think about direction again — DirectionProvider is for scoping direction to a portion of a page where the surrounding context is different.',

  whenToUse: [
    'Scope RTL to a portion of a page inside an otherwise LTR app — a preview pane, an embedded widget in an RTL host, a docs page that demonstrates both directions.',
    'Provide direction context to Base UI components whose popups are portaled to `<body>` — the portal escapes the `dir` attribute on an ancestor container but keeps the React context, so DirectionProvider keeps the popup oriented correctly.',
    'Read the current direction in your own component via `useDirection()` without manually traversing `dir` attributes in the DOM.',
  ],

  whenNotToUse: [
    'For a whole-app RTL layout — set `dir="rtl"` on `<html>` once. Every element and every Base UI portal picks it up from the DOM. DirectionProvider is redundant.',
    'For direction on a single element — use the HTML `dir` attribute on that element. A React provider is overkill.',
    'For a small inline fragment (a sentence, a single word) — use the HTML `dir` attribute directly.',
  ],

  props: [
    {
      name: 'direction',
      type: "'ltr' | 'rtl'",
      required: true,
      description:
        'The text direction applied to the subtree. Base UI components inside read it from React context. A DOM `dir` on a wrapper is still needed for CSS logical properties to flip — the provider only sets the React context.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The content to render inside the provider.',
    },
  ],

  propsNote:
    'DirectionProvider does not render a DOM element — it only provides React context. To make CSS logical properties (`ps-*`, `me-*`, `text-start`) flip as well, also set `dir="rtl"` on a wrapping DOM element.',

  composition: [
    {
      title: 'Scoped RTL in an LTR app',
      description:
        'Wrap only the part that should flip. Pair with `dir="rtl"` on a DOM wrapper so both the React context and CSS logical properties flip.',
      code: `<DirectionProvider direction="rtl">\n  <div dir="rtl">\n    <PersianWidget />\n  </div>\n</DirectionProvider>`,
    },
    {
      title: 'Reading the current direction',
      description:
        'Useful when a component needs to branch on direction for behavior, not just CSS.',
      code: `import { useDirection } from '@bilazo/kito/components/direction'\n\nfunction MyComponent() {\n  const direction = useDirection()\n  return <div>Current: {direction}</div>\n}`,
    },
    {
      title: 'Whole-app RTL',
      description: 'Set it once at the HTML level. No provider is needed for the common case.',
      code: `<html dir="rtl">\n  <body>\n    <App />\n  </body>\n</html>`,
    },
  ],
}
