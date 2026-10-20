import { Button } from '@bilazo/kito/components/button'
import { Kbd } from '@bilazo/kito/components/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@bilazo/kito/components/tooltip'
import { Bold, Italic, Underline } from 'lucide-react'

export default function WithIcons() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 rounded-lg border border-border p-1">
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Bold" />}>
            <Bold />
          </TooltipTrigger>
          <TooltipContent>
            Bold <Kbd>⌘B</Kbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Italic" />}>
            <Italic />
          </TooltipTrigger>
          <TooltipContent>
            Italic <Kbd>⌘I</Kbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Underline" />}>
            <Underline />
          </TooltipTrigger>
          <TooltipContent>
            Underline <Kbd>⌘U</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
