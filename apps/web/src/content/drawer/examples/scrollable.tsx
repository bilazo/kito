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

export default function Scrollable() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Terms of service</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Terms of service</DrawerTitle>
          <DrawerDescription>
            The header and footer stay visible — only the body scrolls.
          </DrawerDescription>
        </DrawerHeader>
        {/* Body has its own padding, popup has none — full control. */}
        <DrawerBody className="flex flex-col gap-3 p-6 text-sm text-muted-foreground">
          {Array.from({ length: 40 }, (_, i) => (
            <p key={i}>
              Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Decline</DrawerClose>
          <Button>Accept</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
