import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { Bold, Italic, Underline } from 'lucide-react'

export default function Nested() {
  return (
    <ButtonGroup aria-label="Formatting">
      <ButtonGroup aria-label="Text style">
        <Button variant="outline" size="icon" aria-label="Bold">
          <Bold />
        </Button>
        <Button variant="outline" size="icon" aria-label="Italic">
          <Italic />
        </Button>
        <Button variant="outline" size="icon" aria-label="Underline">
          <Underline />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Actions">
        <Button variant="outline">Copy</Button>
        <Button variant="outline">Paste</Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
