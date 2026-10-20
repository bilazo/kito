import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@bilazo/kito/components/field'

export default function Responsive() {
  return (
    <FieldGroup className="w-full max-w-2xl">
      <p className="mb-2 text-xs text-muted-foreground">
        Resize the window to see the layout switch between column and row.
      </p>
      {['marketing', 'security', 'product'].map((id) => (
        <Field key={id} orientation="responsive">
          {/* TODO: replace with <Switch /> once Switch is available */}
          <input
            type="checkbox"
            id={`toggle-${id}`}
            className="rounded size-4 shrink-0 border-input"
          />
          <FieldContent>
            <FieldLabel htmlFor={`toggle-${id}`} className="capitalize">
              {id} emails
            </FieldLabel>
            <FieldDescription>Receive updates about {id} from your team.</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </FieldGroup>
  )
}
