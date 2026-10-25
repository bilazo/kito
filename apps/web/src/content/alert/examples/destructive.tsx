import { Alert, AlertDescription, AlertTitle } from '@bilazo/kito/components/alert'
import { AlertCircle } from 'lucide-react'

export default function Destructive() {
  return (
    <Alert variant="destructive" className="w-full max-w-md">
      <AlertCircle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your card was declined. Update your payment method and try again.
      </AlertDescription>
    </Alert>
  )
}
