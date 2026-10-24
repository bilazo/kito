import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import { Button } from '../button/button'

import type * as React from 'react'

type DialogSize = 'sm' | 'md' | 'lg'

/* -------------------------------------------------------------------------- */
/* Dialog (root)                                                              */
/* -------------------------------------------------------------------------- */

export type DialogProps = BaseDialog.Root.Props

/**
 * A centered modal dialog.
 *
 * Compose with `DialogTrigger`, `DialogPopup`, `DialogHeader`, `DialogTitle`,
 * `DialogDescription`, and `DialogFooter`. Base UI handles focus trapping,
 * scroll locking, Escape-to-close, and outside-click-to-close.
 */
export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />
}

/* -------------------------------------------------------------------------- */
/* Trigger / Close                                                            */
/* -------------------------------------------------------------------------- */

export type DialogTriggerProps = Omit<BaseDialog.Trigger.Props, 'className'> & {
  className?: string
}

/**
 * Opens the dialog on click. Use Base UI's `render` prop to render as a
 * `Button` (or any other element):
 */
export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" className={className} {...props} />
}

export type DialogCloseProps = Omit<BaseDialog.Close.Props, 'className'> & {
  className?: string
}

/** Closes the dialog on click. Typically rendered as a `Button`. */
export function DialogClose({ className, ...props }: DialogCloseProps) {
  return <BaseDialog.Close data-slot="dialog-close" className={className} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Backdrop                                                                   */
/* -------------------------------------------------------------------------- */

export type DialogBackdropProps = Omit<BaseDialog.Backdrop.Props, 'className'> & {
  className?: string
}

/**
 * The dark overlay behind the popup. Rendered automatically by
 * `DialogPopup`; export is for advanced composition only (custom popups that
 * do not use `DialogPopup`).
 */
export function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        'inset-0 fixed z-50 bg-black/50',
        'transition-opacity duration-150 motion-reduce:transition-none',
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

const popupStyles = cva(
  [
    'relative w-full',
    'gap-4 flex flex-col',
    'p-6 rounded-xl border border-border bg-card text-card-foreground',
    'outline-0',
    'transition-[transform,opacity] duration-150 motion-reduce:transition-none',
    'data-starting-style:scale-95 data-starting-style:opacity-0',
    'data-ending-style:scale-95 data-ending-style:opacity-0',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
      } satisfies Record<DialogSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

export interface DialogPopupOwnProps {
  /**
   * Maximum width of the popup. The popup is always at least `1rem` from the
   * viewport edges on small screens.
   *
   * @default "md"
   */
  size?: DialogSize

  /**
   * Render a close (×) button in the top-end corner. Set to `false` for
   * confirmation dialogs where the footer actions are the only affordance.
   *
   * @default true
   */
  showCloseButton?: boolean

  /**
   * Class applied to the backdrop. Use this for a one-off tint (e.g. a
   * destructive confirmation with a red overlay).
   */
  backdropClassName?: string
}

export type DialogPopupBaseUiProps = Omit<BaseDialog.Popup.Props, 'className'>

export interface DialogPopupProps extends DialogPopupOwnProps, DialogPopupBaseUiProps {
  className?: string
}

/**
 * The dialog panel, portaled to `document.body`.
 *
 * Wraps the popup in a full-screen scroll container so a dialog taller than
 * the viewport is still fully reachable: the *wrapper* scrolls, not the
 * popup itself. The popup stays centered on short content.
 *
 * An animated close button is rendered in the top-end corner by default. Set
 * `showCloseButton={false}` for confirmation dialogs — the footer actions
 * are the only path, which prevents accidental dismissal.
 */
export function DialogPopup({
  size = 'md',
  showCloseButton = true,
  backdropClassName,
  className,
  children,
  ...props
}: DialogPopupProps) {
  return (
    <BaseDialog.Portal>
      <DialogBackdrop className={backdropClassName} />
      {/* Full-screen scroll container — grows when the popup is taller than
          the viewport, so nothing gets clipped on small screens. */}
      <div className="inset-0 fixed z-50 overflow-y-auto">
        <div className="p-4 flex min-h-full items-center justify-center">
          <BaseDialog.Popup
            data-slot="dialog-popup"
            data-size={size}
            className={cn(popupStyles({ size }), className)}
            {...props}
          >
            {children}
            {showCloseButton && (
              <DialogClose
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
              </DialogClose>
            )}
          </BaseDialog.Popup>
        </div>
      </div>
    </BaseDialog.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Header / Footer                                                            */
/* -------------------------------------------------------------------------- */

export type DialogHeaderProps = React.ComponentProps<'div'>

/** Groups the title and description at the top of the dialog. */
export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div data-slot="dialog-header" className={cn('gap-1.5 flex flex-col', className)} {...props} />
  )
}

export type DialogFooterProps = React.ComponentProps<'div'>

/**
 * Groups the action buttons at the bottom of the dialog. Stacks on mobile
 * (primary action first) and aligns to the end on wider screens.
 */
export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('gap-2 sm:flex-row sm:justify-end flex flex-col-reverse', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Title / Description                                                        */
/* -------------------------------------------------------------------------- */

export type DialogTitleProps = Omit<BaseDialog.Title.Props, 'className'> & {
  className?: string
}

/** The dialog's accessible name. Read by screen readers on open. */
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn('font-semibold text-lg', className)}
      {...props}
    />
  )
}

export type DialogDescriptionProps = Omit<BaseDialog.Description.Props, 'className'> & {
  className?: string
}

/** Optional supporting line below the title. Wired to the popup via `aria-describedby`. */
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
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
