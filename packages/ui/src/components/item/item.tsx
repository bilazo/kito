import { useRender } from '@base-ui/react/use-render'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import { Separator } from '../separator/separator'

import type * as React from 'react'

type ItemVariant = 'default' | 'outline' | 'muted'
type ItemSize = 'default' | 'sm' | 'xs'
type ItemMediaVariant = 'default' | 'icon' | 'image'

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const itemStyles = cva(
  [
    'group/item flex w-full flex-wrap items-center rounded-lg text-sm',
    'transition-colors duration-100 motion-reduce:transition-none',
    // Focus treatment matches Button, Input, and Card.
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    // When rendered as an anchor, hover the surface subtly.
    '[a]:transition-colors [a]:hover:bg-muted',
  ],
  {
    variants: {
      variant: {
        default: 'border border-transparent',
        outline: 'border border-border',
        muted: 'border border-transparent bg-muted/50',
      } satisfies Record<ItemVariant, string>,
      size: {
        default: 'gap-2.5 px-3 py-2.5',
        sm: 'gap-2 px-2.5 py-2',
        xs: 'gap-1.5 px-2 py-1.5',
      } satisfies Record<ItemSize, string>,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const itemMediaStyles = cva(
  [
    'gap-2 flex shrink-0 items-center justify-center',
    // When a description sits below the title, align media to the top of the
    // text block instead of centering on the whole row.
    'group-has-data-[slot=item-description]/item:translate-y-0.5',
    'group-has-data-[slot=item-description]/item:self-start',
    '[&_svg]:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover',
      } satisfies Record<ItemMediaVariant, string>,
    },
    defaultVariants: { variant: 'default' },
  },
)

/* -------------------------------------------------------------------------- */
/* ItemGroup                                                                  */
/* -------------------------------------------------------------------------- */

export type ItemGroupProps = React.ComponentProps<'div'>

/**
 * A container that groups related items with consistent vertical spacing.
 *
 * Renders `role="list"` so screen readers announce it as a list even though
 * the markup uses plain `<div>`s. `Item` renders a generic container and is
 * not `role="listitem"` — the role travels from `ItemGroup` to the outer
 * structure only. If you need a real `<ul>/<li>` structure, use `Table` or
 * write the markup yourself.
 */
export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        'group/item-group gap-4 flex w-full flex-col',
        'has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ItemSeparator                                                              */
/* -------------------------------------------------------------------------- */

export type ItemSeparatorProps = React.ComponentProps<typeof Separator>

/** A horizontal divider between items in an `ItemGroup`. */
export function ItemSeparator({ className, ...props }: ItemSeparatorProps) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-2', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Item                                                                       */
/* -------------------------------------------------------------------------- */

export interface ItemOwnProps {
  /**
   * Surface treatment.
   *
   * - `default` — transparent; the item sits flat on whatever surface it is in
   * - `outline` — bordered; use to visually separate items in a dense list
   * - `muted` — soft filled; use for a hovered or selected state
   *
   * @default "default"
   */
  variant?: ItemVariant

  /**
   * Controls padding and gap. `sm` and `xs` shrink the row for compact lists,
   * dropdown menus, and sidebars.
   *
   * @default "default"
   */
  size?: ItemSize
}

export type ItemBaseUiProps = useRender.ComponentProps<'div'>

export interface ItemProps extends ItemOwnProps, ItemBaseUiProps {}

/**
 * A flexible container for one row of content: an optional `ItemMedia`, an
 * `ItemContent` (title + description), and optional `ItemActions`.
 */
export function Item({ variant, size, className, render, ...props }: ItemProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      'data-slot': 'item',
      'data-variant': variant ?? 'default',
      'data-size': size ?? 'default',
      'className': cn(itemStyles({ variant, size }), className),
      ...props,
    },
  })
}

/* -------------------------------------------------------------------------- */
/* ItemMedia                                                                  */
/* -------------------------------------------------------------------------- */

export interface ItemMediaOwnProps {
  /**
   * Media treatment.
   *
   * - `default` — no chrome; you size it yourself
   * - `icon` — sized for a single icon; SVG gets `size-4`
   * - `image` — a square frame (size scales with `Item`'s size) with rounded
   *   corners and `object-cover` on the `<img>`
   *
   * @default "default"
   */
  variant?: ItemMediaVariant
}

export type ItemMediaProps = ItemMediaOwnProps & React.ComponentProps<'div'>

/**
 * The leading slot of an `Item` — an icon, image, avatar, or anything else
 * that should sit before the content.
 */
export function ItemMedia({ variant, className, ...props }: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant ?? 'default'}
      className={cn(itemMediaStyles({ variant }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ItemContent                                                                */
/* -------------------------------------------------------------------------- */

export type ItemContentProps = React.ComponentProps<'div'>

/**
 * The flexible middle column of an `Item`. Holds `ItemTitle` and
 * `ItemDescription`. `min-w-0` lets the content shrink so `line-clamp`
 * truncation actually works.
 */
export function ItemContent({ className, ...props }: ItemContentProps) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'min-w-0 gap-0.5 flex flex-1 flex-col',
        'group-data-[size=xs]/item:gap-0',
        // When a second ItemContent is adjacent (rare), don't grow it.
        '[&+[data-slot=item-content]]:flex-none',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ItemTitle / ItemDescription                                                */
/* -------------------------------------------------------------------------- */

export type ItemTitleProps = React.ComponentProps<'div'>

/** The item's primary line of text. Truncated to one line. */
export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'gap-2 line-clamp-1 flex w-fit items-center',
        'leading-snug font-medium text-sm underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

export type ItemDescriptionProps = React.ComponentProps<'p'>

/** A secondary line below the title. Truncated to two lines. */
export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'line-clamp-2 text-start',
        'leading-normal text-sm text-muted-foreground',
        'group-data-[size=xs]/item:text-xs',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ItemActions                                                                */
/* -------------------------------------------------------------------------- */

export type ItemActionsProps = React.ComponentProps<'div'>

/**
 * The trailing slot of an `Item` for controls — icon buttons, badges, a
 * menu trigger. Aligns to the reading end.
 */
export function ItemActions({ className, ...props }: ItemActionsProps) {
  return (
    <div
      data-slot="item-actions"
      className={cn('gap-2 ms-auto flex items-center', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ItemHeader / ItemFooter                                                    */
/* -------------------------------------------------------------------------- */

export type ItemHeaderProps = React.ComponentProps<'div'>

/**
 * A full-width row that sits **above** the main content. Because `Item` is
 * a flex-wrap container, `basis-full` forces the header onto its own line.
 * Use for a source label, a timestamp, or an "in progress" tag.
 */
export function ItemHeader({ className, ...props }: ItemHeaderProps) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'gap-2 flex basis-full items-center justify-between',
        'text-xs text-muted-foreground',
        "[&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

export type ItemFooterProps = React.ComponentProps<'div'>

/** A full-width row that sits **below** the main content. */
export function ItemFooter({ className, ...props }: ItemFooterProps) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'gap-2 pt-1 flex basis-full items-center justify-between',
        'text-xs text-muted-foreground',
        "[&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  )
}

export type { ItemVariant, ItemSize, ItemMediaVariant }
