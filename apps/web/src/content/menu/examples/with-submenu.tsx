import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { Copy, Link2, Mail, Share2 } from 'lucide-react'

export default function WithSubmenu() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
      <MenuPopup className="w-56">
        <MenuItem>
          <Copy />
          Copy
        </MenuItem>
        <MenuSub>
          <MenuSubTrigger>
            <Share2 />
            Share
          </MenuSubTrigger>
          <MenuSubPopup className="w-48">
            <MenuItem>
              <Mail />
              Email
            </MenuItem>
            <MenuItem>
              <Link2 />
              Copy link
            </MenuItem>
          </MenuSubPopup>
        </MenuSub>
        <MenuSeparator />
        <MenuItem>Export…</MenuItem>
      </MenuPopup>
    </Menu>
  )
}
