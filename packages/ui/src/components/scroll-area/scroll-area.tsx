import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cn } from 'cn'

import type * as React from 'react'

/* -------------------------------------------------------------------------- */
/* ScrollArea                                                                 */
/* -------------------------------------------------------------------------- */

export type ScrollAreaProps = BaseScrollArea.Root.Props

/**
 * A native scroll container with consistent, themeable scrollbar styling.
 *
 * Renders `Root` + `Viewport` + a vertical `ScrollBar` + `Corner`. Give the
 * root a size (`h-…`, `w-…`, or both) — the viewport fills it.
 *
 * ```tsx
 * <ScrollArea className="h-64 w-80 rounded-lg border border-border p-4">
 *   {longContent}
 * </ScrollArea>
 * ```
 *
 * For horizontal scrolling, add a second scrollbar explicitly:
 *
 * ```tsx
 * <ScrollArea className="w-80">
 *   {wideContent}
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 *
 * `overflow: auto` on the viewport, native momentum scrolling on touch, and
 * keyboard scrolling (arrows, Page Up/Down, Home/End) all work as in a
 * native `overflow: auto` element. What ScrollArea adds is a **styleable**
 * scrollbar — one that does not depend on the OS-chrome look of
 * `::-webkit-scrollbar`.
 */
export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root data-slot="scroll-area" className={cn('relative', className)} {...props}>
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          'size-full rounded-[inherit]',
          // Focus treatment matches Button and Input. The outline is inset
          // so it stays inside the root's rounded corners.
          'outline-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
        )}
      >
        {children}
      </BaseScrollArea.Viewport>
      <ScrollBar />
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* ScrollBar                                                                  */
/* -------------------------------------------------------------------------- */

export type ScrollBarProps = BaseScrollArea.Scrollbar.Props

/**
 * A single scrollbar for a `ScrollArea`.
 *
 * `ScrollArea` renders one vertical scrollbar by default. Add a second one
 * for horizontal scrolling by passing `orientation="horizontal"`:
 *
 * ```tsx
 * <ScrollArea className="w-80">
 *   {wideContent}
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 *
 * The thumb is `bg-border` and grows on hover — matches the neutral palette
 * without introducing a dedicated scrollbar color token. To restyle it, pass
 * `className` on `ScrollBar` or use the `[&_[data-slot=scroll-area-thumb]]`
 * selector from the consumer side.
 */
export function ScrollBar({ className, orientation = 'vertical', ...props }: ScrollBarProps) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        // Vertical: full-height, ~10px wide, sits at the inline-end.
        'data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:h-full',
        'data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent',
        // Horizontal: full-width, ~10px tall, sits at the bottom.
        'data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col',
        'data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent',
        className,
      )}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </BaseScrollArea.Scrollbar>
  )
}
