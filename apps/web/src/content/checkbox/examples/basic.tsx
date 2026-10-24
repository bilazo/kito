import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'

export default function Basic() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="basic-tos" />
      <Label htmlFor="basic-tos">Accept the terms and conditions</Label>
    </div>
  )
}
