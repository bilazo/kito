import { Checkbox } from '@bilazo/kito/components/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@bilazo/kito/components/field'

export default function InField() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="f-news" />
        <FieldContent>
          <FieldLabel htmlFor="f-news">Product updates</FieldLabel>
          <FieldDescription>Occasional announcements about new features.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="f-security" />
        <FieldContent>
          <FieldLabel htmlFor="f-security">Security alerts</FieldLabel>
          <FieldDescription>Sign-in from new devices and password changes.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
