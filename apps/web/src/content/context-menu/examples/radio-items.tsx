import {
  ContextMenu,
  ContextMenuGroupLabel,
  ContextMenuPopup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { useState } from 'react'

export default function RadioItems() {
  const [size, setSize] = useState('medium')

  return (
    <div className="flex flex-col gap-3">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
          Right-click to choose text size
        </ContextMenuTrigger>
        <ContextMenuPopup className="w-40">
          <ContextMenuRadioGroup value={size} onValueChange={(v) => setSize(v as string)}>
            <ContextMenuGroupLabel>Text size</ContextMenuGroupLabel>
            <ContextMenuRadioItem value="small">Small</ContextMenuRadioItem>
            <ContextMenuRadioItem value="medium">Medium</ContextMenuRadioItem>
            <ContextMenuRadioItem value="large">Large</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuPopup>
      </ContextMenu>
      <p className="text-xs text-muted-foreground">
        Selected: <span className="font-mono">{size}</span>
      </p>
    </div>
  )
}
