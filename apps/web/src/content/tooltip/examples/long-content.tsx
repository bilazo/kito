import { Button } from '@bilazo/kito/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'

export default function LongContent() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Hover for details</TooltipTrigger>
        <TooltipContent side="bottom" align="start">
          The tooltip wraps at <code className="font-mono">max-w-xs</code> so long messages stay
          readable without covering the page.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
