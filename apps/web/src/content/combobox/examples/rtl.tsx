import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
} from '@bilazo/kito/components/combobox'
import { Field, FieldLabel } from '@bilazo/kito/components/field'

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
        <Combobox items={LANGUAGES}>
          <ComboboxInput placeholder="جستجوی زبان…" />
          <ComboboxPopup dir="rtl">
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
            <ComboboxEmpty>زبانی یافت نشد.</ComboboxEmpty>
          </ComboboxPopup>
        </Combobox>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">گروه‌بندی‌شده</p>
        <Combobox items={LANGUAGES}>
          <ComboboxInput placeholder="جستجوی زبان…" />
          <ComboboxPopup dir="rtl">
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxGroupLabel>خاورمیانه</ComboboxGroupLabel>
                <ComboboxItem value={LANGUAGES[0]}>فارسی</ComboboxItem>
                <ComboboxItem value={LANGUAGES[1]}>عربی</ComboboxItem>
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxGroupLabel>اروپایی</ComboboxGroupLabel>
                <ComboboxItem value={LANGUAGES[2]}>انگلیسی</ComboboxItem>
                <ComboboxItem value={LANGUAGES[3]}>فرانسوی</ComboboxItem>
                <ComboboxItem value={LANGUAGES[4]}>آلمانی</ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">داخل Field</p>
        <Field name="language">
          <FieldLabel>زبان</FieldLabel>
          <Combobox items={LANGUAGES}>
            <ComboboxInput placeholder="جستجوی زبان…" />
            <ComboboxPopup dir="rtl">
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
        </Field>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">حالت خالی</p>
        <Combobox items={LANGUAGES}>
          <ComboboxInput placeholder="تایپ کنید…" />
          <ComboboxPopup dir="rtl">
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
            <ComboboxEmpty>نتیجه‌ای یافت نشد.</ComboboxEmpty>
          </ComboboxPopup>
        </Combobox>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">اندازه کوچک</p>
        <Combobox items={LANGUAGES}>
          <ComboboxInput size="sm" placeholder="جستجو…" />
          <ComboboxPopup dir="rtl">
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
    </div>
  )
}
