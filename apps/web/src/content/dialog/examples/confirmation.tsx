import { Button } from '@bilazo/kito/components/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@bilazo/kito/components/dialog'

export default function Confirmation() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Delete lesson</DialogTrigger>
      {/* Confirmation dialogs omit the corner close button — the footer
          actions are the only path, which prevents accidental dismissal. */}
      <DialogPopup showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete lesson 42?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All progress and saved vocabulary will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
