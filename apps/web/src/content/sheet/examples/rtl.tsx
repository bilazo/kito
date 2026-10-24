import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

const sides = ['start', 'end'] as const

export default function Rtl() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
      <p className="text-xs text-muted-foreground">
        در حالت راست‌به‌چپ، <code>side="start"</code> به لبه‌ی راست می‌چسبد و<code>side="end"</code> به
        لبه‌ی چپ. بردر و radius هم به همان ترتیب جابه‌جا می‌شوند. فقط ترنسفورم انیمیشن به override دستی
        نیاز دارد.
      </p>

      <div className="flex flex-wrap gap-2">
        {sides.map((side) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="outline" />}>side={side}</SheetTrigger>
            {/*
              در پنل Sheet محتوا به portal روی body منتقل می‌شود، پس
              `dir="rtl"` والد را ارث نمی‌برد. این prop را مستقیماً
              روی `SheetPopup` بگذارید. در یک اپ فارسی واقعی فقط کافیست
              `<html dir="rtl">` باشد و این prop لازم نیست.
            */}
            <SheetPopup dir="rtl" side={side}>
              <SheetHeader>
                <SheetTitle>
                  side="
                  {side}"
                </SheetTitle>
                <SheetDescription>
                  {side === 'start'
                    ? 'این پنل از لبه‌ی راست باز می‌شود.'
                    : 'این پنل از لبه‌ی چپ باز می‌شود.'}
                </SheetDescription>
              </SheetHeader>

              <SheetBody className="flex flex-col gap-2 px-6 text-sm">
                <p>پنل از سمت راست/چپ جابه‌جا می‌شود.</p>
                <p>مرزِ جداکننده از داخل به لبه چسبیده است.</p>
                <p>گوشه‌ی گرد سمت لبه است، نه سمت مخالف.</p>
                <p>دکمه‌ی بستن در گوشه‌ی سمت مخالف لبه قرار دارد.</p>
              </SheetBody>

              <SheetFooter>
                <SheetClose render={<Button variant="secondary" />}>انصراف</SheetClose>
                <Button>ذخیره</Button>
              </SheetFooter>
            </SheetPopup>
          </Sheet>
        ))}
      </div>
    </div>
  )
}
