import { Popover as BasePopover } from '@base-ui/react/popover'
import { cn } from 'cn'

import { ArrowShape } from '../tooltip/tooltip'

import type * as React from 'react'

type PopoverSide = 'top' | 'bottom' | 'left' | 'right'

type PopoverAlign = 'start' | 'center' | 'end'

/* -------------------------------------------------------------------------- */
/* Popover (root)                                                             */
/* -------------------------------------------------------------------------- */

export type PopoverProps = BasePopover.Root.Props

/**
 * A panel anchored to a trigger, opened by click.
 *
 * Unlike `Tooltip`:
 * - Opens on click, not hover
 * - Stays open until dismissed (outside click, Escape, or an explicit close)
 * - Its content is reachable by mouse and keyboard — inputs, buttons, and
 *   links inside are fully interactive
 *
 * Use it for a user-info card, a small form, a "what's this" callout with a
 * link, or any richer panel. For a list of commands, use `Menu` instead.
 */
export function Popover(props: PopoverProps) {
  return <BasePopover.Root data-slot="popover" {...props} />
}

/* -------------------------------------------------------------------------- */
/* Trigger / Close                                                            */
/* -------------------------------------------------------------------------- */

export type PopoverTriggerProps = Omit<BasePopover.Trigger.Props, 'className'> & {
  className?: string
}

/**
 * Opens the popover on click. Use Base UI's `render` prop to render as a
 * real control
 */
export function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger data-slot="popover-trigger" className={className} {...props} />
}

export type PopoverCloseProps = Omit<BasePopover.Close.Props, 'className'> & {
  className?: string
}

/** Closes the popover on click. Usually rendered as a `Button` in the header. */
export function PopoverClose({ className, ...props }: PopoverCloseProps) {
  return <BasePopover.Close data-slot="popover-close" className={className} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Popup                                                                      */
/* -------------------------------------------------------------------------- */

export interface PopoverPopupOwnProps {
  /**
   * Side of the trigger to place the popup on.
   * Sides are **physical** — `left` / `right` do not flip in RTL. In an
   * app that serves both LTR and RTL, pick the side from the current
   * direction (`side={dir === 'rtl' ? 'right' : 'left'}`) rather than a
   * logical alias.
   *
   * @default "bottom"
   */
  side?: PopoverSide

  /**
   * Gap between the trigger and the popup, in pixels.
   *
   * @default 4
   */
  sideOffset?: number

  /**
   * Alignment of the popup relative to the trigger along the cross axis.
   *
   * @default "center"
   */
  align?: PopoverAlign

  /**
   * Offset along the alignment axis, in pixels.
   *
   * @default 0
   */
  alignOffset?: number

  /**
   * Render a small arrow pointing at the trigger. Use it for callouts and
   * onboarding hints; hide it for a plain panel.
   *
   * @default true
   */
  showArrow?: boolean
}

export type PopoverPopupBaseUiProps = Omit<BasePopover.Popup.Props, 'className'>

export interface PopoverPopupProps extends PopoverPopupOwnProps, PopoverPopupBaseUiProps {
  className?: string
}

/**
 * The popover panel, portaled to `document.body`.
 *
 * Renders with the popover surface tokens (`bg-popover`, `text-popover-foreground`),
 * a subtle shadow for elevation, and a scale + fade animation from the
 * positioner's transform origin.
 *
 * Default width is `w-72` (18rem) — override with `className` (`w-96`,
 * `w-fit`, `w-full`, …) for wider panels.
 */
export function PopoverPopup({
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  showArrow = true,
  className,
  children,
  ...props
}: PopoverPopupProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="z-50 outline-none"
      >
        <BasePopover.Popup
          data-slot="popover-popup"
          className={cn(
            'w-72 gap-3 z-50 flex flex-col',
            'p-4 rounded-lg border border-border bg-popover',
            'text-sm text-popover-foreground',
            'shadow-md',
            'outline-0',
            'origin-(--transform-origin)',
            'transition-[transform,opacity] duration-150 motion-reduce:transition-none',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
          {showArrow && <PopoverArrow />}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Arrow                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * A small arrow pointing at the trigger.
 *
 * The diamond is a `rotate-45` square. Which two of its four edges should
 * carry a border depends on which side of the trigger the popup sits on —
 * the two edges that face *away* from the popup, matching the popup's own
 * frame.
 *
 * Base UI sets `data-side` on the `Arrow` element (same value as the popup).
 * A named group lets the child diamond read that attribute.
 */
function PopoverArrow() {
  return (
    <BasePopover.Arrow
      data-slot="popover-arrow"
      className={cn(
        'group/arrow z-50',
        'data-[side=bottom]:-top-1',
        'data-[side=top]:-bottom-1',
        'data-[side=left]:-right-1',
        'data-[side=right]:-left-1',
      )}
    >
      <ArrowShape
        className={cn(
          'border-border bg-popover',
          // Popup sits below the trigger → arrow points up → border on the
          // diamond's upper-left and upper-right faces (original left and
          // top edges).
          'group-data-[side=bottom]/arrow:border-t group-data-[side=bottom]/arrow:border-l',
          // Popup above → arrow points down → lower-left and lower-right
          // (original bottom and right edges).
          'group-data-[side=top]/arrow:border-r group-data-[side=top]/arrow:border-b',
          // Popup on the left → arrow points right → upper-right and
          // lower-right (original top and right edges).
          'group-data-[side=left]/arrow:border-t group-data-[side=left]/arrow:border-r',
          // Popup on the right → arrow points left → upper-left and
          // lower-left (original left and bottom edges).
          'group-data-[side=right]/arrow:border-b group-data-[side=right]/arrow:border-l',
        )}
      />
    </BasePopover.Arrow>
  )
}

/* -------------------------------------------------------------------------- */
/* Header / Title / Description                                               */
/* -------------------------------------------------------------------------- */

export type PopoverHeaderProps = React.ComponentProps<'div'>

/**
 * Groups the title and description at the top of the popup.
 */
export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      data-slot="popover-header"
      className={cn(
        '-mx-4 -mt-4 gap-1 px-4 pb-3 pt-4 flex flex-col border-b border-border',
        className,
      )}
      {...props}
    />
  )
}

export type PopoverTitleProps = Omit<BasePopover.Title.Props, 'className'> & {
  className?: string
}

/** The popup's accessible name. Read by screen readers on open. */
export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn('font-semibold text-sm', className)}
      {...props}
    />
  )
}

export type PopoverDescriptionProps = Omit<BasePopover.Description.Props, 'className'> & {
  className?: string
}

/** Optional supporting line below the title. */
export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
