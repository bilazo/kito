import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type ComboboxSize = 'sm' | 'md'

/* -------------------------------------------------------------------------- */
/* Combobox (root)                                                            */
/* -------------------------------------------------------------------------- */

export type ComboboxProps<Value = unknown> = BaseCombobox.Root.Props<Value>

/**
 * A searchable dropdown — a text input that filters a list as you type.
 *
 * Pass the **whole item object** as each item's `value` (not `value={item.value}`).
 * Base UI then uses the object's shape to show the label in the input and submits
 * the value with the form automatically.
 *
 * For a short fixed list with no typing, prefer `Select` — it's simpler and
 * behaves the way a native `<select>` does with the keyboard.
 */
export function Combobox<Value = unknown>(props: ComboboxProps<Value>) {
  return <BaseCombobox.Root<Value> {...props} />
}

/* -------------------------------------------------------------------------- */
/* ComboboxInput                                                              */
/* -------------------------------------------------------------------------- */

const inputGroupStyles = cva(
  [
    'gap-1 flex w-full items-center',
    'rounded-lg border border-input bg-transparent',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Focus: any inner input that is focused draws the group's ring.
    'has-[input:focus-visible]:border-ring',
    'has-[input:focus-visible]:outline-1 has-[input:focus-visible]:outline-ring',
    // Invalid
    'data-invalid:border-destructive',
    'has-[input[aria-invalid=true]]:border-destructive',
    'has-[input[aria-invalid=true]]:outline-destructive',
    // Disabled
    'has-disabled:cursor-not-allowed has-disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'ps-3 pe-1 h-(--control-sm)',
        md: 'ps-3 pe-1.5 h-(--control-md)',
      } satisfies Record<ComboboxSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

/** Props defined by Kito. */
export interface ComboboxInputOwnProps {
  /**
   * Height of the control, matching `Input` and `SelectTrigger`.
   *
   * @default "md"
   */
  size?: ComboboxSize

  /**
   * Show a clear (×) button when the input has content. The button hides
   * itself when the input is empty.
   *
   * @default true
   */
  showClear?: boolean

  /**
   * Show a chevron icon at the end side. Purely decorative — the popup opens
   * on input focus or click.
   *
   * @default true
   */
  showTrigger?: boolean
}

/** Props provided by Base UI's Combobox.Input. */
export type ComboboxInputBaseUiProps = Omit<BaseCombobox.Input.Props, 'className' | 'size'>

export interface ComboboxInputProps extends ComboboxInputOwnProps, ComboboxInputBaseUiProps {
  className?: string
}

/**
 * The text input that filters the list. This is also the control that opens
 * the popup — there is no separate trigger button.
 *
 * Uses Base UI's `Combobox.InputGroup` as its wrapper: that element is what
 * Base UI anchors the popup to, so the popup lines up with the whole control
 * (input + clear + icon) rather than the narrower `<input>` inside it.
 */
export function ComboboxInput({
  size = 'md',
  showClear = true,
  showTrigger = true,
  className,
  ...props
}: ComboboxInputProps) {
  return (
    <BaseCombobox.InputGroup
      data-slot="combobox-input-group"
      data-size={size}
      className={cn(inputGroupStyles({ size }), className)}
    >
      <BaseCombobox.Input
        data-slot="combobox-input"
        className={cn(
          'min-w-0 flex-1 bg-transparent text-sm outline-none',
          'text-foreground placeholder:text-muted-foreground',
          'pointer-coarse:text-base',
        )}
        {...props}
      />
      {showClear && (
        <BaseCombobox.Clear
          data-slot="combobox-clear"
          aria-label="Clear"
          className={cn(
            'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            'size-6 flex shrink-0 items-center justify-center rounded-md',
            'transition-colors duration-150 motion-reduce:transition-none',
            '[&_svg]:size-3.5 [&_svg]:pointer-events-none',
          )}
        >
          <XIcon />
        </BaseCombobox.Clear>
      )}
      {showTrigger && (
        <BaseCombobox.Icon
          data-slot="combobox-icon"
          className={cn(
            'size-6 flex shrink-0 items-center justify-center text-muted-foreground',
            '[&_svg]:size-4 [&_svg]:pointer-events-none',
          )}
        >
          <ChevronIcon />
        </BaseCombobox.Icon>
      )}
    </BaseCombobox.InputGroup>
  )
}

/* -------------------------------------------------------------------------- */
/* ComboboxPopup                                                              */
/* -------------------------------------------------------------------------- */

export interface ComboboxPopupOwnProps {
  /**
   * Gap between the input and the popup, in pixels.
   *
   * @default 6
   */
  sideOffset?: number

  /**
   * Horizontal alignment of the popup relative to the input group.
   *
   * @default "start"
   */
  align?: 'start' | 'center' | 'end'
}

export type ComboboxPopupBaseUiProps = Omit<BaseCombobox.Popup.Props, 'className'>

export interface ComboboxPopupProps extends ComboboxPopupOwnProps, ComboboxPopupBaseUiProps {
  className?: string
}

/**
 * The dropdown panel. Put `ComboboxList` (the filtered items) and
 * `ComboboxEmpty` (the no-results message) inside as siblings.
 *
 * The popup is portaled, so it escapes `overflow: hidden` on the parent.
 * Width matches the input group (`min-w-(--anchor-width)`).
 */
export function ComboboxPopup({
  sideOffset = 6,
  align = 'start',
  className,
  children,
  ...props
}: ComboboxPopupProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} align={align} className="z-50 outline-none">
        <BaseCombobox.Popup
          data-slot="combobox-popup"
          className={cn(
            'group/combobox-popup',
            'bg-popover text-popover-foreground',
            'max-h-80 min-w-(--anchor-width) overflow-y-auto',
            'p-1 rounded-lg border border-border',
            'origin-(--transform-origin)',
            'transition-[transform,opacity] duration-150 motion-reduce:transition-none',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* ComboboxList                                                               */
/* -------------------------------------------------------------------------- */

export type ComboboxListProps = Omit<BaseCombobox.List.Props, 'className'> & {
  className?: string
}

/**
 * The filtered item list.
 *
 * Pass `children` as a **function** so Base UI can call it once per matching
 * item (it filters the `items` you gave the root). Static children never
 * filter — only use them if the list is short and always shown.
 */
export function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <BaseCombobox.List
      data-slot="combobox-list"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ComboboxItem                                                               */
/* -------------------------------------------------------------------------- */

export type ComboboxItemProps = Omit<BaseCombobox.Item.Props, 'className'> & {
  className?: string
}

/**
 * One option in the list. Highlighted on hover and keyboard focus; shows a
 * checkmark on the end side when selected.
 */
export function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn(
        'gap-2 relative flex cursor-default items-center',
        'py-2 ps-3 pe-8 rounded-md text-sm text-foreground select-none',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      <BaseCombobox.ItemIndicator
        data-slot="combobox-item-indicator"
        className={cn(
          'inset-y-0 inset-e-2 absolute flex items-center',
          'text-primary',
          '[&_svg]:size-4',
        )}
      >
        <CheckIcon />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

/* -------------------------------------------------------------------------- */
/* ComboboxEmpty                                                              */
/* -------------------------------------------------------------------------- */

export type ComboboxEmptyProps = Omit<BaseCombobox.Empty.Props, 'className'> & {
  className?: string
}

/**
 * The no-results message. Base UI renders this element at all times and only
 * fills it when the filtered list is empty. Hiding the container while it has
 * no content avoids a blank row with padding at the end of the list, and
 * removes it from the tab order so keyboard navigation does not stop on an
 * invisible element.
 */
export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <BaseCombobox.Empty
      data-slot="combobox-empty"
      className={cn(
        // Hidden by default; the popup only gets `data-empty` when the
        // filtered list has no items, and only then do we render.
        'hidden group-data-empty/combobox-popup:block',
        'px-3 py-6 text-center text-sm text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ComboboxGroup + ComboboxGroupLabel                                         */
/* -------------------------------------------------------------------------- */

export type ComboboxGroupProps = Omit<BaseCombobox.Group.Props, 'className'> & {
  className?: string
}

/** Groups related options; use with `ComboboxGroupLabel` for a heading. */
export function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

export type ComboboxGroupLabelProps = Omit<BaseCombobox.GroupLabel.Props, 'className'> & {
  className?: string
}

/** Heading for a `ComboboxGroup`. Not focusable; skipped by keyboard navigation. */
export function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      data-slot="combobox-group-label"
      className={cn('px-3 py-1.5 font-medium text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ComboboxSeparator                                                          */
/* -------------------------------------------------------------------------- */

export type ComboboxSeparatorProps = Omit<BaseCombobox.Separator.Props, 'className'> & {
  className?: string
}

/** A horizontal divider between groups of options. */
export function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <BaseCombobox.Separator
      data-slot="combobox-separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
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

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
