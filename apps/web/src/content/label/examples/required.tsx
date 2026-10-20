import { Label } from '@bilazo/kito/components/label'

export default function Required() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="demo-username">
        Username
        <span aria-hidden className="ms-0.5 text-destructive">
          *
        </span>
      </Label>
      {/* TODO: replace with <Input id="demo-username" required /> once Input is available */}
      <input
        id="demo-username"
        required
        className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
      />
    </div>
  )
}
