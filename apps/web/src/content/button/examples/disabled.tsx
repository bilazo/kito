import { Button } from '@bilazo/kito/components/button'

export default function Disabled() {
  return (
    <div className="flex gap-3">
      <Button disabled>Primary</Button>
      <Button disabled variant="outline">
        Outline
      </Button>
      <Button disabled variant="ghost">
        Ghost
      </Button>
    </div>
  )
}
