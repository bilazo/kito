import { useRender } from '@base-ui/react/use-render'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

type CardSize = 'sm' | 'md'
type CardVariant = 'filled' | 'outline'

const cardStyles = cva(
  [
    'group/card flex flex-col overflow-hidden rounded-xl',
    'text-sm text-card-foreground',
    // One variable drives all padding and gap inside the card.
    'gap-(--card-spacing) py-(--card-spacing)',
    // Flush image edges
    'has-[>img:first-child]:pt-0',
    '*:[img:first-child]:rounded-t-xl',
    '*:[img:last-child]:rounded-b-xl',
    // The footer carries its own bottom padding, so the root does not.
    'has-data-[slot=card-footer]:pb-0',
  ],
  {
    variants: {
      size: {
        sm: '[--card-spacing:--spacing(4)]',
        md: '[--card-spacing:--spacing(6)]',
      } satisfies Record<CardSize, string>,
      variant: {
        filled: 'bg-card ring-1 ring-border',
        outline: 'bg-transparent ring-1 ring-border',
      } satisfies Record<CardVariant, string>,
    },
    defaultVariants: { size: 'md', variant: 'filled' },
  },
)

const interactiveStyles = [
  'relative',
  'transition-colors duration-150 motion-reduce:transition-none',
  'has-[a:hover,button:hover]:bg-accent/40',
  'has-[a:focus-visible,button:focus-visible]:outline-2',
  'has-[a:focus-visible,button:focus-visible]:outline-offset-2',
  'has-[a:focus-visible,button:focus-visible]:outline-ring',
].join(' ')

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

export interface CardOwnProps {
  /**
   * Controls padding and gap inside the card.
   *
   * @default "md"
   */
  size?: CardSize

  /**
   * Surface treatment.
   *
   * - `filled` — painted with `bg-card`, the default surface
   * - `outline` — no fill; the page shows through
   *
   * Both use a ring rather than a border, so switching variants does not
   * shift the content by 1px.
   *
   * @default "filled"
   */
  variant?: CardVariant

  /**
   * Adds a hover and focus-within affordance. Use this when the card contains
   * a stretched link or a single primary button so the whole surface reads as
   * clickable.
   *
   * It does **not** make the card itself focusable — the interactive element
   * must still be an inner `<a>` or `<button>`.
   *
   * @default false
   */
  interactive?: boolean
}

export type CardBaseUiProps = useRender.ComponentProps<'div'>

export interface CardProps extends CardOwnProps, CardBaseUiProps {}

/**
 * A structural surface for grouping related content.
 *
 * Compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
 * `CardContent`, and `CardFooter`. Only the parts you need are required.
 *
 * The card's internal padding and gap are driven by a single CSS variable
 * (`--card-spacing`), set by `size`. Override it per card with an arbitrary
 * property class — `[--card-spacing:--spacing(2)]` — for edge-to-edge
 * content or a tighter list.
 *
 * Pass `interactive` when the card contains a stretched link: the whole
 * surface reacts to hover and focus, and the card reads as clickable.
 */
export function Card({
  size = 'md',
  variant = 'filled',
  interactive = false,
  className,
  render,
  ...props
}: CardProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      'data-slot': 'card',
      'data-size': size,
      'data-variant': variant,
      'data-interactive': interactive || undefined,
      'className': cn(cardStyles({ size, variant }), interactive && interactiveStyles, className),
      ...props,
    },
  })
}

/* -------------------------------------------------------------------------- */
/* CardHeader                                                                 */
/* -------------------------------------------------------------------------- */

export type CardHeaderProps = React.ComponentProps<'div'>

/**
 * Header row. Uses a grid so an optional `CardAction` lands in the top-end
 * corner without any manual layout on the consumer side.
 */
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min',
        'gap-1.5 items-start px-(--card-spacing)',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        'has-data-[slot=card-description]:grid-rows-[auto_auto]',
        '[.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* CardTitle                                                                  */
/* -------------------------------------------------------------------------- */

export type CardTitleProps = useRender.ComponentProps<'h3'>

/**
 * Card title. Renders as `<h3>` by default so screen readers see the card as
 * a titled section. Pass `render={<div />}` when the title is not actually a
 * heading (e.g. a numeric value in a stat card).
 */
export function CardTitle({ className, render, ...props }: CardTitleProps) {
  return useRender({
    defaultTagName: 'h3',
    render,
    props: {
      'data-slot': 'card-title',
      'className': cn(
        'font-semibold leading-snug text-base',
        'group-data-[size=sm]/card:text-sm',
        className,
      ),
      ...props,
    },
  })
}

/* -------------------------------------------------------------------------- */
/* CardDescription                                                            */
/* -------------------------------------------------------------------------- */

export type CardDescriptionProps = React.ComponentProps<'p'>

/** A short supporting line below the title. */
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* CardAction                                                                 */
/* -------------------------------------------------------------------------- */

export type CardActionProps = React.ComponentProps<'div'>

/**
 * Top-end corner slot for a single small control (icon button, badge…).
 * Auto-positioned by `CardHeader`'s grid — no manual placement needed.
 */
export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* CardContent                                                                */
/* -------------------------------------------------------------------------- */

export type CardContentProps = React.ComponentProps<'div'>

/** Main content region with horizontal padding matching the card spacing. */
export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />
  )
}

/* -------------------------------------------------------------------------- */
/* CardFooter                                                                 */
/* -------------------------------------------------------------------------- */

export type CardFooterProps = React.ComponentProps<'div'>

/**
 * Footer region. Separated from the content by a top border and a muted
 * background so actions sit on their own surface.
 */
export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'gap-2 flex items-center',
        'rounded-b-xl border-t border-border bg-muted/40',
        'p-(--card-spacing)',
        className,
      )}
      {...props}
    />
  )
}
