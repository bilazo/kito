import { Alert, AlertDescription, AlertTitle } from '@bilazo/kito/components/alert'

export default function WithoutIcon() {
  return (
    <Alert className="w-full max-w-md">
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>Version 2.4 is out. Reload to pick up the latest fixes.</AlertDescription>
    </Alert>
  )
}
