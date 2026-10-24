import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

export default function WithForm() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Update your account details. Changes are saved immediately.
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-4 p-6">
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Your name" />
          </Field>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
          </Field>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
