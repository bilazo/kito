import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

const sides = ['top', 'right', 'bottom', 'left'] as const

export default function Sides() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" />}>{side}</PopoverTrigger>
          <PopoverPopup side={side}>
            <PopoverTitle>Opens on the {side}</PopoverTitle>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  )
}
