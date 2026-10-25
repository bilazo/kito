import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { Clipboard, Copy, Download, Pencil, Trash2 } from 'lucide-react'

export default function WithIcons() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        Right-click the file
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>
          <Pencil />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem>
          <Clipboard />
          Copy to clipboard
        </ContextMenuItem>
        <ContextMenuItem>
          <Download />
          Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
        </ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
