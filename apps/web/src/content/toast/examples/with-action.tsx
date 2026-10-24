import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

export default function WithAction() {
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Item deleted',
          description: 'The item was removed from your library.',
          action: {
            label: 'Undo',
            onClick: () => toast.success('Restored'),
          },
        })
      }
    >
      Delete item
    </Button>
  )
}
