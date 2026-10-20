import { Field, FieldError, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function ErrorsArray() {
  return (
    <div className="w-full max-w-md">
      <Field name="password" invalid>
        <FieldLabel>Password</FieldLabel>
        <Input type="password" defaultValue="123" />
        <FieldError
          errors={[
            { message: 'Password must be at least 8 characters' },
            { message: 'Password must include a number' },
          ]}
        />
      </Field>
    </div>
  )
}
