import { Field, FieldLabel } from '@bilazo/kito/components/field'

export default function Horizontal() {
  return (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        {/* TODO: replace with <Checkbox /> once Checkbox is available */}
        <input type="checkbox" id="newsletter" className="rounded size-4 shrink-0 border-input" />
        <FieldLabel htmlFor="newsletter">Receive product updates and announcements</FieldLabel>
      </Field>
    </div>
  )
}
