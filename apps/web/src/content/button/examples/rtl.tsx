import { Button } from '@bilazo/kito/components/button'

export default function Rtl() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>ثبت تغییرات</Button>
      <Button variant="secondary">انصراف</Button>
      <Button variant="soft">ذخیره‌ی پیش‌نویس</Button>
      <Button variant="outline">بازگشت</Button>
      <Button variant="ghost">مشاهده</Button>
      <Button variant="destructive">حذف</Button>
      <Button variant="link">جزئیات بیشتر</Button>
      <Button loading>در حال ذخیره</Button>
      <Button size="icon" aria-label="افزودن">
        <span aria-hidden>+</span>
      </Button>
    </div>
  )
}
