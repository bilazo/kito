import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'
import { Copy, Link, Mail, Share2 } from 'lucide-react'

export default function WithSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        Right-click to see the submenu
      </ContextMenuTrigger>
      <ContextMenuPopup className="w-48">
        <ContextMenuItem>
          <Copy />
          Copy
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubPopup className="w-44">
            <ContextMenuItem>
              <Mail />
              Email
            </ContextMenuItem>
            <ContextMenuItem>
              <Link />
              Copy link
            </ContextMenuItem>
          </ContextMenuSubPopup>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Export…</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
