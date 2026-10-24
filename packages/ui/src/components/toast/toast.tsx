import { Toast as BaseToast } from '@base-ui/react/toast'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import { Button } from '../button/button'

import type * as React from 'react'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning' | 'loading'

interface ToastAction {
  label: React.ReactNode
  onClick: () => void
}

export interface ToastInput {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  action?: ToastAction
  duration?: number
  id?: string
}

export interface ToastPromiseOptions<T> {
  loading: React.ReactNode | ToastInput
  success: React.ReactNode | ToastInput | ((value: T) => React.ReactNode | ToastInput)
  error: React.ReactNode | ToastInput | ((err: unknown) => React.ReactNode | ToastInput)
}

/* -------------------------------------------------------------------------- */
/* Manager + API                                                              */
/* -------------------------------------------------------------------------- */

export const toastManager = BaseToast.createToastManager()

/**
 * Returns true when the value looks like a React element (or portal).
 * Every React element is an object with a `$$typeof` marker; this is the
 * same check React itself uses internally.
 */
function isReactElementLike(value: unknown): boolean {
  return typeof value === 'object' && value !== null && '$$typeof' in value
}

/**
 * Returns true when the value should be treated as our `ToastInput` options
 * object rather than as content to be rendered. React elements, arrays, and
 * primitives are all content; anything else is an options bag.
 */
function isToastInputValue(value: unknown): value is ToastInput {
  return (
    typeof value === 'object' &&
    value !== null &&
    !isReactElementLike(value) &&
    !Array.isArray(value)
  )
}

function normalize(input: React.ReactNode | ToastInput, variant?: ToastVariant): ToastInput {
  if (isToastInputValue(input)) {
    return { ...input, variant: variant ?? input.variant }
  }
  return { description: input as React.ReactNode, variant }
}

function toTimeout(input: ToastInput): number | undefined {
  if (input.duration === Number.POSITIVE_INFINITY) return 0
  if (typeof input.duration === 'number') return input.duration
  if (input.variant === 'loading') return 0
  return undefined
}

function toPayload(input: ToastInput) {
  return {
    title: input.title,
    description: input.description,
    type: input.variant ?? 'default',
    timeout: toTimeout(input),
    actionProps: input.action
      ? { children: input.action.label, onClick: input.action.onClick }
      : undefined,
  }
}

function createTypedApi(variant?: ToastVariant) {
  return (input: React.ReactNode | ToastInput): string => {
    const normalized = normalize(input, variant)
    if (normalized.id) {
      toastManager.update(normalized.id, toPayload(normalized))
      return normalized.id
    }
    return toastManager.add(toPayload(normalized))
  }
}

export const toast = Object.assign(createTypedApi(), {
  add: createTypedApi(),
  success: createTypedApi('success'),
  error: createTypedApi('error'),
  info: createTypedApi('info'),
  warning: createTypedApi('warning'),
  loading: createTypedApi('loading'),

  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> {
    const resolve = (
      state: React.ReactNode | ToastInput | ((arg: unknown) => React.ReactNode | ToastInput),
    ) =>
      typeof state === 'function'
        ? (arg: unknown) => toPayload(normalize(state(arg)))
        : toPayload(normalize(state))

    return toastManager.promise(promise, {
      loading: toPayload(normalize(options.loading, 'loading')),
      success: resolve(options.success as never),
      error: resolve(options.error as never),
    } as never)
  },

  dismiss(id?: string): void {
    toastManager.close(id)
  },
})

/* -------------------------------------------------------------------------- */
/* Position map                                                               */
/* -------------------------------------------------------------------------- */

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
}

/* -------------------------------------------------------------------------- */
/* Toaster                                                                    */
/* -------------------------------------------------------------------------- */

export interface ToasterOwnProps {
  /**
   * Where toasts appear. Bottom positions stack upward; top positions stack
   * downward.
   *
   * @default "bottom-right"
   */
  position?: ToastPosition

  /**
   * Maximum number of visible toasts. Older ones are dropped.
   *
   * @default 3
   */
  limit?: number

  /**
   * Default auto-dismiss delay in ms.
   *
   * @default 5000
   */
  duration?: number

  /**
   * Render a close (×) button on every toast.
   *
   * @default true
   */
  showCloseButton?: boolean
}

