# Code Style

Managed by `oxfmt` (`@bilazo/oxc-config/format`). Do not hand-format.

## Quotes

- **Strings in JS/TS**: single quotes (`'hello'`)
- **JSX attributes**: double quotes (`<div className="foo">`)
- **Strings containing `"`**: use single quotes and let the quote appear literally —
  do not escape unnecessarily: `'say "hi"'` not `"say \"hi\""`
- **Strings containing `'`**: use single quotes and escape: `'it\'s'` — or, if
  the string contains more `'` than `"`, it's fine to hand-flip to double
  quotes and let the formatter preserve it. Only do this for readability.

## Semicolons

- Not used (`semi: false`). Only add where ASI would break:
  - Lines starting with `(`, `[`, `` ` ``, `+`, `-`, `/`
  - After a `return` of a multi-line expression when the parser could
    interpret the continuation as a new statement.

## Trailing commas

- Always, including function parameters and arguments (`trailingComma: 'all'`).

## Arrow functions

- Always parentheses, even for single arguments (`arrowParens: 'always'`).
  - `(x) => x + 1` not `x => x + 1`
