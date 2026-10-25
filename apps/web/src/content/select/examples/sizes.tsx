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
]

export default function Sizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">size={size}</p>
          <Select items={LANGUAGES} defaultValue="en">
            <SelectTrigger size={size}>
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
        </div>
      ))}
    </div>
  )
}
