import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function Basic() {
  return (
    <div className="w-full max-w-md">
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
    </div>
  )
}
