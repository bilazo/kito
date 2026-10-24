import { cn } from 'cn'

import type * as React from 'react'

export interface AspectRatioProps extends React.ComponentProps<'div'> {
  /**
   * The desired aspect ratio expressed as `width / height`.
   *
   * Common values:
   * - `16 / 9` — widescreen video
   * - `4 / 3` — classic TV
   * - `1` — square
   * - `9 / 16` — portrait
   * - `3 / 4` — vertical card
   *
   * Pass an expression (`16 / 9`) rather than a string (`'16/9'`) so the
   * value is a number, as the CSS custom property expects.
   */
  ratio: number
}

/**
 * Constrains its child to a fixed aspect ratio.
 *
 * The child fills the container; use `size-full` + `object-cover` (or
 * `object-contain`) to control how it fits. The ratio is applied with CSS
 * `aspect-ratio`, so no wrapper padding hack is needed.
 *
 * The ratio is written to a `--ratio` custom property so a consumer can
 * override it from a parent stylesheet or another utility without touching
 * the component:
 */
export function AspectRatio({ ratio, className, style, ...props }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          '--ratio': ratio,
          ...style,
        } as React.CSSProperties
      }
      className={cn('relative aspect-(--ratio)', className)}
      {...props}
    />
  )
}
