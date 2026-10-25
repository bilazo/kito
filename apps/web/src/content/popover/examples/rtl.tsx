import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

export default function Rtl() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>نمایش جزئیات</PopoverTrigger>
        <PopoverPopup dir="rtl">
          <PopoverHeader>
            <PopoverTitle>پلن شما: حرفه‌ای</PopoverTitle>
            <PopoverDescription>بر اساس ۱۲ ماه گذشته</PopoverDescription>
          </PopoverHeader>
          <p className="text-sm text-muted-foreground">
            پلن حرفه‌ای شامل پروژه‌های نامحدود، ۱۰۰ گیگابایت فضا و پشتیبانی اولویت‌دار است.
          </p>
        </PopoverPopup>
      </Popover>

      {/* side is physical — in an RTL page you pick the side explicitly */}
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>side=&quot;left&quot;</PopoverTrigger>
        <PopoverPopup dir="rtl" side="left">
          <PopoverTitle>پنل در سمت چپ trigger باز می‌شود</PopoverTitle>
        </PopoverPopup>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          side=&quot;right&quot;
        </PopoverTrigger>
        <PopoverPopup dir="rtl" side="right">
          <PopoverTitle>پنل در سمت راست trigger باز می‌شود</PopoverTitle>
        </PopoverPopup>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>ویرایش نام</PopoverTrigger>
        <PopoverPopup dir="rtl" className="w-80">
          <PopoverHeader>
            <PopoverTitle>نام نمایشی</PopoverTitle>
            <PopoverDescription>در پروفایل و نظرات نمایش داده می‌شود.</PopoverDescription>
          </PopoverHeader>
          <Field name="name">
            <FieldLabel className="sr-only">نام</FieldLabel>
            <Input placeholder="نام شما" />
          </Field>
          <div className="flex justify-end gap-2">
            <PopoverClose render={<Button variant="ghost" size="sm" />}>انصراف</PopoverClose>
            <Button size="sm">ذخیره</Button>
          </div>
        </PopoverPopup>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>بدون فلش</PopoverTrigger>
        <PopoverPopup dir="rtl" showArrow={false} className="w-80">
          <PopoverHeader>
            <PopoverTitle>پنل ساده بدون فلش</PopoverTitle>
            <PopoverDescription>برای وقتی که فلش فقط شلوغی است.</PopoverDescription>
          </PopoverHeader>
        </PopoverPopup>
      </Popover>
    </div>
  )
}
