import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { AtSign, Link2, Lock } from 'lucide-react'

export default function Types() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <AtSign />
        </InputGroupAddon>
        <InputGroupInput type="email" placeholder="you@example.com" aria-label="Email" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Link2 />
        </InputGroupAddon>
        <InputGroupInput type="url" placeholder="https://example.com" aria-label="URL" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Lock />
        </InputGroupAddon>
        <InputGroupInput type="password" placeholder="••••••••" aria-label="Password" />
      </InputGroup>
    </div>
  )
}
