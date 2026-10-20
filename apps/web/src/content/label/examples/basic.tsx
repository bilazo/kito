import { Label } from '@bilazo/kito/components/label'

export default function Basic() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="demo-email">Email address</Label>
      {/* TODO: replace with <Input id="demo-email" /> once Input is available */}
      <input
        id="demo-email"
        type="email"
        placeholder="you@example.com"
        className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
      />
    </div>
  )
}
