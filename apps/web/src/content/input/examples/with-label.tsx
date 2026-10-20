import { Input } from '@bilazo/kito/components/input'
import { Label } from '@bilazo/kito/components/label'

export default function WithLabel() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="demo-email">Email address</Label>
      <Input id="demo-email" type="email" placeholder="you@example.com" autoComplete="email" />
    </div>
  )
}
