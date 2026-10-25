import { Button } from '@bilazo/kito/components/button'
import { ButtonGroup } from '@bilazo/kito/components/button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@bilazo/kito/components/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@bilazo/kito/components/tooltip'
import { AudioLinesIcon, Bold, Italic, PlusIcon, Underline } from 'lucide-react'

export default function Nested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupAddon align="inline-end">
                  <AudioLinesIcon />
                </InputGroupAddon>
              }
            />
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
