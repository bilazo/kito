import { Button } from '@bilazo/kito/components/button'
import { ArrowRight, Plus } from 'lucide-react'

export default function WithIcon() {
  return (
    <div className="flex gap-2">
      <Button className="rounded-full">
        <Plus />
        New item
      </Button>
      <Button className="rounded-full" variant="outline">
        Continue
        <ArrowRight />
      </Button>
      <Button className="rounded-full" size="icon" aria-label="Add item">
        <Plus />
      </Button>
    </div>
  )
}
