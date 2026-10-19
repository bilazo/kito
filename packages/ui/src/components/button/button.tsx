import { Button as BaseButton } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import type * as React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive' | 'link'

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'

const buttonStyles = cva(
  [
    'gap-2 relative inline-flex shrink-0 items-center justify-center',
    'font-medium touch-manipulation rounded-lg whitespace-nowrap select-none',
    'transition-colors duration-150 motion-reduce:transition-none',
    'outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active',
        soft: 'bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft-hover',
        outline:
          'border border-input bg-transparent text-foreground hover:bg-accent active:bg-accent-active',
        ghost: 'text-foreground hover:bg-accent active:bg-accent-active',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active',
        link: 'text-primary underline-offset-4 hover:underline',
      } satisfies Record<ButtonVariant, string>,
      size: {
        'sm': 'px-3 h-(--control-sm) text-sm',
        'md': 'px-4 h-(--control-md) text-sm',
        'lg': "px-6 [&_svg:not([class*='size-'])]:size-5 h-(--control-lg) text-base",
        'icon-sm': 'size-(--control-sm)',
        'icon': 'size-(--control-md)',
        'icon-lg': "[&_svg:not([class*='size-'])]:size-5 size-(--control-lg)",
      } satisfies Record<ButtonSize, string>,
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      // A link-button sits in running text: no fixed height, no horizontal padding
      { variant: 'link', className: 'px-0 h-auto w-auto' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

/**
 * Class name helper for elements that should look like a Button but are not
 * rendered by it — a router link, a styled `<label>`, a third-party component.
 */
export function buttonVariants(props?: Parameters<typeof buttonStyles>[0]) {
  return cn(buttonStyles(props))
}

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface ButtonOwnProps {
  /**
   * Visual style of the button.
   *
   * - `primary` — the main action of a screen (one per view)
   * - `secondary` — a neutral filled companion to a primary action
   * - `soft` — brand-tinted, low emphasis
   * - `outline` — bordered transparent
   * - `ghost` — no chrome; toolbars, table rows, icon buttons
   * - `destructive` — irreversible actions
   * - `link` — inline text action
   *
   * @default "primary"
   */
  variant?: ButtonVariant

  /**
   * Controls the button height and padding.
   *
   * - `sm`, `md`, `lg` — text buttons with increasing height
   * - `icon-sm`, `icon`, `icon-lg` — square buttons sized for a single icon
   *
   * @default "md"
   */
  size?: ButtonSize

  /**
   * When `true`, the button spans the full width of its parent.
   *
   * @default false
   */
  fullWidth?: boolean

  /**
   * When `true`, the button is disabled, shows a spinner in place of its label
   * (keeping the width stable), and announces its busy state to assistive
   * technology via `aria-busy`.
   *
   * While loading, the button stays focusable so keyboard and screen-reader
   * users are not dropped from the tab order.
   *
   * @default false
   */
  loading?: boolean
}

/** Props inherited from Base UI's Button primitive. */
export type ButtonBaseUiProps = Omit<BaseButton.Props, 'className'>

/** Public composed props. */
export interface ButtonProps extends ButtonOwnProps, ButtonBaseUiProps {
  className?: string
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A pressable action element. Renders `<button>` by default.
 *
 * For links, apply `buttonVariants()` to your router `<Link>`
 */
export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  disabled,
  focusableWhenDisabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <BaseButton
      data-slot="button"
      data-loading={loading || undefined}
      disabled={isDisabled}
      focusableWhenDisabled={focusableWhenDisabled ?? loading}
      aria-busy={loading || undefined}
      className={cn(
        buttonStyles({ variant, size, fullWidth }),
        loading && 'data-disabled:opacity-100',
        className,
      )}
      {...props}
    >
      <ButtonContent loading={loading}>{children}</ButtonContent>
    </BaseButton>
  )
}

/* -------------------------------------------------------------------------- */
/* Internal                                                                   */
/* -------------------------------------------------------------------------- */

function ButtonContent({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <>
      {/* opacity (not visibility) so the label stays in the accessibility tree while loading */}
      <span className={cn('gap-2 inline-flex items-center', loading && 'opacity-0')}>
        {children}
      </span>
      {loading && (
        <span aria-hidden className="inset-0 absolute flex items-center justify-center">
          <Spinner />
        </span>
      )}
    </>
  )
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin motion-reduce:[animation-duration:2s]"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
