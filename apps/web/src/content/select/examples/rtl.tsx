import { Field, FieldLabel } from '@bilazo/kito/components/field'
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

const LANGUAGES = [
  { value: 'fa', label: 'فارسی' },
  { value: 'ar', label: 'عربی' },
  { value: 'en', label: 'انگلیسی' },
  { value: 'fr', label: 'فرانسوی' },
  { value: 'de', label: 'آلمانی' },
]

export default function Rtl() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">پایه</p>
        <Select items={LANGUAGES} defaultValue="fa">
          <SelectTrigger>
            <SelectValue placeholder="یک زبان انتخاب کنید" />
          </SelectTrigger>
          <SelectPopup dir="rtl">
            {LANGUAGES.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">گروه‌بندی‌شده</p>
        <Select items={LANGUAGES} defaultValue="fa">
          <SelectTrigger>
            <SelectValue placeholder="یک زبان انتخاب کنید" />
          </SelectTrigger>
          <SelectPopup dir="rtl">
            <SelectGroup>
              <SelectGroupLabel>خاورمیانه</SelectGroupLabel>
              <SelectItem value="fa">فارسی</SelectItem>
              <SelectItem value="ar">عربی</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectGroupLabel>اروپایی</SelectGroupLabel>
              <SelectItem value="en">انگلیسی</SelectItem>
              <SelectItem value="fr">فرانسوی</SelectItem>
              <SelectItem value="de">آلمانی</SelectItem>
            </SelectGroup>
          </SelectPopup>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">داخل Field</p>
        <Field name="language">
          <FieldLabel>زبان</FieldLabel>
          <Select items={LANGUAGES} defaultValue="fa">
            <SelectTrigger>
              <SelectValue placeholder="یک زبان انتخاب کنید" />
            </SelectTrigger>
            <SelectPopup dir="rtl">
              {LANGUAGES.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </Field>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">اندازه‌ها</p>
        <Select items={LANGUAGES} defaultValue="fa">
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup dir="rtl">
            {LANGUAGES.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">غیرفعال</p>
        <Select items={LANGUAGES} defaultValue="fa" disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup dir="rtl">
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
