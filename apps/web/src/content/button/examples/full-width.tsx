import { Button } from '@bilazo/kito/components/button'

export default function FullWidth() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Button fullWidth>Sign in</Button>
      <Button fullWidth variant="outline">
        Create account
      </Button>
    </div>
  )
}
