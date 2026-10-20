import { Field, FieldDescription, FieldGroup, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function FieldGroupExample() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field name="firstName">
        <FieldLabel>First name</FieldLabel>
        <Input placeholder="First name" />
      </Field>
      <Field name="lastName">
        <FieldLabel>Last name</FieldLabel>
        <Input placeholder="Last name" />
      </Field>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
