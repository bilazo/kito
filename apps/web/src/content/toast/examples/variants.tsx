import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

export default function Variants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success('Saved')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Something went wrong')}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning('This cannot be undone')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info('New version available')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.loading('Processing…')}>
        Loading
      </Button>
    </div>
  )
}
