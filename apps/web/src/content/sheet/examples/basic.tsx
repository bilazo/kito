import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

export default function Basic() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open settings</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Changes are saved immediately.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="secondary" />}>Cancel</SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
