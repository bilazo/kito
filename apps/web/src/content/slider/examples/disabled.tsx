import { Slider } from '@bilazo/kito/components/slider'

export default function Disabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Enabled</p>
        <Slider defaultValue={50} aria-label="Enabled" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <Slider defaultValue={50} disabled aria-label="Disabled" />
      </div>
    </div>
  )
}
