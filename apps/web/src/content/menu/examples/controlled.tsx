import { Button } from '@bilazo/kito/components/button'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@bilazo/kito/components/menu'
import { useState } from 'react'

export default function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger render={<Button variant="outline" />}>Open (controlled)</MenuTrigger>
        <MenuPopup>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuPopup>
      </Menu>
      <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
        Toggle from outside
      </Button>
      <p className="text-xs text-muted-foreground">
        Open: <span className="font-mono">{open ? 'true' : 'false'}</span>
      </p>
    </div>
  )
}
