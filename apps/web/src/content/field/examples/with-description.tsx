import { Field, FieldDescription, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function WithDescription() {
  return (
    <div className="w-full max-w-md">
      <Field name="username">
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="username" dir="ltr" />
        <FieldDescription>
          Only letters and numbers. Must be at least 3 characters.
        </FieldDescription>
      </Field>
    </div>
  )
}
