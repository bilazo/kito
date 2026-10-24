import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

export default function Basic() {
  return <Button onClick={() => toast('Your changes have been saved.')}>Show toast</Button>
}
