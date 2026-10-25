import { Alert, AlertAction, AlertDescription, AlertTitle } from '@bilazo/kito/components/alert'
import { Button } from '@bilazo/kito/components/button'
import { AlertCircle, Shield } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Alert>
        <Shield />
        <AlertTitle>فعال‌سازی تأیید دو مرحله‌ای</AlertTitle>
        <AlertDescription>
          برای محافظت از حساب خود، یک عامل دوم اضافه کنید. این کار حدود یک دقیقه طول می‌کشد.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm">
            فعال‌سازی
          </Button>
        </AlertAction>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>پرداخت ناموفق بود</AlertTitle>
        <AlertDescription>
          کارت شما رد شد. روش پرداخت خود را به‌روزرسانی کنید و دوباره تلاش کنید.
        </AlertDescription>
      </Alert>
    </div>
  )
}
