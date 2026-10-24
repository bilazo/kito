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

export default function ActionSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Delete lesson</SheetTrigger>
      <SheetPopup side="bottom" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Delete lesson 42?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. All progress will be lost.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <Button variant="destructive">Delete</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
