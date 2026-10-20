import { Label } from '@bilazo/kito/components/label'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rtl-name">نام کامل</Label>
        <input
          id="rtl-name"
          type="text"
          placeholder="نام خود را وارد کنید"
          className="h-(--control-md) rounded-lg border border-input bg-transparent px-3 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input id="rtl-tos" type="checkbox" className="peer size-4" />
        <Label htmlFor="rtl-tos">قوانین را می‌پذیرم</Label>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rtl-email">
          ایمیل
          <span aria-hidden className="ms-0.5 text-destructive">
            *
          </span>
        </Label>
        <input
          id="rtl-email"
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          className="h-(--control-md) rounded-lg border border-input bg-transparent px-3 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input id="rtl-disabled" type="checkbox" className="peer size-4" disabled />
        <Label htmlFor="rtl-disabled">این گزینه در دسترس نیست</Label>
      </div>
    </div>
  )
}
