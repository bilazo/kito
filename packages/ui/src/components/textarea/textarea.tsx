import { Field as BaseField } from '@base-ui/react/field'
import { cn } from 'cn'

import { defaultDir } from '../../lib/dir'
import { inputStyles } from '../input/input'

import type * as React from 'react'

type TextareaSize = 'sm' | 'md' | 'lg'

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

/** Props defined by Kito. */
export interface TextareaOwnProps {
  /**
   * Controls padding and text size. Unlike `Input`, `size` does not set the
   * height — a textarea is multi-line. It controls the minimum height and
   * side padding.
   *
   * @default "md"
   */
  size?: TextareaSize

  /**
   * When `true`, the textarea grows with its content using CSS
   * `field-sizing: content`. Browsers without support fall back to a fixed
   * height (`rows` still applies).
   *
   * Manual resizing is disabled in this mode — the field is always exactly as
   * tall as its content, up to a 20rem cap.
   *
   * @default false
   */
  autoResize?: boolean
}

/** Props provided by Base UI's Field.Control. */
export type TextareaBaseUiProps = Pick<BaseField.Control.Props, 'onValueChange'>

/** Props forwarded to the underlying `<textarea>` element. */
export type TextareaHTMLProps = Omit<React.ComponentProps<'textarea'>, 'className' | 'size'>

/** Public composed props. */
export interface TextareaProps extends TextareaOwnProps, TextareaBaseUiProps, TextareaHTMLProps {
  className?: string
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A multi-line text input.
 *
 * Built on Base UI's `Field.Control` rendered as a `<textarea>`. When placed
 * inside a `<Field>`, the label, description, error, and
 * disabled states are wired up automatically — no extra props needed.
 *
 * Text direction defaults to `auto`: the browser picks from the content, so
 * Persian stays RTL and Latin stays to LTR. Pass `dir` to override.
 */
export function Textarea({
  size = 'md',
  autoResize = false,
  className,
  rows = 3,
  dir,
  ...props
}: TextareaProps) {
  return (
    <BaseField.Control
      // Field.Control is typed for `<input>`; we swap the underlying element
      // via `render`, and the props forwarded here are the textarea
      // equivalents (`placeholder`, `disabled`, `readOnly`, `value`, …).
      {...(props as unknown as BaseField.Control.Props)}
      render={<textarea rows={rows} />}
      data-slot="textarea"
      data-size={size}
      data-autoresize={autoResize || undefined}
      dir={dir ?? defaultDir()}
      className={cn(
        inputStyles({ size }),
        // The control height tokens apply to single-line inputs; a textarea
        // is multi-line, so we opt out and set an explicit minimum instead.
        'py-2 h-auto',
        size === 'sm' && 'min-h-16',
        size === 'md' && 'min-h-20',
        size === 'lg' && 'min-h-24',
        // Manual resize by default; content-driven when autoResize is on.
        autoResize ? 'max-h-80 field-sizing-content resize-none' : 'resize-y',
        className,
      )}
    />
  )
}
