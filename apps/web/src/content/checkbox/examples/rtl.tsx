import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'
import { Heart } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="rtl-tos" />
        <Label htmlFor="rtl-tos">قوانین و شرایط را می‌پذیرم</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="rtl-checked" defaultChecked />
        <Label htmlFor="rtl-checked">دریافت اعلان‌های ایمیلی</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="rtl-indeterminate" indeterminate />
        <Label htmlFor="rtl-indeterminate">برخی از کانال‌ها انتخاب شده</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="rtl-disabled" disabled />
        <Label htmlFor="rtl-disabled">گزینه غیرفعال</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="rtl-fav"
          className="data-checked:border-destructive data-checked:bg-destructive"
        >
          <Heart className="fill-current" />
        </Checkbox>
        <Label htmlFor="rtl-fav">افزودن به علاقه‌مندی‌ها</Label>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox id="rtl-sm" size="sm" defaultChecked />
          <Label htmlFor="rtl-sm">کوچک</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="rtl-md" size="md" defaultChecked />
          <Label htmlFor="rtl-md">متوسط</Label>
        </div>
      </div>
    </div>
  )
}
