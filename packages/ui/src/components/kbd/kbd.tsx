import { cn } from 'cn'

import type * as React from 'react'

export type KbdProps = React.ComponentProps<'kbd'>

/**
 * Renders a single keyboard key or a short sequence like `⌘K`.
 *
 * Non-interactive — it's `pointer-events-none` and non-selectable. Use it
 * for showing keyboard shortcuts next to commands, in tooltips, or inside
 * buttons. Screen readers announce the text content as-is, so write the key
 * name in a readable way (`Ctrl` not `⌃`, `ArrowLeft` not `←`, unless the
 * arrow is unambiguous in context).
 *
 * Inside a `Tooltip`, the surface is `bg-foreground text-background`; a
 * `bg-muted` Kbd would disappear. The component detects that context via a
 * parent selector and inverts its own colors.
 */
export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        // Sized to fit one or two characters comfortably; grows when the
        // label is longer.
        'h-5 min-w-5 pointer-events-none inline-flex w-fit shrink-0',
        'gap-1 items-center justify-center',
        'px-1.5 rounded-sm bg-muted',
        'font-medium font-sans text-xs text-muted-foreground',
        'select-none',
        // Icons sized to match the text cap height.
        "[&_svg:not([class*='size-'])]:size-3",
        // Invert inside a Tooltip. The tooltip popup uses bg-foreground /
        // text-background, so the neutral muted pair would be invisible.
        'in-data-[slot=tooltip-content]:text-background',
        'in-data-[slot=tooltip-content]:bg-background/20',
        className,
      )}
      {...props}
    />
  )
}

export type KbdGroupProps = React.ComponentProps<'div'>

/**
 * Groups two or more `Kbd` elements — a keyboard chord like `Ctrl + B`.
 *
 * Renders a `<div>` rather than a `<kbd>`: the group is a layout container,
 * not a keyboard input itself. Nested `<kbd>` is allowed by the HTML spec
 * for chords, but most developers don't expect it, and the styling here
 * treats the group as a flex row.
 */
export function KbdGroup({ className, ...props }: KbdGroupProps) {
  return (
    <div
      data-slot="kbd-group"
      className={cn('gap-1 inline-flex items-center', className)}
      {...props}
    />
  )
}
