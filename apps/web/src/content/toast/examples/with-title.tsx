import { Button } from '@bilazo/kito/components/button'
import { toast } from '@bilazo/kito/components/toast'

export default function WithTitle() {
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Message sent',
          description: 'We will get back to you within 24 hours.',
        })
      }
    >
      Send message
    </Button>
  )
}
