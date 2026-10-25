import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Input } from '@bilazo/kito/components/input'
import { Search } from 'lucide-react'

export default function WithInput() {
  return (
    <ButtonGroup className="w-full max-w-md" aria-label="Search">
      <Input placeholder="Search…" aria-label="Search query" />
      <Button variant="outline" aria-label="Search">
        <Search />
      </Button>
    </ButtonGroup>
  )
}
