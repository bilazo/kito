import { Input as BaseInput } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { createContext, useContext } from 'react'

import { defaultDir } from '../../lib/dir'

import type { ComponentProps } from 'react'

type InputGroupSize = 'sm' | 'md' | 'lg'
type InputGroupAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

/* -------------------------------------------------------------------------- */
/* Group styles                                                               */
/* -------------------------------------------------------------------------- */

const groupStyles = cva(
  [
    'flex items-center rounded-lg border border-input bg-transparent',
    'transition-colors duration-150 motion-reduce:transition-none',
    // Focus: any inner control that is focused draws the group's ring.
    'focus-within:border-ring',
    'focus-within:outline-1 focus-within:outline-ring',
    // Invalid: reacts to either `data-invalid` (set by a future `Field`) or
    // `aria-invalid` on the input.
    'has-data-invalid:border-destructive',
    'has-data-invalid:focus-within:outline-destructive',
    'has-aria-invalid:border-destructive',
    'has-aria-invalid:focus-within:outline-destructive',
    // Disabled: any inner control that is disabled dims the whole group.
    'has-disabled:cursor-not-allowed has-disabled:opacity-50',
    // Auto-height and vertical layout for block-align addons.
    'has-data-[align=block-start]:h-auto has-data-[align=block-start]:flex-col',
    'has-data-[align=block-end]:h-auto has-data-[align=block-end]:flex-col',
  ],
  {
    variants: {
      size: {
        sm: 'h-(--control-sm)',
        md: 'h-(--control-md)',
        lg: 'h-(--control-lg)',
      } satisfies Record<InputGroupSize, string>,
    },
    defaultVariants: { size: 'md' },
  },
)

const InputGroupContext = createContext<InputGroupSize>('md')

/* -------------------------------------------------------------------------- */
/* InputGroup (root)                                                          */
/* -------------------------------------------------------------------------- */

export interface InputGroupOwnProps {
  /**
   * Controls the group height, and is shared with the inner input and addons
   * so text sizing stays consistent.
   *
   * @default "md"
   */
  size?: InputGroupSize
}

export type InputGroupHTMLProps = Omit<ComponentProps<'div'>, 'className'>

export interface InputGroupProps extends InputGroupOwnProps, InputGroupHTMLProps {
  className?: string
}

/**
 * A single visually-merged control: an input plus icon, text, or button
 * slots. Use it for search boxes, prefixed URLs, currency fields, password
 * inputs with a show/hide toggle, and any other "input with something inside
 * the frame" case.
 *
 * **Order in JSX is order on screen**, so RTL works without an extra prop:
 * the first child sits at the reading start.
 *
 * For a clickable slot (clear, copy, show/hide password), skip the addon and
 * put a `Button` (`variant="ghost"` `size="icon-sm"`) directly inside the
 * group.
 */
export function InputGroup({ size = 'md', className, ...props }: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={size}>
      <div
        data-slot="input-group"
        data-size={size}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- role="group" is the standard a11y pattern for an input-with-addons composite; a <fieldset> would require a <legend>
        role="group"
        className={cn(groupStyles({ size }), className)}
        {...props}
      />
    </InputGroupContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/* InputGroupAddon                                                            */
/* -------------------------------------------------------------------------- */

export interface InputGroupAddonOwnProps {
  /**
   * Where the addon sits inside the group.
   *
   * - `inline-start` / `inline-end` — in the flex row, at the reading start
   *   or end. Height matches the group.
   * - `block-start` / `block-end` — above or below the input, in a column
   *   layout. Use for a labelled slot like "Subject:" above a textarea.
   *
   * @default "inline-start"
   */
  align?: InputGroupAlign
}

export type InputGroupAddonHTMLProps = Omit<ComponentProps<'div'>, 'className'>

export interface InputGroupAddonProps extends InputGroupAddonOwnProps, InputGroupAddonHTMLProps {
  className?: string
}

/**
 * A non-interactive slot for an icon, a symbol, or short text — `Search`,
 * `@`, `https://`, `USD`. Clicks fall through to focus the input.
 *
 * For clickable content, put a `Button` directly in the group instead.
 */
export function InputGroupAddon({
  align = 'inline-start',
  className,
  onClick,
  ...props
}: InputGroupAddonProps) {
  const size = useContext(InputGroupContext)

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events jsx-a11y/no-static-element-interactions -- the addon is not a control; its onClick is a focus fallback that forwards focus to the input
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        'gap-1.5 flex items-center text-muted-foreground select-none',
        size === 'lg' ? 'text-base' : 'text-sm',
        // Padding depends on which side of the input the addon sits on.
        align === 'inline-start' && 'ps-3 pe-2',
        align === 'inline-end' && 'ps-2 pe-3',
        (align === 'block-start' || align === 'block-end') && 'px-3 py-1.5 w-full justify-start',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        // If the click did not land on a real interactive element, forward
        // focus to the input so the whole strip behaves like one control.
        if ((event.target as HTMLElement).closest('button, select, a, input')) {
          return
        }
        event.currentTarget.parentElement
          ?.querySelector<HTMLInputElement>('[data-slot="input-group-input"]')
          ?.focus()
      }}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* InputGroupInput                                                            */
/* -------------------------------------------------------------------------- */

export type InputGroupInputBaseUiProps = Omit<BaseInput.Props, 'className' | 'size'>

export interface InputGroupInputProps extends InputGroupInputBaseUiProps {
  className?: string
}

/**
 * The bare input inside an `InputGroup`. It carries no border, background, or
 * focus ring of its own — the group provides all of that.
 *
 * Text direction defaults from `type` (see `defaultDir`). Pass an explicit
 * `dir` to override.
 */
export function InputGroupInput({ className, type, dir, ...props }: InputGroupInputProps) {
  const size = useContext(InputGroupContext)

  return (
    <BaseInput
      data-slot="input-group-input"
      {...props}
      type={type}
      dir={dir ?? defaultDir(type)}
      className={cn(
        'min-w-0 flex-1 bg-transparent text-foreground',
        'outline-0 placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed',
        // Input padding mirrors the standalone Input so the visual
        // rhythm is consistent whether or not an addon sits beside it.
        'ps-3 pe-3',
        size === 'lg' ? 'text-base' : 'text-sm pointer-coarse:text-base',
        className,
      )}
    />
  )
}
