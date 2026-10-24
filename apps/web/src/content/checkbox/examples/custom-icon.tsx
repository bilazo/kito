import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'
import { Heart } from 'lucide-react'

export default function CustomIcon() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="fav" className="data-checked:border-destructive data-checked:bg-destructive">
        <Heart className="fill-current" />
      </Checkbox>
      <Label htmlFor="fav">Add to favorites</Label>
    </div>
  )
}
