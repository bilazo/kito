import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'
import { Field, FieldLabel } from '@bilazo/kito/components/field'

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
        <Combobox items={LANGUAGES}>
          <ComboboxInput placeholder="Search languages…" />
          <ComboboxPopup>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </Field>
    </div>
  )
}
