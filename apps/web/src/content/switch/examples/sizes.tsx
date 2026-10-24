import { Label } from '@bilazo/kito/components/label'
import { Switch } from '@bilazo/kito/components/switch'

const sizes = ['sm', 'md'] as const

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Switch id={`size-${size}`} size={size} />
          <Label htmlFor={`size-${size}`}>
            Size: <span className="font-mono">{size}</span>
          </Label>
        </div>
      ))}
    </div>
  )
}
