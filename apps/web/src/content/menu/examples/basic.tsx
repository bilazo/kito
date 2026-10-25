import { Button } from '@bilazo/kito/components/button'
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@bilazo/kito/components/menu'

export default function Basic() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
      <MenuPopup>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">Delete</MenuItem>
      </MenuPopup>
    </Menu>
  )
}
