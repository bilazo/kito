import { Label } from '@bilazo/kito/components/label'
import { Radio, RadioGroup } from '@bilazo/kito/components/radio'

const sizes = ['sm', 'md'] as const

export default function Sizes() {
  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <div key={size} className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">size={size}</p>
          <RadioGroup defaultValue="a" size={size} aria-label={size}>
            <div className="flex items-center gap-2">
              <Radio value="a" id={`size-${size}-a`} />
              <Label htmlFor={`size-${size}-a`}>First</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio value="b" id={`size-${size}-b`} />
              <Label htmlFor={`size-${size}-b`}>Second</Label>
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}
