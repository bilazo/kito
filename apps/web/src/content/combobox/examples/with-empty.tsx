import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'

const CITIES = [
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'paris', label: 'Paris' },
  { value: 'berlin', label: 'Berlin' },
]

export default function WithEmpty() {
  return (
    <div className="w-full max-w-xs">
      <Combobox items={CITIES}>
        <ComboboxInput placeholder="Type to search cities…" />
        <ComboboxPopup>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
          <ComboboxEmpty>No cities match your search.</ComboboxEmpty>
        </ComboboxPopup>
      </Combobox>
      <p className="mt-2 text-xs text-muted-foreground">Try typing "xyz" — nothing should match.</p>
    </div>
  )
}
