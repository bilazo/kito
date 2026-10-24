import { Textarea } from '@bilazo/kito/components/textarea'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sizes.map((size) => (
        <Textarea
          key={size}
          size={size}
          placeholder={`textarea ${size}`}
          rows={2}
          aria-label={size}
        />
      ))}
    </div>
  )
}
