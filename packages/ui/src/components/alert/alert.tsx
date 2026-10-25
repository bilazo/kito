import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type AlertVariant = 'default' | 'destructive'

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const alertStyles = cva(
  [
    'group/alert gap-0.5 px-3 py-2.5 relative grid w-full rounded-lg border',
    'text-start text-sm',
    // With an AlertAction present, reserve space on the end so the title and
    // description do not underlap the absolutely-positioned action.
    'has-data-[slot=alert-action]:pe-18',
    // When an SVG icon is a direct child, switch to two columns: icon + content.
    'has-[>svg]:gap-x-2.5 has-[>svg]:grid-cols-[auto_1fr]',
    // Direct-SVG icon treatment: span both rows (title + description), align
    // to the title's baseline, inherit current color, and default-size
    // icons to 16px when the consumer has not set a size-* class.
    '*:[svg]:translate-y-0.5 *:[svg]:row-span-2 *:[svg]:text-current',
    "*:[svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        // The description uses a slightly softer tint so the alert's hierarchy
        // (title stronger, body supporting) is preserved even in red.
        destructive: 'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90',
      } satisfies Record<AlertVariant, string>,
    },
    defaultVariants: { variant: 'default' },
  },
)

/* -------------------------------------------------------------------------- */
/* Alert                                                                      */
/* -------------------------------------------------------------------------- */

export interface AlertOwnProps {
  /**
   * Visual treatment. `destructive` recolors the alert for errors and
   * irreversible warnings. The icon and links inside inherit the destructive
   * color; the description uses a slightly softer tint (`text-destructive/90`).
   *
   * @default "default"
   */
  variant?: AlertVariant
}

export type AlertHTMLProps = Omit<React.ComponentProps<'div'>, 'className'>

export interface AlertProps extends AlertOwnProps, AlertHTMLProps {
  className?: string
}

/**
 * A callout for user attention — a heads-up, an error, an action prompt.
 *
 * Compose with `AlertTitle`, `AlertDescription`, and optionally `AlertAction`.
 * An SVG icon (or a `lucide-react` icon, which renders as an SVG) as a
 * **direct child** of `Alert` switches the layout to two columns: icon +
 * content. Without an icon, the alert collapses to a single column.
 *
 * Renders with `role="alert"` — an assertive live region. Override to
 * `role="status"` (polite) via props for non-urgent callouts that should not
 * interrupt a screen reader mid-sentence.
 */
export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertStyles({ variant }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AlertTitle                                                                 */
/* -------------------------------------------------------------------------- */

export type AlertTitleProps = React.ComponentProps<'div'>

/**
 * The alert's heading. Renders in a medium weight. When the alert has a
 * direct SVG icon child, the title shifts to column 2 so it sits next to the
 * icon rather than over it.
 */
export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'font-medium',
        'group-has-[>svg]/alert:col-start-2',
        '[&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AlertDescription                                                           */
/* -------------------------------------------------------------------------- */

export type AlertDescriptionProps = React.ComponentProps<'div'>

/**
 * The alert's body — a supporting line or paragraph of muted text. Handles
 * long descriptions with `text-balance` on narrow viewports and
 * `md:text-pretty` above the `md` breakpoint so paragraphs do not leave an
 * orphan word on the last line.
 */
export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'md:text-pretty text-sm text-balance text-muted-foreground',
        '[&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-foreground',
        '[&_p:not(:last-child)]:mb-4',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AlertAction                                                                */
/* -------------------------------------------------------------------------- */

export type AlertActionProps = React.ComponentProps<'div'>

/**
 * A trailing action — typically a `Button` — pinned to the top-end corner.
 * The alert reserves end padding (`has-data-[slot=alert-action]:pe-18`) when
 * an action is present so the title and description do not underlap it.
 */
export function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      data-slot="alert-action"
      className={cn('top-2 inset-e-2 absolute', className)}
      {...props}
    />
  )
}

export type { AlertVariant }
