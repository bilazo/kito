import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'

export default function Basic() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="basic-notifications" />
      <Label htmlFor="basic-notifications">Email notifications</Label>
    </div>
  )
}
