import { Button } from '@bilazo/kito/components/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export default function Clearable() {
  const [query, setQuery] = useState('lesson 42')

  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          aria-label="Search"
        />
        {query.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="me-1"
            aria-label="Clear"
            onClick={() => setQuery('')}
          >
            <X />
          </Button>
        )}
      </InputGroup>
    </div>
  )
}
