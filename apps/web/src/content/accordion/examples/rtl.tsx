import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@bilazo/kito/components/accordion'

export default function Rtl() {
  return (
    <Accordion defaultValue={['item-1']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>آیا دسترس‌پذیر است؟</AccordionTrigger>
        <AccordionContent>
          بله. طبق الگوی WAI-ARIA پیاده‌سازی شده است — trigger صفت{' '}
          <code className="font-mono">aria-expanded</code> را ارائه می‌دهد و panel با{' '}
          <code className="font-mono">aria-controls</code> به آن متصل است.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>آیا استایل دارد؟</AccordionTrigger>
        <AccordionContent>
          بله. از همان توکن‌های سمانتیک بقیه‌ی کیتو استفاده می‌کند — border، focus ring، و muted
          foreground.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>آیا انیمیشن دارد؟</AccordionTrigger>
        <AccordionContent>
          بله. ارتفاع panel با keyframeهای تم انیمیت می‌شود و کاربرانی که{' '}
          <code className="font-mono">prefers-reduced-motion</code> دارند، بدون انیمیشن باز/بسته
          می‌شود.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
