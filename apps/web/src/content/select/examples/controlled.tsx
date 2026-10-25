import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'
import { useState } from 'react'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian' },
  { value: 'fr', label: 'French' },
]

export default function Controlled() {
  const [value, setValue] = useState<string>('en')

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Select items={LANGUAGES} value={value} onValueChange={(v) => setValue(v as string)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {LANGUAGES.map((l) => (
            <SelectItem key={l.value} value={l.value}>
              {l.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-mono">{value}</span>
      </p>
    </div>
  )
}
