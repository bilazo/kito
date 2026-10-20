import { Button } from '@bilazo/kito/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'

export default function NoArrow() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
        <TooltipContent showArrow={false}>A pill-style tooltip without an arrow</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
