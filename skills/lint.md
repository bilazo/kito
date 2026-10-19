# Linting

## Commands

- `pnpm lint` — lint the whole workspace
- `pnpm lint:fix` — auto-fix what can be fixed
- `pnpm format` — format everything
- `pnpm --filter @hooshid/oxin-ui lint` — one package

Always run `pnpm lint` before committing. The pre-commit hook is not
configured yet, so this is manual for now.

## Rules we deliberately override

### `vitest/prefer-lowercase-title`

Top-level `describe("Button")` uses PascalCase — the component name is a
proper noun. `ignoreTopLevelDescribe: true` is set in
`packages/ui/oxlint.config.ts`.

### `jsdoc/require-returns` and `jsdoc/require-param`

Disabled for `src/components/**`. Props interfaces carry the documentation.
Adding `@param`/`@returns` to a React component function duplicates what the
interface already declares and hurts readability.

### `better-tailwindcss/enforce-canonical-classes`

Disabled workspace-wide. The plugin cannot resolve our custom `@theme` tokens
(`bg-primary`, `text-muted-foreground`, ...) from `defaults.css`, so the rule
produces false positives. Re-enable once the plugin supports loading from a
`@theme` block.

## Rules we enforce on purpose

### `no-restricted-imports` (in `packages/ui`)

Never import router or meta-framework packages inside the library. List:
`@tanstack/react-router`, `@tanstack/start`, `next`, `react-router`,
`@remix-run/*`, `wouter`. Oxin UI must run under any React framework.

### File naming

All files kebab-case, lowercase. `unicorn/filename-case: kebabCase` is on.
Route files with `$` or `_` are exempted by the preset.

## Adding a new rule

- Prefer native Oxlint rules. `no-restricted-syntax` (ESLint-only) is not
  available — use `no-restricted-imports` / `no-restricted-properties`, or
  write a small check script under `<pkg>/scripts/` and chain it in `lint`.
- Every override needs a comment explaining why. If the reason isn't obvious
  in one line, it belongs in this file.

## Vitest assertion conventions

- Use `toHaveBeenCalledOnce()` for single-call assertions. Not `toHaveBeenCalledTimes(1)`.

## Prop categorization in gen-props

Props are categorized by **declaration origin**, not by interface name suffix:

- `node_modules/@base-ui/**` → `baseUi` tab
- `node_modules/@types/react/**` or `react/**` → `html` tab
- Anything in `packages/ui/src/**` → categorized by the enclosing
  interface's name:
  - `*OwnProps` → `own` tab
  - `*HTMLProps` / `*HTMLAttributes` → `html` tab
  - `*BaseUiProps` / `*BaseUIProps` → `baseUi` tab
  - otherwise → `own`

This is why every `*BaseUiProps` type alias **must** end with exactly
`BaseUiProps` (capital U, capital I) — the suffix is what tells the docs
generator which tab to place those props in.

Do not remove the suffix from these type aliases when refactoring.
