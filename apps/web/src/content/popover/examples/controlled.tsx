import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      {/*
        The trigger stays inside Popover so Base UI knows what to anchor the
        popup to. The difference from an uncontrolled Popover is that we own
        `open` — passing it and `onOpenChange` makes the state controllable
        from anywhere in the tree.
      */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline" />}>Open (controlled)</PopoverTrigger>
        <PopoverPopup className="w-80">
          <PopoverHeader>
            <PopoverTitle>Controlled</PopoverTitle>
            <PopoverDescription>The open state lives in React.</PopoverDescription>
          </PopoverHeader>
          <div className="flex justify-end">
            <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </PopoverPopup>
      </Popover>

      {/*
        Demonstrate that the state can also be driven from outside the
        Popover — this button and the trigger share the same `open` value.
      */}
      <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
        Toggle from outside
      </Button>

      <p className="text-xs text-muted-foreground">
        Open: <span className="font-mono">{open ? 'true' : 'false'}</span>
      </p>
    </div>
  )
}
