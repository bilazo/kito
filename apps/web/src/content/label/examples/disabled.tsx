import { Label } from '@bilazo/kito/components/label'

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label data-disabled htmlFor="demo-disabled-1">
          Locked field
        </Label>
        <input
          id="demo-disabled-1"
          disabled
          defaultValue="Cannot edit"
          className="rounded-md border border-input bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label data-disabled>Disabled label only</Label>
      </div>
    </div>
  )
}
