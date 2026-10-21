import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type SeparatorOrientation = 'horizontal' | 'vertical'
type SeparatorVariant = 'solid' | 'dashed' | 'dotted'

const separatorStyles = cva('shrink-0', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'self-stretch',
    } satisfies Record<SeparatorOrientation, string>,
    variant: {
      solid: 'bg-border',
      dashed: 'border-dashed border-border',
      dotted: 'border-dotted border-border',
    } satisfies Record<SeparatorVariant, string>,
  },
  compoundVariants: [
    { orientation: 'horizontal', variant: 'solid', className: 'h-px' },
    { orientation: 'vertical', variant: 'solid', className: 'w-px' },
    { orientation: 'horizontal', variant: 'dashed', className: 'border-t' },
    { orientation: 'horizontal', variant: 'dotted', className: 'border-t' },
    { orientation: 'vertical', variant: 'dashed', className: 'border-l' },
    { orientation: 'vertical', variant: 'dotted', className: 'border-l' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
  },
})

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface SeparatorOwnProps {
  /**
   * Orientation of the separator.
   *
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation

  /**
   * Visual style of the line.
   *
   * @default "solid"
   */
  variant?: SeparatorVariant

  /**
   * When `true` (default), the separator is purely visual and hidden from
   * assistive technology. Set to `false` when the separation is semantically
   * meaningful — for example, between two groups of toolbar controls.
   *
   * @default true
   */
  decorative?: boolean
}

/** Props inherited from Base UI's Separator primitive (orientation & role handled here). */
export type SeparatorBaseUiProps = Omit<
  React.ComponentProps<typeof BaseSeparator>,
  'orientation' | 'role'
>

/** Public composed props. */
export interface SeparatorProps extends SeparatorOwnProps, SeparatorBaseUiProps {}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A thin line used to visually separate groups of content.
 *
 * - Visual only (default): `decorative` is `true` and the element is hidden
 *   from screen readers.
 * - Semantic: pass `decorative={false}` to announce the boundary to
 *   assistive technology.
 */
export function Separator({
  orientation = 'horizontal',
  variant = 'solid',
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      data-slot="separator"
      data-variant={variant}
      orientation={orientation}
      role={decorative ? 'none' : 'separator'}
      className={cn(separatorStyles({ orientation, variant }), className)}
      {...props}
    />
  )
}
