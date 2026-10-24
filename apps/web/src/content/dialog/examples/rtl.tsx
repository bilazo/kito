import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function Rtl() {
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>ویرایش پروفایل</DialogTrigger>
        <DialogPopup dir="rtl">
          <DialogHeader>
            <DialogTitle>ویرایش پروفایل</DialogTitle>
            <DialogDescription>تغییرات بلافاصله ذخیره می‌شوند.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary" />}>انصراف</DialogClose>
            <Button>ذخیره</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>ایجاد پروژه</DialogTrigger>
        <DialogPopup dir="rtl">
          <DialogHeader>
            <DialogTitle>ایجاد پروژه</DialogTitle>
            <DialogDescription>
              یک نام برای پروژه انتخاب کنید. بعداً می‌توانید تغییر دهید.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Field name="name">
              <FieldLabel>نام پروژه</FieldLabel>
              <Input placeholder="پروژه‌ی جدید من" />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary" />}>انصراف</DialogClose>
            <Button>ایجاد</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      <Dialog>
        <DialogTrigger render={<Button variant="destructive" />}>حذف درس</DialogTrigger>
        <DialogPopup dir="rtl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>حذف درس ۴۲؟</DialogTitle>
            <DialogDescription>
              این عمل قابل بازگشت نیست. تمام پیشرفت‌ها و واژگان ذخیره‌شده از دست خواهند رفت.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>انصراف</DialogClose>
            <Button variant="destructive">حذف</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>اندازه بزرگ</DialogTrigger>
        <DialogPopup dir="rtl" size="lg">
          <DialogHeader>
            <DialogTitle>اندازه بزرگ</DialogTitle>
            <DialogDescription>حداکثر عرض این پنل ۴۲rem است.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary" />}>بستن</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </div>
  )
}
