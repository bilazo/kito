import type { ComponentMeta } from '@/lib/meta'

export const meta: ComponentMeta = {
  exports: [
    'Combobox',
    'ComboboxInput',
    'ComboboxPopup',
    'ComboboxList',
    'ComboboxItem',
    'ComboboxEmpty',
    'ComboboxGroup',
    'ComboboxGroupLabel',
    'ComboboxSeparator',
  ],

  summary:
    'A searchable dropdown — a text input that filters a list as you type. Pass `items` to the root as `{ value, label }[]`; Base UI filters the list against each label and displays the selected label in the input automatically. The input is also the trigger — there is no separate button — and it wraps Base UI’s `InputGroup` so the popup anchors to the whole control (input + clear + icon), not the narrower `<input>` inside. Two API gotchas worth learning up front: every `ComboboxItem` takes the **whole item object** as its `value` prop (not `item.value`), and `ComboboxList`’s children must be a **function** — Base UI calls it once per filtered item. For a short fixed list with no typing, prefer `Select`.',

  whenToUse: [
    'Choose one option from a longer list — ten or more items — where the user knows the label they want and typing it is faster than scrolling.',
    'A country / language / timezone picker with dozens of options — the filter input is the primary affordance.',
    'A search-as-you-type field where selection and query are the same gesture — pick from results as you type.',
    'An autocomplete field with grouped results — `ComboboxGroup` / `ComboboxGroupLabel` for headings, `ComboboxSeparator` between sections.',
    'A form control that needs a visible selected value after the popup closes — the input shows the selected label, like a native `<select>`.',
    'When the empty state matters — `ComboboxEmpty` shows the no-results message automatically when the filtered list has no items; no manual visibility state is needed.',
  ],

  whenNotToUse: [
    'For a short fixed list (under ~10 options) with no typing — use `Select`. `Combobox` adds an input, a filter state, and a clear button that a fixed list does not need; `Select` behaves the way a native `<select>` does with the keyboard.',
    'For multi-select — use a `Combobox` with `multiple` (Base UI supports it), but do not fake it with a single-value combobox. Users expect multi-select chips, not a single label.',
    'For choosing between two or three options — use `Radio` or `SegmentedControl`. A combobox for three options hides them behind a click and a keystroke.',
    'For navigation between pages — use a `Menu` with `Link` items, or a real page. A combobox whose `onValueChange` calls `router.push` is a menu in disguise and loses the router’s prefetching.',
    'Without an accessible name — every combobox needs an `aria-label` or a `Field` / `Label` pairing. A bare input is announced as "combobox" with no context.',
    'For free-text input with no list — use `Input`. The dropdown and filter are overhead if there is nothing to filter.',
    'As the only way to enter a value that must match the list exactly — use `Select`. A combobox lets the user type anything; if invalid input is not handled, the form submits a value the app does not expect.',
    'For a numeric picker (a range, a number from 1 to 100) — use `Slider` or `Input type="number"`. A combobox of numbers is a dropdown of numbers; scrolling through is slower than dragging.',
  ],

  props: [
    {
      name: 'items',
      type: 'readonly { value: string; label: ReactNode }[] | Record<string, ReactNode>',
      description:
        'The option list. Base UI filters it as the user types and matches against each item’s `label`. `ComboboxInput` displays the selected item’s label — no manual lookup is needed. Inherited from Base UI’s `Combobox.Root`. `Combobox` prop.',
    },
    {
      name: 'value',
      type: 'unknown',
      description:
        'Controlled value. Pass with `onValueChange` for a controlled combobox; omit both for an uncontrolled one (then use `defaultValue`). The type is generic — a strongly-typed item shape survives the composed props. Inherited from Base UI’s `Combobox.Root`. `Combobox` prop.',
    },
    {
      name: 'onValueChange',
      type: '(value: unknown, eventDetails: ...) => void',
      description:
        'Change callback. Fires when the user selects an item; receives the whole item object (not `item.value`). Inherited from Base UI’s `Combobox.Root`. `Combobox` prop.',
    },
    {
      name: 'defaultValue',
      type: 'unknown',
      description:
        'Initial value for an uncontrolled combobox. Ignored when `value` is passed. Inherited from Base UI’s `Combobox.Root`. `Combobox` prop.',
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      default: "'md'",
      description:
        'Height of the input group. `sm` is `h-(--control-sm)` (32px); `md` is `h-(--control-md)` (40px). Shares the `--control-*` tokens with `Input` and `SelectTrigger` — a combobox and an input sit in the same row at matching heights. `ComboboxInput` prop.',
    },
    {
      name: 'showClear',
      type: 'boolean',
      default: 'true',
      description:
        'Render a clear (×) button at the end side when the input has content. The button hides itself when the input is empty — no manual state is needed. `ComboboxInput` prop.',
    },
    {
      name: 'showTrigger',
      type: 'boolean',
      default: 'true',
      description:
        'Render a chevron icon at the end side. Purely decorative — the popup opens on input focus or click, not on the chevron. `ComboboxInput` prop.',
    },
    {
      name: 'sideOffset',
      type: 'number',
      default: '6',
      description: 'Gap between the input group and the popup, in pixels. `ComboboxPopup` prop.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'start'",
      description:
        'Horizontal alignment of the popup relative to the input group. Kito defaults to `start`, matching `Select`. `ComboboxPopup` prop.',
    },
    {
      name: 'placeholder',
      type: 'string',
      description:
        'Shown in the input when nothing is selected. Rendered in `text-muted-foreground` via `placeholder:text-muted-foreground`. `ComboboxInput` prop.',
    },
    {
      name: 'className',
      type: 'string',
      description:
        'Extra classes on any part. For `ComboboxInput`, useful for a width cap (`max-w-xs`); for `ComboboxPopup`, a `w-(--anchor-width)` override or a fixed width.',
    },
  ],

  propsNote:
    'Nine components compose. `Combobox` (root) renders no DOM — it forwards to Base UI’s `Combobox.Root` and manages the value, open state, and filtering. `ComboboxInput` renders a `BaseCombobox.InputGroup` (the popup’s anchor) containing a `BaseCombobox.Input` (the text field + `role="combobox"`) plus an optional clear button and an optional chevron icon. `ComboboxPopup` is portaled and its width matches the input group (`min-w-(--anchor-width)`). `ComboboxList`’s **children must be a function** (`{(item) => <ComboboxItem …/>}`) — Base UI calls it once per matching item; static children bypass filtering and only show if the list is short and always visible. Every `ComboboxItem` takes the **whole item object** as its `value` prop (`value={item}`, not `value={item.value}`) — Base UI uses the object’s `label` for the input and its `value` for the form submission, and a mismatch breaks both. `ComboboxEmpty` follows Kito’s `Empty` pattern: hidden by default (`hidden group-data-empty/combobox-popup:block`), revealed only when the popup gets `data-empty` — this removes the blank padded row that Base UI’s `Empty` would otherwise leave, and prevents the empty element’s `role="status"` from interrupting keyboard navigation. `ComboboxGroup` / `ComboboxGroupLabel` / `ComboboxSeparator` are pass-through wrappers. `inputGroupStyles`, `ChevronIcon`, `CheckIcon`, and `XIcon` are internal. **Portal gotcha:** the popup is portaled, so `dir="rtl"` on an ancestor wrapper does not reach it — the items’ logical padding (`ps-3 pe-8`) and the checkmark’s `inset-e-2` would resolve to the wrong side without a `dir` ancestor. Pass `dir="rtl"` on `ComboboxPopup` when the page’s `<html dir="rtl">` is not set (same exception as `SheetPopup` / `DialogPopup` / `DrawerPopup` / `SelectPopup`).',

  composition: [
    {
      title: 'Basic',
      description:
        'The canonical pattern: `Combobox` with `items`, a `ComboboxInput` with a placeholder, a `ComboboxPopup` with a `ComboboxList` and a `ComboboxEmpty`. Note two gotchas: `ComboboxList`’s children is a function of `item`, and each `ComboboxItem` takes `value={item}` (the whole object), not `item.value`.',
      code: `import {\n  Combobox,\n  ComboboxEmpty,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n  ComboboxPopup,\n} from '@bilazo/kito/components/combobox'\n\nconst LANGUAGES = [\n  { value: 'en', label: 'English' },\n  { value: 'fa', label: 'Persian' },\n  { value: 'fr', label: 'French' },\n]\n\n<Combobox items={LANGUAGES}>\n  <ComboboxInput placeholder="Search languages…" />\n  <ComboboxPopup>\n    <ComboboxList>\n      {(item) => (\n        <ComboboxItem key={item.value} value={item}>\n          {item.label}\n        </ComboboxItem>\n      )}\n    </ComboboxList>\n    <ComboboxEmpty>No languages found.</ComboboxEmpty>\n  </ComboboxPopup>\n</Combobox>`,
    },
    {
      title: 'Inside a Field',
      description:
        'Wrap the `Combobox` in a `Field` with a `FieldLabel`. The input fills the field width, matching `Input` and `SelectTrigger`. Base UI wires the label to the input automatically.',
      code: `import {\n  Combobox,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n  ComboboxPopup,\n} from '@bilazo/kito/components/combobox'\nimport { Field, FieldLabel } from '@bilazo/kito/components/field'\n\n<Field name="language">\n  <FieldLabel>Language</FieldLabel>\n  <Combobox items={LANGUAGES}>\n    <ComboboxInput placeholder="Search languages…" />\n    <ComboboxPopup>\n      <ComboboxList>\n        {(item) => (\n          <ComboboxItem key={item.value} value={item}>\n            {item.label}\n          </ComboboxItem>\n        )}\n      </ComboboxList>\n    </ComboboxPopup>\n  </Combobox>\n</Field>`,
    },
    {
      title: 'Grouped options',
      description:
        'Use `ComboboxGroup` with `ComboboxGroupLabel` for a heading and `ComboboxSeparator` between groups. Groups still respect filtering — a group whose items are all filtered out hides itself.',
      code: `import {\n  Combobox,\n  ComboboxGroup,\n  ComboboxGroupLabel,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n  ComboboxPopup,\n  ComboboxSeparator,\n} from '@bilazo/kito/components/combobox'\n\n<Combobox items={ITEMS}>\n  <ComboboxInput placeholder="Search languages…" />\n  <ComboboxPopup>\n    <ComboboxList>\n      <ComboboxGroup>\n        <ComboboxGroupLabel>European</ComboboxGroupLabel>\n        <ComboboxItem value={ITEMS[0]}>English</ComboboxItem>\n        <ComboboxItem value={ITEMS[1]}>French</ComboboxItem>\n        <ComboboxItem value={ITEMS[2]}>German</ComboboxItem>\n      </ComboboxGroup>\n      <ComboboxSeparator />\n      <ComboboxGroup>\n        <ComboboxGroupLabel>Middle Eastern</ComboboxGroupLabel>\n        <ComboboxItem value={ITEMS[3]}>Persian</ComboboxItem>\n        <ComboboxItem value={ITEMS[4]}>Arabic</ComboboxItem>\n        <ComboboxItem value={ITEMS[5]}>Turkish</ComboboxItem>\n      </ComboboxGroup>\n    </ComboboxList>\n  </ComboboxPopup>\n</Combobox>`,
    },
    {
      title: 'Controlled',
      description:
        'Pass `value` and `onValueChange` to drive the selected item from outside. The type is generic — a strongly-typed item shape survives without a cast.',
      code: `import {\n  Combobox,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n  ComboboxPopup,\n} from '@bilazo/kito/components/combobox'\nimport { useState } from 'react'\n\ntype Language = { value: string; label: string }\n\nexport function Controlled() {\n  const [value, setValue] = useState<Language | null>(null)\n  return (\n    <Combobox\n      items={LANGUAGES}\n      value={value}\n      onValueChange={(v) => setValue(v as Language | null)}\n    >\n      <ComboboxInput placeholder="Pick a language…" />\n      <ComboboxPopup>\n        <ComboboxList>\n          {(item) => (\n            <ComboboxItem key={item.value} value={item}>\n              {item.label}\n            </ComboboxItem>\n          )}\n        </ComboboxList>\n      </ComboboxPopup>\n    </Combobox>\n  )\n}`,
    },
    {
      title: 'Empty state',
      description:
        '`ComboboxEmpty` shows automatically when the filtered list has no items — you do not control its visibility. Base UI fills it only when nothing matches; the container is hidden by default via `group-data-empty/combobox-popup:block`, so it leaves no blank row.',
      code: `import {\n  Combobox,\n  ComboboxEmpty,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n  ComboboxPopup,\n} from '@bilazo/kito/components/combobox'\n\n<Combobox items={CITIES}>\n  <ComboboxInput placeholder="Type to search cities…" />\n  <ComboboxPopup>\n    <ComboboxList>\n      {(item) => (\n        <ComboboxItem key={item.value} value={item}>\n          {item.label}\n        </ComboboxItem>\n      )}\n    </ComboboxList>\n    <ComboboxEmpty>No cities match your search.</ComboboxEmpty>\n  </ComboboxPopup>\n</Combobox>`,
    },
  ],
}
