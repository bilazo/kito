import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup } from '@bilazo/kito/components/button-group'

export default function Basic() {
  return (
    <ButtonGroup aria-label="Alignment">
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}
