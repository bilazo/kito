import { Button } from '@bilazo/kito/components/button'
import { Kbd, KbdGroup } from '@bilazo/kito/components/kbd'
import { Search } from 'lucide-react'

export default function InButton() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">
        <Search />
        Search
        <KbdGroup className="ms-2">
          <Kbd className="bg-background">⌘</Kbd>
          <Kbd className="bg-background">K</Kbd>
        </KbdGroup>
      </Button>

      <Button variant="ghost" size="sm">
        Save
        <Kbd className="ms-2">⌘S</Kbd>
      </Button>
    </div>
  )
}
