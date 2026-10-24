import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'

export default function WithForm() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button />}>Edit profile</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Update your details. Changes are saved immediately.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-4 p-6">
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Your name" />
          </Field>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
          </Field>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Cancel</DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
