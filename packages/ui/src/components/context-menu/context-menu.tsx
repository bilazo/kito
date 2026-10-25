import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { cn } from 'cn'

import {
  MenuCheckIcon,
  MenuChevronRightIcon,
  MenuDotIcon,
  menuItemStyles,
  menuPopupBase,
} from '../../lib/menu-shared'

import type { MenuAlign, MenuItemVariant, MenuSide } from '../../lib/menu-shared'
import type * as React from 'react'

/* -------------------------------------------------------------------------- */
/* ContextMenu (root)                                                         */
/* -------------------------------------------------------------------------- */

export type ContextMenuProps = BaseContextMenu.Root.Props

/**
 * A menu of actions opened by right-click. Shares its primitive with `Menu`
 * — the same roving tabindex, arrow-key navigation, typeahead, and submenu
 * opening — only the trigger differs: right-click opens the menu at the
 * pointer, not below a button.
 *
 * Use it for actions on an object the user has already focused with a
 * right-click (a file, a row, a table cell, an image). For a menu triggered
 * by a visible button, use `Menu`.
 */
export function ContextMenu(props: ContextMenuProps) {
  return <BaseContextMenu.Root data-slot="context-menu" {...props} />
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export type ContextMenuTriggerProps = Omit<BaseContextMenu.Trigger.Props, 'className'> & {
  className?: string
}

/**
 * The area where a right-click opens the menu. Children are rendered inside;
 * a bare `<ContextMenuTrigger>Click here</ContextMenuTrigger>` covers the
 * text only — wrap a larger region (a card, a row) when the menu applies to
 * the whole object.
 *
 * The `select-none` class is baked in so right-clicking does not start a
 * text selection underneath the menu.
 */
export function ContextMenuTrigger({ className, ...props }: ContextMenuTriggerProps) {
  return (
    <BaseContextMenu.Trigger
      data-slot="context-menu-trigger"
      className={cn('select-none', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Popup                                                                      */
/* -------------------------------------------------------------------------- */

export interface ContextMenuPopupOwnProps {
  /**
   * Direction on the popup subtree. The popup is portaled to
   * `document.body`, so it does not inherit `dir` from any wrapper — pass it
   * here when the page's `<html dir="rtl">` is not set. Also reaches the
   * `Positioner` so the popup flips to open on the correct side of the
   * cursor when it would otherwise overflow the viewport.
   *
   * @default undefined (inherits from `<html dir>`)
   */
  dir?: BaseContextMenu.Popup.Props['dir']
}

export type ContextMenuPopupBaseUiProps = Omit<BaseContextMenu.Popup.Props, 'className' | 'dir'>

export interface ContextMenuPopupProps
  extends ContextMenuPopupOwnProps, ContextMenuPopupBaseUiProps {
  className?: string
}

/**
 * The context menu panel, portaled to `document.body`. Opens at the cursor
 * position from the right-click — no `side` or `align` prop, because the
 * menu follows the pointer rather than anchoring to the trigger.
 *
 * Width is `min-w-40` and grows to fit the content. Long lists scroll.
 */
export function ContextMenuPopup({ dir, className, children, ...props }: ContextMenuPopupProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner dir={dir} className="z-50 outline-none">
        <BaseContextMenu.Popup
          data-slot="context-menu-popup"
          dir={dir}
          className={cn(menuPopupBase, className)}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* ContextMenuItem                                                            */
/* -------------------------------------------------------------------------- */

export interface ContextMenuItemOwnProps {
  /**
   * Visual treatment. Use `destructive` for irreversible actions — the item
   * gets a red tint and a red background on highlight.
   *
   * @default "default"
   */
  variant?: MenuItemVariant

  /**
   * Align the item's text with items that have a leading indicator (checkbox
   * or radio items). Adds `ps-8`.
   *
   * @default false
   */
  inset?: boolean
}

export type ContextMenuItemBaseUiProps = Omit<BaseContextMenu.Item.Props, 'className'>

export interface ContextMenuItemProps extends ContextMenuItemOwnProps, ContextMenuItemBaseUiProps {
  className?: string
}

/**
 * A command in the context menu. Fires `onSelect` when activated by mouse,
 * Enter, or Space, and closes the menu. Use `variant="destructive"` for
 * irreversible actions like Delete.
 */
export function ContextMenuItem({ variant, inset, className, ...props }: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      data-slot="context-menu-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cn(menuItemStyles({ variant, inset }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ContextMenuCheckboxItem                                                    */
/* -------------------------------------------------------------------------- */

export interface ContextMenuCheckboxItemOwnProps {
  /**
   * Whether the menu closes when this item is toggled. Kept `false` by
   * default: a checkbox group is multi-select, and reopening the menu per
   * toggle is the wrong trade.
   *
   * @default false
   */
  closeOnClick?: boolean
}

export type ContextMenuCheckboxItemBaseUiProps = Omit<
  BaseContextMenu.CheckboxItem.Props,
  'className'
>

export interface ContextMenuCheckboxItemProps
  extends ContextMenuCheckboxItemOwnProps, ContextMenuCheckboxItemBaseUiProps {
  className?: string
}

/**
 * A menu item with a checkbox indicator. Toggle one or many; the menu stays
 * open so the user can pick multiple options.
 *
 * The indicator wrapper carries `inset-e-2` (logical) so the checkmark sits
 * on the reading-end side — it flips with `dir`.
 */
export function ContextMenuCheckboxItem({
  closeOnClick = false,
  className,
  children,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <BaseContextMenu.CheckboxItem
      data-slot="context-menu-checkbox-item"
      closeOnClick={closeOnClick}
      className={cn(menuItemStyles({ inset: false }), 'pe-8', className)}
      {...props}
    >
      {children}
      {/*
        The indicator is wrapped in a positioning span. Base UI's
        CheckboxItemIndicator toggles its own `display` based on the item's
        checked state — putting `flex` on the indicator would override the
        `display: none` and keep the checkmark permanently visible.
      */}
      <span
        data-slot="context-menu-checkbox-item-indicator"
        className="inset-y-0 inset-e-2 pointer-events-none absolute flex items-center"
      >
        <BaseContextMenu.CheckboxItemIndicator>
          <MenuCheckIcon />
        </BaseContextMenu.CheckboxItemIndicator>
      </span>
    </BaseContextMenu.CheckboxItem>
  )
}

/* -------------------------------------------------------------------------- */
/* ContextMenuRadioGroup / ContextMenuRadioItem                               */
/* -------------------------------------------------------------------------- */

export type ContextMenuRadioGroupProps = Omit<BaseContextMenu.RadioGroup.Props, 'className'> & {
  className?: string
}

/**
 * A group of mutually-exclusive `ContextMenuRadioItem`s. Set `value` +
 * `onValueChange` on this component, not on individual items.
 */
export function ContextMenuRadioGroup({ className, ...props }: ContextMenuRadioGroupProps) {
  return (
    <BaseContextMenu.RadioGroup
      data-slot="context-menu-radio-group"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

export interface ContextMenuRadioItemOwnProps {
  /**
   * Whether the menu closes when this item is selected. `true` by default —
   * a radio item is single-select, so leaving the menu open strands the user
   * on a popup with nothing left to do.
   *
   * @default true
   */
  closeOnClick?: boolean
}

export type ContextMenuRadioItemBaseUiProps = Omit<BaseContextMenu.RadioItem.Props, 'className'>

export interface ContextMenuRadioItemProps
  extends ContextMenuRadioItemOwnProps, ContextMenuRadioItemBaseUiProps {
  className?: string
}

/**
 * A menu item with a radio indicator. Selecting one deselects the others in
 * the same `ContextMenuRadioGroup` and closes the menu.
 */
export function ContextMenuRadioItem({
  closeOnClick = true,
  className,
  children,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem
      data-slot="context-menu-radio-item"
      closeOnClick={closeOnClick}
      className={cn(menuItemStyles({ inset: false }), 'pe-8', className)}
      {...props}
    >
      {children}
      <span
        data-slot="context-menu-radio-item-indicator"
        className="inset-y-0 inset-e-2 pointer-events-none absolute flex items-center"
      >
        <BaseContextMenu.RadioItemIndicator>
          <MenuDotIcon />
        </BaseContextMenu.RadioItemIndicator>
      </span>
    </BaseContextMenu.RadioItem>
  )
}

/* -------------------------------------------------------------------------- */
/* Group / Label                                                              */
/* -------------------------------------------------------------------------- */

export type ContextMenuGroupProps = Omit<BaseContextMenu.Group.Props, 'className'> & {
  className?: string
}

/** Groups related items. Use with `ContextMenuGroupLabel` and `ContextMenuSeparator`. */
export function ContextMenuGroup({ className, ...props }: ContextMenuGroupProps) {
  return (
    <BaseContextMenu.Group
      data-slot="context-menu-group"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

export type ContextMenuGroupLabelProps = Omit<BaseContextMenu.GroupLabel.Props, 'className'> & {
  className?: string
}

/** A non-focusable heading for a group. Skipped by keyboard navigation. */
export function ContextMenuGroupLabel({ className, ...props }: ContextMenuGroupLabelProps) {
  return (
    <BaseContextMenu.GroupLabel
      data-slot="context-menu-group-label"
      className={cn('px-3 py-1.5 font-medium text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Separator                                                                  */
/* -------------------------------------------------------------------------- */

export type ContextMenuSeparatorProps = Omit<BaseContextMenu.Separator.Props, 'className'> & {
  className?: string
}

/** A horizontal divider between groups of items. */
export function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  return (
    <BaseContextMenu.Separator
      data-slot="context-menu-separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Shortcut                                                                   */
/* -------------------------------------------------------------------------- */

export type ContextMenuShortcutProps = React.ComponentProps<'span'>

/**
 * A right-aligned hint that shows the keyboard shortcut for the item it
 * lives in. Purely decorative — the actual shortcut handler must be wired
 * elsewhere.
 */
export function ContextMenuShortcut({ className, ...props }: ContextMenuShortcutProps) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        'tracking-widest ms-auto text-xs text-muted-foreground',
        'group-data-highlighted/menu-item:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Submenu                                                                    */
/* -------------------------------------------------------------------------- */

export type ContextMenuSubProps = BaseContextMenu.SubmenuRoot.Props

/**
 * A nested submenu. Place a `ContextMenuSubTrigger` and a
 * `ContextMenuSubPopup` inside, within the parent `ContextMenuPopup`.
 */
export function ContextMenuSub(props: ContextMenuSubProps) {
  return <BaseContextMenu.SubmenuRoot data-slot="context-menu-sub" {...props} />
}

export type ContextMenuSubTriggerProps = Omit<BaseContextMenu.SubmenuTrigger.Props, 'className'> & {
  className?: string
}

/**
 * Opens the submenu on hover or keyboard activation. Renders a chevron that
 * flips with the page direction — in RTL the chevron points left, matching
 * the expected `side="left"` on the submenu popup.
 */
export function ContextMenuSubTrigger({
  className,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      className={cn(
        menuItemStyles({ inset: false }),
        'justify-between',
        'data-popup-open:bg-accent data-popup-open:text-accent-foreground',
        className,
      )}
      {...props}
    >
      {children}
      <MenuChevronRightIcon className="ms-auto rtl:-scale-x-100" />
    </BaseContextMenu.SubmenuTrigger>
  )
}

export interface ContextMenuSubPopupOwnProps {
  /**
   * Side of the parent item to place the submenu on. Sides are **physical** —
   * `left` / `right` do not flip in RTL. The default is `right` (assumes
   * LTR); in an RTL page pass `side="left"` — the `ContextMenuSubTrigger`
   * chevron flips automatically via `rtl:-scale-x-100` to match.
   *
   * @default "right"
   */
  side?: MenuSide

  /**
   * Gap between the parent item and the submenu, in pixels.
   *
   * @default 4
   */
  sideOffset?: number

  /**
   * Alignment along the cross axis. `alignOffset: -4` nudges the submenu up
   * so its first item lines up with the parent item's text rather than its
   * frame.
   *
   * @default "start"
   */
  align?: MenuAlign

  /**
   * @default -4
   */
  alignOffset?: number

  /**
   * Direction for the submenu popup and its positioning. The submenu is
   * portaled, so it does not inherit `dir` from any wrapper — pass it here
   * when the page's `<html dir="rtl">` is not set. Also reaches the
   * `Positioner` so `align="start"` in RTL aligns at the start edge (right)
   * rather than the physical left.
   *
   * @default undefined (inherits from `<html dir>`)
   */
  dir?: BaseContextMenu.Popup.Props['dir']
}

export type ContextMenuSubPopupBaseUiProps = Omit<BaseContextMenu.Popup.Props, 'className' | 'dir'>

export interface ContextMenuSubPopupProps
  extends ContextMenuSubPopupOwnProps, ContextMenuSubPopupBaseUiProps {
  className?: string
}

/**
 * The submenu panel. Portaled; rendered to the physical side named by
 * `side` (default `right`). In an RTL app, pass `side="left"` — the
 * `ContextMenuSubTrigger` chevron flips automatically to match.
 */
export function ContextMenuSubPopup({
  side = 'right',
  sideOffset = 4,
  align = 'start',
  alignOffset = -4,
  dir,
  className,
  children,
  ...props
}: ContextMenuSubPopupProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        dir={dir}
        className="z-50 outline-none"
      >
        <BaseContextMenu.Popup
          data-slot="context-menu-sub-popup"
          dir={dir}
          className={cn(menuPopupBase, className)}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Re-exports                                                                 */
/* -------------------------------------------------------------------------- */

export type { MenuAlign, MenuItemVariant, MenuSide }
