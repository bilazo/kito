import { Label } from '@bilazo/kito/components/label'

export default function PeerDisabled() {
  return (
    <div className="flex items-center gap-2">
      {/*
        The `peer` class must come BEFORE the element that uses
        `peer-disabled:`. Here the input sits before the label.
      */}
      <input id="demo-checkbox" type="checkbox" disabled className="peer size-4" />
      <Label htmlFor="demo-checkbox">Subscribe to updates</Label>
    </div>
  )
}
