import { useRender } from '@base-ui/react/use-render'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

type BadgeVariant = 'primary' | 'secondary' | 'soft' | 'outline' | 'destructive' | 'highlight'

type BadgeSize = 'sm' | 'md'

const badgeStyles = cva(
  [
    'gap-1 inline-flex w-fit shrink-0 items-center justify-center',
    'font-medium rounded-md whitespace-nowrap',
    'transition-colors',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-3",
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        soft: 'bg-primary-soft text-primary-soft-foreground',
        outline: 'border border-input bg-transparent text-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        highlight: 'bg-highlight text-highlight-foreground',
      } satisfies Record<BadgeVariant, string>,
      size: {
        sm: 'h-4 px-1.5 text-[10px]',
        md: 'h-5 px-2 text-xs',
      } satisfies Record<BadgeSize, string>,
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  },
)

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito UI. */
export interface BadgeOwnProps {
  /**
   * Visual style of the badge:
   *
   * - `primary` — solid brand, for confirmed / active states
   * - `secondary` — neutral filled, for default / inactive labels
   * - `soft` — brand-tinted, low emphasis (categories, levels)
   * - `outline` — bordered transparent, for counts and metadata
   * - `destructive` — solid red, for error / overdue states
   * - `highlight` — secondary brand, for streaks and achievements
   *
   * @default "secondary"
   */
  variant?: BadgeVariant

  /**
   * Controls the badge height and font size.
   *
   * @default "md"
   */
  size?: BadgeSize
}

/** Props inherited from Base UI's polymorphic render API. */
export type BadgeBaseUiProps = useRender.ComponentProps<'span'>

/** Public composed props. */
export interface BadgeProps extends BadgeOwnProps, BadgeBaseUiProps {}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A compact status or label chip.
 *
 * Badge is purely visual — it is not focusable and not interactive by
 * default. To render it as a link, pass a different element via `render`.
 * For a clickable chip (filter, dismiss), wrap it inside a `Button`
 * instead.
 */
export function Badge({ variant, size, className, render, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    render,
    props: {
      'data-slot': 'badge',
      'className': cn(badgeStyles({ variant, size }), className),
      ...props,
    },
  })
}

export { badgeStyles }
