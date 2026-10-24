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
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function WithForm() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Create project</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Give your project a name. You can change it later.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Field name="name">
            <FieldLabel>Project name</FieldLabel>
            <Input placeholder="My new project" />
          </Field>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
