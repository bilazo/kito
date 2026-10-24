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

export default function ActionSheet() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Delete lesson</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Delete lesson 42?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
          <Button variant="destructive">Delete</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
