import { Slider } from '@bilazo/kito/components/slider'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState<number[]>([50])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Slider
        value={value}
        // Base UI's `onValueChange` gives a `number` for a single-thumb
        // slider and a `number[]` for a multi-thumb one. Normalize to an
        // array so the state shape never changes.
        onValueChange={(v) => setValue(Array.isArray(v) ? v : [v])}
        aria-label="Volume"
      />
      <p className="text-xs text-muted-foreground">
        Value: <span className="font-mono">{value[0]}</span>
      </p>
    </div>
  )
}