export type ToasterBaseUiProps = Omit<
  React.ComponentProps<typeof BaseToast.Provider>,
  'toastManager' | 'children'
>

export interface ToasterProps extends ToasterOwnProps, ToasterBaseUiProps {
  className?: string
}

/**
 * Mount `Toaster` **once** near the app root.
 */
export function Toaster({
  position = 'bottom-right',
  limit = 3,
  duration = 5000,
  showCloseButton = true,
  className,
  ...props
}: ToasterProps) {
  return (
    <BaseToast.Provider toastManager={toastManager} limit={limit} timeout={duration} {...props}>
      <BaseToast.Portal>
        <BaseToast.Viewport
          data-slot="toaster"
          data-position={position}
          aria-label="Notifications"
          className={cn(
            // Viewport is pointer-events-none so it doesn't block the page;
            // the toast roots re-enable pointer events for themselves.
            'pointer-events-none fixed z-50 outline-none',
            'w-[min(24rem,calc(100vw-2rem))]',
            positionStyles[position],
            className,
          )}
        >
          <ToastList position={position} showCloseButton={showCloseButton} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/* Toast list                                                                 */
/* -------------------------------------------------------------------------- */

function ToastList({
  position,
  showCloseButton,
}: {
  position: ToastPosition
  showCloseButton: boolean
}) {
  const { toasts } = BaseToast.useToastManager()
  const isTop = position.startsWith('top')

  return toasts.map((t) => (
    <ToastItem key={t.id} toast={t} isTop={isTop} showCloseButton={showCloseButton} />
  ))
}

/* -------------------------------------------------------------------------- */
/* Toast item                                                                 */
/* -------------------------------------------------------------------------- */

type BaseToastObject = ReturnType<typeof BaseToast.useToastManager>['toasts'][number]

interface ToastItemProps {
  toast: BaseToastObject
  isTop: boolean
  showCloseButton: boolean
}

/**
 * One toast.
 *
 * This is a direct port of shadcn's toast stacking. The essential parts:
 *
 * 1. Every toast is `absolute`, anchored to the same edge (`bottom-0` for
 *    bottom positions, `top-0` for top positions). They overlap in the same
 *    spot, then are separated by the transform.
 *
 * 2. The CSS variables (`--peek`, `--gap`, `--scale`, `--shrink`, `--height`,
 *    `--offset-y`) are computed here. `--peek` is the visible strip of each
 *    hidden card; `--scale` shrinks cards deeper in the stack; `--shrink`
 *    compensates for the shrink's effect on the top edge.
 *
 * 3. The **frontmost** toast (index 0) is the only fully-visible one when the
 *    stack is collapsed. Everything behind it is scaled down and shows only
 *    a `peek` strip of its background — its content is faded out via
 *    `Toast.Content`'s `data-behind:opacity-0`.
 *
 * 4. Hovering the frontmost toast (or the `after:` bridge that extends its
 *    hitbox toward the stack) makes Base UI set `data-expanded` on **all**
 *    toasts in the stack, which:
 *    - drops the scale (`data-expanded:` has no `_scale(...)`)
 *    - expands each card to its own height (`h-(--toast-height)`)
 *    - repositions with real gaps using `--offset-y`
 *    - un-fades the content (`data-expanded:opacity-100` on Toast.Content)
 */
function ToastItem({ toast: t, isTop, showCloseButton }: ToastItemProps) {
  const variant = (t.type ?? 'default') as ToastVariant

  // Anchor edge and scale origin.
  const anchor = isTop ? 'top-0 origin-top' : 'bottom-0 origin-bottom'

  return (
    <BaseToast.Root
      toast={t}
      data-slot="toast"
      data-variant={variant}
      swipeDirection={isTop ? ['up', 'right'] : ['down', 'right']}
      className={cn(
        // Base
        'group/toast right-0 left-0 pointer-events-auto absolute',
        'z-[calc(1000-var(--toast-index))] w-full',
        'shadow-lg rounded-lg border border-border bg-popover text-popover-foreground',
        'outline-0 will-change-transform select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',

        // Anchor edge (position and transform origin).
        anchor,

        // ── Stacking variables ────────────────────────────────────────
        '[--gap:0.75rem]',
        '[--peek:0.75rem]',
        '[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]',
        '[--shrink:calc(1-var(--scale))]',
        '[--height:var(--toast-frontmost-height,var(--toast-height))]',

        // `--offset-y` drives the expanded-state translate.
        //
        // Bottom: the viewport anchors to the bottom edge; toasts behind
        // the frontmost must fan UP (negative Y) to stay inside the
        // viewport. This is shadcn's formula.
        //
        // Top: the viewport anchors to the top edge; toasts behind must
        // fan DOWN (positive Y) — the mirror of the bottom formula.
        isTop
          ? '[--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]'
          : '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',

        // Collapsed height: matches frontmost; expanded: own height.
        'h-(--height)',
        'data-expanded:h-(--toast-height)',

        // Collapsed transform — direction-aware.
        //
        // Bottom: shift up by index*peek + shrink*height (shadcn formula).
        // Top: shift down by the same magnitudes (mirrored signs).
        isTop
          ? 'transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]'
          : 'transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',

        // Expanded transform — reads the direction-aware `--offset-y`.
        'data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',

        // Transition.
        '[transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]',
        'motion-reduce:transition-none',
        'data-swiping:transition-none',

        // Hover bridge — direction-aware so it always fills the gap toward
        // the stack (below the toast for top, above for bottom).
        isTop
          ? "after:left-0 after:absolute after:top-full after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']"
          : "after:left-0 after:absolute after:bottom-full after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",

        // Limited (past the limit).
        'data-limited:pointer-events-none data-limited:opacity-0',

        // Enter — slide in from the anchor edge's outside.
        isTop
          ? 'data-starting-style:transform-[translateY(-150%)]'
          : 'data-starting-style:transform-[translateY(150%)]',

        // Exit without swipe — slide back out through the anchor edge.
        isTop
          ? '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]'
          : '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]',

        // Exit via swipe — follow the swipe direction, then off-screen.
        isTop
          ? 'data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]'
          : 'data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
      )}
    >
      <BaseToast.Content
        data-slot="toast-content"
        className={cn(
          'gap-3 p-4 flex h-full items-center overflow-hidden',
          'transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          // The peek-card trick: content is invisible while collapsed, so
          // only the card surface and border show. Expands back on hover.
          'data-behind:opacity-0',
          'data-expanded:opacity-100',
        )}
      >
        <ToastIcon variant={variant} />

        <div className="min-w-0 gap-0.5 flex flex-1 flex-col">
          <BaseToast.Title data-slot="toast-title" className="font-medium text-sm" />
          <BaseToast.Description
            data-slot="toast-description"
            className="text-sm text-muted-foreground"
          />
        </div>

        {t.actionProps && (
          <BaseToast.Action
            data-slot="toast-action"
            render={<Button variant="outline" size="sm" className="shrink-0" />}
          />
        )}

        {showCloseButton && (
          <BaseToast.Close
            data-slot="toast-close"
            aria-label="Close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="after:-inset-2 relative shrink-0 text-muted-foreground after:absolute after:content-[''] hover:text-foreground"
              />
            }
          >
            <XIcon />
          </BaseToast.Close>
        )}
      </BaseToast.Content>
    </BaseToast.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Icon per variant                                                           */
/* -------------------------------------------------------------------------- */

const iconColor = cva('[&_svg]:size-4 shrink-0 [&_svg]:pointer-events-none', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      success: 'text-primary',
      error: 'text-destructive',
      info: 'text-muted-foreground',
      warning: 'text-highlight-foreground',
      loading: '[&_svg]:animate-spin text-muted-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
})

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const icon = getIcon(variant)
  if (!icon) return null
  return (
    <span
      data-slot="toast-icon"
      aria-hidden
      className={cn(
        iconColor({ variant }),
        'shrink-0',
        '[&_svg]:size-4 [&_svg]:pointer-events-none',
        variant === 'loading' && '[&_svg]:animate-spin',
      )}
    >
      {icon}
    </span>
  )
}

function getIcon(variant: ToastVariant): React.ReactNode {
  switch (variant) {
    case 'success':
      return <CircleCheckIcon />
    case 'error':
      return <CircleXIcon />
    case 'warning':
      return <TriangleAlertIcon />
    case 'info':
      return <InfoIcon />
    case 'loading':
      return <SpinnerIcon />
    default:
      return null
  }
}

function CircleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function CircleXIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  )
}

function TriangleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  )
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  )
}

function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
