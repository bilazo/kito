import {
  Combobox,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
} from '@bilazo/kito/components/combobox'

const ITEMS = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'fa', label: 'Persian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'tr', label: 'Turkish' },
]

export default function Grouped() {
  return (
    <div className="w-full max-w-xs">
      <Combobox items={ITEMS}>
        <ComboboxInput placeholder="Search languages…" />
        <ComboboxPopup>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxGroupLabel>European</ComboboxGroupLabel>
              <ComboboxItem value={ITEMS[0]}>English</ComboboxItem>
              <ComboboxItem value={ITEMS[1]}>French</ComboboxItem>
              <ComboboxItem value={ITEMS[2]}>German</ComboboxItem>
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxGroupLabel>Middle Eastern</ComboboxGroupLabel>
              <ComboboxItem value={ITEMS[3]}>Persian</ComboboxItem>
              <ComboboxItem value={ITEMS[4]}>Arabic</ComboboxItem>
              <ComboboxItem value={ITEMS[5]}>Turkish</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  )
}
