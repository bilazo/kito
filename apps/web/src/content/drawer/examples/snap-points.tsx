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

const SNAP_POINTS = ['31rem', 1]

export default function SnapPoints() {
  return (
    <Drawer snapPoints={SNAP_POINTS} defaultSnapPoint="31rem" showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open snap drawer</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>
            Drag to snap between a compact peek and a near-full-height view.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="h-80 w-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
