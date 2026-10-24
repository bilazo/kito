import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@bilazo/kito/components/field'
import { Switch } from '@bilazo/kito/components/switch'

export default function InField() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field orientation="horizontal">
        <Switch id="f-updates" />
        <FieldContent>
          <FieldLabel htmlFor="f-updates">Product updates</FieldLabel>
          <FieldDescription>Occasional announcements about new features.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch id="f-security" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="f-security">Security alerts</FieldLabel>
          <FieldDescription>Sign-in from new devices and password changes.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
