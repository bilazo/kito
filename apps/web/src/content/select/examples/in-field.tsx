import { Field, FieldLabel } from '@bilazo/kito/components/field'
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

export default function InField() {
  return (
    <div className="w-full max-w-xs">
      <Field name="language">
        <FieldLabel>Language</FieldLabel>
        <Select items={LANGUAGES} defaultValue="en">
          <SelectTrigger>
            <SelectValue placeholder="Choose a language" />
          </SelectTrigger>
          <SelectPopup>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </Field>
    </div>
  )
}
