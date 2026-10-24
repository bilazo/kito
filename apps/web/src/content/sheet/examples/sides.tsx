import { Button } from '@bilazo/kito/components/button'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from '@bilazo/kito/components/sheet'

const sides = ['start', 'end', 'top', 'bottom'] as const

export default function Sides() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>{side}</SheetTrigger>
          <SheetPopup side={side}>
            <SheetHeader>
              <SheetTitle>Side: {side}</SheetTitle>
              <SheetDescription>
                {side === 'start' &&
                  'Anchored to the inline-start edge — left in LTR, right in RTL.'}
                {side === 'end' && 'Anchored to the inline-end edge — right in LTR, left in RTL.'}
                {side === 'top' && 'Anchored to the top edge.'}
                {side === 'bottom' && 'Anchored to the bottom edge — the action-sheet pattern.'}
              </SheetDescription>
            </SheetHeader>
          </SheetPopup>
        </Sheet>
      ))}
    </div>
  )
}
