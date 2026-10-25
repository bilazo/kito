import { ScrollArea, ScrollBar } from '@bilazo/kito/components/scroll-area'

export default function Rtl() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs text-muted-foreground">
        در RTL، اسکرول‌بار عمودی به سمت چپ (سمت پایان خواندن) منتقل می‌شود و اسکرول افقی از سمت راست
        شروع می‌شود.
      </p>

      <ScrollArea className="h-56 w-80 rounded-lg border border-border p-4">
        <div className="flex flex-col gap-3 text-sm">
          {Array.from({ length: 25 }, (_, i) => (
            <p key={i}>خط {i + 1}. محتوای نمونه برای آزمودن اسکرول.</p>
          ))}
        </div>
      </ScrollArea>

      <ScrollArea className="w-full max-w-lg rounded-lg border border-border p-4">
        <div className="flex gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex size-32 shrink-0 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground"
            >
              کارت {i + 1}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
