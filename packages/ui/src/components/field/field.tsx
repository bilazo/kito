import { Field as BaseField } from '@base-ui/react/field'
import { cva } from 'class-variance-authority'
import { cn } from 'cn'
import { useMemo } from 'react'

import { labelStyles } from '../label/label'
import { Separator } from '../separator/separator'

import type { ReactNode } from 'react'

type FieldOrientation = 'vertical' | 'horizontal' | 'responsive'

/* -------------------------------------------------------------------------- */
/* Field (root)                                                               */
/* -------------------------------------------------------------------------- */

const fieldStyles = cva('group/field gap-2 flex w-full', {
  variants: {
    orientation: {
      // Label above the control. The default for text fields.
      vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
      // Label beside the control. Use for checkboxes, radios, switches —
      // the control is small enough that a full-width row is wasteful.
      horizontal: [
        'flex-row items-center',
        'has-[>[data-slot=field-content]]:items-start',
        '*:data-[slot=field-label]:flex-auto',
        'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
      // Column on narrow containers, row on wide ones. Switches at the
      // `md` container breakpoint of the enclosing `FieldGroup`.
      responsive: [
        'flex-col *:w-full [&>.sr-only]:w-auto',
        '@md/field-group:flex-row',
        '@md/field-group:items-center',
        '@md/field-group:*:w-auto',
        '@md/field-group:*:data-[slot=field-label]:flex-auto',
        '@md/field-group:has-[>[data-slot=field-content]]:items-start',
        '@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

export interface FieldOwnProps {
  /**
   * Layout of label and control.
   *
   * - `vertical` — label above the control (default; use for text fields)
   * - `horizontal` — label beside the control (use for checkboxes, radios,
   *   switches; the control is small enough that a full-width row is wasteful)
   * - `responsive` — column on narrow containers, row on wide ones; switches
   *   at the `md` container breakpoint of the enclosing `FieldGroup`
   *
   * @default "vertical"
   */
  orientation?: FieldOrientation
}

export type FieldBaseUiProps = Omit<BaseField.Root.Props, 'className'>

export interface FieldProps extends FieldOwnProps, FieldBaseUiProps {
  className?: string
}

/**
 * A single form field: label, control, description, and error, wired together
 * for accessibility by Base UI.
 *
 * `Field` provides `role="group"` and a shared context. Inner controls that
 * use Base UI's `Field.Control` (our `Input` and `Textarea`) auto-wire to the
 * label, description, and error — no manual `htmlFor`/`id` needed.
 *
 * When the field is invalid, `FieldError` becomes visible and the label
 * inherits the destructive color automatically. Set `invalid` on the field
 * and `aria-invalid` on the control; the two attributes serve different
 * audiences (visual + assistive tech) and should both be present.
 */
export function Field({ orientation = 'vertical', className, ...props }: FieldProps) {
  return (
    // role="group" is the ARIA-sanctioned role for a set of related UI
    // elements that form one logical unit. The jsx-a11y rule suggests
    // semantic HTML (fieldset, details, …), but those carry form or
    // disclosure semantics that do not apply here — a Field wraps any
    // control, including non-form ones.
    <BaseField.Root
      data-slot="field"
      data-orientation={orientation}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="group"
      className={cn(fieldStyles({ orientation }), 'data-invalid:text-destructive', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldSet + FieldLegend                                                     */
/* -------------------------------------------------------------------------- */

export type FieldSetProps = React.ComponentProps<'fieldset'>

/**
 * A `<fieldset>` for grouping related fields under a shared legend — radio
 * groups, checkbox groups, address blocks.
 *
 * Uses the native element rather than Base UI's `Fieldset` primitive: in the
 * current Base UI version, `Fieldset.Legend` renders a `<div>`, which breaks
 * the semantic `<fieldset>`/`<legend>` pairing that assistive technology
 * relies on.
 */
export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset data-slot="field-set" className={cn('gap-4 flex flex-col', className)} {...props} />
  )
}

export interface FieldLegendOwnProps {
  /**
   * Visual scale of the legend text.
   *
   * @default "legend"
   */
  variant?: 'legend' | 'label'
}

export type FieldLegendProps = FieldLegendOwnProps & React.ComponentProps<'legend'>

/** The title of a `FieldSet`. */
export function FieldLegend({ variant = 'legend', className, ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-1.5 font-medium',
        variant === 'legend' ? 'text-base' : 'text-sm',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldGroup                                                                 */
/* -------------------------------------------------------------------------- */

export type FieldGroupProps = React.ComponentProps<'div'>

/**
 * A vertical stack of fields. The container query used by
 * `orientation="responsive"` on `Field` targets this wrapper.
 */
export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group gap-4 @container/field-group flex w-full flex-col',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldContent                                                               */
/* -------------------------------------------------------------------------- */

export type FieldContentProps = React.ComponentProps<'div'>

/**
 * Wraps a label and its description so they form one unit inside a horizontal
 * or responsive field. Without it, the label and description would each take
 * their own row in the flex layout.
 */
export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn('group/field-content gap-0.5 leading-snug flex flex-1 flex-col', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldTitle                                                                 */
/* -------------------------------------------------------------------------- */

export type FieldTitleProps = React.ComponentProps<'div'>

/**
 * A title that is not a `<label>` — for a group of controls that share a
 * heading but are not labelled by it, like a radio group where each option
 * has its own label.
 */
export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      data-slot="field-title"
      className={cn(
        'gap-2 font-medium flex w-fit items-center text-sm',
        'group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldLabel                                                                 */
/* -------------------------------------------------------------------------- */

export type FieldLabelProps = Omit<BaseField.Label.Props, 'className'> & {
  className?: string
}

/**
 * The accessible label of the control. Uses Base UI's `Field.Label`, which
 * reads the control's `id` from the surrounding `Field` and wires `htmlFor`
 * automatically — do not set it manually.
 *
 * Shares styling with the standalone `Label` component, so a field label and
 * a checkbox-row label look identical. In an invalid field, the label
 * inherits the destructive color.
 */
export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={cn(labelStyles, 'group-data-invalid/field:text-destructive', className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldDescription                                                           */
/* -------------------------------------------------------------------------- */

export type FieldDescriptionProps = Omit<BaseField.Description.Props, 'className'> & {
  className?: string
}

/** A short line below the control that explains what to enter. */
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={cn(
        'text-sm text-muted-foreground',
        // Links inside a description inherit the primary color.
        '[&>a]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* FieldError                                                                 */
/* -------------------------------------------------------------------------- */

export interface FieldErrorOwnProps {
  /**
   * When integrating with a form library, pass the array of error objects
   * directly. Duplicate messages are collapsed; two or more unique messages
   * render as a bulleted list. Ignored when `children` is provided.
   *
   * If neither `children` nor `errors` is provided, `FieldError` renders
   * nothing — the consumer decides when to render it (typically by checking
   * the form's validation state).
   */
  errors?: ({ message?: string } | undefined)[]
}

export type FieldErrorBaseUiProps = React.ComponentProps<'div'>

export interface FieldErrorProps extends FieldErrorOwnProps, FieldErrorBaseUiProps {
  className?: string
  children?: ReactNode
}

/**
 * The error message of a field.
 *
 * Renders `null` when there is no content: neither `children` nor a non-empty
 * `errors` array. Otherwise renders a `<div role="alert">` so screen readers
 * announce the error when it appears.
 *
 * This component does **not** use Base UI's `Field.Error`: in the current
 * Base UI version, `Field.Error` does not render based on `Field.Root`'s
 * `invalid` prop, so we control visibility at the call site instead.
 */
export function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors?.length) return null

    const unique = [...new Map(errors.map((error) => [error?.message, error])).values()]

    if (unique.length === 1) return unique[0]?.message

    return (
      <ul className="ms-4 gap-1 flex list-disc flex-col">
        {/* oxlint-disable-next-line react/no-array-index-key */}
        {unique.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div
      data-slot="field-error"
      role="alert"
      className={cn('text-sm text-destructive', className)}
      {...props}
    >
      {content}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* FieldSeparator                                                             */
/* -------------------------------------------------------------------------- */

export interface FieldSeparatorProps extends React.ComponentProps<'div'> {
  /**
   * Optional content centered on the divider — "or", "or continue with".
   * Without it, a plain line is rendered.
   */
  children?: ReactNode
}

/**
 * A divider between two groups of fields, optionally labelled in the middle.
 */
export function FieldSeparator({ children, className, ...props }: FieldSeparatorProps) {
  return (
    <div
      data-slot="field-separator"
      data-has-content={children ? 'true' : undefined}
      className={cn('h-5 relative text-sm', className)}
      {...props}
    >
      <Separator className="inset-x-0 absolute top-1/2" />
      {children && (
        <span
          data-slot="field-separator-content"
          className="px-2 relative mx-auto block w-fit bg-background text-muted-foreground"
        >
          {children}
        </span>
      )}
    </div>
  )
}
