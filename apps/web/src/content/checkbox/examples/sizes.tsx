import { Checkbox } from '@bilazo/kito/components/checkbox'
import { Label } from '@bilazo/kito/components/label'

const sizes = ['sm', 'md'] as const

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Checkbox id={`size-${size}`} size={size} />
          <Label htmlFor={`size-${size}`}>
            Size: <span className="font-mono">{size}</span>
          </Label>
        </div>
      ))}
    </div>
  )
}
