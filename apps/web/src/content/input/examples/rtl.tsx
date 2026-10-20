import { Input } from '@bilazo/kito/components/input'
import { Label } from '@bilazo/kito/components/label'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-name">نام</Label>
        <Input id="rtl-name" placeholder="نام خود را وارد کنید" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-email">ایمیل</Label>
        <Input id="rtl-email" type="email" placeholder="you@example.com" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-phone">شماره تماس</Label>
        <Input id="rtl-phone" type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-password">رمز عبور</Label>
        <Input id="rtl-password" type="password" placeholder="••••••••" />
      </div>
    </div>
  )
}
