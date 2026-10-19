import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['Button', 'buttonVariants'],

  summary:
    'A pressable action element. Use Button to trigger actions (submit, save, delete) and to render router links that look like buttons. Supports a loading state, full-width layouts, six sizes, and seven visual variants. Framework-agnostic: works in Next.js, React Router, TanStack Router, or plain React.',

  whenToUse: [
    'Trigger an action: submit a form, save a change, delete a record.',
    'Show a loading state during an async action — the label fades, a spinner appears, and the button stays focusable.',
    'Render a router link with button styling via `buttonVariants()`.',
    'Place an icon-only action inside a toolbar or table row using `size="icon"`.',
  ],

  whenNotToUse: [
    'Navigation between pages — use your router `<Link>` with `buttonVariants()`. Do not use `<Button render={<a/>}>`: Base UI forces `role="button"` on the anchor, which breaks Cmd/Ctrl-click and right-click "Open in new tab".',
    'On/off state — use `Switch` or `Checkbox`.',
    'A list of options the user picks one from — use `Select` or `Combobox`.',
    'A list of commands — use `Menu`.',
    'Icon-only buttons without an `aria-label` — screen readers announce nothing.',
  ],

  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive' | 'link'",
      default: "'primary'",
      description:
        'Visual style. `primary` is the main action of a screen. `secondary` pairs with it. `soft` is brand-tinted and low-emphasis. `outline` is transparent with a border. `ghost` has no chrome — for toolbars. `destructive` is for irreversible actions. `link` renders as inline text.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'",
      default: "'md'",
      description:
        'Controls height and horizontal padding. `sm`, `md`, `lg` are text buttons; `icon-sm`, `icon`, `icon-lg` are square buttons for a single icon.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Span the full width of the parent.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description:
        'Disables the button, hides the label visually (keeping its width), and shows a spinner. Sets `aria-busy` and keeps the button focusable so keyboard users are not dropped from the tab order.',
    },
    {
      name: 'render',
      type: 'ReactElement',
      description:
        'Render as a different element. Do not use this for a navigation link — use `buttonVariants()` on your router `<Link>` instead.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Block interaction. Uses the native `disabled` attribute unless `loading` is also true.',
    },
    {
      name: 'nativeButton',
      type: 'boolean',
      default: 'true',
      description:
        'Set to `false` when the underlying element is not a `<button>` (e.g. `render={<div/>}`). Base UI needs this to apply the correct keyboard behaviour.',
    },
    {
      name: 'focusableWhenDisabled',
      type: 'boolean',
      description:
        'Keep the button focusable while disabled. Enabled automatically when `loading` is true.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes. Merged with the variant classes via `cn()`.',
    },
  ],

  propsNote:
    'All native `<button>` attributes (`id`, `type`, `onClick`, `aria-*`, `data-*`) are forwarded to the underlying element. `buttonVariants({ variant, size, fullWidth })` returns the class string without rendering a button — use it to style a router `<Link>` or a plain `<a>`.',

  composition: [
    {
      title: 'With an icon',
      code: `<Button>\n  <Plus />\n  New item\n</Button>`,
    },
    {
      title: 'Loading state',
      code: `<Button loading>Saving…</Button>`,
    },
    {
      title: 'As a router link',
      description: 'Use `buttonVariants()` — do not use `render={<a/>}`.',
      code: `import { Link } from '@tanstack/react-router'\nimport { buttonVariants } from '@bilazo/kito/components/button'\n\n<Link to="/dashboard" className={buttonVariants({ variant: 'primary' })}>\n  Dashboard\n</Link>`,
    },
    {
      title: 'Icon-only',
      description: 'Always pass `aria-label`.',
      code: `<Button size="icon" aria-label="Add item">\n  <Plus />\n</Button>`,
    },
  ],
}
