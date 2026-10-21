## Testing Base UI components that depend on browser events

Some Base UI primitives (Avatar.Image, Select with async options, etc.) depend
on real browser events (`load`, `error`, `transitionend`) that never fire in
jsdom. When testing them:

- **Do not** query by `data-slot` for elements Base UI conditionally renders.
- **Do not** use `getByRole` for elements that are hidden from the a11y tree.
- **Do** use `document.querySelector` to verify DOM presence.
- **Do** focus tests on observable behaviour: what the user sees before and
  after the event, not on internal state.

Example: for `AvatarImage`, assert that the fallback is visible before load,
and that an `<img>` with the correct `src`/`alt` exists in the DOM. Do not
attempt to simulate image loading unless there's a specific bug.

## What jsdom cannot do

jsdom does not fire `load`, `error`, or `transitionend` events automatically,
and does not run layout or paint. Consequences:

- `<img>` elements are only mounted by Base UI **after** `load` fires — in
  jsdom they never appear. Do not assert their presence.
- `getBoundingClientRect` returns zeros everywhere.
- `matchMedia` must be stubbed for responsive code.
- `IntersectionObserver`, `ResizeObserver`, `IntersectionObserverEntry` are
  not implemented.

When a component's behaviour depends on one of these, test only the
**pre-event** state (what the user sees before load / before transition /
before layout). Do not mock browser primitives to simulate the post-event
state unless the test is specifically about the integration with the browser
API — that is what Playwright is for.

## When not to mock

If the code under test is a third-party library (Base UI), do not mock
its internal behaviour. Assert the integration points only:

- The correct children are rendered.
- The correct className/attributes are on the wrapping element.
- The correct hooks are connected.

Trust the library's own test suite for its internals.

## Base UI Indicator unmounting

Base UI's `*.Indicator` components (Checkbox.Indicator, Radio.Indicator,
Switch.Thumb, …) unmount when the control is not in the "on" state by
default. Consequences for tests:

- Asserting on indicator children when the control is unchecked **will fail**
  — the element is not in the DOM.
- Always render the control as checked (`defaultChecked`, `checked`,
  `value` with `defaultValue` on the group) before asserting on the
  indicator.
- If you need to test the unchecked state, assert on the _root_'s data
  attribute (`data-unchecked`), not on the indicator.

```tsx
// ❌ — indicator not mounted
render(
  <Checkbox aria-label="x">
    <svg data-testid="icon" />
  </Checkbox>,
)
expect(screen.getByTestId('icon')).toBeInTheDocument()

// ✅ — indicator mounted
render(
  <Checkbox defaultChecked aria-label="x">
    <svg data-testid="icon" />
  </Checkbox>,
)
expect(screen.getByTestId('icon')).toBeInTheDocument()
```

To keep the indicator mounted across states, pass `keepMounted` on the
Indicator. Kito does not do this by default — the unmounting behaviour
is intentional.

## Popup content stays in the DOM

Base UI keeps `Portal`-rendered popups (Select, Combobox, Dialog, …) mounted
after close — the container gets `data-closed` and `hidden`, but the children
are still in the DOM. Consequences:

- `screen.getByText('Some label')` may match both the trigger's value AND the
  option inside the closed popup.
- Scope queries to a specific `data-slot` when asserting on the trigger:

```tsx
// ✅
const value = document.querySelector('[data-slot="select-value"]')
expect(value).toHaveTextContent('French')

// Or use within() when you have the container reference
const trigger = screen.getByRole('combobox')
expect(within(trigger).getByText('French')).toBeInTheDocument()
```

- `screen.queryByRole('listbox')` DOES work to assert the popup is closed,
  because Base UI sets `hidden` on the positioner wrapper, which removes the
  listbox from the accessibility tree.

## Async popups: use findByRole, not getByRole

Base UI renders its popups (Select, Combobox, Dialog, Menu, Tooltip, …)
asynchronously — the popup is not in the DOM the moment you click the
trigger. `userEvent.click` awaits the click dispatch but not the subsequent
render.

Always use `findByRole` (or `findByText`, …) for the first query after
opening a portal-based component:

```tsx
// ✅
await userEvent.click(screen.getByRole('combobox'))
await userEvent.click(await screen.findByRole('option', { name: 'French' }))

// ❌ — races the opening
await userEvent.click(screen.getByRole('combobox'))
await userEvent.click(screen.getByRole('option', { name: 'French' }))
```

After the popup is confirmed open (via `findByRole`), inner queries can use
`getByRole` safely because the popup is already rendered. The same rule
applies after closing a popup — use `waitFor` before asserting absence:

```tsx
await waitFor(() => {
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
})
```

## Test naming

The `vitest/prefer-lowercase-title` rule runs with `ignoreTopLevelDescribe:
true`. This gives one specific exception and a strict rule everywhere else.

### Top-level `describe` — PascalCase allowed

The outermost `describe` names the component under test, matching the
component's PascalCase export:

```tsx
describe('Drawer', () => { ... })       // ✅ PascalCase
describe('DatePicker', () => { ... })   // ✅ PascalCase
describe('drawer', () => { ... })       // ✅ lowercase is fine too
describe('DrawerHandle', () => { ... }) // ✅ PascalCase
```

Only the **top-level** describe gets this exception. It exists so the test
output reads as a component name, not a fragment.

### Everything else — lowercase

Every other name — nested `describe`, `test`, `it` — must start with a
lowercase letter:

```tsx
// ✅
describe('Drawer', () => {
  describe('sides', () => {
    test('anchors to the bottom edge', () => { ... })
    test('renders with a swipe handle', () => { ... })
  })
})

// ❌
describe('Drawer', () => {
  test('Renders the title', () => { ... })         // starts uppercase
  test('DrawerHandle is exportable', () => { ... }) // starts uppercase
  describe('Snap Points', () => { ... })            // starts uppercase
})
```

### Component names may appear mid-sentence

The rule is only about the first character. Component names inside the
sentence keep their PascalCase:

```tsx
// ✅ — first character lowercase, component name preserved
test('renders DrawerHandle standalone', () => { ... })
test('passes data to the Select', () => { ... })
test('forwards ref to the Input', () => { ... })

// ❌ — first character uppercase
test('DrawerHandle is exportable', () => { ... })
test('Select forwards refs', () => { ... })
```

### Prefer verb-first phrasing

When fixing a name that starts with a component name, restructure to lead
with a verb — it reads more naturally and sidesteps the capital letter:

| Before                          | After                             |
| ------------------------------- | --------------------------------- |
| `DrawerHandle is exportable`    | `renders DrawerHandle standalone` |
| `Escape closes the dialog`      | `closes on Escape`                |
| `Backdrop dims the page`        | `dims the page on open`           |
| `defaultValue selects the item` | `selects the defaultValue item`   |

### Why this split

- The top-level `describe` is a _label_ — it benefits from being the actual
  component name.
- Everything under it is a _sentence_ about that component, and sentences
  read better lowercase. Test output like
  `Drawer > sides > anchors to the bottom edge` reads as a sentence; a
  capital letter inside breaks the flow.

## Ref forwarding

React 19 makes `ref` a regular prop. Components that spread `{...props}` on
a native element (like `Skeleton` on `<div>`) forward the ref automatically.
Components built on a Base UI primitive (`Progress`, `Input`, …) inherit the
primitive's ref handling.

Every component that renders a native element directly MUST have a test
that verifies ref forwarding:

    test('forwards ref to the underlying div', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Skeleton ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

The test is a regression guard: any future refactor that removes `{...props}`
from the element (or introduces a wrapper without `ref` forwarding) will
break this test instead of silently breaking consumer code.
