import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type MenuSide = 'top' | 'bottom' | 'left' | 'right'

export type MenuAlign = 'start' | 'center' | 'end'

/* -------------------------------------------------------------------------- */
/* Popup base                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Base classes shared by every menu popup:
 * `MenuPopup`, `MenuSubPopup`, `ContextMenuPopup`, `MenubarPopup`.
 *
 * Each component adds its own `data-slot` and any width overrides on top of
 * this string. Do not change the shared string without also checking the
 * context-menu and menubar components.
 */
export const menuPopupBase = [
  'z-50 min-w-40 overflow-y-auto',
  'rounded-lg border border-border bg-popover p-1',
  'text-popover-foreground shadow-md',
  'outline-0',
  // Grow from the positioner's anchor on enter; shrink back on exit.
  'origin-(--transform-origin)',
  'transition-[transform,opacity] duration-150 motion-reduce:transition-none',
  'data-starting-style:scale-95 data-starting-style:opacity-0',
  'data-ending-style:scale-95 data-ending-style:opacity-0',
].join(' ')

/* -------------------------------------------------------------------------- */
/* Item styles                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Shared styles for every menu item variant:
 *
 * - click items (`MenuItem`)
 * - link items (`MenuLinkItem`)
 * - checkbox items (`MenuCheckboxItem`)
 * - radio items (`MenuRadioItem`)
 * - submenu triggers (`MenuSubTrigger`)
 *
 * The `group/menu-item` group is referenced by `MenuShortcut` and any icon
 * that should follow the item's highlight state. It is intentionally the
 * same group name across Menu, ContextMenu, and Menubar so shared children
 * work identically in all three.
 */
export const menuItemStyles = cva(
  [
    'group/menu-item gap-2 relative flex cursor-default items-center select-none',
    'px-3 py-2 rounded-md text-sm',
    'outline-0',
    // Highlight on hover and keyboard focus.
    'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
    // Disabled items stay visible but are inert.
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    // Icons — non-sized svgs get the standard 16px.
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: '',
        destructive: [
          'text-destructive',
          'data-highlighted:bg-destructive/10 data-highlighted:text-destructive',
        ],
      },
      inset: {
        // Aligns the item's content with the label of a `MenuCheckboxItem` or
        // `MenuRadioItem` — which carry a leading indicator the plain items
        // don't.
        true: 'ps-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inset: false,
    },
  },
)

export type MenuItemVariant = NonNullable<VariantProps<typeof menuItemStyles>['variant']>

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The checkmark shown on a selected `MenuCheckboxItem` or `MenuRadioItem`
 * when the "indicator on the end side" style is used.
 */
export function MenuCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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

/** The filled dot shown on a selected `MenuRadioItem`. */
export function MenuDotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <circle cx="12" cy="12" r="5" />
    </svg>
  )
}

/**
 * The chevron on a `MenuSubTrigger`. Points to the reading-end side by
 * default; consumers add `rtl:-scale-x-100` when the layout should flip.
 */
export function MenuChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}
