import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search } from 'lucide-react'

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {sizes.map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder={`size ${size}`} aria-label={size} />
        </InputGroup>
      ))}
    </div>
  )
}
