import { Button } from '@bilazo/kito/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'
import { Plus } from 'lucide-react'

export default function Basic() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button size="icon" aria-label="Add item" />}>
          <Plus />
        </TooltipTrigger>
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
