import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cn } from 'cn'

import { Button } from '../button/button'

import type * as React from 'react'

type SheetSide = 'start' | 'end' | 'top' | 'bottom'

/* -------------------------------------------------------------------------- */
/* Sheet (root)                                                               */
/* -------------------------------------------------------------------------- */

export type SheetProps = BaseDialog.Root.Props

/**
 * A slide-in panel anchored to one edge of the viewport.
 *
 * Compose with `SheetTrigger`, `SheetPopup`, `SheetHeader`, `SheetTitle`,
 * `SheetDescription`, and `SheetFooter`. Base UI handles focus trapping,
 * scroll locking, Escape-to-close, and outside-click-to-close — the same
 * primitive as `Dialog`, just with a different shell.
 *
 * `side` accepts logical values:
 *
 * - `start` — the inline-start edge (left in LTR, right in RTL)
 * - `end` — the inline-end edge (right in LTR, left in RTL) — the default
 * - `top`, `bottom` — physical edges, used for action sheets and notifications
 */
export function Sheet(props: SheetProps) {
  return <BaseDialog.Root {...props} />
}

/* -------------------------------------------------------------------------- */
/* Trigger / Close                                                            */
/* -------------------------------------------------------------------------- */

export type SheetTriggerProps = Omit<BaseDialog.Trigger.Props, 'className'> & {
  className?: string
}

/** Opens the sheet on click. Use Base UI's `render` prop to render as a `Button`. */
export function SheetTrigger({ className, ...props }: SheetTriggerProps) {
  return <BaseDialog.Trigger data-slot="sheet-trigger" className={className} {...props} />
}

export type SheetCloseProps = Omit<BaseDialog.Close.Props, 'className'> & {
  className?: string
}

