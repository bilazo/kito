import { Button } from '@bilazo/kito/components/button'
import { Field, FieldLabel } from '@bilazo/kito/components/field'
import { Input } from '@bilazo/kito/components/input'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

export default function WithForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Edit name</PopoverTrigger>
      <PopoverPopup className="w-80">
        <PopoverHeader>
          <PopoverTitle>Display name</PopoverTitle>
          <PopoverDescription>Shown on your profile and comments.</PopoverDescription>
        </PopoverHeader>
        <Field name="name">
          <FieldLabel className="sr-only">Name</FieldLabel>
          <Input placeholder="Your name" />
        </Field>
        <div className="flex justify-end gap-2">
          <PopoverClose render={<Button variant="ghost" size="sm" />}>Cancel</PopoverClose>
          <Button size="sm">Save</Button>
        </div>
      </PopoverPopup>
    </Popover>
  )
}
