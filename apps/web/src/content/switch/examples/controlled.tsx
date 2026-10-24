import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'
import { useState } from 'react'

export default function Controlled() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="controlled" checked={enabled} onCheckedChange={setEnabled} />
        <Label htmlFor="controlled">
          Dark mode is <span className="font-mono">{enabled ? 'on' : 'off'}</span>
        </Label>
      </div>
      <p className="text-xs text-muted-foreground">
        The state lives in React — the switch reflects it, but never owns it.
      </p>
    </div>
  )
}
