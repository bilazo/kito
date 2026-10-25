import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

export default function NoArrow() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>No arrow</PopoverTrigger>
      <PopoverPopup showArrow={false} className="w-80">
        <PopoverHeader>
          <PopoverTitle>Without an arrow</PopoverTitle>
          <PopoverDescription>
            A plain panel for cases where a pointer would add noise.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverPopup>
    </Popover>
  )
}
