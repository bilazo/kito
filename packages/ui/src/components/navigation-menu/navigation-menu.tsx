import { NavigationMenu as BaseNavMenu } from '@base-ui/react/navigation-menu'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type NavAlign = 'start' | 'center' | 'end'

/* -------------------------------------------------------------------------- */
/* Shared trigger styles                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Base styles shared by a nav trigger and a top-level nav link. Exported so
 * a consumer can style their own anchor (e.g. a router link) to look like a
 * trigger
 */
export const navigationMenuTriggerStyle = cva([
  'group/nav-trigger h-9 inline-flex w-max shrink-0 items-center justify-center',
  'gap-1 px-3 py-1.5 font-medium rounded-md text-sm',
  'whitespace-nowrap text-foreground',
  'transition-colors duration-150 motion-reduce:transition-none',
  'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  // Open / hover state.
  'hover:bg-accent hover:text-accent-foreground',
  'data-popup-open:bg-accent data-popup-open:text-accent-foreground',
  // Disabled.
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  // Icons
  "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
])

/* -------------------------------------------------------------------------- */
/* NavigationMenu (root)                                                      */
/* -------------------------------------------------------------------------- */

export interface NavigationMenuOwnProps {
  /**
   * Horizontal alignment of the popup relative to the active trigger.
   *
   * @default "start"
   */
  align?: NavAlign
}

export type NavigationMenuBaseUiProps = BaseNavMenu.Root.Props

export interface NavigationMenuProps extends NavigationMenuOwnProps, NavigationMenuBaseUiProps {
  className?: string
}

/**
 * A horizontal navigation bar with hoverable dropdowns.
 *
 * A single `NavigationMenu` renders one **shared viewport**: moving the
 * pointer between two open triggers slides and resizes the panel rather
 * than unmounting it.
 *
 * The `Portal` / `Positioner` / `Popup` / `Viewport` chain is rendered
 * internally by `NavigationMenuPositioner` — a consumer never composes
 * them.
 */
export function NavigationMenu({
  align = 'start',
  className,
  children,
  ...props
}: NavigationMenuProps) {
  return (
    <BaseNavMenu.Root
      data-slot="navigation-menu"
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </BaseNavMenu.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* List                                                                       */
/* -------------------------------------------------------------------------- */

export type NavigationMenuListProps = React.ComponentPropsWithRef<typeof BaseNavMenu.List>

/** The horizontal row of items. */
export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavMenu.List
      data-slot="navigation-menu-list"
      className={cn(
        'group/nav-list gap-1 flex flex-1 list-none items-center justify-center',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export type NavigationMenuItemProps = React.ComponentPropsWithRef<typeof BaseNavMenu.Item>

/** One item. Wraps a `Trigger`+`Content` pair, or a standalone `Link`. */
export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  return (
    <BaseNavMenu.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export type NavigationMenuTriggerProps = Omit<BaseNavMenu.Trigger.Props, 'className'> & {
  className?: string
}

/** A button that opens a `NavigationMenuContent`. Renders a rotating chevron. */
export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <BaseNavMenu.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className={cn(
          'ms-1 size-3 transition-transform duration-200 motion-reduce:transition-none',
          'group-data-popup-open/nav-trigger:rotate-180',
        )}
      />
    </BaseNavMenu.Trigger>
  )
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export type NavigationMenuContentProps = Omit<BaseNavMenu.Content.Props, 'className'> & {
  className?: string
}

/**
 * The panel that opens below a trigger. The shared viewport slides and
 * resizes as the active trigger changes.
 */
export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return (
    <BaseNavMenu.Content
      data-slot="navigation-menu-content"
      className={cn('p-2 h-full w-auto', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Link                                                                       */
/* -------------------------------------------------------------------------- */

export type NavigationMenuLinkProps = Omit<BaseNavMenu.Link.Props, 'className'> & {
  className?: string
}

/**
 * A navigation link. Use it inside `NavigationMenuContent` as a card-style
 * row, or directly inside `NavigationMenuItem` as a top-level nav link.
 *
 * Use `render` to compose with any router link — hover and focus styles
 * travel with it.
 */
export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <BaseNavMenu.Link
      data-slot="navigation-menu-link"
      className={cn(
        'gap-2 p-2 flex items-center rounded-md',
        'text-sm text-foreground',
        'transition-colors duration-150 motion-reduce:transition-none',
        'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        'hover:bg-accent hover:text-accent-foreground',
        // A link used as a top-level nav item should match the trigger's
        // horizontal rhythm.
        'in-data-[slot=navigation-menu-list]:h-9 in-data-[slot=navigation-menu-list]:px-3 in-data-[slot=navigation-menu-list]:py-1.5 in-data-[slot=navigation-menu-list]:font-medium',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Positioner                                                                 */
/* -------------------------------------------------------------------------- */

export type NavigationMenuPositionerProps = Omit<BaseNavMenu.Positioner.Props, 'className'> & {
  className?: string
}

/**
 * The shared viewport shell — Portal, Positioner, Popup, and Viewport.
 *
 * Rendered automatically inside `NavigationMenu`; **must be a separate
 * component**. Base UI's context reads through this component boundary and
 * a `NavigationMenuContent` opening inside the tree that is not preceded by
 * a mounted Positioner throws "NavigationMenu.Item parts must be used
 * within NavigationMenuItem".
 *
 * Only export it for advanced composition (e.g. mounting a second
 * NavigationMenu manually). Most apps should let `NavigationMenu` render it.
 */
export function NavigationMenuPositioner({
  className,
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  alignOffset = 0,
  ...props
}: NavigationMenuPositionerProps) {
  return (
    <BaseNavMenu.Portal>
      <BaseNavMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(
          'isolate z-50',
          'h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)',
          'ease-out transition-[top,left,right,bottom] duration-200 motion-reduce:transition-none',
          'data-instant:transition-none',
          className,
        )}
        {...props}
      >
        <BaseNavMenu.Popup
          className={cn(
            'relative',
            'h-(--popup-height) w-(--popup-width)',
            'origin-(--transform-origin)',
            'shadow-md rounded-lg border border-border bg-popover text-popover-foreground',
            'outline-0',
            // Enter/exit: grow slightly + fade.
            'ease-out transition-[opacity,transform,width,height,scale,translate] duration-200 motion-reduce:transition-none',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            'data-ending-style:duration-150',
          )}
        >
          <BaseNavMenu.Viewport className="relative size-full overflow-hidden" />
        </BaseNavMenu.Popup>
      </BaseNavMenu.Positioner>
    </BaseNavMenu.Portal>
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

export type { NavAlign }
