import { Menu as BaseMenu } from '@base-ui/react/menu'
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
/* Menu (root)                                                                */
/* -------------------------------------------------------------------------- */

export type MenuProps = BaseMenu.Root.Props

/**
 * A dropdown menu opened by click: a list of commands, a user menu, a row
 * "⋮" actions menu.
 *
 * ```tsx
 * <Menu>
 *   <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Options" />}>
 *     <MoreIcon />
 *   </MenuTrigger>
 *   <MenuPopup>
 *     <MenuItem onClick={rename}>Rename</MenuItem>
 *     <MenuItem onClick={duplicate}>Duplicate</MenuItem>
 *     <MenuSeparator />
 *     <MenuItem variant="destructive" onClick={remove}>Delete</MenuItem>
 *   </MenuPopup>
 * </Menu>
 * ```
 *
 * For a menu opened by right-click, use `ContextMenu` (not built yet). For a
 * list of options where the user picks one value, prefer
 * [`Select`](/components/select). For a panel with rich content (inputs,
 * links, cards), use [`Popover`](/components/popover).
 */
export function Menu(props: MenuProps) {
  return <BaseMenu.Root data-slot="menu" {...props} />
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

export type MenuTriggerProps = Omit<BaseMenu.Trigger.Props, 'className'> & {
  className?: string
}

/**
 * Opens the menu on click. Use Base UI's `render` prop to render as a real
 * control:
 *
 * ```tsx
 * <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Options" />}>
 * ```
 */
export function MenuTrigger({ className, ...props }: MenuTriggerProps) {
  return <BaseMenu.Trigger data-slot="menu-trigger" className={className} {...props} />
}

/* -------------------------------------------------------------------------- */
/* Popup                                                                      */
/* -------------------------------------------------------------------------- */

export interface MenuPopupOwnProps {
  /**
   * Side of the trigger to place the menu on. Sides are **physical** —
   * `left` / `right` do not flip in RTL. In an app that serves both LTR and
   * RTL, choose the side from the current direction
   * (e.g. `side={dir === "rtl" ? "left" : "right"}`) rather than relying on
   * a logical alias.
   *
   * @default "bottom"
   */
  side?: MenuSide

  /**
   * Gap between the trigger and the menu, in pixels.
   *
   * @default 6
   */
  sideOffset?: number

  /**
   * Alignment of the menu relative to the trigger along the cross axis.
   *
   * @default "start"
   */
  align?: MenuAlign

  /**
   * Offset along the alignment axis, in pixels.
   *
   * @default 0
   */
  alignOffset?: number

  /**
   * Direction on the popup subtree. The popup is **portaled to
   * `document.body`**, so it does not inherit `dir` from any wrapper — pass
   * it here when the page's `<html dir="rtl">` is not set.
   *
   * Base UI's `Positioner` computes `align` from this direction: with
   * `align="start"` in RTL, the popup's **right** edge aligns with the
   * trigger's right edge.
   *
   * @default undefined (inherits from `<html dir>`)
   */
  dir?: BaseMenu.Popup.Props['dir']
}

export type MenuPopupBaseUiProps = Omit<BaseMenu.Popup.Props, 'className' | 'dir'>

export interface MenuPopupProps extends MenuPopupOwnProps, MenuPopupBaseUiProps {
  className?: string
}

/**
 * The menu panel, portaled to `document.body`.
 *
 * Long lists scroll; width is at least `min-w-40` and grows to fit the
 * content. Rendered with a scale + fade animation from the positioner's
 * transform origin.
 */
export function MenuPopup({
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  dir,
  className,
  children,
  ...props
}: MenuPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        dir={dir}
        className="z-50 outline-none"
      >
        <BaseMenu.Popup
          data-slot="menu-popup"
          dir={dir}
          className={cn(menuPopupBase, className)}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* MenuItem                                                                   */
/* -------------------------------------------------------------------------- */

export interface MenuItemOwnProps {
  /**
   * Visual treatment. Use `destructive` for irreversible actions.
   *
   * @default "default"
   */
  variant?: MenuItemVariant

  /**
   * Align the item's text with items that have a leading indicator (checkbox
   * or radio items). Adds `ps-8` so the content starts at the same x as a
   * `MenuCheckboxItem`'s label.
   *
   * @default false
   */
  inset?: boolean
}

export type MenuItemBaseUiProps = Omit<BaseMenu.Item.Props, 'className'>

export interface MenuItemProps extends MenuItemOwnProps, MenuItemBaseUiProps {
  className?: string
}

/**
 * A command in the menu. Fires `onClick` when activated by mouse, Enter, or
 * Space, and closes the menu by default.
 *
 * For navigation to a route, use `MenuLinkItem` — a real `<a>` that stays
 * in the menu's roving tab order and closes the menu on activation.
 */
export function MenuItem({ variant, inset, className, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      data-slot="menu-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cn(menuItemStyles({ variant, inset }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* MenuLinkItem                                                               */
/* -------------------------------------------------------------------------- */

export interface MenuLinkItemOwnProps {
  /**
   * Visual treatment — same options as `MenuItem`.
   *
   * @default "default"
   */
  variant?: MenuItemVariant

  /**
   * Extra start padding to align with indicator-carrying items.
   *
   * @default false
   */
  inset?: boolean

  /**
   * Whether the menu closes when the link is activated.
   *
   * @default true
   */
  closeOnClick?: boolean
}

export type MenuLinkItemBaseUiProps = Omit<BaseMenu.LinkItem.Props, 'className'>

export interface MenuLinkItemProps extends MenuLinkItemOwnProps, MenuLinkItemBaseUiProps {
  className?: string
}

/**
 * A link in the menu. Renders a real `<a>` with proper menu semantics — it
 * stays in the roving tab order and closes the menu on activation
 * (`closeOnClick` defaults to `true`, unlike Base UI's default).
 *
 * Framework-agnostic: pass `render` to integrate with any router:
 *
 * ```tsx
 * // Plain anchor
 * <MenuLinkItem href="/profile">Profile</MenuLinkItem>
 *
 * // Next.js
 * import Link from 'next/link'
 * <MenuLinkItem render={<Link href="/profile" />}>Profile</MenuLinkItem>
 *
 * // TanStack Router
 * import { Link } from '@tanstack/react-router'
 * <MenuLinkItem render={<Link to="/profile" />}>Profile</MenuLinkItem>
 * ```
 */
export function MenuLinkItem({
  variant,
  inset,
  closeOnClick = true,
  className,
  ...props
}: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      data-slot="menu-link-item"
      data-variant={variant}
      data-inset={inset || undefined}
      closeOnClick={closeOnClick}
      className={cn(menuItemStyles({ variant, inset }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* CheckboxItem / RadioGroup / RadioItem                                      */
/* -------------------------------------------------------------------------- */

export interface MenuCheckboxItemOwnProps {
  /**
   * Whether the menu closes when this item is toggled. Kept `false` by
   * default: a checkbox group is multi-select, and reopening the menu per
   * item is the wrong trade.
   *
   * @default false
   */
  closeOnClick?: boolean
}

export type MenuCheckboxItemBaseUiProps = Omit<BaseMenu.CheckboxItem.Props, 'className'>

export interface MenuCheckboxItemProps
  extends MenuCheckboxItemOwnProps, MenuCheckboxItemBaseUiProps {
  className?: string
}

/**
 * A menu item with a checkbox indicator. Toggle one or many; the menu stays
 * open so the user can pick multiple options.
 *
 * ```tsx
 * <MenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
 *   Show grid
 * </MenuCheckboxItem>
 * ```
 */
export function MenuCheckboxItem({
  closeOnClick = false,
  className,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="menu-checkbox-item"
      closeOnClick={closeOnClick}
      className={cn(
        menuItemStyles({ inset: false }),
        // Extra end padding so the label doesn't run under the checkmark.
        'pe-8',
        className,
      )}
      {...props}
    >
      {children}
      {/*
        The indicator is wrapped in a positioning span. Base UI's
        `CheckboxItemIndicator` toggles its own `display` based on the
        item's checked state, so it must not carry layout classes of its
        own — otherwise `flex` on the indicator overrides Base UI's
        `display: none` and the checkmark is always visible.
      */}
      <span
        data-slot="menu-checkbox-item-indicator"
        className="inset-y-0 inset-e-2 pointer-events-none absolute flex items-center"
      >
        <BaseMenu.CheckboxItemIndicator>
          <MenuCheckIcon />
        </BaseMenu.CheckboxItemIndicator>
      </span>
    </BaseMenu.CheckboxItem>
  )
}

export type MenuRadioGroupProps = Omit<BaseMenu.RadioGroup.Props, 'className'> & {
  className?: string
}

/**
 * A group of mutually-exclusive `MenuRadioItem`s. Set `value` +
 * `onValueChange` on this component, not on individual items.
 */
export function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  return (
    <BaseMenu.RadioGroup
      data-slot="menu-radio-group"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

export interface MenuRadioItemOwnProps {
  /**
   * Whether the menu closes when this item is selected. `true` by default —
   * a radio item is single-select, so leaving the menu open strands the
   * user on a popup with nothing left to do.
   *
   * @default true
   */
  closeOnClick?: boolean
}

export type MenuRadioItemBaseUiProps = Omit<BaseMenu.RadioItem.Props, 'className'>

export interface MenuRadioItemProps extends MenuRadioItemOwnProps, MenuRadioItemBaseUiProps {
  className?: string
}

/**
 * A menu item with a radio indicator. Selecting one deselects the others in
 * the same `MenuRadioGroup` and closes the menu.
 */
export function MenuRadioItem({
  closeOnClick = true,
  className,
  children,
  ...props
}: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot="menu-radio-item"
      closeOnClick={closeOnClick}
      className={cn(menuItemStyles({ inset: false }), 'pe-8', className)}
      {...props}
    >
      {children}
      {/* Same reasoning as the checkbox indicator above. */}
      <span
        data-slot="menu-radio-item-indicator"
        className="inset-y-0 inset-e-2 pointer-events-none absolute flex items-center"
      >
        <BaseMenu.RadioItemIndicator>
          <MenuDotIcon />
        </BaseMenu.RadioItemIndicator>
      </span>
    </BaseMenu.RadioItem>
  )
}

/* -------------------------------------------------------------------------- */
/* Group / Label                                                              */
/* -------------------------------------------------------------------------- */

export type MenuGroupProps = Omit<BaseMenu.Group.Props, 'className'> & {
  className?: string
}

/** Groups related items. Use with `MenuGroupLabel` and `MenuSeparator`. */
export function MenuGroup({ className, ...props }: MenuGroupProps) {
  return (
    <BaseMenu.Group data-slot="menu-group" className={cn('flex flex-col', className)} {...props} />
  )
}

export type MenuGroupLabelProps = Omit<BaseMenu.GroupLabel.Props, 'className'> & {
  className?: string
}

/** A non-focusable heading for a `MenuGroup`. Skipped by keyboard navigation. */
export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      data-slot="menu-group-label"
      className={cn('px-3 py-1.5 font-medium text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Separator                                                                  */
/* -------------------------------------------------------------------------- */

export type MenuSeparatorProps = Omit<BaseMenu.Separator.Props, 'className'> & {
  className?: string
}

/** A horizontal divider between groups of items. */
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      data-slot="menu-separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Shortcut                                                                   */
/* -------------------------------------------------------------------------- */

export type MenuShortcutProps = React.ComponentProps<'span'>

/**
 * A right-aligned hint that shows the keyboard shortcut for the item it
 * lives in. Purely decorative — the actual shortcut handler must be wired
 * elsewhere (a global `keydown` listener, a command palette, etc.).
 *
 * ```tsx
 * <MenuItem>
 *   Save
 *   <MenuShortcut>⌘S</MenuShortcut>
 * </MenuItem>
 * ```
 */
export function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return (
    <span
      data-slot="menu-shortcut"
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

export type MenuSubProps = BaseMenu.SubmenuRoot.Props

/**
 * A nested submenu. Place a `MenuSubTrigger` and a `MenuSubPopup` inside,
 * within the parent `MenuPopup`.
 */
export function MenuSub(props: MenuSubProps) {
  return <BaseMenu.SubmenuRoot data-slot="menu-sub" {...props} />
}

export type MenuSubTriggerProps = Omit<BaseMenu.SubmenuTrigger.Props, 'className'> & {
  className?: string
}

/**
 * Opens the submenu on hover or activation. Renders a chevron that flips
 * with the page direction — in RTL the chevron points left, which is the
 * expected direction when the submenu’s `side` is set to `"left"` (the RTL
 * counterpart of the default `"right"`).
 */
export function MenuSubTrigger({ className, children, ...props }: MenuSubTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot="menu-sub-trigger"
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
    </BaseMenu.SubmenuTrigger>
  )
}

export interface MenuSubPopupOwnProps {
  /**
   * Side of the parent item to place the submenu on. Sides are **physical** —
   * `left` / `right` do not flip in RTL. The default is `right` (assumes
   * LTR); in an RTL page pass `side="left"` — the `MenuSubTrigger` chevron
   * flips to match via `rtl:-scale-x-100`.
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
   * frame — this is the standard submenu look.
   *
   * @default "start"
   */
  align?: MenuAlign

  /**
   * @default -4
   */
  alignOffset?: number

  /**
+   * Direction on the popup subtree.
+   *
+   * @default undefined (inherits from `<html dir>`)
+   */
  dir?: BaseMenu.Popup.Props['dir']
}

export type MenuSubPopupBaseUiProps = Omit<BaseMenu.Popup.Props, 'className' | 'dir'>

export interface MenuSubPopupProps extends MenuSubPopupOwnProps, MenuSubPopupBaseUiProps {
  className?: string
}

/**
 * The submenu panel. Portaled; rendered to the physical side named by
 * `side` (default `right`). In an RTL app, pass `side="left"` — the
 * `MenuSubTrigger` chevron flips automatically to match.
 */
export function MenuSubPopup({
  side = 'right',
  sideOffset = 4,
  align = 'start',
  alignOffset = -4,
  dir,
  className,
  children,
  ...props
}: MenuSubPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        dir={dir}
        className="z-50 outline-none"
      >
        <BaseMenu.Popup
          data-slot="menu-sub-popup"
          dir={dir}
          className={cn(menuPopupBase, className)}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/* Re-exports                                                                 */
/* -------------------------------------------------------------------------- */

export type { MenuAlign, MenuItemVariant, MenuSide }
