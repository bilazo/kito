import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search } from 'lucide-react'

export default function Basic() {
  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" aria-label="Search" />
      </InputGroup>
    </div>
  )
}
