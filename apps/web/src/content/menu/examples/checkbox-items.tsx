import { Button } from '@bilazo/kito/components/button'
import {
  Menu,
  MenuCheckboxItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from '@bilazo/kito/components/menu'
import { useState } from 'react'

export default function CheckboxItems() {
  const [showGrid, setShowGrid] = useState(true)
  const [showRuler, setShowRuler] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(true)

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
      <MenuPopup>
        <MenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show grid
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={showRuler} onCheckedChange={setShowRuler}>
          Show ruler
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuCheckboxItem checked={snapToGrid} onCheckedChange={setSnapToGrid}>
          Snap to grid
        </MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  )
}
