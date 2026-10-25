import { Alert, AlertDescription, AlertTitle } from '@bilazo/kito/components/alert'
import { Info } from 'lucide-react'

export default function Basic() {
  return (
    <Alert className="w-full max-w-md">
      <Info />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}
