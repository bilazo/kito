import { Field, FieldError, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function WithError() {
  return (
    <div className="w-full max-w-md">
      <Field name="email" invalid>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" defaultValue="not-an-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  )
}
