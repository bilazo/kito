import { Button } from '@bilazo/kito/components/button'
import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@bilazo/kito/components/drawer'

const sides = ['bottom', 'top', 'left', 'right'] as const

export default function Sides() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Drawer key={side} side={side} showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" />}>{side}</DrawerTrigger>
          <DrawerPopup>
            <DrawerHeader>
              <DrawerTitle>Side: {side}</DrawerTitle>
              <DrawerDescription>
                Swipe {side === 'bottom' && 'down'}
                {side === 'top' && 'up'}
                {side === 'left' && 'left'}
                {side === 'right' && 'right'} to dismiss.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  )
}
