import { Button } from '@bilazo/kito/components/button'
import { Separator } from '@bilazo/kito/components/separator'

export default function Rtl() {
  return (
    <div className="w-full max-w-sm space-y-6 text-sm">
      <div className="space-y-3">
        <p>بالای خط</p>
        <Separator />
        <p>پایین خط</p>
      </div>

      <div className="flex h-8 items-center gap-4">
        <span>مستندات</span>
        <Separator orientation="vertical" />
        <span>وبلاگ</span>
        <Separator orientation="vertical" />
        <span>درباره ما</span>
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">توپر</p>
        <Separator variant="solid" />
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">خط‌چین</p>
        <Separator variant="dashed" />
      </div>

      <div className="space-y-2">
        <p className="text-muted-foreground">نقطه‌چین</p>
        <Separator variant="dotted" />
      </div>

      <div
        role="toolbar"
        aria-label="قالب‌بندی متن"
        className="flex items-center gap-1 rounded-md border border-border p-1"
      >
        <Button size="sm" variant="ghost" aria-label="درشت">
          ب
        </Button>
        <Button size="sm" variant="ghost" aria-label="کج">
          ک
        </Button>
        <Button size="sm" variant="ghost" aria-label="زیرخط">
          ز
        </Button>
        <Separator orientation="vertical" decorative={false} className="mx-1 h-8" />
        <Button size="sm" variant="ghost">
          راست
        </Button>
        <Button size="sm" variant="ghost">
          وسط
        </Button>
        <Button size="sm" variant="ghost">
          چپ
        </Button>
      </div>
    </div>
  )
}
