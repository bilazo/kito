import { Alert, AlertAction, AlertDescription, AlertTitle } from '@bilazo/kito/components/alert'
import { Button } from '@bilazo/kito/components/button'
import { Shield } from 'lucide-react'

export default function Action() {
  return (
    <Alert className="w-full max-w-lg">
      <Shield />
      <AlertTitle>Enable two-factor authentication</AlertTitle>
      <AlertDescription>
        Add a second factor to protect your account. This takes about a minute.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}
