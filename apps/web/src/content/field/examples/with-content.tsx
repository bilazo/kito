import { Field, FieldContent, FieldDescription, FieldLabel } from '@bilazo/kito/components/field'

export default function WithContent() {
  return (
    <div className="w-full max-w-md">
      <Field orientation="horizontal">
        {/* TODO: replace with <Switch /> once Switch is available */}
        <input
          type="checkbox"
          id="notifications"
          className="rounded size-4 shrink-0 border-input"
        />
        <FieldContent>
          <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
          <FieldDescription>Get emails about activity you missed.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  )
}
