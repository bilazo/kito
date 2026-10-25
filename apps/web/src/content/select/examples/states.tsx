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

export default function States() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Default</p>
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

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Empty (placeholder)</p>
        <Select items={LANGUAGES}>
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

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <Select items={LANGUAGES} defaultValue="en" disabled>
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
      </div>
    </div>
  )
}
