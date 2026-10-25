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
  { value: 'de', label: 'German' },
  { value: 'ar', label: 'Arabic' },
  { value: 'tr', label: 'Turkish' },
]

export default function Basic() {
  return (
    <div className="w-full max-w-xs">
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
    </div>
  )
}