/** Closes the sheet on click. */
export function SheetClose({ className, ...props }: SheetCloseProps) {
  return <BaseDialog.Close data-slot="sheet-close" className={className} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Backdrop                                                                   */
/* -------------------------------------------------------------------------- */

export type SheetBackdropProps = Omit<BaseDialog.Backdrop.Props, 'className'> & {
  className?: string
}

/**
 * The dark overlay behind the popup. Rendered automatically by `SheetPopup`;
 * export is for advanced composition only.
 */
export function SheetBackdrop({ className, ...props }: SheetBackdropProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="sheet-backdrop"
      className={cn(
        'inset-0 fixed z-50 bg-black/50',
        'transition-opacity duration-200 motion-reduce:transition-none',
        'data-ending-style:opacity-0 data-starting-style:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Popup                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Per-side position, size, and slide animation.
 *
 * `start` and `end` use logical properties (`inset-inline-*`, `border-*-s/e`,
 * `rounded-*-s/e`) so the panel flips to the correct edge in RTL without any
 * consumer-side classes. The enter/exit transforms are the only place that
 * needs an explicit RTL override, because `translate-x` is physical.
 */
const sideStyles: Record<SheetSide, string> = {
  start: cn(
    'inset-y-0 inset-s-0 w-80 h-full max-w-[85vw]',
    'rounded-e-xl border-e border-border',
    // Slide from the physical left in LTR; from the right in RTL.
    'data-ending-style:-translate-x-full data-starting-style:-translate-x-full',
    'rtl:data-ending-style:translate-x-full rtl:data-starting-style:translate-x-full',
  ),
  end: cn(
    'inset-y-0 inset-e-0 w-80 h-full max-w-[85vw]',
    'rounded-s-xl border-s border-border',
    'data-ending-style:translate-x-full data-starting-style:translate-x-full',
    'rtl:data-ending-style:-translate-x-full rtl:data-starting-style:-translate-x-full',
  ),
  top: cn(
    'inset-x-0 top-0 max-h-[85vh]',
    'rounded-b-xl border-b border-border',
    'data-ending-style:-translate-y-full data-starting-style:-translate-y-full',
  ),
  bottom: cn(
    'inset-x-0 bottom-0 max-h-[85vh]',
    'rounded-t-xl border-t border-border',
    'data-ending-style:translate-y-full data-starting-style:translate-y-full',
  ),
}

export interface SheetPopupOwnProps {
  /**
   * Which edge the panel anchors to.
   *
   * - `start` — the inline-start edge (left in LTR, right in RTL)
   * - `end` — the inline-end edge (right in LTR, left in RTL)
   * - `top`, `bottom` — physical edges, used for action sheets and notifications
   *
   * @default "end"
   */
  side?: SheetSide

  /**
   * Render a close (×) button in the top-end corner. Set to `false` for
   * confirmations where the footer actions are the only affordance.
   *
   * @default true
   */
  showCloseButton?: boolean
}

export type SheetPopupBaseUiProps = Omit<BaseDialog.Popup.Props, 'className'>

export interface SheetPopupProps extends SheetPopupOwnProps, SheetPopupBaseUiProps {
  className?: string
}

/**
 * The sheet panel, portaled to `document.body`.
 *
 * The panel fills the chosen edge and scrolls its own content if it overflows
 * (`max-h-[85vh]` on the top/bottom sides). A close (×) button is rendered in
 * the top-end corner by default.
 */
export function SheetPopup({
  side = 'end',
  showCloseButton = true,
  className,
  children,
  ...props
}: SheetPopupProps) {
  return (
    <BaseDialog.Portal>
      <SheetBackdrop />
      <BaseDialog.Popup
        data-slot="sheet-popup"
        data-side={side}
        className={cn(
          'fixed z-50 flex flex-col',
          'overflow-hidden',
          'bg-card text-card-foreground',
          'outline-0',
          'ease-out transition-transform duration-200 motion-reduce:transition-none',
          sideStyles[side],
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close"
                className="inset-e-3 top-3 absolute"
              />
            }
          >
            <XIcon />
          </SheetClose>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Header / Footer                                                            */
/* -------------------------------------------------------------------------- */

export type SheetHeaderProps = React.ComponentProps<'div'>

/** Groups the title and description at the top of the sheet. */
export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        'gap-1.5 flex shrink-0 flex-col',
        // `pe-12` reserves room for the absolutely-positioned close button.
        // If `showCloseButton={false}`, override with `pe-6`.
        'p-6 pe-12 pb-4',
        className,
      )}
      {...props}
    />
  )
}

export type SheetFooterProps = React.ComponentProps<'div'>

/**
 * Groups the action buttons at the bottom of the sheet. Pinned to the bottom
 * of the panel via `mt-auto` so it stays there even when the middle content
 * is short.
 */
export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'gap-2 flex shrink-0 flex-col-reverse',
        'p-6 pt-4',
        'mt-auto',
        'sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Body                                                                       */
/* -------------------------------------------------------------------------- */
export type SheetBodyProps = React.ComponentProps<'div'>

/**
 * The scrollable region of a sheet.
 *
 * Wrap the middle content of a sheet in `SheetBody` when it can be taller
 * than the panel. Header and footer stay pinned; only this area scrolls.
 *
 * **No padding by default.** This is deliberate: the popup is padding-free
 * so consumers can put full-bleed content (an image, a divider, a table)
 * directly inside, and so the scrollbar touches the panel edge. Add padding
 * via `className` when you want it:
 *
 * Without `SheetBody`, the whole popup would scroll — including the header
 * and footer — which is usually not what you want.
 */
export function SheetBody({ className, ...props }: SheetBodyProps) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        // `min-h-0` is the flex escape hatch that lets this child shrink
        // below its content size — without it, `overflow-y-auto` never
        // kicks in because the element always grows to fit its content.
        'min-h-0 flex-1 overflow-y-auto',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Title / Description                                                        */
/* -------------------------------------------------------------------------- */

export type SheetTitleProps = Omit<BaseDialog.Title.Props, 'className'> & {
  className?: string
}

/** The sheet's accessible name. Read by screen readers on open. */
export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="sheet-title"
      className={cn('font-semibold text-lg', className)}
      {...props}
    />
  )
}

export type SheetDescriptionProps = Omit<BaseDialog.Description.Props, 'className'> & {
  className?: string
}

/** Optional supporting line below the title. Wired to the popup via `aria-describedby`. */
export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

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

export type { SheetSide }
