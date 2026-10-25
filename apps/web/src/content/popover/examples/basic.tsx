import { Button } from '@bilazo/kito/components/button'
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@bilazo/kito/components/popover'

export default function Basic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Show details</PopoverTrigger>
      <PopoverPopup>
        <PopoverHeader>
          <PopoverTitle>Your plan: Pro</PopoverTitle>
          <PopoverDescription>Based on the last 12 months of usage.</PopoverDescription>
        </PopoverHeader>
        <p className="text-sm text-muted-foreground">
          Pro includes unlimited projects, 100 GB storage, and priority support.
        </p>
      </PopoverPopup>
    </Popover>
  )
}
