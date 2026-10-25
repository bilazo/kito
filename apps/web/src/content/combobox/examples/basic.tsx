import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ar', label: 'Arabic' },
  { value: 'tr', label: 'Turkish' },
  { value: 'es', label: 'Spanish' },
]

export default function Basic() {
  return (
    <div className="w-full max-w-xs">
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
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
        </ComboboxPopup>
      </Combobox>
    </div>
  )
}
