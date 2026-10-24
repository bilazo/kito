import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

export default function Basic() {
  return (
    <RadioGroup defaultValue="medium" aria-label="Level">
      <div className="flex items-center gap-2">
        <Radio value="beginner" id="r-basic-1" />
        <Label htmlFor="r-basic-1">Beginner</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="medium" id="r-basic-2" />
        <Label htmlFor="r-basic-2">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="advanced" id="r-basic-3" />
        <Label htmlFor="r-basic-3">Advanced</Label>
      </div>
    </RadioGroup>
  )
}
