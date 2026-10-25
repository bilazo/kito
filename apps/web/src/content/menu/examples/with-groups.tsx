import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { LogOut, Settings, User } from 'lucide-react'

export default function WithGroups() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Account</MenuTrigger>
      <MenuPopup className="w-56">
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem>
            <User />
            Profile
          </MenuItem>
          <MenuItem>
            <Settings />
            Settings
            <MenuShortcut>⌘,</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem variant="destructive">
            <LogOut />
            Sign out
          </MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  )
}
