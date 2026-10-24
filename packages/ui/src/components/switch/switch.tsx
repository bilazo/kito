import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

type SwitchSize = 'sm' | 'md'

const switchStyles = cva(
  [
    'group/switch relative inline-flex shrink-0 items-center',
    'rounded-full border border-transparent',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Extended click area.
    'after:-inset-2 after:absolute',
    // Focus: outline outside the track, matching Button and Checkbox.
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    // State colors
    'data-checked:bg-primary data-unchecked:bg-input',
    // Disabled
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    // Invalid
    'data-invalid:outline-2 data-invalid:outline-destructive',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
      } satisfies Record<SwitchSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

const thumbStyles = cva(
  [
    'inset-s-0.5 pointer-events-none absolute top-1/2 -translate-y-1/2',
    'rounded-full bg-card',
    // `inset-inline-start` (not `translate-x`) is a logical property, so the
    // thumb flips with the direction automatically — RTL works with no extra
    // classes. The transition still animates the swap because the values are
    // resolvable lengths.
    'transition-[inset-inline-start] duration-150 motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        // Track 36px − thumb 16px − inset 2px = 18px on the opposite side.
        sm: 'size-4 data-checked:inset-s-[calc(100%-1.125rem)]',
        // Track 44px − thumb 20px − inset 2px = 22px on the opposite side.
        md: 'size-5 data-checked:inset-s-[calc(100%-1.375rem)]',
      } satisfies Record<SwitchSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface SwitchOwnProps {
  /**
   * Size of the track and thumb.
   *
   * - `sm` — 36 × 20 px, for dense tables and compact rows
   * - `md` — 44 × 24 px, the default
   *
   * @default "md"
   */
  size?: SwitchSize
}

/** Props provided by Base UI's Switch primitive. */
export type SwitchBaseUiProps = Omit<BaseSwitch.Root.Props, 'className'>

/** Public composed props. */
export interface SwitchProps extends SwitchOwnProps, SwitchBaseUiProps {
  className?: string
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A binary on/off toggle.
 *
 * Use a switch for a setting that takes effect immediately (notifications,
 * dark mode). For a choice the user confirms with a Save button, use
 * `Checkbox` — a switch implies "already applied".
 *
 * Inside a `<Field>`, skip `Label`/`htmlFor` — the field wires the label
 * automatically.
 *
 * Pass any children to replace the default thumb.
 */
export function Switch({ size = 'md', className, children, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      data-size={size}
      className={cn(switchStyles({ size }), className)}
      {...props}
    >
      <BaseSwitch.Thumb data-slot="switch-thumb" className={thumbStyles({ size })}>
        {children}
      </BaseSwitch.Thumb>
    </BaseSwitch.Root>
  )
}
