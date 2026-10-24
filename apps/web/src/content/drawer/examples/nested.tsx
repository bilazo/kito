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

export default function Nested() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open level 1</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>Level 1</DrawerTitle>
          <DrawerDescription>
            The first drawer. Open the next one to see this recede.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-4 p-6">
          <p className="text-sm text-muted-foreground">
            Each nested drawer pushes the ones behind it back one step. A peek strip stays visible
            on each one, so the stack depth is always readable.
          </p>

          <Drawer showSwipeHandle>
            <DrawerTrigger render={<Button />}>Open level 2</DrawerTrigger>
            <DrawerPopup>
              <DrawerHeader>
                <DrawerTitle>Level 2</DrawerTitle>
                <DrawerDescription>Two levels deep. Level 1 is one step back.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="flex flex-col gap-4 p-6">
                <p className="text-sm text-muted-foreground">
                  Open one more to see the depth grow.
                </p>

                <Drawer showSwipeHandle>
                  <DrawerTrigger render={<Button />}>Open level 3</DrawerTrigger>
                  <DrawerPopup>
                    <DrawerHeader>
                      <DrawerTitle>Level 3</DrawerTitle>
                      <DrawerDescription>
                        Three levels deep. Levels 1 and 2 are receded.
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody className="flex flex-col gap-4 p-6">
                      <p className="text-sm text-muted-foreground">
                        Close this one to see the stack unwind — each previous drawer animates
                        forward again.
                      </p>

                      <Drawer showSwipeHandle>
                        <DrawerTrigger render={<Button />}>Open level 4</DrawerTrigger>
                        <DrawerPopup>
                          <DrawerHeader>
                            <DrawerTitle>Level 4</DrawerTitle>
                            <DrawerDescription>
                              Three levels deep. Levels 1 and 2 and 3 are receded.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerBody className="p-6">
                            <p className="text-sm text-muted-foreground">
                              Close this one to see the stack unwind — each previous drawer animates
                              forward again.
                            </p>
                          </DrawerBody>
                          <DrawerFooter>
                            <DrawerClose render={<Button variant="secondary" />}>
                              Close level 4
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerPopup>
                      </Drawer>
                    </DrawerBody>
                    <DrawerFooter>
                      <DrawerClose render={<Button variant="secondary" />}>
                        Close level 3
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerPopup>
                </Drawer>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose render={<Button variant="secondary" />}>Close level 2</DrawerClose>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Close level 1</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
