import { Slider } from '@bilazo/kito/components/slider'

export default function Rtl() {
  return (
    <div className="w-full max-w-sm space-y-6 rounded-lg border border-border p-4">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">در RTL، Slider از راست شروع می‌شود</p>
        <Slider defaultValue={33} aria-label="حجم" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">محدوده</p>
        <Slider defaultValue={[25, 75]} aria-label="محدوده" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">اندازه‌ها</p>
        <Slider size="sm" defaultValue={30} aria-label="کوچک" />
        <Slider size="md" defaultValue={50} aria-label="متوسط" />
        <Slider size="lg" defaultValue={70} aria-label="بزرگ" />
      </div>
    </div>
  )
}
