import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
]

export default function Sizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">size={size}</p>
          <Combobox items={LANGUAGES}>
            <ComboboxInput size={size} placeholder="Search…" />
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
        </div>
      ))}
    </div>
  )
}
