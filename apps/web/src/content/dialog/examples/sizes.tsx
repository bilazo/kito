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

const sizes = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline" />}>{size}</DialogTrigger>
          <DialogPopup size={size}>
            <DialogHeader>
              <DialogTitle>Size: {size}</DialogTitle>
              <DialogDescription>
                The popup max width is {size === 'sm' && 'sm'}
                {size === 'md' && 'md'}
                {size === 'lg' && 'lg'}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      ))}
    </div>
  )
}
