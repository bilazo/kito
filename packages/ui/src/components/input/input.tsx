import { Field as BaseField } from '@base-ui/react/field'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'

import { defaultDir } from '../../lib/dir'

type InputSize = 'sm' | 'md' | 'lg'

/**
 * Shared control styles.
 *
 * Imported by `Textarea` (and later `Select`/`Combobox` triggers) so every
 * text-entry control has the same border, focus, and invalid look.
 */
const inputStyles = cva(
  [
    'min-w-0 block w-full rounded-lg border border-input bg-transparent',
    'text-foreground placeholder:text-muted-foreground',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Focus: brand border + a 1px outline = a 2px flat ring, matching Button.
    // NOTE: use `outline-0`, not `outline-none` — in Tailwind v4
    // `outline-none` also zeroes `--tw-outline-style`, silently disabling
    // every later `outline-*` width utility.
    'outline-0 focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring',
    // Invalid: Base UI sets `data-invalid` inside `<Field invalid>`;
    // `aria-invalid` covers standalone use.
    'data-invalid:border-destructive',
    'data-invalid:focus-visible:border-destructive',
    'data-invalid:focus-visible:outline-destructive',
    'aria-invalid:border-destructive',
    'aria-invalid:focus-visible:border-destructive',
    'aria-invalid:focus-visible:outline-destructive',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Suppress WebKit's native search field chrome — it fights with any
    // custom clear affordance and does not match our design.
    '[&::-webkit-search-cancel-button]:appearance-none',
    '[&::-webkit-search-decoration]:appearance-none',
  ],
  {
    variants: {
      size: {
        // Heights come from the same `--control-*` tokens as Button, so an
        // input and a button placed side-by-side line up.
        //
        // Font is `text-base` (16px) on touch devices: iOS Safari zooms the
        // page on focus when the font is smaller than 16px.
        sm: 'px-3 h-(--control-sm) text-sm pointer-coarse:text-base',
        md: 'px-3 h-(--control-md) text-sm pointer-coarse:text-base',
        lg: 'px-4 h-(--control-lg) text-base',
      } satisfies Record<InputSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface InputOwnProps {
  /**
   * Controls the input height. Heights come from the same `--control-*`
   * tokens as `Button`, so an input and a button placed side-by-side line up.
   *
   * @default "md"
   */
  size?: InputSize
}

export type InputBaseUiProps = Omit<BaseField.Control.Props, 'className' | 'render' | 'size'>

export interface InputProps extends InputOwnProps, InputBaseUiProps {
  className?: string
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A single-line text input.
 *
 * The text direction is chosen automatically from `type`: email, url, tel,
 * password, and number inputs render LTR even inside an RTL page; everything
 * else follows `dir="auto"` (the browser picks from the content). Pass an
 * explicit `dir` to override.
 *
 * Pair with `Label` for a labelled field:
 *
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * ```
 */
export function Input({ size = 'md', className, type, dir, ...props }: InputProps) {
  return (
    <BaseField.Control
      {...(props as unknown as BaseField.Control.Props)}
      render={<input type={type} />}
      data-slot="input"
      data-size={size}
      dir={dir ?? defaultDir(type)}
      className={cn(inputStyles({ size }), className)}
    />
  )
}

export { inputStyles }

export { defaultDir } from '../../lib/dir'
