import { Input } from '@bilazo/kito/components/input'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sizes.map((size) => (
        <Input key={size} size={size} placeholder={`input ${size}`} aria-label={size} />
      ))}
    </div>
  )
}
