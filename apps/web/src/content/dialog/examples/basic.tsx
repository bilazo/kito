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

export default function Basic() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Changes are saved immediately.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
