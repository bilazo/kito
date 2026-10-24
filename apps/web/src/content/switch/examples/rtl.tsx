import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex items-center gap-2">
        <Switch id="rtl-notifications" />
        <Label htmlFor="rtl-notifications">اعلان‌های ایمیلی</Label>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="rtl-dark" defaultChecked />
        <Label htmlFor="rtl-dark">حالت تاریک</Label>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">اندازه‌ها</p>
        <div className="flex items-center gap-2">
          <Switch id="rtl-sm" size="sm" />
          <Label htmlFor="rtl-sm">کوچک</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="rtl-md" size="md" />
          <Label htmlFor="rtl-md">متوسط</Label>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">حالت‌ها</p>
        <div className="flex items-center gap-2">
          <Switch id="rtl-off" />
          <Label htmlFor="rtl-off">خاموش</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="rtl-on" defaultChecked />
          <Label htmlFor="rtl-on">روشن</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="rtl-disabled" disabled />
          <Label htmlFor="rtl-disabled">غیرفعال</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="rtl-invalid" aria-invalid />
          <Label htmlFor="rtl-invalid">نامعتبر</Label>
        </div>
      </div>
    </div>
  )
}
