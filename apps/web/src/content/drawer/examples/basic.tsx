import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

export default function Basic() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Drag down to dismiss, or use the buttons below.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Cancel</DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
