import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type TabsVariant = 'default' | 'line'
type TabsOrientation = 'horizontal' | 'vertical'

/* -------------------------------------------------------------------------- */
/* Tabs (root)                                                                */
/* -------------------------------------------------------------------------- */

export type TabsProps = BaseTabs.Root.Props

/**
 * A set of layered panels switched by a row (or column) of tabs.
 *
 * `Tabs` renders no DOM of its own — it manages the active value and
 * keyboard navigation (arrow keys, Home, End). The visible parts are their
 * own components.
 *
 * `TabsIndicator` is optional and must be the **last child** of `TabsList` —
 * it reads the active tab's geometry from Base UI's CSS variables
 * (`--active-tab-left`, `--active-tab-width`, and their top/height
 * counterparts) to slide between tabs. Drop it for a design where each tab
 * carries its own active styling.
 */
export function Tabs(props: TabsProps) {
  return <BaseTabs.Root {...props} />
}

/* -------------------------------------------------------------------------- */
/* TabsList                                                                   */
/* -------------------------------------------------------------------------- */

const tabsListStyles = cva('group/tabs-list relative inline-flex w-fit items-center', {
  variants: {
    variant: {
      // A contained background with a sliding pill indicator on the active
      // tab. Good for filter-style tabs that should read as a single unit.
      default: 'gap-0.5 p-1 rounded-lg bg-muted',
      // An underline indicator that slides beneath the active tab. Good for
      // navigation-style tabs where the tab strip should blend into the page.
      line: 'gap-1 rounded-none bg-transparent',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-stretch',
    },
  },
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
})

export interface TabsListOwnProps {
  /**
   * Visual style of the tab strip.
   *
   * - `default` — a muted container with a sliding pill behind the active tab
   * - `line` — an underline indicator that slides beneath the active tab
   *
   * @default "default"
   */
  variant?: TabsVariant

  /**
   * Layout direction of the tab strip. Should match the orientation of the
   * surrounding `Tabs` root.
   *
   * @default "horizontal"
   */
  orientation?: TabsOrientation
}

export type TabsListBaseUiProps = Omit<BaseTabs.List.Props, 'className'>

export interface TabsListProps extends TabsListOwnProps, TabsListBaseUiProps {
  className?: string
}

/** The tab strip. Put `TabsTab` children inside; add `TabsIndicator` last. */
export function TabsList({
  variant = 'default',
  orientation = 'horizontal',
  className,
  ...props
}: TabsListProps) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      data-variant={variant}
      data-orientation={orientation}
      className={cn(tabsListStyles({ variant, orientation }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* TabsTab                                                                    */
/* -------------------------------------------------------------------------- */

const tabsTabStyles = cva(
  [
    'relative z-1 inline-flex cursor-pointer items-center justify-center',
    'gap-1.5 whitespace-nowrap select-none',
    'font-medium text-sm text-muted-foreground',
    'transition-colors duration-150 motion-reduce:transition-none',
    'hover:text-foreground',
    'data-active:text-foreground',
    // Focus: matches Button's focus treatment.
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    // Disabled
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    // Icons — non-sized svgs get the standard 16px.
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: 'px-3 py-1.5 rounded-md',
        line: 'px-3 py-2 pb-3',
      },
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  },
)

export interface TabsTabOwnProps {
  /**
   * Visual style — must match the surrounding `TabsList`'s variant.
   *
   * @default "default"
   */
  variant?: TabsVariant

  /**
   * Should match the surrounding `TabsList`'s orientation.
   *
   * @default "horizontal"
   */
  orientation?: TabsOrientation
}

export type TabsTabBaseUiProps = Omit<BaseTabs.Tab.Props, 'className'>

export interface TabsTabProps extends TabsTabOwnProps, TabsTabBaseUiProps {
  className?: string
}

/** A single tab. Clicking or pressing Enter/Space on it activates its panel. */
export function TabsTab({
  variant = 'default',
  orientation = 'horizontal',
  className,
  ...props
}: TabsTabProps) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-tab"
      data-variant={variant}
      data-orientation={orientation}
      className={cn(tabsTabStyles({ variant, orientation }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* TabsIndicator                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The sliding element that tracks the active tab.
 *
 * Must be placed **last** in `TabsList`, after all `TabsTab` children.
 *
 * Positioning is done with the CSS variables Base UI sets on the list:
 *
 * - Horizontal: `--active-tab-left`, `--active-tab-width`
 * - Vertical: `--active-tab-top`, `--active-tab-height`
 *
 * The `default` variant renders a pill (background + shadow) sized to the
 * active tab. The `line` variant renders an underline (a 2px bar) at the
 * reading-start edge of the active tab.
 */
export function TabsIndicator({
  className,
  ...props
}: Omit<BaseTabs.Indicator.Props, 'className'> & { className?: string }) {
  return (
    <BaseTabs.Indicator
      data-slot="tabs-indicator"
      className={cn(
        // Position and size come from Base UI's CSS variables.
        'ease-out absolute transition-[left,top,width,height] duration-200 motion-reduce:transition-none',
        // Horizontal: indicator follows the active tab's left/width.
        'group-data-[orientation=horizontal]/tabs-list:top-1/2',
        'group-data-[orientation=horizontal]/tabs-list:-translate-y-1/2',
        'group-data-[orientation=horizontal]/tabs-list:left-(--active-tab-left)',
        'group-data-[orientation=horizontal]/tabs-list:w-(--active-tab-width)',
        // Vertical: indicator follows the active tab's top/height.
        'group-data-[orientation=vertical]/tabs-list:left-0',
        'group-data-[orientation=vertical]/tabs-list:top-(--active-tab-top)',
        'group-data-[orientation=vertical]/tabs-list:h-(--active-tab-height)',
        // Default variant: pill behind the tab.
        'group-data-[variant=default]/tabs-list:h-[calc(100%-8px)]',
        'group-data-[variant=default]/tabs-list:rounded-md',
        'group-data-[variant=default]/tabs-list:bg-background',
        'group-data-[variant=default]/tabs-list:shadow-sm',
        // Line variant (horizontal): 2px bar at the bottom edge.
        'group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs-list:top-auto',
        'group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs-list:bottom-0',
        'group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs-list:h-0.5',
        'group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs-list:translate-y-0',
        // Line variant (vertical): 2px bar at the reading-end edge.
        'group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs-list:left-auto',
        'group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs-list:right-0',
        'group-data-[variant=line]/tabs-list:group-data-[orientation=vertical]/tabs-list:w-0.5',
        // Line variant color.
        'group-data-[variant=line]/tabs-list:bg-foreground',
        'group-data-[variant=line]/tabs-list:shadow-none',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* TabsPanel                                                                  */
/* -------------------------------------------------------------------------- */

export type TabsPanelProps = Omit<BaseTabs.Panel.Props, 'className'> & {
  className?: string
}

/**
 * The content of one tab. Only the panel matching the active tab value is
 * rendered (unless `keepMounted` is set on the root).
 */
export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-panel"
      className={cn(
        'text-sm text-foreground',
        // Focus: matches other focusable regions so keyboard users can land
        // on the panel without a mouse.
        'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
      {...props}
    />
  )
}
