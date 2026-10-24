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

export default function LongContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Terms of service</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Scroll through to read the full text.</DialogDescription>
        </DialogHeader>
        <div className="max-h-64 overflow-y-auto text-sm text-muted-foreground">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-3">
              Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Decline</DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
