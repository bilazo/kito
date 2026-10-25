import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { useState } from 'react'

export default function CheckboxItems() {
  const [showGrid, setShowGrid] = useState(true)
  const [showRuler, setShowRuler] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(true)

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        Right-click to toggle view options
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show grid
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showRuler} onCheckedChange={setShowRuler}>
          Show ruler
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={snapToGrid} onCheckedChange={setSnapToGrid}>
          Snap to grid
        </ContextMenuCheckboxItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
