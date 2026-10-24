import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'

export default function States() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="s-off" />
        <Label htmlFor="s-off">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s-on" defaultChecked />
        <Label htmlFor="s-on">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s-disabled" disabled />
        <Label htmlFor="s-disabled">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s-disabled-on" disabled defaultChecked />
        <Label htmlFor="s-disabled-on">Disabled (on)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="s-invalid" aria-invalid />
        <Label htmlFor="s-invalid">Invalid</Label>
      </div>
    </div>
  )
}
