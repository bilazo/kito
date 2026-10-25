import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import { Separator } from '../separator/separator'

import type * as React from 'react'

type ButtonGroupOrientation = 'horizontal' | 'vertical'

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const buttonGroupStyles = cva(
  [
    'flex w-fit',
    // Buttons stretch across the group's cross axis — so every button is the
    // same height (horizontal) or the same width (vertical), even when the
    // buttons have different intrinsic sizes.
    'items-stretch',
    // When a child receives focus, lift it above its siblings so its focus
    // ring is not clipped by the button next to it.
    '*:focus-visible:relative *:focus-visible:z-10',
    // Nested button groups space apart from each other. Without this, two
    // sub-groups of buttons butt against each other with no breathing room.
    'has-[>[data-slot=button-group]]:gap-2',
    // An Input as a direct child flexes to fill the remaining width — the
    // search-bar pattern (input on the left, button on the right).
    '[&>input]:flex-1',
    // A Select trigger without an explicit width shrinks to its content, so
    // it fits alongside the buttons rather than overflowing the group.
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          // Every direct data-slot child loses its corner rounding.
          '*:data-slot:rounded-none',
          // The first child gets start-side rounding back.
          '[&>[data-slot]:first-child]:rounded-s-lg',
          // The last data-slot child gets end-side rounding back — `:not(:has(~[data-slot]))`
          // means "no data-slot siblings after me".
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg',
          // Every child that has a previous data-slot sibling loses its
          // start-side border, so two adjacent buttons share one border
          // instead of stacking two.
          '[&>[data-slot]~[data-slot]]:border-s-0',
        ].join(' '),
        vertical: [
          'flex-col',
          '*:data-slot:rounded-none',
          // Top/bottom are direction-agnostic — physical rounding is correct
          // here (there is no "reading start" on a vertical axis).
          '[&>[data-slot]:first-child]:rounded-t-lg',
          '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg',
          '[&>[data-slot]~[data-slot]]:border-t-0',
        ].join(' '),
      } satisfies Record<ButtonGroupOrientation, string>,
    },
    defaultVariants: { orientation: 'horizontal' },
  },
)

/**
 * Class name helper for elements that should look like a ButtonGroup but are
 * not rendered by it. Mirrors `buttonVariants()` for the Button component.
 */
export function buttonGroupVariants(props?: Parameters<typeof buttonGroupStyles>[0]) {
  return cn(buttonGroupStyles(props))
}

export { buttonGroupStyles }

/* -------------------------------------------------------------------------- */
/* ButtonGroup                                                                */
/* -------------------------------------------------------------------------- */

export interface ButtonGroupOwnProps {
  /**
   * Layout of the buttons. `horizontal` stacks them in a row; `vertical`
   * stacks them in a column. The rounded corners and border-sharing rules
   * follow the orientation.
   *
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation
}

export type ButtonGroupHTMLProps = Omit<React.ComponentProps<'div'>, 'className'>

export interface ButtonGroupProps extends ButtonGroupOwnProps, ButtonGroupHTMLProps {
  className?: string
}

/**
 * A container that groups related buttons together with consistent styling.
 *
 * Wraps any of `Button`, `Input`, `Select` trigger, `Menu` trigger, a nested
 * `ButtonGroup`, `ButtonGroupText`, or `ButtonGroupSeparator`. Adjacent
 * children share a border and rounded corners are applied only to the two
 * outer edges.
 *
 * Give the group an accessible name — `aria-label` for a short label, or
 * `aria-labelledby` pointing at a visible heading:
 *
 * Use `ButtonGroup` when grouping buttons that **perform an action**. For
 * buttons that **toggle a state**, use `ToggleGroup` (not built yet) — it
 * exposes `aria-pressed` on each toggle, which `ButtonGroup` does not.
 */
export function ButtonGroup({ orientation, className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupStyles({ orientation }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ButtonGroupText                                                            */
/* -------------------------------------------------------------------------- */

export type ButtonGroupTextProps = useRender.ComponentProps<'div'>

/**
 * A text or label slot that matches the visual shape of a `Button` — same
 * height, same border, same radius — so a label sits flush inside the group
 * without looking like it belongs to a different component.
 *
 * Polymorphic via `render` — pass `<Label htmlFor="…" />` to make it a real
 * `<label>` for an adjacent input:
 */
export function ButtonGroupText({ className, render, ...props }: ButtonGroupTextProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        className: cn(
          'gap-2 px-2.5 font-medium flex items-center rounded-lg border bg-muted text-sm',
          "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
          className,
        ),
      },
      props,
    ),
    state: { slot: 'button-group-text' },
  })
}

/* -------------------------------------------------------------------------- */
/* ButtonGroupSeparator                                                       */
/* -------------------------------------------------------------------------- */

export type ButtonGroupSeparatorProps = Omit<
  React.ComponentProps<typeof Separator>,
  'className'
> & {
  className?: string
}

/**
 * A thin divider between two buttons in a group — for the split-button
 * pattern, or between an outline button and a filled one where the border is
 * no longer shared.
 *
 * Defaults to `vertical` (a vertical bar between horizontal buttons). Pass
 * `orientation="horizontal"` for a vertical button group.
 */
export function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        // `self-stretch` matches the group's `items-stretch` so the separator
        // fills the row height (horizontal) or column width (vertical).
        'relative self-stretch bg-input',
        // `mx-px` / `my-px` leaves a one-pixel inset on each end of the
        // separator, so it does not visually merge with the button borders.
        orientation === 'horizontal' && 'mx-px w-auto',
        orientation === 'vertical' && 'my-px h-auto',
        className,
      )}
      {...props}
    />
  )
}

export type { ButtonGroupOrientation }
