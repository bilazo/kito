import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: ['InputGroup', 'InputGroupAddon', 'InputGroupInput'],

  summary:
    'A single visually-merged control — an input plus icon, text, or button slots inside one frame. Use it for search boxes, prefixed URLs, currency fields, and password inputs with a show/hide toggle. The group renders the border, the focus ring, and the invalid styling; the inner input carries none of its own. Size comes from the same `--control-*` tokens as `Button` and is shared with addons and the input through React context, so text scales together and the whole strip lines up with adjacent controls.',

  whenToUse: [
    'A search box with a leading icon — the `basic` pattern with a `Search` icon and an `InputGroupInput`.',
    'A prefixed field — `https://`, a domain, an `@` handle — where the prefix is part of the control, not a separate label.',
    'A currency or unit suffix — `USD`, `تومان`, `kg` — that belongs to the value and should sit inside the frame.',
    'A password field with a show/hide toggle — put a `Button` (`variant="ghost"` `size="icon-sm"`) directly inside the group.',
    'An input with a clear or copy action inside the frame — render the button conditionally so an empty field has no clear affordance.',
    'A single-line text control where a small, related piece of UI (icon, prefix, suffix, button) needs to share the same border, focus ring, and invalid state as the input.',
  ],

  whenNotToUse: [
    'For a plain input with no slots — use `Input`. `InputGroup` adds a wrapper `<div role="group">`, a context provider, and a flex layout that a bare `Input` does not need.',
    'For multi-line text — the group is constrained to a fixed `--control-*` height; use `Textarea` for multi-line entry.',
    'To choose from a fixed list of options — use `Select` or `Combobox`. A text field that happens to accept the same values loses the option list and the keyboard navigation.',
    'When the trailing action is the form’s primary action (Submit, Save) — render it as a normal `Button` next to the input, not inside the frame. Cramming the primary action into the border blurs where the form ends and the action begins.',
    'As a form layout primitive — `Field` and `FieldGroup` handle the vertical rhythm, labels, and descriptions. `InputGroup` is a single control, not a form row.',
    'When the controls inside the frame are peers, not slots — a row of buttons with a shared border is a `ButtonGroup`, not an `InputGroup`. The group role and the focus-within ring assume one primary control.',
  ],

  props: [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description:
        'Group height, from the same `--control-*` tokens as `Button`, `Input`, and `Select` — an input group and an adjacent button line up without manual sizing. Shared with the inner input and addons through React context, so their font sizes scale together: `lg` uses `text-base`, `sm` and `md` use `text-sm` (with `pointer-coarse:text-base` on touch devices). `InputGroup` prop.',
    },
    {
      name: 'align',
      type: "'inline-start' | 'inline-end' | 'block-start' | 'block-end'",
      default: "'inline-start'",
      description:
        'Where the addon sits inside the group. `inline-start` / `inline-end` place the addon at the reading start or end of the flex row and set the padding to match (`ps-3 pe-2` vs `ps-2 pe-3`). `block-start` / `block-end` stack the addon above or below the input — the group switches to a column layout with auto height (via `has-[[data-align=block-*]]:flex-col`), so a block addon never squeezes into the fixed `--control-*` height. `InputGroupAddon` prop.',
    },
    {
      name: 'role',
      type: 'string',
      default: "'group'",
      description:
        'ARIA role on the group root. Defaults to `group` so assistive technology announces the composite as a single unit. Override to `search` for a search bar (`<InputGroup role="search">`); the role-override test guarantees the prop reaches the underlying `<div>`. `InputGroup` prop.',
    },
    {
      name: 'dir',
      type: "'ltr' | 'rtl' | 'auto'",
      description:
        'Explicit text direction on the inner input. Defaults from `type` via `defaultDir(type)` — `email`, `url`, `tel`, `password`, and `number` force `dir="ltr"`, everything else is `dir="auto"`. Overrides the default when the heuristic is wrong for a specific field. `InputGroupInput` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on `InputGroup`, `InputGroupAddon`, or `InputGroupInput`. Merged with the base classes via `cn()` — typically used for width (`max-w-md`) on the group, layout on the addon, or a one-off visual override on the input.',
    },
  ],

  propsNote:
    'Three components compose. `InputGroup` renders a `<div role="group">` that carries the border, the focus ring (`focus-within:border-ring` + `focus-within:outline-1`), and the invalid/disabled detection via `has-*` selectors — `has-[:disabled]` dims the whole strip, `has-[[aria-invalid=true]]` or `has-[[data-invalid]]` draws the destructive border. `InputGroupInput` is a bare `BaseInput` with no border, no background, and no focus ring of its own (`outline-0`) — the group provides them. `InputGroupAddon` is a non-interactive slot; its click handler forwards focus to the input unless the click landed on a real control (`button`, `select`, `a`, `input`) or `preventDefault` was called, so a `Button` inside an addon behaves independently. JSX order equals visual order — the first child sits at the reading start — so RTL works without a direction prop. `groupStyles`, `InputGroupSize`, and `InputGroupAlign` are internal to the module; only the three components and their `*OwnProps` / `*HTMLProps` / `*BaseUiProps` / `*Props` types are exported.',

  composition: [
    {
      title: 'Search with an icon',
      description:
        'The canonical pattern: a leading icon in an `InputGroupAddon`, a bare `InputGroupInput`, and the group handles the border and focus ring. Give the input an `aria-label` — the icon is decorative, not a name.',
      code: `import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'\nimport { Search } from 'lucide-react'\n\n<div className="w-full max-w-md">\n  <InputGroup>\n    <InputGroupAddon>\n      <Search />\n    </InputGroupAddon>\n    <InputGroupInput placeholder="Search…" aria-label="Search" />\n  </InputGroup>\n</div>`,
    },
    {
      title: 'Prefix and suffix',
      description:
        'Addons hold short text as well as icons. `inline-start` and `inline-end` put them at the reading start and end of the row with the matching padding.',
      code: `import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'\n\n<InputGroup>\n  <InputGroupAddon>vatyar.com/</InputGroupAddon>\n  <InputGroupInput placeholder="username" aria-label="Username" />\n</InputGroup>\n\n<InputGroup>\n  <InputGroupInput placeholder="0" inputMode="numeric" aria-label="Amount" />\n  <InputGroupAddon align="inline-end">تومان</InputGroupAddon>\n</InputGroup>`,
    },
    {
      title: 'Password with a show/hide toggle',
      description:
        'For a clickable slot, skip the addon and put a `Button` (`variant="ghost"` `size="icon-sm"`) directly in the group. The `me-1` trims the trailing inset so the button hugs the border instead of stacking its own padding.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport { InputGroup, InputGroupInput } from '@bilazo/kito/components/input-group'\nimport { Eye, EyeOff } from 'lucide-react'\nimport { useState } from 'react'\n\nexport function Password() {\n  const [visible, setVisible] = useState(false)\n  return (\n    <InputGroup>\n      <InputGroupInput\n        type={visible ? 'text' : 'password'}\n        placeholder="Password"\n        autoComplete="current-password"\n        aria-label="Password"\n      />\n      <Button\n        type="button"\n        variant="ghost"\n        size="icon-sm"\n        className="me-1"\n        aria-label={visible ? 'Hide password' : 'Show password'}\n        onClick={() => setVisible((v) => !v)}\n      >\n        {visible ? <EyeOff /> : <Eye />}\n      </Button>\n    </InputGroup>\n  )\n}`,
    },
    {
      title: 'Clearable search',
      description:
        'Render the trailing clear button conditionally — an always-visible clear on an empty field is visual noise. The `me-1` keeps the button close to the border.',
      code: `import { Button } from '@bilazo/kito/components/button'\nimport { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'\nimport { Search, X } from 'lucide-react'\nimport { useState } from 'react'\n\nexport function Clearable() {\n  const [query, setQuery] = useState('lesson 42')\n  return (\n    <InputGroup>\n      <InputGroupAddon>\n        <Search />\n      </InputGroupAddon>\n      <InputGroupInput\n        value={query}\n        onChange={(e) => setQuery(e.target.value)}\n        placeholder="Search…"\n        aria-label="Search"\n      />\n      {query.length > 0 && (\n        <Button\n          type="button"\n          variant="ghost"\n          size="icon-sm"\n          className="me-1"\n          aria-label="Clear"\n          onClick={() => setQuery('')}\n        >\n          <X />\n        </Button>\n      )}\n    </InputGroup>\n  )\n}`,
    },
    {
      title: 'Block-aligned addon',
      description:
        'Use `align="block-start"` for a labelled slot above the input, like a subject line on a compose field. The group switches to a column layout and auto height so the addon is not squeezed into the fixed control height.',
      code: `import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'\n\n<InputGroup>\n  <InputGroupAddon align="block-start">Subject</InputGroupAddon>\n  <InputGroupInput placeholder="Re: your message" aria-label="Subject" />\n</InputGroup>`,
    },
  ],
}
