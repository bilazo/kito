import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@bilazo/kito/components/combobox'
import { useState } from 'react'

type Language = { value: string; label: string }

const LANGUAGES: Language[] = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

export default function Controlled() {
  const [value, setValue] = useState<Language | null>(null)

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Combobox
        items={LANGUAGES}
        value={value}
        onValueChange={(v) => setValue(v as Language | null)}
      >
        <ComboboxInput placeholder="Pick a language…" />
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
      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-mono">{value?.value ?? '—'}</span>
      </p>
    </div>
  )
}
