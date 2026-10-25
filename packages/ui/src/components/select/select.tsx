import { Select as BaseSelect } from '@base-ui/react/select'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type SelectSize = 'sm' | 'md'

/* -------------------------------------------------------------------------- */
/* Select (root)                                                              */
/* -------------------------------------------------------------------------- */

export type SelectProps<Value = unknown> = BaseSelect.Root.Props<Value>

/**
 * The state container for a select.
 *
 * `Select` renders no DOM element of its own — it only manages the selected
 * value, open state, and keyboard navigation. All visible parts are their own
 * components: `SelectTrigger`, `SelectValue`, `SelectPopup`, `SelectItem`.
 */
export function Select<Value = unknown>(props: SelectProps<Value>) {
  return <BaseSelect.Root<Value> {...props} />
}

/* -------------------------------------------------------------------------- */
/* SelectTrigger                                                              */
/* -------------------------------------------------------------------------- */

const triggerStyles = cva(
  [
    'min-w-0 gap-2 flex w-full items-center justify-between',
    'px-3 rounded-lg border border-input bg-transparent text-start',
    'whitespace-nowrap text-foreground',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Focus matches Input: brand border + 1px outline = a 2px flat ring.
    'outline-0 focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring',
    // Placeholder styling on the value.
    'data-placeholder:text-muted-foreground',
    // Disabled
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    // Invalid
    'data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
    // Popup-open: keep the brand border so the trigger reads as active.
    'data-popup-open:border-ring',
    // Icon handling: chevron rotates when open, matches other components' size.
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        sm: 'h-(--control-sm) text-sm',
        md: 'h-(--control-md) text-sm',
      } satisfies Record<SelectSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

/** Props defined by Kito. */
export interface SelectTriggerOwnProps {
  /**
   * Height of the trigger, matching the equivalent `Input` size so a select
   * and an input can sit in the same row.
   *
   * @default "md"
   */
  size?: SelectSize
}

/** Props provided by Base UI's Select.Trigger. */
export type SelectTriggerBaseUiProps = Omit<BaseSelect.Trigger.Props, 'className'>

/** Public composed props. */
export interface SelectTriggerProps extends SelectTriggerOwnProps, SelectTriggerBaseUiProps {
  className?: string
}

/**
 * The clickable control that opens the popup. Renders as a `<button>` by
 * default and shows the current value plus a chevron icon.
 *
 * The chevron rotates when the popup is open. Focus styles match `Input`.
 */
export function SelectTrigger({ size = 'md', className, children, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn('group/select-trigger', triggerStyles({ size }), className)}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="shrink-0 text-muted-foreground transition-transform duration-150 group-data-popup-open/select-trigger:rotate-180 motion-reduce:transition-none">
        <ChevronDownIcon />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

/* -------------------------------------------------------------------------- */
/* SelectValue                                                                */
/* -------------------------------------------------------------------------- */

export type SelectValueProps = Omit<BaseSelect.Value.Props, 'className'> & {
  className?: string
}

/**
 * Displays the selected item's label, or the `placeholder` when nothing is
 * selected. Reads its label from the `items` prop passed to `Select`.
 *
 * Long values are truncated with an ellipsis rather than wrapping — a select
 * trigger is a single-line control.
 */
export function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <BaseSelect.Value
      data-slot="select-value"
      className={cn(
        'min-w-0 flex-1 truncate text-start',
        'data-placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* SelectPopup                                                                */
/* -------------------------------------------------------------------------- */

export interface SelectPopupOwnProps {
  /**
   * Gap between the trigger and the popup, in pixels.
   *
   * @default 6
   */
  sideOffset?: number

  /**
   * When `true`, the popup is positioned so the selected item lines up with
   * the trigger's value text (a native macOS feel).
   *
   * When `false` (the default), the popup opens below the trigger as a
   * standard flat web dropdown — it can't be clipped by the top of the
   * viewport, and it reads consistently with everything else in a web UI.
   *
   * @default false
   */
  alignItemWithTrigger?: boolean
}

export type SelectPopupBaseUiProps = Omit<BaseSelect.Popup.Props, 'className'>

export interface SelectPopupProps extends SelectPopupOwnProps, SelectPopupBaseUiProps {
  className?: string
}

/**
 * The dropdown container. Renders in a portal, so it escapes any parent
 * `overflow: hidden`. Closes on outside click, Escape, or selection.
 *
 * Long lists scroll automatically; width matches the trigger
 * (`min-w-(--anchor-width)`).
 */
export function SelectPopup({
  sideOffset = 6,
  alignItemWithTrigger = false,
  className,
  children,
  ...props
}: SelectPopupProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 outline-none"
      >
        <BaseSelect.Popup
          data-slot="select-popup"
          className={cn(
            'bg-popover text-popover-foreground',
            'max-h-80 min-w-(--anchor-width) overflow-y-auto',
            'p-1 rounded-lg border border-border',
            // Grow from the positioner's anchor, matching other popups.
            'origin-(--transform-origin)',
            'transition-[transform,opacity] duration-150 motion-reduce:transition-none',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* SelectItem                                                                 */
/* -------------------------------------------------------------------------- */

export type SelectItemProps = Omit<BaseSelect.Item.Props, 'className'> & {
  className?: string
}

/**
 * A selectable option. Highlights on hover and keyboard focus; shows a
 * checkmark on the end side when selected.
 */
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={cn(
        'gap-2 relative flex cursor-default items-center',
        'py-2 ps-3 pe-8 rounded-md text-sm text-foreground select-none',
        // Highlighted (hover / keyboard focus).
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        // Disabled items are visible but not interactive.
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText className="min-w-0 flex-1 truncate">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator
        className={cn(
          'inset-y-0 inset-e-2 absolute flex items-center',
          'text-primary',
          '[&_svg]:size-4',
        )}
      >
        <CheckIcon />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

/* -------------------------------------------------------------------------- */
/* SelectGroup + SelectGroupLabel                                             */
/* -------------------------------------------------------------------------- */

export type SelectGroupProps = Omit<BaseSelect.Group.Props, 'className'> & {
  className?: string
}

/**
 * Groups related options. Use with `SelectGroupLabel` for a visible heading
 * and `SelectSeparator` between groups.
 */
export function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <BaseSelect.Group
      data-slot="select-group"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

export type SelectGroupLabelProps = Omit<BaseSelect.GroupLabel.Props, 'className'> & {
  className?: string
}

/** Heading for a `SelectGroup`. Not focusable; skipped by keyboard navigation. */
export function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-group-label"
      className={cn('px-3 py-1.5 font-medium text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* SelectSeparator                                                            */
/* -------------------------------------------------------------------------- */

export type SelectSeparatorProps = Omit<BaseSelect.Separator.Props, 'className'> & {
  className?: string
}

/** A horizontal divider between groups of options. */
export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

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
