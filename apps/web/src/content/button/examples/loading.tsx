import { Button } from '@bilazo/kito/components/button'

export default function Loading() {
  return (
    <div className="flex gap-3">
      <Button loading>Saving</Button>
      <Button variant="outline" loading>
        Loading
      </Button>
      <Button variant="destructive" loading>
        Deleting
      </Button>
    </div>
  )
}
