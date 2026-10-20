import { Button } from '@bilazo/kito/components/button'

export default function Sizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
