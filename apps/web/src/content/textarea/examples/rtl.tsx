import { Label } from '@bilazo/kito/components/label'
import { Textarea } from '@bilazo/kito/components/textarea'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-message">پیام</Label>
        <Textarea id="rtl-message" dir="rtl" placeholder="پیام خود را بنویسید…" rows={3} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-comment">نظر شما</Label>
        <Textarea
          id="rtl-comment"
          dir="rtl"
          autoResize
          rows={1}
          placeholder="با تایپ کردن، فیلد رشد می‌کند…"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-bio">بیوگرافی</Label>
        <Textarea
          id="rtl-bio"
          size="lg"
          rows={2}
          defaultValue="نویسنده و برنامه‌نویس، ساکن تهران."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-disabled">غیرفعال</Label>
        <Textarea id="rtl-disabled" disabled defaultValue="قابل ویرایش نیست" rows={2} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="rtl-invalid">مقدار نامعتبر</Label>
        <Textarea id="rtl-invalid" aria-invalid defaultValue="مقدار اشتباه" rows={2} />
      </div>
    </div>
  )
}
