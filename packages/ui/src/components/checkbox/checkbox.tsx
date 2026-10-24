import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type CheckboxSize = 'sm' | 'md'

const checkboxStyles = cva(
  [
    // The root is the visible box; Base UI renders a hidden <input> behind
    // it for form participation and label association.
    'relative flex shrink-0 items-center justify-center',
    'rounded-md border border-input',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Extended click area to reach a WCAG AAA touch target (44×44). The
    // pseudo-element is transparent — it only widens the hit zone.
    'after:-inset-x-3 after:-inset-y-3 after:absolute',
    // Focus: outline outside the box, matching Button and Input.
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    // Checked / indeterminate share the same fill.
    'data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',
    'data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground',
    // Disabled
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    // Invalid
    'data-invalid:border-destructive',
  ],
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
      } satisfies Record<CheckboxSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

const indicatorStyles = cva('flex items-center justify-center text-current', {
  variants: {
    size: {
      sm: '[&_svg]:size-3',
      md: '[&_svg]:size-3.5',
    } satisfies Record<CheckboxSize, string>,
  },
  defaultVariants: { size: 'md' },
})

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface CheckboxOwnProps {
  /**
   * Size of the checkbox. `sm` (16px) fits dense tables; `md` (20px) is the
   * default and lines up with `Button`'s small icon sizes.
   *
   * @default "md"
   */
  size?: CheckboxSize
}

/** Props provided by Base UI's Checkbox primitive. */
export type CheckboxBaseUiProps = Omit<BaseCheckbox.Root.Props, 'className'>

/** Public composed props. */
export interface CheckboxProps extends CheckboxOwnProps, CheckboxBaseUiProps {
  className?: string
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A checkbox with checked, unchecked, and indeterminate states.
 *
 * Base UI drives all states via `data-*` attributes on the root, so the
 * styling stays in sync even when the value is controlled from outside.
 *
 * The `indeterminate` prop is separate from `checked`: pass both to render a
 * "partially selected" state (e.g. a parent checkbox whose children are
 * mixed):
 *
 * Inside a `<Field>`, skip `Label`/`htmlFor` — the field wires the label
 * automatically through Base UI's `Field.Control`.
 *
 * Pass any children to replace the default check/minus icon.
 */
export function Checkbox({
  size = 'md',
  className,
  indeterminate = false,
  children,
  ...props
}: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      data-size={size}
      indeterminate={indeterminate}
      className={cn(checkboxStyles({ size }), className)}
      {...props}
    >
      <BaseCheckbox.Indicator data-slot="checkbox-indicator" className={indicatorStyles({ size })}>
        {children ?? (indeterminate ? <MinusIcon /> : <CheckIcon />)}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  )
}
