import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function SeparatorExample() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field name="phone">
        <FieldLabel>Phone</FieldLabel>
        <Input type="tel" placeholder="+1 555 000 0000" />
      </Field>
    </FieldGroup>
  )
}
