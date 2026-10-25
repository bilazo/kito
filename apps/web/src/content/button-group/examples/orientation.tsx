import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Minus, Plus } from 'lucide-react'

export default function Orientation() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Counter" className="h-fit">
      <Button variant="outline" size="icon" aria-label="Increment">
        <Plus />
      </Button>
      <Button variant="outline" size="icon" aria-label="Decrement">
        <Minus />
      </Button>
    </ButtonGroup>
  )
}
