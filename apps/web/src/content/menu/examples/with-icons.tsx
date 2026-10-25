import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { Copy, Download, Edit, Share2, Trash2 } from 'lucide-react'

export default function WithIcons() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>File actions</MenuTrigger>
      <MenuPopup className="w-56">
        <MenuItem>
          <Edit />
          Rename
          <MenuShortcut>⌘R</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <Copy />
          Duplicate
          <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <Share2 />
          Share
          <MenuShortcut>⌘⇧S</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <Download />
          Download
          <MenuShortcut>⌘⇧D</MenuShortcut>
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <Trash2 />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}
