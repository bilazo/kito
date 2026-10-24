import { Button } from '@bilazo/kito/components/button'
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

export default function LongContent() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Terms of service</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Terms of service</SheetTitle>
          <SheetDescription>
            The header and footer stay visible — only the body scrolls.
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-3 px-6 text-sm text-muted-foreground">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>
              Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="secondary" />}>Decline</SheetClose>
          <SheetClose render={<Button />}>Decline</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
