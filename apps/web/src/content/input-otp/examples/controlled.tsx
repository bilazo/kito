import { InputOTP } from '@bilazo/kito/components/input-otp'
import { useState } from 'react'

export default function Controlled() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-3">
      <InputOTP length={6} value={value} onValueChange={setValue} />
      <p className="text-xs text-muted-foreground">
        Value: <span className="font-mono">{value || '—'}</span>
      </p>
    </div>
  )
}
