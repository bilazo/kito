import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
} from '@bilazo/kito/components/sheet'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open (controlled)
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Controlled sheet</SheetTitle>
            <SheetDescription>The open state lives in React.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose render={<Button variant="secondary" />}>Close</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
      <p className="text-xs text-muted-foreground">
        Open: <span className="font-mono">{open ? 'true' : 'false'}</span>
      </p>
    </div>
  )
}
