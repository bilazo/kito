import { Button } from '@bilazo/kito/components/button'
import { useDirection } from '@bilazo/kito/components/direction'

export default function Rtl() {
  const direction = useDirection()

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">این مثال در حالت راست‌به‌چپ رندر می‌شود.</p>
      <p className="text-xs text-muted-foreground">
        مقدار جهت فعلی:{' '}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono">{direction}</code>
      </p>
      <div className="flex gap-2">
        <Button>ثبت</Button>
        <Button variant="outline">انصراف</Button>
        <Button variant="ghost">بازگشت</Button>
      </div>
    </div>
  )
}
