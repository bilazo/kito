import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

async function fakeSave(succeed: boolean): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1500)
  })
  if (!succeed) throw new Error('Save failed')
}

export default function PromiseExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.promise(fakeSave(true), {
            loading: 'Saving…',
            success: 'Saved',
            error: 'Could not save',
          })
        }
      >
        Save (success)
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(fakeSave(false), {
            loading: 'Saving…',
            success: 'Saved',
            error: 'Could not save',
          })
        }
      >
        Save (failure)
      </Button>
    </div>
  )
}
