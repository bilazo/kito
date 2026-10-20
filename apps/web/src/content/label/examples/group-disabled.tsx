import { Label } from '@bilazo/kito/components/label'

export default function GroupDisabled() {
  return (
    <fieldset
      disabled
      data-disabled="true"
      className="group flex flex-col gap-3 rounded-lg border border-border p-4"
    >
      <p className="text-xs text-muted-foreground">Whole group is disabled</p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="group-1">Field one</Label>
        <input
          id="group-1"
          defaultValue="Value"
          className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="group-2">Field two</Label>
        <input
          id="group-2"
          defaultValue="Value"
          className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
        />
      </div>
    </fieldset>
  )
}
