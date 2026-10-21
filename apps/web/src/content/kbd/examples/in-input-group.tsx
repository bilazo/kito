import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Kbd } from '@bilazo/kito/components/kbd'
import { Search } from 'lucide-react'

export default function InInputGroup() {
  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
