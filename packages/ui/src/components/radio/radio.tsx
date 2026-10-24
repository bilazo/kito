import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { createContext, useContext } from 'react'

type RadioSize = 'sm' | 'md'
type RadioOrientation = 'vertical' | 'horizontal'

/* -------------------------------------------------------------------------- */
/* Shared size context                                                        */
/* -------------------------------------------------------------------------- */

const RadioSizeContext = createContext<RadioSize>('md')

/* -------------------------------------------------------------------------- */
/* RadioGroup                                                                 */
/* -------------------------------------------------------------------------- */

const radioGroupStyles = cva('flex w-full', {
  variants: {
    orientation: {
      vertical: 'gap-2 flex-col',
      // More spacing horizontally so adjacent labels don't crowd.
      horizontal: 'gap-4 flex-row flex-wrap items-center',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

export interface RadioGroupOwnProps {
  /**
   * Layout of the radio options.
   *
   * @default "vertical"
   */
  orientation?: RadioOrientation

  /**
   * Size applied to every `Radio` inside the group, unless a `Radio`
   * overrides it individually.
   *
   * @default "md"
   */
  size?: RadioSize
}

export type RadioGroupBaseUiProps = Omit<BaseRadioGroup.Props, 'className'>

export interface RadioGroupProps extends RadioGroupOwnProps, RadioGroupBaseUiProps {
  className?: string
}

/**
 * A group of mutually-exclusive radio options.
 *
 * `RadioGroup` owns the shared value; each `Radio` inside it is one option.
 * Base UI handles arrow-key navigation, roving tabindex, and the shared
 * `name` for form submission — no manual wiring is needed.
 *
 * Always give the group an accessible name — either `aria-label` (short) or
 * `aria-labelledby` pointing at a visible heading. A group of radios without
 * a name is unlabeled for screen readers.
 */
export function RadioGroup({
  orientation = 'vertical',
  size = 'md',
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioSizeContext.Provider value={size}>
      <BaseRadioGroup
        data-slot="radio-group"
        data-orientation={orientation}
        data-size={size}
        className={cn(radioGroupStyles({ orientation }), className)}
        {...props}
      />
    </RadioSizeContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/* Radio                                                                      */
/* -------------------------------------------------------------------------- */

const radioStyles = cva(
  [
    'relative flex shrink-0 items-center justify-center',
    'rounded-full border border-input',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Extended click area to reach a 44×44 touch target (WCAG AAA).
    'after:-inset-3 after:absolute',
    // Focus: outline outside the circle, matching Button, Input, and Checkbox.
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    // Selected state: brand border. The dot is drawn by the Indicator.
    'data-checked:border-primary',
    // Disabled
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    // Invalid
    'data-invalid:border-destructive',
  ],
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
      } satisfies Record<RadioSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

const indicatorStyles = cva('rounded-full bg-primary', {
  variants: {
    size: {
      sm: 'size-2',
      md: 'size-2.5',
    } satisfies Record<RadioSize, string>,
  },
  defaultVariants: { size: 'md' },
})

/** Props defined by Kito. */
export interface RadioOwnProps {
  /**
   * Size of the radio circle. Inherits from the surrounding `RadioGroup`
   * when not set on the individual `Radio`.
   *
   * @default "md"
   */
  size?: RadioSize
}

/** Props provided by Base UI's Radio primitive. */
export type RadioBaseUiProps<Value = unknown> = Omit<BaseRadio.Root.Props<Value>, 'className'>

/** Public composed props. */
export interface RadioProps<Value = unknown> extends RadioOwnProps, RadioBaseUiProps<Value> {
  className?: string
}

/**
 * A single radio option. Must be inside a `RadioGroup` — Base UI enforces
 * this and throws otherwise.
 *
 * The accessible name comes from an adjacent `Label` linked by `htmlFor`/`id`,
 * or from the surrounding `Field` when used inside one.
 */
export function Radio<Value = unknown>({ size, className, ...props }: RadioProps<Value>) {
  const groupSize = useContext(RadioSizeContext)
  const resolvedSize = size ?? groupSize

  return (
    <BaseRadio.Root
      data-slot="radio"
      data-size={resolvedSize}
      className={cn(radioStyles({ size: resolvedSize }), className)}
      {...props}
    >
      <BaseRadio.Indicator
        data-slot="radio-indicator"
        className={indicatorStyles({ size: resolvedSize })}
      />
    </BaseRadio.Root>
  )
}
