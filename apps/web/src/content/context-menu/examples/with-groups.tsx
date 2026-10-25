import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@bilazo/kito/components/context-menu'

export default function WithGroups() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        Right-click the selection
      </ContextMenuTrigger>
      <ContextMenuPopup className="w-48">
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Edit</ContextMenuGroupLabel>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Share</ContextMenuGroupLabel>
          <ContextMenuItem>Email</ContextMenuItem>
          <ContextMenuItem>Link</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
