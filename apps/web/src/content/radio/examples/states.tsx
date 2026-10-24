import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

export default function States() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Default selection</p>
        <RadioGroup defaultValue="a" aria-label="Default">
          <div className="flex items-center gap-2">
            <Radio value="a" id="s-a" />
            <Label htmlFor="s-a">Selected</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="b" id="s-b" />
            <Label htmlFor="s-b">Unselected</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <RadioGroup defaultValue="a" aria-label="Disabled">
          <div className="flex items-center gap-2">
            <Radio value="a" id="d-a" disabled />
            <Label htmlFor="d-a">Disabled (selected)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio value="b" id="d-b" disabled />
            <Label htmlFor="d-b">Disabled (unselected)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Invalid</p>
        <RadioGroup aria-label="Invalid">
          <div className="flex items-center gap-2">
            <Radio value="a" id="i-a" aria-invalid />
            <Label htmlFor="i-a">Invalid option</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
