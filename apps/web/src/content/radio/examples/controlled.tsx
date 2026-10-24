import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'
import { useState } from 'react'

export default function Controlled() {
  const [plan, setPlan] = useState('monthly')

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        value={plan}
        onValueChange={(value) => setPlan(value as string)}
        aria-label="Billing cycle"
      >
        <div className="flex items-center gap-2">
          <Radio value="monthly" id="c-monthly" />
          <Label htmlFor="c-monthly">Monthly — $12</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio value="yearly" id="c-yearly" />
          <Label htmlFor="c-yearly">Yearly — $120</Label>
        </div>
      </RadioGroup>
      <p className="text-xs text-muted-foreground">
        Current plan: <span className="font-mono">{plan}</span>
      </p>
    </div>
  )
}
