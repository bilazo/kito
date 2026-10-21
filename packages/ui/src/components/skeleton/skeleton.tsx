import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type SkeletonVariant = 'pulse' | 'shimmer'

const skeletonStyles = cva(['relative overflow-hidden', 'rounded-md bg-muted'], {
  variants: {
    variant: {
      // Subtle opacity pulse — the safe default, works on every surface.
      pulse: 'animate-pulse motion-reduce:animate-none',
      // A soft highlight that slides across the placeholder. Reads as
      // "content is on its way" more actively than pulse.
      //
      // The pseudo-element is a 100%-wide gradient translated from -100%
      // to +100% by the `shimmer` keyframe. `overflow-hidden` on the root
      // clips it to the placeholder.
      shimmer: [
        'before:inset-0 before:pointer-events-none before:absolute',
        'before:animate-shimmer motion-reduce:before:animate-none',
        'before:bg-[linear-gradient(90deg,transparent_20%,var(--skeleton-shimmer)_50%,transparent_80%)]',
      ],
    },
  },
  defaultVariants: { variant: 'pulse' },
})

export interface SkeletonProps extends React.ComponentProps<'div'> {
  /**
   * Animation style.
   *
   * - `pulse` — a soft opacity pulse (default)
   * - `shimmer` — a highlight sweeping left to right
   *
   * Both respect `prefers-reduced-motion`: users who opt out see a static
   * placeholder.
   *
   * @default "pulse"
   */
  variant?: SkeletonVariant
}

/**
 * A loading placeholder.
 *
 * Just a styled `<div>`. Size it, shape it, and lay it out with plain
 * utility classes:
 *
 * The element is `aria-hidden` because it's decorative — screen readers
 * should not announce it. Mark the surrounding region with `aria-busy="true"`
 * while data is loading so assistive tech knows content is on its way.
 */
export function Skeleton({ variant, className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant ?? 'pulse'}
      aria-hidden
      className={cn(skeletonStyles({ variant }), className)}
      {...props}
    />
  )
}

export type { SkeletonVariant }
