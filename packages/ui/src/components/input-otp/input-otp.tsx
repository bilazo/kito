import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type InputOTPSize = 'sm' | 'md' | 'lg'

/* -------------------------------------------------------------------------- */
/* Slot styles                                                                */
/* -------------------------------------------------------------------------- */

const slotStyles = cva(
  [
    'min-w-0 rounded-lg border border-input bg-transparent',
    'font-medium text-center text-foreground',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Focus matches Input / Button / Checkbox.
    'outline-0 focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring',
    // Invalid — both `data-invalid` (from Field.Root) and `aria-invalid`
    // (standalone) selectors, so either path applies the destructive border.
    'data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
    'aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive',
    // Disabled
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'size-8 text-sm',
        md: 'size-(--control-md) text-sm',
        lg: 'size-12 text-base',
      } satisfies Record<InputOTPSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

/* -------------------------------------------------------------------------- */
/* InputOTP (root)                                                            */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface InputOTPOwnProps {
  /**
   * Total number of slot characters. **Required** — Base UI needs it to
   * clamp the value, detect completion, and generate consistent markup
   * before all slots hydrate.
   */
  length: number

  /**
   * Size of the auto-rendered slots. Only applies when `children` is not
   * provided. If you compose slots manually, pass `size` to each
   * `InputOTPSlot` instead.
   *
   * @default "md"
   */
  size?: InputOTPSize

  /**
   * Custom layout. When omitted, `InputOTP` auto-renders `length` slots in
   * a single row. When provided, you are responsible for the slot count —
   * the total number of `InputOTPSlot` children must equal `length`.
   */
  children?: React.ReactNode
}

/** Props provided by Base UI's `OTPField.Root`. */
export type InputOTPBaseUiProps = Omit<BaseOTPField.Root.Props, 'className' | 'length' | 'children'>

/** Public composed props. */
export interface InputOTPProps extends InputOTPOwnProps, InputOTPBaseUiProps {
  className?: string
}

/**
 * A one-time-password input composed of individual character slots.
 *
 * Each slot is a real `<input>` — focus moves between them natively, the
 * caret is the browser's native cursor, and paste/autofill across slots is
 * handled by Base UI. Give the root a `length` and either let it auto-render
 * the slots (`<InputOTP length={6} />`) or compose them manually with
 * `InputOTPGroup` / `InputOTPSlot` / `InputOTPSeparator`.
 *
 * ```tsx
 * <InputOTP length={6} defaultValue="123456" />
 *
 * // or, with grouped layout:
 * <InputOTP length={6}>
 *   <InputOTPGroup count={3} />
 *   <InputOTPSeparator />
 *   <InputOTPGroup count={3} />
 * </InputOTP>
 * ```
 *
 * **Accessible name** — wrap the root in a `Field` with a label, or pass an
 * `id` + an adjacent `<label htmlFor>`. The first slot inherits the field's
 * label; auto-rendered slots add `aria-label="Character N of L"` so screen
 * readers can announce the focused position. If you compose slots manually,
 * add `aria-label` to each slot yourself.
 */
export function InputOTP({ length, size, className, children, ...props }: InputOTPProps) {
  const autoSlots = Array.from({ length }, (_, index) => (
    <InputOTPSlot
      key={index}
      size={size}
      // First slot inherits the field's label via the root's `id`; subsequent
      // slots announce their position. This mirrors Base UI's own
      // recommendation for labeling OTP fields.
      aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
    />
  ))

  return (
    <BaseOTPField.Root
      data-slot="input-otp"
      length={length}
      className={cn('gap-2 flex items-center', 'data-disabled:opacity-50', className)}
      {...props}
    >
      {children ?? autoSlots}
    </BaseOTPField.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* InputOTPGroup                                                              */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface InputOTPGroupOwnProps {
  /**
   * Auto-render this many slots inside the group. Only applies when
   * `children` is not provided. The sum of `count` across all groups must
   * equal the root’s `length`.
   */
  count?: number

  /**
   * Size of the auto-rendered slots. Only applies when `count` is used.
   *
   * @default "md"
   */
  size?: InputOTPSize

  children?: React.ReactNode
}

/** Props forwarded to the underlying `<div>`. */
export type InputOTPGroupHTMLProps = Omit<React.ComponentProps<'div'>, 'className' | 'children'>

/** Public composed props. */
export interface InputOTPGroupProps extends InputOTPGroupOwnProps, InputOTPGroupHTMLProps {
  className?: string
}

/**
 * Groups a set of adjacent slots into a visually continuous block. Use
 * `InputOTPSeparator` between groups for the `123-456` presentation.
 *
 * Pass `count` to auto-render the slots, or provide `InputOTPSlot` children
 * explicitly for full control.
 */
export function InputOTPGroup({ count, size, className, children, ...props }: InputOTPGroupProps) {
  const autoSlots = count
    ? Array.from({ length: count }, (_, index) => <InputOTPSlot key={index} size={size} />)
    : null

  return (
    <div
      data-slot="input-otp-group"
      className={cn('gap-2 flex items-center', className)}
      {...props}
    >
      {children ?? autoSlots}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* InputOTPSlot                                                               */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface InputOTPSlotOwnProps {
  /**
   * Height and text size of the slot.
   *
   * - `sm` — 32px square, 14px text
   * - `md` — matches `--control-md` (40px), 14px text
   * - `lg` — 48px square, 16px text
   *
   * @default "md"
   */
  size?: InputOTPSize
}

/** Props provided by Base UI's `OTPField.Input`. */
export type InputOTPSlotBaseUiProps = Omit<BaseOTPField.Input.Props, 'className' | 'size'>

/** Public composed props. */
export interface InputOTPSlotProps extends InputOTPSlotOwnProps, InputOTPSlotBaseUiProps {
  className?: string
}

/**
 * One slot — a real `<input>` that displays one character of the OTP.
 *
 * Base UI auto-indexes slots by their order in the DOM. Do not pass an
 * `index` prop; the position is implicit. Every index from `0` to
 * `length - 1` must be covered by exactly one slot.
 *
 * Pass `aria-invalid` on **each slot** for the error state — it does not
 * cascade from the root or group. Inside a `<Field.Root invalid>`, Base UI
 * sets `data-invalid` automatically; standalone, use `aria-invalid`.
 */
export function InputOTPSlot({ size, className, ...props }: InputOTPSlotProps) {
  return (
    <BaseOTPField.Input
      data-slot="input-otp-slot"
      className={cn(slotStyles({ size }), className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* InputOTPSeparator                                                          */
/* -------------------------------------------------------------------------- */

/** Props provided by Base UI's `OTPField.Separator`. */
export type InputOTPSeparatorBaseUiProps = Omit<BaseOTPField.Separator.Props, 'className'>

/** Public composed props. */
export interface InputOTPSeparatorProps extends InputOTPSeparatorBaseUiProps {
  className?: string
}

/**
 * A decorative dash between two `InputOTPGroup`s — visual grouping only.
 *
 * Hidden from assistive technology (`aria-hidden`): the OTP is a group of
 * inputs where each slot already carries its own position label, so a
 * visual dash between chunks does not add semantic meaning. Override with
 * `aria-hidden={false}` if your context benefits from announcing it.
 */
export function InputOTPSeparator({ className, ...props }: InputOTPSeparatorProps) {
  return (
    <BaseOTPField.Separator
      data-slot="input-otp-separator"
      aria-hidden
      className={cn(
        'flex items-center text-muted-foreground',
        '[&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none',
        className,
      )}
      {...props}
    >
      <MinusIcon />
    </BaseOTPField.Separator>
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  )
}

export type { InputOTPSize }
