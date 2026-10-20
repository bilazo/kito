import { Badge } from '@bilazo/kito/components/badge'
import { Check } from 'lucide-react'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">فعال</Badge>
        <Badge variant="soft">در انتظار</Badge>
        <Badge variant="outline">پیش‌نویس</Badge>
        <Badge variant="destructive">ناموفق</Badge>
        <Badge variant="highlight">ویژه</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">
          <Check />
          تأیید‌شده
        </Badge>
        <Badge variant="outline" size="sm">
          ۳
        </Badge>
        <Badge variant="secondary" size="sm">
          ۱۲ مورد
        </Badge>
      </div>
    </div>
  )
}
