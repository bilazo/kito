import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

export default function Dismiss() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => {
          toast.info('First notification')
          toast.info('Second notification')
          toast.info('Third notification')
        }}
      >
        Show three
      </Button>
      <Button variant="outline" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
    </div>
  )
}
