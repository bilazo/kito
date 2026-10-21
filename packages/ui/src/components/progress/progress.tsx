import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

type ProgressVariant = 'primary' | 'highlight'
type ProgressSize = 'sm' | 'md' | 'lg'

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const trackStyles = cva('relative w-full overflow-hidden rounded-full', {
  variants: {
    variant: {
      // Neutral track, brand fill — lesson and course progress.
      primary: 'bg-secondary',
      // The `highlight` scale is soft-only by design; the "strong" version is
      // achieved by inverting it: pale `highlight` as the track, its dark
      // text color as the fill.
      highlight: 'bg-highlight',
    } satisfies Record<ProgressVariant, string>,
    size: {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    } satisfies Record<ProgressSize, string>,
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

const indicatorStyles = cva(
  [
    'rounded-full',
    'ease-out transition-[width] duration-300 motion-reduce:transition-none',
    // Indeterminate: Base UI sets no width, so a fixed-size segment slides
    // along the track. `inset-inline-start` (not `left` / transform) keeps
    // the direction correct in RTL.
    'data-indeterminate:inset-y-0 data-indeterminate:absolute',
    'data-indeterminate:w-2/5 data-indeterminate:animate-progress-indeterminate',
    // Reduced motion: a static, semi-transparent bar at the start.
    'motion-reduce:data-indeterminate:inset-s-0 motion-reduce:data-indeterminate:w-full motion-reduce:data-indeterminate:animate-none motion-reduce:data-indeterminate:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        highlight: 'bg-highlight-foreground',
      } satisfies Record<ProgressVariant, string>,
    },
    defaultVariants: { variant: 'primary' },
  },
)

/* -------------------------------------------------------------------------- */
/* Progress (Root)                                                            */
/* -------------------------------------------------------------------------- */

export interface ProgressOwnProps {
  /**
   * Color pair for the track and the fill.
   *
   * - `primary` — neutral track, brand fill; use for lesson and course progress
   * - `highlight` — pale `highlight` track, dark fill; use for streaks and XP
   *
   * @default "primary"
   */
  variant?: ProgressVariant

  /**
   * Height of the track.
   *
   * @default "md"
   */
  size?: ProgressSize
}

export type ProgressBaseUiProps = Omit<BaseProgress.Root.Props, 'className'>

export interface ProgressProps extends ProgressOwnProps, ProgressBaseUiProps {
  className?: string
}

/**
 * A linear progress bar.
 *
 * Renders the track and indicator automatically. Pass children (typically a
 * label/value row) to place content above the bar — children must be inside
 * `Progress` so that `ProgressLabel` and `ProgressValue` can read its state.
 *
 * `value={null}` renders the indeterminate state: a segment slides along the
 * track for work of unknown length.
 *
 * Digits follow `locale` — pass `locale="fa-IR"` for ۵۷٪.
 * The bar fills from the reading start (right in RTL); no direction-specific
 * code is needed because Base UI sizes the indicator by width.
 */
export function Progress({ variant, size, className, children, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root
      data-slot="progress"
      className={cn('gap-2 flex w-full flex-col', className)}
      {...props}
    >
      {children}
      <ProgressTrack variant={variant} size={size}>
        <ProgressIndicator variant={variant} />
      </ProgressTrack>
    </BaseProgress.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* ProgressTrack                                                              */
/* -------------------------------------------------------------------------- */

export interface ProgressTrackOwnProps {
  /**
   * Color pair for the track and its indicator.
   *
   * @default "primary"
   */
  variant?: ProgressVariant

  /**
   * Height of the track.
   *
   * @default "md"
   */
  size?: ProgressSize
}

export type ProgressTrackBaseUiProps = Omit<BaseProgress.Track.Props, 'className'>

export interface ProgressTrackProps extends ProgressTrackOwnProps, ProgressTrackBaseUiProps {
  className?: string
}

/**
 * Track container for the indicator. Rendered automatically by `Progress`;
 * export is for advanced composition only.
 */
export function ProgressTrack({ variant, size, className, ...props }: ProgressTrackProps) {
  return (
    <BaseProgress.Track
      data-slot="progress-track"
      className={cn(trackStyles({ variant, size }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ProgressIndicator                                                          */
/* -------------------------------------------------------------------------- */

export interface ProgressIndicatorOwnProps {
  /**
   * Fill color. Should match the `variant` of the parent `ProgressTrack`.
   *
   * @default "primary"
   */
  variant?: ProgressVariant
}

export type ProgressIndicatorBaseUiProps = Omit<BaseProgress.Indicator.Props, 'className'>

export interface ProgressIndicatorProps
  extends ProgressIndicatorOwnProps, ProgressIndicatorBaseUiProps {
  className?: string
}

/**
 * Fill element. Rendered automatically by `Progress`; export is for advanced
 * composition only.
 */
export function ProgressIndicator({ variant, className, ...props }: ProgressIndicatorProps) {
  return (
    <BaseProgress.Indicator
      data-slot="progress-indicator"
      className={cn(indicatorStyles({ variant }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ProgressLabel                                                              */
/* -------------------------------------------------------------------------- */

export type ProgressLabelProps = Omit<BaseProgress.Label.Props, 'className'> & {
  className?: string
}

/**
 * Visible label for the progress bar. When present, it becomes the accessible
 * name of the `Progress` — no separate `aria-label` needed.
 */
export function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return (
    <BaseProgress.Label
      data-slot="progress-label"
      className={cn('font-medium text-sm', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ProgressValue                                                              */
/* -------------------------------------------------------------------------- */

export type ProgressValueProps = Omit<BaseProgress.Value.Props, 'className'> & {
  className?: string
}

/**
 * Numeric value rendered next to the label (e.g. `57%`). Formats according
 * to the parent `Progress`'s `locale`.
 */
export function ProgressValue({ className, ...props }: ProgressValueProps) {
  return (
    <BaseProgress.Value
      data-slot="progress-value"
      className={cn('text-sm text-muted-foreground tabular-nums', className)}
      {...props}
    />
  )
}
