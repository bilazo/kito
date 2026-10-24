import { Slider } from '@bilazo/kito/components/slider'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">size={size}</p>
          <Slider size={size} defaultValue={50} aria-label={size} />
        </div>
      ))}
    </div>
  )
}
