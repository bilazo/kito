import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup, ButtonGroupSeparator } from '@bilazo/kito/components/button-group'
import { ChevronDown } from 'lucide-react'

export default function WithSeparator() {
  return (
    <ButtonGroup aria-label="Save">
      <Button variant="secondary">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="icon" aria-label="More save options">
        <ChevronDown />
      </Button>
    </ButtonGroup>
  )
}
