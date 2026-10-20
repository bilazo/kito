import { Button } from '@bilazo/kito/components/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import { Switch } from '@bilazo/kito/components/switch'

export default function Rtl() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLegend>پروفایل</FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel>نام کامل</FieldLabel>
            <Input placeholder="نام خود را وارد کنید" />
            <FieldDescription>این اطلاعات روی فاکتورها و ایمیل‌ها نمایش داده می‌شود.</FieldDescription>
          </Field>

          <Field invalid>
            <FieldLabel>نام کاربری</FieldLabel>
            <Input placeholder="username" dir="ltr" aria-invalid />
            <FieldError>این نام کاربری قبلاً استفاده شده است.</FieldError>
          </Field>

          <FieldSeparator>یا</FieldSeparator>

          <Field orientation="horizontal">
            <Switch id="rtl-newsletter" />
            <FieldContent>
              <FieldLabel htmlFor="rtl-newsletter">عضویت در خبرنامه</FieldLabel>
              <FieldDescription>حداکثر یک ایمیل در هفته.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost">انصراف</Button>
          <Button>ذخیره</Button>
        </div>
      </FieldSet>
    </div>
  )
}
