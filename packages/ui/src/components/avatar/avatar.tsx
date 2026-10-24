import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { Children } from 'react'

import type { ReactNode } from 'react'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'
type AvatarBadgeStatus = 'online' | 'offline' | 'busy' | 'away'

const avatarStyles = cva(
  [
    'group/avatar relative inline-flex shrink-0 select-none',
    'items-center justify-center rounded-full',
    'text-muted-foreground',
  ],
  {
    variants: {
      size: {
        // Control-token sizes: keep avatars flush with Button/Input heights.
        sm: 'size-(--control-sm) text-xs',
        md: 'size-(--control-md) text-sm',
        lg: 'size-(--control-lg) text-base',
        // Not tied to a control token — for profile headers and large lists.
        xl: 'size-16 text-lg',
      } satisfies Record<AvatarSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

const badgeStyles = cva(
  [
    'bottom-0 inset-e-0 absolute z-10',
    'inline-flex items-center justify-center rounded-full select-none',
    'ring-2 ring-background',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      size: {
        sm: 'size-2 [&_svg]:size-1.5',
        md: 'size-2.5 [&_svg]:size-2',
        lg: 'size-3 [&_svg]:size-2',
        xl: 'size-3.5 [&_svg]:size-2.5',
      } satisfies Record<AvatarSize, string>,
      status: {
        online: 'bg-primary text-primary-foreground',
        offline: 'bg-muted-foreground text-background',
        busy: 'bg-destructive text-destructive-foreground',
        away: 'bg-highlight text-highlight-foreground',
      } satisfies Record<AvatarBadgeStatus, string>,
    },
  },
)

/* -------------------------------------------------------------------------- */
/* Avatar                                                                     */
/* -------------------------------------------------------------------------- */

export interface AvatarOwnProps {
  /**
   * Size of the avatar.
   *
   * - `sm`, `md`, `lg` — line up with `Button` and `Input` heights
   * - `xl` — for profile headers, not form rows
   *
   * @default "md"
   */
  size?: AvatarSize
}

export type AvatarBaseUiProps = Omit<BaseAvatar.Root.Props, 'className'>

export interface AvatarProps extends AvatarOwnProps, AvatarBaseUiProps {
  className?: string
}

/**
 * A profile image with an automatic fallback.
 *
 * Base UI tracks the image load/error state itself, so the fallback
 * (`AvatarFallback`) shows instantly and is swapped for the image once it
 * loads — no broken-image icon, no layout shift.
 */
export function Avatar({ size = 'md', className, ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatarStyles({ size }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AvatarImage                                                                */
/* -------------------------------------------------------------------------- */

export type AvatarImageProps = Omit<BaseAvatar.Image.Props, 'className'> & {
  className?: string
}

/**
 * The image inside an Avatar.
 *
 * Renders nothing visible until the image has loaded. While loading or on
 * error, the sibling `AvatarFallback` is shown instead.
 */
export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <BaseAvatar.Image
      data-slot="avatar-image"
      className={cn('size-full rounded-full object-cover', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AvatarFallback                                                             */
/* -------------------------------------------------------------------------- */

export interface AvatarFallbackOwnProps {
  /**
   * Milliseconds to wait before showing the fallback. Useful to skip the
   * fallback flash on a fast connection.
   *
   * @default 0
   */
  delay?: number
}

export type AvatarFallbackBaseUiProps = Omit<BaseAvatar.Fallback.Props, 'className' | 'delay'>

export interface AvatarFallbackProps extends AvatarFallbackOwnProps, AvatarFallbackBaseUiProps {
  className?: string
}

/**
 * Shown when the image is loading or has failed — typically initials or an
 * icon. Fills the whole avatar.
 */
export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <BaseAvatar.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full',
        'font-medium bg-muted',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AvatarBadge                                                                */
/* -------------------------------------------------------------------------- */

export interface AvatarBadgeOwnProps {
  /**
   * Presence state. Sets a semantic background color; pass `children` to
   * replace the dot with an icon.
   *
   * @default undefined
   */
  status?: AvatarBadgeStatus
}

export type AvatarBadgeProps = AvatarBadgeOwnProps &
  Omit<React.ComponentPropsWithoutRef<'span'>, 'className'> & {
    className?: string
  }

/**
 * A small marker at the bottom-end corner of an Avatar.
 *
 * Two modes:
 *
 * - **Status dot** — pass `status` and no children. The dot colors itself
 *   from the semantic token for that status.
 * - **Icon badge** — pass any children (an SVG). The dot is a background for
 *   the icon; use `className` to pick a background color.
 *
 * The badge is sized from the parent Avatar's `data-size` attribute.
 *
 * **Accessibility**: this element is decorative. If the status is meaningful,
 * add a visible or `aria-label`ed indicator elsewhere; a bare colored dot is
 * not announced by screen readers.
 */
export function AvatarBadge({ status, className, ...props }: AvatarBadgeProps) {
  return (
    <span
      data-slot="avatar-badge"
      data-status={status}
      className={cn(
        badgeStyles({ status }),
        // Size is derived from the parent Avatar's data-size, not from a prop,
        // so the badge always matches the avatar it sits on.
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&_svg]:size-1.5',
        'group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&_svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&_svg]:size-2',
        'group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&_svg]:size-2.5',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* AvatarGroup                                                                */
/* -------------------------------------------------------------------------- */

export interface AvatarGroupOwnProps {
  /** The avatars to display, in order. */
  children?: ReactNode

  /**
   * Show at most this many avatars. The rest are collapsed into a single
   * `+N` avatar at the end. Pass the **full** list, not a pre-sliced one.
   *
   * @default undefined (show all)
   */
  max?: number

  /**
   * Size used for the `+N` overflow avatar. Set `size` on each `<Avatar>`
   * individually to control the rest.
   *
   * @default "md"
   */
  size?: AvatarSize
}

export type AvatarGroupProps = AvatarGroupOwnProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'className'> & {
    className?: string
  }

/**
 * An overlapping row of avatars.
 *
 * Overlap uses a logical negative margin (`-ms-*`), so it works in RTL and LTR
 * without extra classes. Each avatar keeps its own size and gets a cut-out
 * ring in the surrounding surface color.
 */
export function AvatarGroup({ children, max, size = 'md', className, ...props }: AvatarGroupProps) {
  const items = Children.toArray(children)
  const shown = max ? items.slice(0, max) : items
  const overflow = max ? Math.max(items.length - max, 0) : 0

  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'flex items-center',
        // Logical overlap: works in RTL and LTR without `space-x-reverse`.
        '[&>*:not(:first-child)]:-ms-2',
        // Keep each avatar at its own size and vertically centered so the
        // ring hugs the circle rather than stretching with the flex row.
        '*:data-[slot=avatar]:shrink-0',
        '*:data-[slot=avatar]:self-center',
        // Cut-out ring in the surrounding surface color.
        '*:data-[slot=avatar]:ring-2',
        '*:data-[slot=avatar]:ring-background',
        className,
      )}
      {...props}
    >
      {shown}
      {overflow > 0 && (
        <Avatar size={size}>
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            +{overflow}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
