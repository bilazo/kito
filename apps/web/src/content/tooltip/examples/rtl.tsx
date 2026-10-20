import { Button } from '@bilazo/kito/components/button'
import { Kbd } from '@bilazo/kito/components/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'
import { Save, Trash2 } from 'lucide-react'

export default function Rtl() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>ذخیره‌ی تغییرات</TooltipTrigger>
          <TooltipContent side="bottom">تغییرات را برای همه اعضا اعمال می‌کند</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="destructive" />}>حذف پروژه</TooltipTrigger>
          <TooltipContent side="inline-start">این عمل قابل بازگشت نیست</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button size="icon" aria-label="ذخیره" />}>
            <Save />
          </TooltipTrigger>
          <TooltipContent>
            ذخیره <Kbd className="text-[10px]">⌘S</Kbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="ghost" aria-label="حذف" />}>
            <Trash2 />
          </TooltipTrigger>
          <TooltipContent side="inline-end">حذف</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
