import { Slider as BaseSlider } from '@base-ui/react/slider'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

type SliderSize = 'sm' | 'md' | 'lg'

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const controlStyles = cva(
  [
    'relative flex touch-none select-none',
    'data-disabled:opacity-50',
    // Horizontal: full-width row with vertical padding around the track so
    // the thumb (which is taller than the track) is not clipped.
    'data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-center',
    // Vertical: full-height column; the parent must set the height.
    'data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-5 data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center',
  ],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const trackStyles = cva(
  [
    'relative grow overflow-hidden rounded-full bg-muted select-none',
    // Horizontal track is a wide, thin bar.
    'data-[orientation=horizontal]:h-(--slider-track-h) data-[orientation=horizontal]:w-full',
    // Vertical track is a tall, thin bar.
    'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--slider-track-h)',
  ],
  {
    variants: {
      size: {
        sm: '[--slider-track-h:0.25rem]',
        md: '[--slider-track-h:0.375rem]',
        lg: '[--slider-track-h:0.5rem]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const indicatorStyles = cva(
  [
    'bg-primary select-none',
    // Horizontal indicator fills along the track's length.
    'data-[orientation=horizontal]:h-full',
    // Vertical indicator fills up the track from the bottom.
    'data-[orientation=vertical]:w-full',
  ],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const thumbStyles = cva(
  [
    'relative block shrink-0 rounded-full',
    'border border-input bg-background',
    'transition-shadow duration-150 motion-reduce:transition-none',

    // Focus: matches Button and Input.
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',

    // Hover / drag / focus all show a subtle ring so the interactive state
    // is obvious without changing the thumb's position.
    'hover:ring-3 hover:ring-ring/30',
    'focus-visible:ring-3 focus-visible:ring-ring/30',
    'active:ring-3 active:ring-ring/30',

    // Disabled
    'data-disabled:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/* -------------------------------------------------------------------------- */
/* Slider (root + control + track + indicator + thumbs)                       */
/* -------------------------------------------------------------------------- */

export interface SliderOwnProps {
  /**
   * Visual size of the track and thumb.
   *
   * - `sm` — 4px track, 12px thumb
   * - `md` — 6px track, 16px thumb (default)
   * - `lg` — 8px track, 20px thumb
   *
   * @default "md"
   */
  size?: SliderSize

  /**
   * The current value (controlled). Pass a number for a single-thumb slider,
   * or an array for a range / multi-thumb slider.
   */
  value?: number | readonly number[]

  /**
   * The initial value (uncontrolled). Same shape as `value`.
   */
  defaultValue?: number | readonly number[]

  /**
   * Minimum value.
   *
   * @default 0
   */
  min?: number

  /**
   * Maximum value.
   *
   * @default 100
   */
  max?: number
}

export type SliderBaseUiProps = Omit<
  BaseSlider.Root.Props,
  'value' | 'defaultValue' | 'min' | 'max'
>

export interface SliderProps extends SliderOwnProps, SliderBaseUiProps {
  className?: string
}

/**
 * A control for selecting a value from a range.
 *
 * The number of thumbs is derived from `value` / `defaultValue`:
 *
 * Horizontal by default. Set `orientation="vertical"` and give the wrapper
 * a height for a vertical slider.
 *
 * Keyboard navigation follows WAI-ARIA: arrows move by `step`, Home/End
 * jump to the ends, PageUp/PageDown move by a larger amount.
 */
export function Slider({
  size = 'md',
  value,
  defaultValue,
  min = 0,
  max = 100,
  className,
  ...props
}: SliderProps) {
  const thumbCount = Array.isArray(value)
    ? value.length
    : Array.isArray(defaultValue)
      ? defaultValue.length
      : 1

  return (
    <BaseSlider.Root
      data-slot="slider"
      data-size={size}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn(
        'data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-full',
        className,
      )}
      {...props}
    >
      <BaseSlider.Control className={controlStyles({ size })}>
        <BaseSlider.Track data-slot="slider-track" className={trackStyles({ size })}>
          <BaseSlider.Indicator
            data-slot="slider-indicator"
            className={indicatorStyles({ size })}
          />
        </BaseSlider.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <BaseSlider.Thumb
            key={index}
            data-slot="slider-thumb"
            className={thumbStyles({ size })}
          />
        ))}
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* SliderValue                                                                */
/* -------------------------------------------------------------------------- */

export type SliderValueProps = Omit<BaseSlider.Value.Props, 'className'> & {
  className?: string
}

/**
 * Displays the slider's current value — useful for showing the exact number
 * next to the track.
 */
export function SliderValue({ className, ...props }: SliderValueProps) {
  return (
    <BaseSlider.Value
      data-slot="slider-value"
      className={cn('text-sm text-muted-foreground tabular-nums', className)}
      {...props}
    />
  )
}
