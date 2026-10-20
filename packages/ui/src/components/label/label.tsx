import { cn } from 'cn'

import type * as React from 'react'

/**
 * Shared styles — reused by the future `FieldLabel` so both look identical.
 *
 * Three disabled affordances are wired up at once:
 * - `data-disabled` — this element itself carries the attribute
 * - `peer-disabled` — a preceding sibling control is disabled (e.g. a
 *   checkbox row: `<input className="peer" /><Label>…</Label>`)
 * - `group-data-[disabled=true]` — an ancestor group is disabled
 */
const labelStyles = [
  'text-sm font-medium select-none',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
].join(' ')

export type LabelProps = React.ComponentProps<'label'>

/**
 * A form control label.
 *
 * Renders a plain `<label>`; the disabled affordance is inherited from the
 * label itself (`data-disabled`), a preceding peer control, or an ancestor
 * group.
 *
 * Use this component standalone — for example, wrapping a checkbox row or
 * labelling a control that is not part of a Base UI `<Field>`. When the label
 * sits inside a `<Field>`, prefer `FieldLabel` (available once `Field` ships):
 * it wires up the `htmlFor`/`id` pairing automatically.
 */
export function Label({ className, ...props }: LabelProps) {
  // oxlint-disable-next-line jsx-a11y/label-has-associated-control
  return <label data-slot="label" className={cn(labelStyles, className)} {...props} />
}

export { labelStyles }
