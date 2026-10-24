import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from '@bilazo/kito/components/dialog'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open (controlled)
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>The open state lives in React.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
      <p className="text-xs text-muted-foreground">
        Open: <span className="font-mono">{open ? 'true' : 'false'}</span>
      </p>
    </div>
  )
}
