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

export default function FullBleed() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>View article</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>The state of UI in 2026</SheetTitle>
          <SheetDescription>
            Full-bleed image, then padded text — only possible because the popup has no padding of
            its own.
          </SheetDescription>
        </SheetHeader>
        {/* Full-bleed image, edge to edge. No `p-6` on SheetBody, no
            padding on the popup — the image fills the panel width. */}
        <SheetBody>
          <div aria-hidden className="h-40 w-full bg-linear-to-br from-primary/30 to-primary/5" />
          <div className="flex flex-col gap-3 p-6 text-sm">
            <p>
              The image above is full width. The text below has its own padding. Both live inside
              the same scrollable region.
            </p>
            <p>
              This is the pattern that makes padding-free sheets worth the small extra verbosity at
              the call site.
            </p>
            <p className="text-muted-foreground">
              Try resizing — the image stretches with the panel, the text stays within its own
              inset.
            </p>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button variant="secondary" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
