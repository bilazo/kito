import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cn } from 'cn'

import type * as React from 'react'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

type TooltipAlign = 'start' | 'center' | 'end'

/* -------------------------------------------------------------------------- */
/* TooltipProvider                                                            */
/* -------------------------------------------------------------------------- */

export type TooltipProviderProps = BaseTooltip.Provider.Props

/**
 * Shares hover timings across all tooltips in its subtree.
 *
 * Wrap the app once — typically in the root layout — so that a 100 ms hover
 * on one tooltip does not reset the delay for the next tooltip the user
 * hovers. Without a Provider, Base UI uses its own default delay, which is
 * longer and not adjustable from individual tooltips.
 */
export function TooltipProvider({ delay = 100, ...props }: TooltipProviderProps) {
  return <BaseTooltip.Provider data-slot="tooltip-provider" delay={delay} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Tooltip (root)                                                             */
/* -------------------------------------------------------------------------- */

export type TooltipProps = BaseTooltip.Root.Props

/**
 * A small label that appears on hover or keyboard focus of a trigger.
 *
 * Wrap the app once in a `TooltipProvider` so all tooltips share the same
 * hover delay. `Tooltip` itself renders nothing — it just wires a trigger to
 * its content.
 *
 * Tooltips are **not** a substitute for visible labels. Every trigger must
 * still be reachable and understandable without the tooltip — pass
 * `aria-label` on icon-only triggers so keyboard and screen-reader users get
 * the same information.
 */
export function Tooltip(props: TooltipProps) {
  return <BaseTooltip.Root data-slot="tooltip" {...props} />
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export type TooltipTriggerProps = Omit<BaseTooltip.Trigger.Props, 'className'> & {
  className?: string
}

/**
 * The element the tooltip is attached to. Use Base UI's `render` prop to
 * render as a real control (typically a `Button`).
 */
export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" className={className} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export interface TooltipContentOwnProps {
  /**
   * Side of the trigger to place the tooltip on. Sides are **physical** —
   * `left` / `right` do not flip in RTL. In an app that serves both LTR and
   * RTL, choose the side from the current direction
   * (e.g. `side={dir === "rtl" ? "right" : "left"}`) rather than relying on a
   * logical alias.
   *
   * @default "top"
   */
  side?: TooltipSide

  /**
   * Gap between the trigger and the tooltip, in pixels.
   *
   * @default 4
   */
  sideOffset?: number

  /**
   * Alignment of the tooltip relative to the trigger along the cross axis.
   *
   * @default "center"
   */
  align?: TooltipAlign

  /**
   * Offset along the alignment axis, in pixels.
   *
   * @default 0
   */
  alignOffset?: number

  /**
   * Render a small arrow pointing at the trigger.
   *
   * @default true
   */
  showArrow?: boolean
}

export type TooltipContentBaseUiProps = Omit<BaseTooltip.Popup.Props, 'className'>

export interface TooltipContentProps extends TooltipContentOwnProps, TooltipContentBaseUiProps {
  className?: string
}

/**
 * The tooltip body, portaled to `document.body`.
 *
 * Rendered with inverted colors (`bg-foreground text-background`) so it reads
 * as a floating label regardless of the page surface.
 *
 * The popup animates in with a fade + slight slide from the trigger side.
 */
export function TooltipContent({
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  showArrow = true,
  className,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="z-50 outline-none"
      >
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          role="tooltip"
          className={cn(
            // Base
            'max-w-xs gap-1.5 z-50 inline-flex w-fit items-center',
            'px-3 py-1.5 rounded-md bg-foreground text-xs text-background',
            // Grow from the positioner's anchor on enter; shrink back on exit.
            'origin-(--transform-origin)',

            // ── Kbd slot ──────────────────────────────────────────────
            // When a Kbd is inside, drop the end padding so the Kbd sits
            // closer to the tooltip edge — the keycap is small, and the
            // default `px-3` looks heavy next to it.
            'has-data-[slot=kbd]:pe-1.5',

            // ── Directional slide-in ──────────────────────────────────
            // The tooltip slides in from the edge opposite to where it
            // appears — a bottom tooltip slides down from the top. Only
            // physical sides; `inline-start` / `inline-end` were removed
            // from the Kito API.
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',

            // ── Enter / exit ──────────────────────────────────────────
            // `tw-animate-css` utilities. `data-open` / `data-closed` come
            // from Base UI. `fade-in-0` / `zoom-in-95` set the CSS variables
            // that `animate-in` reads. `motion-reduce:animate-none` strips
            // the animation for users who opted out.
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'motion-reduce:animate-none',

            className,
          )}
          {...props}
        >
          {children}
          {showArrow && <TooltipArrow />}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Arrow                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * A rotated square used as the pointer for tooltips and popovers.
 *
 * Positioning (which side it sticks out from) is handled by the parent
 * `*.Arrow` element. This component only draws the shape — pass a
 * background color via `className` (`bg-foreground` for tooltips,
 * `bg-popover` for popovers).
 *
 * Exported so `PopoverArrow` can share it.
 */
export function ArrowShape({ className, ...props }: React.ComponentProps<'div'>) {
  return <div aria-hidden className={cn('size-2 rotate-45 rounded-[1px]', className)} {...props} />
}

/**
 * A rotated square that pokes out of the popup on the trigger side. Base UI
 * positions it and sets `data-side` to the current placement so the arrow
 * aligns with the correct edge.
 */
function TooltipArrow() {
  return (
    <BaseTooltip.Arrow
      data-slot="tooltip-arrow"
      className={cn(
        'z-50',
        'data-[side=top]:-bottom-1',
        'data-[side=bottom]:-top-1',
        'data-[side=left]:-right-1',
        'data-[side=right]:-left-1',
      )}
    >
      <ArrowShape className="bg-foreground fill-foreground" />
    </BaseTooltip.Arrow>
  )
}
