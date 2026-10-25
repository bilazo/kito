import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { createContext, useContext, useMemo } from 'react'

import type * as React from 'react'

type DrawerSide = 'bottom' | 'top' | 'left' | 'right'
type DrawerVariant = 'flush' | 'floating'

const sideToSwipeDirection: Record<DrawerSide, 'down' | 'up' | 'left' | 'right'> = {
  bottom: 'down',
  top: 'up',
  left: 'left',
  right: 'right',
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const DrawerContext = createContext<{
  side: DrawerSide
  variant: DrawerVariant
  modal: boolean | 'trap-focus'
  hasSnapPoints: boolean
  showSwipeHandle: boolean
} | null>(null)

/* -------------------------------------------------------------------------- */
/* Drawer (root)                                                              */
/* -------------------------------------------------------------------------- */

export interface DrawerOwnProps {
  /**
   * Edge the drawer anchors to and the direction to swipe for dismissal.
   *
   * @default "bottom"
   */
  side?: DrawerSide

  /**
   * Visual treatment for side drawers (`left` / `right`) on `md+` viewports.
   *
   * - `flush` (default) — edges to the viewport; only the inner corners
   *   rounded. Use for navigation drawers and any panel that should feel
   *   attached to the chrome.
   * - `floating` — a small inset on the outer side, top, and bottom; all
   *   four corners rounded; soft shadow; slightly wider default. Use for
   *   inspector / detail panels where the user benefits from seeing the
   *   underlying list through the visible backdrop.
   *
   * Has no effect for `top` / `bottom` sides, or below the `md` breakpoint
   * — those always render flush.
   *
   * @default "flush"
   */
  variant?: DrawerVariant

  /**
   * Render a decorative drag-handle affordance. The gesture works without
   * it — the handle is a visual hint only.
   *
   * @default false
   */
  showSwipeHandle?: boolean
}

export type DrawerBaseUiProps = BaseDrawer.Root.Props

export interface DrawerProps extends DrawerOwnProps, DrawerBaseUiProps {}

/**
 * A swipeable sheet.
 *
 * Drawer uses Base UI's Drawer primitive — the same Dialog-based focus
 * management as `Sheet`, plus gesture handling: the user can drag the panel
 * with a finger or pointer to dismiss it. Base UI manages the drag, the
 * release threshold, and the snap-back animation.
 *
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
 *   <DrawerPopup showSwipeHandle>
 *     <DrawerHeader>
 *       <DrawerTitle>Filters</DrawerTitle>
 *     </DrawerHeader>
 *     <DrawerBody className="p-6">…</DrawerBody>
 *     <DrawerFooter>
 *       <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
 *     </DrawerFooter>
 *   </DrawerPopup>
 * </Drawer>
 * ```
 *
 * ### Snap points
 *
 * Pass `snapPoints` to make the drawer snap to discrete heights instead of a
 * single open/closed state. Each entry is either a CSS length (`'31rem'`) or
 * a number between 0 and 1 (a fraction of the viewport height). The user
 * drags between them; the release snaps to the nearest point.
 *
 * ```tsx
 * <Drawer snapPoints={['31rem', 1]} defaultSnapPoint="31rem" showSwipeHandle>
 * ```
 *
 * **`defaultSnapPoint`** picks the initial snap point. Without it, the
 * drawer opens at the *last* entry — often the full-height one. If you want
 * it to open at the "peek" height, name that point in `defaultSnapPoint`.
 * The value must exactly match one of the entries in `snapPoints`.
 *
 * When `snapPoints` is set, `max-h-[85vh]` is removed from the popup so
 * snap points up to and including `100%` work.
 */
export function Drawer({
  side = 'bottom',
  variant = 'flush',
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  ...props
}: DrawerProps) {
  const hasSnapPoints = (snapPoints?.length ?? 0) > 0

  const contextValue = useMemo(
    () => ({ side, variant, modal, hasSnapPoints, showSwipeHandle }),
    [side, variant, modal, hasSnapPoints, showSwipeHandle],
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <BaseDrawer.Root
        data-slot="drawer"
        data-side={side}
        data-variant={variant}
        modal={modal}
        swipeDirection={sideToSwipeDirection[side]}
        snapPoints={snapPoints}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/* Trigger / Close                                                            */
/* -------------------------------------------------------------------------- */

export type DrawerTriggerProps = Omit<BaseDrawer.Trigger.Props, 'className'> & {
  className?: string
}

/** Opens the drawer. Use Base UI's `render` prop to render as a `Button`. */
export function DrawerTrigger({ className, ...props }: DrawerTriggerProps) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" className={className} {...props} />
}

export type DrawerCloseProps = Omit<BaseDrawer.Close.Props, 'className'> & {
  className?: string
}

/** Closes the drawer. */
export function DrawerClose({ className, ...props }: DrawerCloseProps) {
  return <BaseDrawer.Close data-slot="drawer-close" className={className} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Backdrop                                                                   */
/* -------------------------------------------------------------------------- */

export type DrawerBackdropProps = Omit<BaseDrawer.Backdrop.Props, 'className'> & {
  className?: string
}

/**
 * The dimming overlay behind the popup. Its opacity tracks the swipe via
 * Base UI's `--drawer-swipe-progress`. When snap points are active,
 * `--drawer-overlay-min-opacity` keeps a floor so the backdrop does not
 * disappear at the lowest snap point.
 */
export function DrawerBackdrop({ className, ...props }: DrawerBackdropProps) {
  return (
    <BaseDrawer.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        'inset-0 fixed z-50 min-h-dvh bg-black/50 select-none',
        'opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))]',
        'transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'data-starting-style:opacity-0',
        'data-ending-style:opacity-0',
        'data-ending-style:pointer-events-none',
        'data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]',
        'data-snap-points:[--drawer-overlay-min-opacity:0.5]',
        'data-swiping:duration-0',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Popup styles                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The popup's own styles.
 *
 * Base UI exposes a set of CSS variables during a drag. Every one of them is
 * consumed here — removing any of them silently breaks snap points, live drag
 * feedback, or nested stacking.
 *
 * | Variable | Purpose |
 * |---|---|
 * | `--drawer-height` | Current natural height (snap or content) |
 * | `--drawer-snap-point-offset` | Distance from base to the active snap |
 * | `--drawer-swipe-movement-x/y` | Live drag offset |
 * | `--drawer-swipe-progress` | Drag progress 0–1 |
 * | `--drawer-swipe-strength` | Release velocity |
 * | `--nested-drawers` | Count of stacked child drawers |
 * | `--drawer-frontmost-height` | Height of the front-most nested drawer |
 * | `--stack-*` | Derived stacking offsets for nested drawers |
 */
const popupStyles = cva(
  [
    'group/drawer-popup fixed z-50 flex',
    'pointer-events-auto',
    'bg-card text-card-foreground',
    'outline-0 select-none',

    // Stack (nested drawers).
    // These are computed from Base UI's `--nested-drawers` (count) and
    // `--drawer-frontmost-height` (height of the frontmost child). Every
    // variable in the chain below is required for the dynamic "each Drawer
    // recedes one step when a new one opens" effect.
    '[--stack-step:0.05]', // each level shrinks by 5%
    '[--stack-progress:clamp(0,var(--drawer-swipe-progress),1)]',
    '[--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))]',
    '[--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)]',
    '[--stack-shrink:calc(1-var(--stack-scale))]',
    '[--peek:1rem]',
    '[--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))]',
    '[--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))]',
    // Shadow that appears at the top of a stacked parent — signals
    // "there is a Drawer in front of me".
    '[--drawer-stacked-shadow:0_-20px_25px_-5px_rgb(0_0_0/0.1),0_-8px_10px_-6px_rgb(0_0_0/0.1)]',

    // Transform
    // Reads the translate-x/y set per side. `--stack-scale` is computed
    // above from the nested count, so this line is what actually makes
    // each stacked Drawer shrink.
    'transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))]',
    'transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'will-change-transform',

    // Nested drawer visual.
    // When this Drawer has a nested child open: clip the content (so the
    // child's bleed doesn't leak through) and dim slightly.
    'data-nested-drawer-open:overflow-hidden',
    'data-nested-drawer-open:brightness-95',

    // Bleed
    // Extends the Drawer's background past its anchor edge so that when the
    // user over-drags in the opposite direction, the trailing side shows the
    // Drawer surface, not the page behind.
    //
    // Disabled in `variant=floating` — the panel is intentionally inset from
    // the viewport edge, so extending it past that edge would fill the very
    // gap the floating treatment is designed to show.
    '[--bleed:8rem] data-[variant=floating]:[--bleed:0px]',
    '[--drawer-bleed-background:var(--color-card)]',
    'after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background)',
    'data-[side=bottom]:after:inset-x-0 data-[side=bottom]:after:top-full data-[side=bottom]:after:h-(--bleed)',
    'data-[side=top]:after:inset-x-0 data-[side=top]:after:bottom-full data-[side=top]:after:h-(--bleed)',
    'data-[side=left]:after:inset-y-0 data-[side=left]:after:right-full data-[side=left]:after:w-(--bleed)',
    'data-[side=right]:after:inset-y-0 data-[side=right]:after:left-full data-[side=right]:after:w-(--bleed)',

    // Enter / exit transitions
    'data-starting-style:transform-(--closed-transform)',
    'data-ending-style:transform-(--closed-transform)',
    'data-swiping:duration-0',
    'data-nested-drawer-swiping:duration-0',
    'data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]',

    // Safe-area insets on the anchored edge.
    'data-[side=bottom]:pb-[env(safe-area-inset-bottom,0px)]',
    'data-[side=top]:pt-[env(safe-area-inset-top,0px)]',
    'data-[side=left]:pl-[env(safe-area-inset-left,0px)]',
    'data-[side=right]:pr-[env(safe-area-inset-right,0px)]',
  ],
  {
    variants: {
      side: {
        bottom: [
          'flex-col',
          'inset-x-0 bottom-0',
          '[--drawer-content-height:var(--drawer-height,auto)]',
          'h-(--drawer-content-height)',
          'max-h-[85vh] data-snap-points:max-h-none',
          'data-snap-points:[--drawer-content-height:100dvh]',
          'rounded-t-2xl border-t border-border',
          '[--closed-transform:translate3d(0,calc(100%+2px),0)]',
          'data-nested-drawer-open:h-(--stack-height)',
          'data-nested-drawer-open:shadow-(--drawer-stacked-shadow)',
          '[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)-var(--stack-peek-offset)-var(--stack-shrink)*var(--stack-height))]',
        ],
        top: [
          'flex-col',
          'inset-x-0 top-0',
          '[--drawer-content-height:var(--drawer-height,auto)]',
          'h-(--drawer-content-height)',
          'max-h-[85vh] data-snap-points:max-h-none',
          'data-snap-points:[--drawer-content-height:100dvh]',
          'rounded-b-2xl border-b border-border',
          '[--closed-transform:translate3d(0,calc(-100%-2px),0)]',
          'data-nested-drawer-open:h-(--stack-height)',
          'data-nested-drawer-open:shadow-(--drawer-stacked-shadow)',
          '[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)+var(--stack-peek-offset)+var(--stack-shrink)*var(--stack-height))]',
        ],
        left: [
          'flex-row',
          'inset-y-0 left-0 w-80 max-w-[85vw]',
          'rounded-r-2xl border-r border-border',
          '[--closed-transform:translate3d(calc(-100%-2px),0,0)]',
          'data-nested-drawer-open:w-(--drawer-content-width,80vw)',
          'data-nested-drawer-open:shadow-(--drawer-stacked-shadow)',
          '[--translate-x:calc(var(--drawer-swipe-movement-x,0px)+var(--stack-peek-offset)+var(--stack-shrink)*100%)]',
        ],
        right: [
          'flex-row',
          'inset-y-0 right-0 w-80 max-w-[85vw]',
          'rounded-l-2xl border-l border-border',
          '[--closed-transform:translate3d(calc(100%+2px),0,0)]',
          'data-nested-drawer-open:w-(--drawer-content-width,80vw)',
          'data-nested-drawer-open:shadow-(--drawer-stacked-shadow)',
          '[--translate-x:calc(var(--drawer-swipe-movement-x,0px)-var(--stack-peek-offset)-var(--stack-shrink)*100%)]',
        ],
      },
      variant: {
        flush: '',
        floating: '',
      },
    },
    compoundVariants: [
      // Floating left drawer at md+ — inset from viewport edges, all corners
      // rounded, full border, soft shadow, slightly wider.
      {
        side: 'left',
        variant: 'floating',
        className: [
          'md:top-3 md:bottom-3 md:left-3',
          'md:w-96 md:max-w-[calc(100vw-1.5rem)]',
          'md:rounded-xl',
          'md:border',
          'md:shadow-lg',
        ].join(' '),
      },
      {
        side: 'right',
        variant: 'floating',
        className: [
          'md:top-3 md:bottom-3 md:right-3',
          'md:w-96 md:max-w-[calc(100vw-1.5rem)]',
          'md:rounded-xl',
          'md:border',
          'md:shadow-lg',
        ].join(' '),
      },
      // `top` / `bottom` intentionally have no floating variant — they are
      // mobile action-sheet patterns that always render flush.
    ],
    defaultVariants: {
      side: 'bottom',
      variant: 'flush',
    },
  },
)

/* -------------------------------------------------------------------------- */
/* Popup                                                                      */
/* -------------------------------------------------------------------------- */

export type DrawerPopupBaseUiProps = Omit<BaseDrawer.Popup.Props, 'className'>

export type DrawerPopupProps = Omit<BaseDrawer.Popup.Props, 'className'> & {
  className?: string
}

/**
 * The drawer panel, portaled to `document.body`. Padding-free — sections own
 * their own padding so full-bleed content is possible.
 */
export function DrawerPopup({ className, children, ...props }: DrawerPopupProps) {
  const ctx = useContext(DrawerContext)
  const side = ctx?.side ?? 'bottom'
  const variant = ctx?.variant ?? 'flush'
  const modal = ctx?.modal ?? true
  const hasSnapPoints = ctx?.hasSnapPoints ?? false
  const showSwipeHandle = ctx?.showSwipeHandle ?? false

  return (
    <BaseDrawer.Portal>
      <DrawerBackdrop data-snap-points={hasSnapPoints ? '' : undefined} />
      <BaseDrawer.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className={cn(
          'inset-0 fixed z-50 select-none',
          // NOTE: `touch-none` was removed — it was blocking Base UI's own
          // pointer-event handling for the drag gesture. Base UI sets the
          // right `touch-action` on the popup itself.
          modal === true ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <BaseDrawer.Popup
          data-slot="drawer-popup"
          data-side={side}
          data-variant={variant}
          data-snap-points={hasSnapPoints ? '' : undefined}
          className={cn(popupStyles({ side, variant }), className)}
          {...props}
        >
          {showSwipeHandle && <DrawerHandle />}
          <BaseDrawer.Content
            data-slot="drawer-content"
            className="min-h-0 flex flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit]"
          >
            {children}
          </BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Handle                                                                     */
/* -------------------------------------------------------------------------- */

export type DrawerHandleProps = React.ComponentProps<'div'>

/**
 * A decorative drag-handle pill. Shape and position follow the surrounding
 * drawer's `side`.
 */
export function DrawerHandle({ className, ...props }: DrawerHandleProps) {
  const ctx = useContext(DrawerContext)
  const side = ctx?.side ?? 'bottom'

  return (
    <div
      aria-hidden
      data-slot="drawer-handle"
      data-side={side}
      className={cn(
        'shrink-0 rounded-full bg-muted',
        'cursor-grab active:cursor-grabbing',
        side === 'bottom' && 'mt-3 mb-2 h-1.5 w-10 mx-auto',
        side === 'top' && 'mt-2 mb-3 h-1.5 w-10 order-last mx-auto',
        side === 'left' && 'right-3 h-10 w-1.5 absolute top-1/2 -translate-y-1/2',
        side === 'right' && 'left-3 h-10 w-1.5 absolute top-1/2 -translate-y-1/2',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Header / Body / Footer                                                     */
/* -------------------------------------------------------------------------- */

export type DrawerHeaderProps = React.ComponentProps<'div'>

/**
 * Header row at the top of the drawer. Has its own padding; text is centered
 * on mobile since bottom drawers commonly are.
 */
export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'gap-1.5 flex shrink-0 flex-col',
        'p-4 pb-2 sm:p-6 sm:pb-3',
        'sm:text-start text-center',
        className,
      )}
      {...props}
    />
  )
}

export type DrawerBodyProps = React.ComponentProps<'div'>

/**
 * Scrollable middle region. No padding by default — header and footer carry
 * their own; add `p-*` here when you want the body inset.
 */
export function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return (
    <div
      data-slot="drawer-body"
      className={cn(
        // `min-h-0` lets this flex child shrink below its content size so
        // `overflow-y-auto` actually engages.
        'min-h-0 flex-1 overflow-y-auto overscroll-contain',
        className,
      )}
      {...props}
    />
  )
}

export type DrawerFooterProps = React.ComponentProps<'div'>

/** Footer row at the bottom of the drawer. Has its own padding. */
export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        'gap-2 flex shrink-0 flex-col-reverse',
        'p-4 pt-2 sm:p-6 sm:pt-3',
        'sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Title / Description                                                        */
/* -------------------------------------------------------------------------- */

export type DrawerTitleProps = Omit<BaseDrawer.Title.Props, 'className'> & {
  className?: string
}

/** The drawer's accessible name. Read by screen readers on open. */
export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <BaseDrawer.Title
      data-slot="drawer-title"
      className={cn('font-semibold text-lg', className)}
      {...props}
    />
  )
}

export type DrawerDescriptionProps = Omit<BaseDrawer.Description.Props, 'className'> & {
  className?: string
}

/** Optional supporting line below the title. */
export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export type { DrawerSide }
