import { Button } from '@bilazo/kito/components/button'
import { Kbd } from '@bilazo/kito/components/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'
import { Bold } from 'lucide-react'

export default function InTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Bold" />}>
          <Bold />
        </TooltipTrigger>
        <TooltipContent>
          Bold <Kbd>⌘B</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
