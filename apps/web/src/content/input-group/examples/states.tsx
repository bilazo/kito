import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search } from 'lucide-react'

export default function States() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Default" aria-label="Default" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Disabled" disabled aria-label="Disabled" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput defaultValue="not-an-email" aria-invalid aria-label="Invalid" />
      </InputGroup>
    </div>
  )
}
