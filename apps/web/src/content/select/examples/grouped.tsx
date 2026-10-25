import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@bilazo/kito/components/select'

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
      <Select items={ITEMS} defaultValue="en">
        <SelectTrigger>
          <SelectValue placeholder="Choose a language" />
        </SelectTrigger>
        <SelectPopup>
          <SelectGroup>
            <SelectGroupLabel>European</SelectGroupLabel>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectGroupLabel>Middle Eastern</SelectGroupLabel>
            <SelectItem value="fa">Persian</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
            <SelectItem value="tr">Turkish</SelectItem>
          </SelectGroup>
        </SelectPopup>
      </Select>
    </div>
  )
}
