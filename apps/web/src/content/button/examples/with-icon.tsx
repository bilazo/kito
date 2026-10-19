import { Button } from '@bilazo/kito/components/button'
import { ArrowRight, Plus } from 'lucide-react'

export default function WithIcon() {
  return (
    <div className="flex gap-3">
      <Button>
        <Plus />
        New item
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRight />
      </Button>
      <Button size="icon" aria-label="Add item">
        <Plus />
      </Button>
    </div>
  )
}
