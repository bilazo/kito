import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

export default function Rtl() {
  return (
    <div className="flex flex-wrap gap-2">
      <Drawer showSwipeHandle side="bottom">
        <DrawerTrigger render={<Button variant="outline" />}>سمت پایین</DrawerTrigger>
        <DrawerPopup dir="rtl">
          <DrawerHeader>
            <DrawerTitle>حذف درس ۴۲؟</DrawerTitle>
            <DrawerDescription>این عمل قابل بازگشت نیست.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="p-6 text-sm text-muted-foreground">
            <p>با کشیدن به پایین یا دکمه‌ی انصراف ببندید.</p>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="ghost" />}>انصراف</DrawerClose>
            <Button variant="destructive">حذف</Button>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>

      <Drawer side="right" variant="floating" showSwipeHandle>
        <DrawerTrigger render={<Button variant="outline" />}>
          پنل جزئیات (physical right)
        </DrawerTrigger>
        <DrawerPopup dir="rtl">
          <DrawerHeader>
            <DrawerTitle>جزئیات مشتری</DrawerTitle>
            <DrawerDescription>پنل از سمت راست فیزیکی باز می‌شود.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-3 p-6 text-sm">
            <p>
              <code>side="right"</code> در Drawer <strong>فیزیکی</strong> است — حتی در RTL صفحه، پنل
              از سمت راست باز می‌شود. اگر می‌خواهید از logical side استفاده کنید، از{' '}
              <code>Sheet</code> با <code>side="start"</code> استفاده کنید.
            </p>
            <p className="text-muted-foreground">
              محتوای داخل پنل (متن، عناوین) به‌طور خودکار RTL می‌شود.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary" />}>بستن</DrawerClose>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>

      <Drawer side="right" showSwipeHandle>
        <DrawerTrigger render={<Button variant="outline" />}>پنل گوشه‌چسبیده</DrawerTrigger>
        <DrawerPopup dir="rtl">
          <DrawerHeader>
            <DrawerTitle>حالت flush</DrawerTitle>
            <DrawerDescription>بدون inset — چسبیده به لبه‌ی viewport.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary" />}>بستن</DrawerClose>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    </div>
  )
}
